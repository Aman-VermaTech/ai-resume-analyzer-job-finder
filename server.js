const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 8765);
const aiModel = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";
const geminiApiKey = process.env.GEMINI_API_KEY || "AIzaSyAcCs1zLWPoHWvvUaFofBMYEW1UMK30_mc";

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".md": "text/markdown; charset=utf-8"
};

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(data));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        request.destroy();
        reject(new Error("Request body is too large."));
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function extractJson(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error("AI response did not include JSON.");
  }
  return JSON.parse(match[0]);
}

function extractSkillsFromText(text) {
  const knownSkills = [
    "html", "css", "javascript", "typescript", "react", "vue", "angular", "node",
    "express", "python", "java", "sql", "mongodb", "postgresql", "aws", "docker",
    "git", "api", "testing", "machine learning", "data", "analytics", "figma"
  ];
  const normalized = String(text || "").toLowerCase();
  return knownSkills.filter((skill) => normalized.includes(skill));
}

function mapRemotiveJob(job) {
  const text = `${job.title || ""} ${job.description || ""} ${job.category || ""} ${job.tags?.join(" ") || ""}`;
  const publicationDate = job.publication_date ? new Date(job.publication_date) : null;
  const deadline = publicationDate && !Number.isNaN(publicationDate.getTime())
    ? publicationDate.toISOString().slice(0, 10)
    : "Recently posted";

  return {
    id: `remotive-${job.id}`,
    title: job.title || "Remote job",
    company: job.company_name || "Remote company",
    location: job.candidate_required_location || "Remote",
    type: job.job_type || "Remote",
    portal: "Remotive",
    url: job.url,
    applicants: "Live",
    deadline,
    skills: extractSkillsFromText(text)
  };
}

async function fetchLiveJobs({ search }) {
  const query = encodeURIComponent(search || "software developer");
  const apiResponse = await fetch(`https://remotive.com/api/remote-jobs?search=${query}`);
  const payload = await apiResponse.json();

  if (!apiResponse.ok) {
    throw new Error(payload.message || "Remotive jobs request failed.");
  }

  return (payload.jobs || []).slice(0, 20).map(mapRemotiveJob);
}

async function analyzeWithGemini({ resume, jobDescription, role }) {
  const prompt = `
You are an expert resume reviewer and job matching assistant.
Analyze the resume for the target role and job description.
Return only valid JSON using this exact shape:
{
  "score": 0,
  "verdict": "short verdict",
  "summary": "2 sentence summary",
  "matchedSkills": ["skill"],
  "missingSkills": ["skill"],
  "actionVerbCount": 0,
  "suggestions": ["specific improvement tip"],
  "recommendedJobs": [
    {
      "title": "job title",
      "company": "sample company",
      "location": "location",
      "type": "Internship or Full-time",
      "match": 0,
      "skills": ["skill"]
    }
  ]
}

Target role: ${role}
Job description:
${jobDescription || "No job description provided."}

Resume:
${resume}
`;

  const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${aiModel}:generateContent`, {
    method: "POST",
    headers: {
      "x-goog-api-key": geminiApiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json"
      }
    })
  });

  const payload = await apiResponse.json();
  if (!apiResponse.ok) {
    throw new Error(payload.error?.message || "Gemini API request failed.");
  }

  const text = payload.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("") || "";
  return extractJson(text);
}

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (request.method === "POST" && request.url === "/api/analyze") {
    try {
      const body = JSON.parse(await readBody(request));
      if (!body.resume || typeof body.resume !== "string") {
        sendJson(response, 400, { error: "Resume text is required." });
        return;
      }

      const analysis = await analyzeWithGemini({
        resume: body.resume,
        jobDescription: body.jobDescription || "",
        role: body.role || "frontend"
      });

      sendJson(response, 200, { source: "gemini", analysis });
    } catch (error) {
      sendJson(response, 500, { error: error.message });
    }
    return;
  }

  if (request.method === "GET" && requestUrl.pathname === "/api/jobs") {
    try {
      const jobs = await fetchLiveJobs({
        search: requestUrl.searchParams.get("search") || requestUrl.searchParams.get("role")
      });
      sendJson(response, 200, { source: "remotive", jobs });
    } catch (error) {
      sendJson(response, 500, { error: error.message });
    }
    return;
  }

  const safePath = decodeURIComponent(request.url.split("?")[0]).replace(/^\/+/, "");
  const filePath = path.join(root, safePath || "index.html");

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, { "Content-Type": types[path.extname(filePath)] || "text/plain" });
    response.end(data);
  });
});

server.listen(port, () => {
  console.log(`Resume AI project running at http://localhost:${port}`);
});

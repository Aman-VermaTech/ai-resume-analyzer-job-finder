const apiKey = process.env.GEMINI_API_KEY || "AIzaSyAcCs1zLWPoHWvvUaFofBMYEW1UMK30_mc";
const model = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";

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

  const apiResponse = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "x-goog-api-key": apiKey,
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
    }
  );

  const payload = await apiResponse.json();
  if (!apiResponse.ok) {
    throw new Error(payload.error?.message || "Gemini API request failed.");
  }

  const text = payload.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("") || "";
  return extractJson(text);
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ error: "Method not allowed." }));
    return;
  }

  try {
    const body = JSON.parse(await readBody(req));
    if (!body.resume || typeof body.resume !== "string") {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify({ error: "Resume text is required." }));
      return;
    }

    const analysis = await analyzeWithGemini({
      resume: body.resume,
      jobDescription: body.jobDescription || "",
      role: body.role || "frontend"
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ source: "gemini", analysis }));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ error: error.message }));
  }
};

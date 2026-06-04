const roleSkills = {
  frontend: ["html", "css", "javascript", "react", "typescript", "api", "responsive", "git", "accessibility", "testing"],
  backend: ["node", "express", "python", "sql", "mongodb", "api", "authentication", "docker", "testing", "cloud"],
  data: ["excel", "sql", "python", "power bi", "tableau", "statistics", "dashboard", "data cleaning", "visualization", "reporting"],
  ml: ["python", "machine learning", "pandas", "numpy", "scikit-learn", "tensorflow", "data preprocessing", "model evaluation", "nlp", "statistics"]
};

const roadmapTemplates = {
  frontend: [
    "Month 1 → HTML, CSS, responsive design",
    "Month 2 → JavaScript, DOM, and API integration",
    "Month 3 → React, component architecture, and state management",
    "Month 4 → Build real projects with performance and accessibility",
    "Month 5 → Polish portfolio, ATS-friendly resume, and interview prep",
    "Month 6 → Apply to frontend roles and iterate based on feedback"
  ],
  backend: [
    "Month 1 → Node.js, Express, and REST APIs",
    "Month 2 → Databases with SQL and MongoDB",
    "Month 3 → Authentication, security, and cloud basics",
    "Month 4 → Containerization with Docker and CI/CD tools",
    "Month 5 → Build backend projects with monitoring and logging",
    "Month 6 → Apply to backend roles and prepare system design answers"
  ],
  data: [
    "Month 1 → Excel, SQL, and data cleaning techniques",
    "Month 2 → Data visualization with Power BI and Tableau",
    "Month 3 → Statistics, probability, and hypothesis testing",
    "Month 4 → Build dashboards and data storytelling projects",
    "Month 5 → Optimize resume for analytics keywords and metrics",
    "Month 6 → Apply to data analyst roles with strong case studies"
  ],
  ml: [
    "Month 1 → Python, NumPy, pandas, and data preprocessing",
    "Month 2 → Statistics, probability, and linear algebra",
    "Month 3 → Machine learning fundamentals and scikit-learn",
    "Month 4 → Build models, evaluate performance, and tune hyperparameters",
    "Month 5 → Publish projects with explainability and reproducibility",
    "Month 6 → Prepare for ML interviews and apply to data science roles"
  ]
};

const actionVerbs = [
  "built", "created", "developed", "designed", "improved", "optimized", "automated",
  "analyzed", "launched", "managed", "implemented", "reduced", "increased", "trained"
];

const weakPhrases = [
  {
    check: /worked on a web development project/i,
    bad: "Worked on a web development project.",
    good: "Developed a full-stack web application that improved page load time by 30%."
  },
  {
    check: /responsible for/i,
    bad: "Responsible for developing testing scripts.",
    good: "Designed and implemented automated testing scripts that reduced bugs by 25%."
  },
  {
    check: /helped .* with/i,
    bad: "Helped with backend integration.",
    good: "Led backend integration efforts to connect microservices with REST APIs."
  },
  {
    check: /participated in/i,
    bad: "Participated in a team project.",
    good: "Collaborated with a cross-functional team to ship a customer-facing product."
  }
];

const demoResume = `Aryan Sharma
Frontend Developer Intern

Built responsive portfolio and ecommerce pages using HTML, CSS, JavaScript and React.
Created reusable components, integrated REST API data, and improved page loading speed.
Used Git, GitHub, basic testing, and accessibility checks in college projects.
Developed dashboards for project tracking and collaborated with team members.`;

const demoJob = `We are hiring a Frontend Developer Intern with HTML, CSS, JavaScript, React, TypeScript, responsive design, REST API integration, Git, accessibility, and testing knowledge.`;

const jobs = [
  {
    id: "job-1",
    title: "Frontend Developer Intern",
    company: "BrightStack",
    location: "Remote",
    type: "Internship",
    portal: "LinkedIn",
    url: "https://www.linkedin.com/jobs/view/1234567890/",
    applicants: 128,
    deadline: "2026-06-15",
    skills: ["html", "css", "javascript", "react"]
  },
  {
    id: "job-2",
    title: "Junior React Developer",
    company: "PixelWorks",
    location: "Bengaluru",
    type: "Full-time",
    portal: "Indeed",
    url: "https://in.indeed.com/viewjob?jk=abcdef123456",
    applicants: 84,
    deadline: "2026-06-22",
    skills: ["react", "typescript", "api", "git"]
  },
  {
    id: "job-3",
    title: "Backend Developer Trainee",
    company: "CloudNest",
    location: "Hyderabad",
    type: "Trainee",
    portal: "Naukri.com",
    url: "https://www.naukri.com/job-listings/backend-developer-trainee-cloudnest-hyderabad-1234567",
    applicants: 63,
    deadline: "2026-06-18",
    skills: ["node", "express", "sql", "api"]
  },
  {
    id: "job-4",
    title: "Data Analyst Intern",
    company: "MetricLab",
    location: "Pune",
    type: "Internship",
    portal: "Glassdoor",
    url: "https://www.glassdoor.co.in/job-listing/data-analyst-intern-metriclab-JV1234567.htm",
    applicants: 102,
    deadline: "2026-06-20",
    skills: ["excel", "sql", "power bi", "dashboard"]
  },
  {
    id: "job-5",
    title: "Machine Learning Intern",
    company: "AIMinds",
    location: "Remote",
    type: "Internship",
    portal: "Indeed",
    url: "https://in.indeed.com/viewjob?jk=ghijkl987654",
    applicants: 56,
    deadline: "2026-06-26",
    skills: ["python", "machine learning", "pandas", "model evaluation"]
  },
  {
    id: "job-6",
    title: "Full Stack Developer",
    company: "LaunchGrid",
    location: "Mumbai",
    type: "Full-time",
    portal: "Monster",
    url: "https://www.monsterindia.com/job/full-stack-developer-launchgrid-7654321",
    applicants: 142,
    deadline: "2026-06-30",
    skills: ["react", "node", "mongodb", "docker"]
  }
];

let activeJobs = [...jobs];
let lastJobSource = "sample";

const resumeText = document.querySelector("#resumeText");
const jobText = document.querySelector("#jobText");
const roleSelect = document.querySelector("#roleSelect");
const resumeUpload = document.querySelector("#resumeUpload");
const resumeDropZone = document.querySelector("#resumeDropZone");
const browseBtn = document.querySelector("#browseBtn");
const uploadStatus = document.querySelector("#uploadStatus");
const previewFileName = document.querySelector("#previewFileName");
const resumePreviewText = document.querySelector("#resumePreviewText");
const previewTags = document.querySelector("#previewTags");
const heroSkillChips = document.querySelector("#heroSkillChips");
const themeToggle = document.querySelector("#themeToggle");
const globalLoader = document.querySelector("#globalLoader");
const heroMatchRing = document.querySelector("#heroMatchRing");
const heroScoreTitle = document.querySelector("#heroScoreTitle");
const fixButton = document.querySelector("#fixButton");

function getPdfLib() {
  if (typeof pdfjsLib !== "undefined") return pdfjsLib;
  if (typeof window !== "undefined") {
    return window.pdfjsLib || window["pdfjs-dist/build/pdf"] || null;
  }
  return null;
}

function loadScript(src) {
  console.log("[Loader] loading script", src);
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (getPdfLib()) {
        console.log("[Loader] script already loaded", src);
        resolve();
        return;
      }
      existing.remove();
    }

    const script = document.createElement("script");
    const timeout = window.setTimeout(() => {
      script.remove();
      reject(new Error(`Timed out loading ${src}`));
    }, 10000);

    script.src = src;
    script.crossOrigin = "anonymous";
    script.referrerPolicy = "no-referrer";
    script.onload = () => {
      window.clearTimeout(timeout);
      console.log("[Loader] loaded script", src);
      resolve();
    };
    script.onerror = () => {
      window.clearTimeout(timeout);
      reject(new Error(`Could not load ${src}`));
    };
    document.head.appendChild(script);
  });
}

async function ensurePdfLib() {
  let lib = getPdfLib();
  console.log("[PDF] ensurePdfLib check", { loaded: !!lib });
  if (!lib) {
    const sources = [
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js",
      "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/build/pdf.min.js"
    ];

    for (const source of sources) {
      try {
        await loadScript(source);
        lib = getPdfLib();
        console.log("[PDF] loaded library from source", source, { loaded: !!lib });
        if (lib) break;
      } catch (error) {
        console.warn(`Could not load PDF.js from ${source}`, error);
      }
    }
  }

  if (!lib) {
    throw new Error("PDF library not loaded. Check your internet connection and try again.");
  }

  if (lib.GlobalWorkerOptions) {
    lib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
  }
  return lib;
}
const interviewButton = document.querySelector("#interviewButton");
const roadmapButton = document.querySelector("#roadmapButton");
const pageTabs = document.querySelectorAll(".page-tab");
const pagePanels = document.querySelectorAll(".page-panel");
const appliedJobsContainer = document.querySelector("#appliedJobs");
const score = document.querySelector("#score");
const verdict = document.querySelector("#verdict");
const summary = document.querySelector("#summary");
const matchedCount = document.querySelector("#matchedCount");
const missingCount = document.querySelector("#missingCount");
const actionCount = document.querySelector("#actionCount");
const matchedSkills = document.querySelector("#matchedSkills");
const missingSkills = document.querySelector("#missingSkills");
const suggestions = document.querySelector("#suggestions");
const jobsContainer = document.querySelector("#jobs");
const jobSearch = document.querySelector("#jobSearch");
const analyzeButton = document.querySelector("#analyzeButton");
const aiStatus = document.querySelector("#aiStatus");
const gapScore = document.querySelector("#gapScore");
const gapMissing = document.querySelector("#gapMissing");
const gapPriority = document.querySelector("#gapPriority");
const atsProgress = document.querySelector("#atsProgress");
const currentRoleLabel = document.querySelector("#currentRoleLabel");
const pulseTopMatch = document.querySelector("#pulseTopMatch");
const pulseGap = document.querySelector("#pulseGap");
const opportunityCard = document.querySelector("#opportunityCard");
const appliedJobIds = new Set();

function normalize(text) {
  return String(text || "").toLowerCase().replace(/[^a-z0-9+#.\s-]/g, " ");
}

function hasKeyword(text, keyword) {
  return normalize(text).includes(keyword.toLowerCase());
}

function renderLivePulse(result) {
  const topMatch = result?.recommendedJobs?.length
    ? Math.max(...result.recommendedJobs.map((job) => calculateJobMatch(job)))
    : Math.max(...activeJobs.map((job) => calculateJobMatch(job)));
  const missingCountValue = result?.missingSkills?.length ?? 0;

  pulseTopMatch.textContent = `${topMatch}%`;
  pulseGap.textContent = missingCountValue;
  opportunityCard.textContent = `${result?.score ?? 0}%`;
}

function setPage(page) {
  pageTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.page === page);
  });
  pagePanels.forEach((panel) => {
    const active = panel.id === `page-${page}`;
    panel.classList.toggle("active", active);
    if (active) {
      panel.classList.add("fade-in");
      window.setTimeout(() => panel.classList.remove("fade-in"), 320);
    }
  });
}

function applyToJob(jobId) {
  if (appliedJobIds.has(jobId)) {
    setStatus("Already added to applied jobs.", "info");
    return;
  }
  appliedJobIds.add(jobId);
  setStatus("Job added to your applied list.", "gemini");
  renderAppliedJobs();
  renderJobs();
}

function cancelApplication(jobId) {
  if (!appliedJobIds.has(jobId)) {
    setStatus("This job is not in your applied list.", "info");
    return;
  }

  appliedJobIds.delete(jobId);
  setStatus("Application removed from your applied list.", "warn");
  renderAppliedJobs();
  renderJobs();
}

function renderAppliedJobs() {
  const applied = activeJobs.filter((job) => appliedJobIds.has(job.id));
  appliedJobsContainer.innerHTML = "";

  if (!applied.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No applied jobs yet. Apply to jobs from Recommended Jobs to track them here.";
    appliedJobsContainer.appendChild(empty);
    return;
  }

  applied.forEach((job) => {
    const logoColor = getColorFromName(job.company);
    const companyInitials = getCompanyInitials(job.company);
    const card = document.createElement("article");
    card.className = "job-card";
    card.innerHTML = `
      <div class="job-card-brand">
        <span class="company-logo" style="background: ${logoColor};">${companyInitials}</span>
        <div>
          <h3>${job.title}</h3>
          <p>${job.company} · ${job.location}</p>
        </div>
      </div>
      <div class="job-meta">
        <span>${job.type}</span>
        <span>${job.portal}</span>
        <span>${job.applicants} applied</span>
      </div>
      <p class="job-deadline">Deadline: <strong>${job.deadline}</strong></p>
      <p class="job-link"><a href="${job.url}" target="_blank" rel="noopener noreferrer">View on ${job.portal}</a></p>
      <div class="job-actions">
        <button class="cancel-application-button" data-job-id="${job.id}">Cancel Application</button>
      </div>
    `;
    appliedJobsContainer.appendChild(card);
  });

  document.querySelectorAll(".cancel-application-button").forEach((btn) => {
    btn.addEventListener("click", () => cancelApplication(btn.dataset.jobId));
  });
}

function unique(values) {
  return [...new Set(values)];
}

function getTargetSkills(role, jobDescription) {
  const baseSkills = roleSkills[role] || [];
  const allKnownSkills = unique(Object.values(roleSkills).flat());
  const jobSkills = allKnownSkills.filter((skill) => hasKeyword(jobDescription, skill));
  return unique([...baseSkills, ...jobSkills]);
}

function renderChips(container, values, emptyText) {
  container.innerHTML = "";
  if (!values.length) {
    const empty = document.createElement("span");
    empty.className = "chip";
    empty.textContent = emptyText;
    container.appendChild(empty);
    return;
  }

  values.forEach((value) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = value;
    container.appendChild(chip);
  });
}

function formatProgressBar({ label, value }) {
  return `
    <div class="progress-row">
      <span>${label}</span>
      <div class="progress-track">
        <div class="progress-fill" style="width: ${value}%"></div>
      </div>
      <strong>${value}%</strong>
    </div>
  `;
}

function buildATSBreakdown({ resume, targetSkills, matchedSkills }) {
  const skillCoverage = targetSkills.length ? Math.round((matchedSkills.length / targetSkills.length) * 100) : 0;
  const formattingScore = Math.min(
    100,
    55 + (/-|•|\*/.test(resume) ? 15 : 0) + (/experience|projects|education|skills/i.test(resume) ? 15 : 0) + (resume.length > 450 ? 15 : 0)
  );
  const experienceScore = /intern|experience|years|months|project/i.test(resume) ? 85 : 55;
  const keywordScore = skillCoverage;

  return [
    { label: "Skills", value: skillCoverage },
    { label: "Keywords", value: keywordScore },
    { label: "Experience", value: experienceScore },
    { label: "Formatting", value: formattingScore }
  ];
}

function calculateGapAnalysis({ targetSkills, matchedSkills }) {
  const missing = targetSkills.filter((skill) => !matchedSkills.includes(skill));
  const matchScore = targetSkills.length ? Math.round(((targetSkills.length - missing.length) / targetSkills.length) * 100) : 0;
  const priority = missing.slice(0, 5);
  return { missing, matchScore, priority };
}

function buildInterviewQuestions(resume, jobDescription) {
  const questions = [
    "Tell me about yourself and your experience relevant to this role.",
    `Why are you interested in ${roleSelect.options[roleSelect.selectedIndex].text}?`
  ];

  if (hasKeyword(resume, "sql") || hasKeyword(jobDescription, "sql")) {
    questions.push("Explain your SQL project and how you designed the database queries.");
  }

  if (hasKeyword(resume, "react") || hasKeyword(jobDescription, "react")) {
    questions.push("How did you manage state and component structure in your React work?");
  }

  if (hasKeyword(resume, "machine learning") || hasKeyword(jobDescription, "machine learning")) {
    questions.push("Describe a machine learning model you trained and how you evaluated it.");
  }

  if (hasKeyword(resume, "team") || hasKeyword(jobDescription, "collaborate")) {
    questions.push("Tell me about a time you worked with a team to solve a problem.");
  }

  return unique(questions).slice(0, 5);
}

function buildResumeFixes(resume) {
  const fixes = [];

  weakPhrases.forEach((entry) => {
    if (entry.check.test(resume)) {
      fixes.push(`Bad: ${entry.bad}`);
      fixes.push(`Better: ${entry.good}`);
    }
  });

  if (!fixes.length) {
    fixes.push("Use strong action verbs and measurable outcomes in your bullets.");
    fixes.push("Replace vague statements with specific project results and technology names.");
  }

  return fixes;
}

function buildSuggestions({ missing, actionVerbCount, resume }) {
  const tips = [];

  if (missing.length) {
    tips.push(`Missing important keywords: ${missing.slice(0, 5).join(", ")}. Add examples or projects that include those skills.`);
  }

  if (actionVerbCount < 4) {
    tips.push("Add more impact-driven verbs like developed, optimized, automated, or launched.");
  }

  if (!/\d+%|\d+\+|\d+ users|\d+ projects/i.test(resume)) {
    tips.push("Add measurable results such as percent improvements, project scale, or timelines.");
  }

  if (!/experience|projects|education|skills/i.test(resume)) {
    tips.push("Structure your resume with clear sections: Experience, Projects, Education, Skills.");
  }

  if (!tips.length) {
    tips.push("Your resume is strong. Polish it by mirroring the job description and quantifying every achievement.");
  }

  return tips;
}

function setStatus(message, type = "info") {
  aiStatus.textContent = message;
  aiStatus.dataset.type = type;
}

function setLoading(active) {
  globalLoader.classList.toggle("active", active);
  document.body.classList.toggle("busy", active);
}

function updateHeroScore(score, title = "Awaiting upload") {
  const normalized = Number.isFinite(score) ? Math.min(100, Math.max(0, score)) : 0;
  heroMatchRing.style.setProperty("--score-fill", normalized);
  document.querySelector("#heroScore").textContent = normalized;
  heroScoreTitle.textContent = title;
}

function updateResumePreview(fileName, text) {
  previewFileName.textContent = fileName || "No file uploaded";
  const previewText = text ? text.replace(/\s+/g, " ").trim().slice(0, 180) : "Drop a resume or paste your resume text to preview skills.";
  resumePreviewText.textContent = previewText || "Drop a resume or paste your resume text to preview skills.";
  const skillPreview = getTargetSkills(roleSelect.value, jobText.value.trim()).filter((skill) => hasKeyword(text, skill)).slice(0, 6);
  previewTags.innerHTML = skillPreview.length
    ? skillPreview.map((skill) => `<span class="chip">${skill}</span>`).join("")
    : `<span class="chip">No matched skills yet</span>`;
}

function renderHeroSkills() {
  const skills = getTargetSkills(roleSelect.value, jobText.value.trim()).slice(0, 8);
  heroSkillChips.innerHTML = skills.map((skill) => `<span class="chip">${skill}</span>`).join("");
}

function getColorFromName(name) {
  const palette = ["#225ea8", "#0f9f88", "#6f5dff", "#ea6d8a", "#2d8cf0", "#d98b4a"];
  let hash = 0;
  for (const char of name) {
    hash = (hash << 5) - hash + char.charCodeAt(0);
    hash |= 0;
  }
  return palette[Math.abs(hash) % palette.length];
}

function getCompanyInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-mode");
  themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
}

function setPage(page) {
  pageTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.page === page);
  });
  pagePanels.forEach((panel) => {
    const active = panel.id === `page-${page}`;
    panel.classList.toggle("active", active);
    if (active) {
      panel.classList.add("fade-in");
      window.setTimeout(() => panel.classList.remove("fade-in"), 320);
    }
  });
}

function updateDashboardCards(result) {
  document.querySelector("#scoreCard").textContent = `${result.score} / 100`;
  document.querySelector("#missingCard").textContent = result.missingSkills.length;
  document.querySelector("#opportunityCard").textContent = `${result.score}%`;
  const topMatch = activeJobs.reduce((max, job) => Math.max(max, calculateJobMatch(job)), 0);
  document.querySelector("#jobMatchCard").textContent = activeJobs.length;
  document.querySelector("#topMatchCard").textContent = `${topMatch}%`;
  document.querySelector("#jobCountCard").textContent = activeJobs.length;
}

function showAnalysisResult(result, source = "local") {
  const targetSkills = result.targetSkills || getTargetSkills(roleSelect.value, jobText.value.trim());
  const resume = resumeText.value.trim();
  const gap = calculateGapAnalysis({ targetSkills, matchedSkills: result.matchedSkills });

  score.textContent = result.score;
  verdict.textContent = result.verdict;
  summary.textContent = result.summary;
  matchedCount.textContent = result.matchedSkills.length;
  missingCount.textContent = gap.missing.length;
  actionCount.textContent = result.actionVerbCount;
  currentRoleLabel.textContent = roleSelect.options[roleSelect.selectedIndex].text;
  renderLivePulse(result);

  renderChips(matchedSkills, result.matchedSkills, "No matches yet");
  renderChips(missingSkills, result.missingSkills, "No missing skills");
  renderChips(gapMissing, gap.missing, "No skill gap");
  renderChips(gapPriority, gap.priority, "Priority skills will appear here");
  gapScore.textContent = `${gap.matchScore}%`;

  const breakdown = buildATSBreakdown({ resume, targetSkills, matchedSkills: result.matchedSkills });
  atsProgress.innerHTML = breakdown.map(formatProgressBar).join("");

  suggestions.innerHTML = "";
  result.suggestions.forEach((tip) => {
    const item = document.createElement("li");
    item.textContent = tip;
    suggestions.appendChild(item);
  });

  renderInterviewQuestions(resume, jobText.value.trim());
  renderResumeFixes(resume);
  renderRoadmap(roleSelect.value);

  renderJobs(activeJobs.length ? activeJobs : result.recommendedJobs);
  updateHeroScore(result.score, result.verdict);
  updateResumePreview(`Analysis result`, resume);
  renderHeroSkills();

  setStatus(source === "gemini" ? "AI analysis completed with Gemini." : "AI analysis completed.", source);
  updateDashboardCards(result);
}

function getLocalAnalysis() {
  const resume = resumeText.value.trim();
  const jobDescription = jobText.value.trim();
  const targetSkills = getTargetSkills(roleSelect.value, jobDescription);

  if (!resume) {
    throw new Error("Please paste your resume text first.");
  }

  const matched = targetSkills.filter((skill) => hasKeyword(resume, skill));
  const missing = targetSkills.filter((skill) => !hasKeyword(resume, skill));
  const verbsFound = actionVerbs.filter((verb) => hasKeyword(resume, verb));
  const keywordScore = targetSkills.length ? Math.round((matched.length / targetSkills.length) * 70) : 0;
  const actionScore = Math.min(15, verbsFound.length * 3);
  const lengthScore = resume.length > 650 ? 15 : resume.length > 350 ? 10 : 5;
  const finalScore = Math.min(100, keywordScore + actionScore + lengthScore);

  return {
    score: finalScore,
    verdict: finalScore >= 80 ? "Excellent match" : finalScore >= 60 ? "Good, but can improve" : "Needs stronger targeting",
    summary: `Your resume matches ${matched.length} of ${targetSkills.length} important keywords for this role.`,
    matchedSkills: matched,
    missingSkills: missing,
    actionVerbCount: verbsFound.length,
    suggestions: buildSuggestions({ missing, actionVerbCount: verbsFound.length, resume }),
    recommendedJobs: activeJobs,
    targetSkills
  };
}

async function analyzeResume() {
  const resume = resumeText.value.trim();
  if (!resume) {
    alert("Please paste your resume text first.");
    return;
  }

  analyzeButton.disabled = true;
  analyzeButton.textContent = "Analyzing...";
  setStatus("Sending for analysis...");
  console.log("[Analysis] Request started", {
    resumeLength: resume.length,
    role: roleSelect.value,
    jobDescriptionLength: jobText.value.trim().length
  });

  try {
    if (location.protocol === "file:") {
      throw new Error("AI mode requires the local Node server. Please open the app through http://localhost:8765.");
    }

    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resume,
        jobDescription: jobText.value.trim(),
        role: roleSelect.value
      })
    });

    const data = await response.json();
    console.log("[Analysis] API response received", { status: response.status, data });
    if (!response.ok) {
      throw new Error(data.error || "AI request failed.");
    }

    showAnalysisResult({
      ...data.analysis,
      targetSkills: data.analysis.targetSkills || getTargetSkills(roleSelect.value, jobText.value.trim()),
      recommendedJobs: data.analysis.recommendedJobs || activeJobs
    }, data.source);
    setStatus("Analysis complete", "gemini");
    console.log("[Analysis] Analysis rendered");
  } catch (error) {
    setStatus(`AI analysis failed: ${error.message}`, "warn");
    console.error("AI analysis failed:", error);
  } finally {
    analyzeButton.disabled = false;
    analyzeButton.textContent = "Analyze Resume";
  }
}

function calculateJobMatch(job) {
  const resume = resumeText.value.trim();
  if (!resume) return 0;
  if (!job.skills?.length) return 0;
  const matched = job.skills.filter((skill) => hasKeyword(resume, skill));
  return Math.round((matched.length / job.skills.length) * 100);
}

function renderJobs(sourceJobs = activeJobs) {
  const query = normalize(jobSearch.value);
  jobsContainer.innerHTML = "";

  const filteredJobs = sourceJobs
    .map((job) => ({ ...job, skills: job.skills?.length ? job.skills : [roleSelect.value], match: calculateJobMatch(job) }))
    .filter((job) =>
      normalize(`${job.title} ${job.company} ${job.location} ${job.portal} ${job.skills.join(" ")}`).includes(query)
    )
    .sort((a, b) => b.match - a.match);

  if (!filteredJobs.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No jobs match this search. Try a broader keyword or change the target role.";
    jobsContainer.appendChild(empty);
    return;
  }

  filteredJobs.forEach((job) => {
    const logoColor = getColorFromName(job.company);
    const companyInitials = getCompanyInitials(job.company);
    const card = document.createElement("article");
    card.className = "job-card";
    card.innerHTML = `
      <div class="job-card-brand">
        <span class="company-logo" style="background: ${logoColor};">${companyInitials}</span>
        <div>
          <h3>${job.title}</h3>
          <p>${job.company} · ${job.location}</p>
        </div>
      </div>
      <div class="job-meta">
        <span>${job.type}</span>
        <span>${job.match}% match</span>
        <span>${job.portal}</span>
        <span>${job.applicants === "Live" ? "Live posting" : `${job.applicants} applicants`}</span>
      </div>
      <p class="job-deadline">Deadline: <strong>${job.deadline}</strong></p>
      <div class="job-progress">
        <div class="job-progress-fill" style="width: ${job.match}%"></div>
      </div>
      <p class="job-link"><a href="${job.url}" target="_blank" rel="noopener noreferrer">View on ${job.portal}</a></p>
      <div class="job-actions">
        <button class="apply-button" data-job-id="${job.id}" ${appliedJobIds.has(job.id) ? "disabled" : ""}>
          ${appliedJobIds.has(job.id) ? "Applied" : "Apply"}
        </button>
      </div>
    `;
    jobsContainer.appendChild(card);
  });

  document.querySelectorAll(".apply-button").forEach((btn) => {
    btn.addEventListener("click", () => applyToJob(btn.dataset.jobId));
  });

  const topMatch = filteredJobs.length ? Math.max(...filteredJobs.map((job) => job.match)) : 0;
  document.querySelector("#topMatchCard").textContent = `${topMatch}%`;
  document.querySelector("#jobCountCard").textContent = filteredJobs.length;
  document.querySelector("#jobMatchCard").textContent = filteredJobs.length;
}

function getLiveJobQuery() {
  const typedQuery = jobSearch.value.trim();
  if (typedQuery) return typedQuery;
  const skills = roleSkills[roleSelect.value] || [];
  return [roleSelect.options[roleSelect.selectedIndex].text, ...skills.slice(0, 4)].join(" ");
}

async function loadLiveJobs() {
  if (location.protocol === "file:") {
    setStatus("Open through http://localhost:8765 to load live Remotive jobs.", "warn");
    activeJobs = [...jobs];
    renderJobs(activeJobs);
    return;
  }

  try {
    setStatus("Loading live jobs from Remotive...", "info");
    const response = await fetch(`/api/jobs?search=${encodeURIComponent(getLiveJobQuery())}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Could not load live jobs.");
    }

    activeJobs = data.jobs?.length ? data.jobs : [...jobs];
    lastJobSource = data.source || "remotive";
    renderJobs(activeJobs);
    renderAppliedJobs();
    setStatus(`Loaded ${activeJobs.length} live jobs from Remotive.`, "gemini");
  } catch (error) {
    activeJobs = [...jobs];
    lastJobSource = "sample";
    renderJobs(activeJobs);
    setStatus(`Live jobs unavailable: ${error.message}. Showing sample jobs.`, "warn");
  }
}

function renderRoadmap(role) {
  const roadmapContainer = document.querySelector("#roadmapCards");
  roadmapContainer.innerHTML = "";
  const roadmap = roadmapTemplates[role] || [];

  roadmap.forEach((item) => {
    const card = document.createElement("div");
    card.className = "roadmap-card";
    card.textContent = item;
    roadmapContainer.appendChild(card);
  });
}

function renderInterviewQuestions(resume, jobDescription) {
  const questionList = document.querySelector("#questionList");
  questionList.innerHTML = "";
  const questions = buildInterviewQuestions(resume, jobDescription);
  questions.forEach((question) => {
    const item = document.createElement("li");
    item.textContent = question;
    questionList.appendChild(item);
  });
}

function renderResumeFixes(resume) {
  const fixesBody = document.querySelector("#fixesList");
  fixesBody.innerHTML = "";
  const fixes = buildResumeFixes(resume);
  fixes.forEach((fix) => {
    const item = document.createElement("li");
    item.textContent = fix;
    fixesBody.appendChild(item);
  });
}

function setUploadStatus(message, type = "info") {
  uploadStatus.textContent = message;
  uploadStatus.className = `upload-status ${type}`;
}

async function canvasToBlob(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
}

async function extractPdfText(file) {
  console.log("[PDF] extractPdfText started", file.name);
  const pdfLib = await ensurePdfLib();
  console.log("[PDF] pdf.js library loaded", !!pdfLib);

  try {
    const arrayBuffer = await file.arrayBuffer();
    console.log("[PDF] FileReader completed for PDF arrayBuffer", { bytes: arrayBuffer.byteLength });
    const data = new Uint8Array(arrayBuffer);
    const loadingTask = pdfLib.getDocument({
      data,
      disableFontFace: true,
      useSystemFonts: true
    });
    const pdf = await loadingTask.promise;
    console.log("[PDF] PDF document loaded", { pages: pdf.numPages });
    const pages = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
      setUploadStatus(`Reading PDF page ${pageNum} of ${pdf.numPages}...`);
      console.log(`[PDF] Extracting page ${pageNum}/${pdf.numPages}`);
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const pageText = content.items.map((item) => item.str).join(" ");
      pages.push(pageText);
    }

    const result = pages.join("\n\n");
    console.log("[PDF] Extraction complete", { length: result.length });
    return result;
  } catch (error) {
    console.error("[PDF] PDF text extraction failed:", error);
    throw new Error("Could not extract text from PDF.");
  }
}

async function extractPdfImageText(file) {
  console.log("[PDF OCR] extractPdfImageText started", file.name);
  const pdfLib = await ensurePdfLib();
  if (typeof Tesseract === "undefined") {
    throw new Error("OCR library not loaded.");
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    console.log("[PDF OCR] FileReader completed for PDF arrayBuffer", { bytes: arrayBuffer.byteLength });
    const data = new Uint8Array(arrayBuffer);
    const loadingTask = pdfLib.getDocument({
      data,
      disableFontFace: true,
      useSystemFonts: true
    });
    const pdf = await loadingTask.promise;
    console.log("[PDF OCR] PDF document loaded", { pages: pdf.numPages });
    let extracted = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const context = canvas.getContext("2d");
      const renderContext = {
        canvasContext: context,
        viewport
      };
      await page.render(renderContext).promise;
      const blob = await canvasToBlob(canvas);
      setUploadStatus(`OCR scanning PDF page ${pageNum} of ${pdf.numPages}...`);
      console.log(` [PDF OCR] Rendering and OCR page ${pageNum}`);
      const result = await Tesseract.recognize(blob, "eng", {
        logger: (progress) => {
          setUploadStatus(`OCR scanning PDF page ${pageNum} of ${pdf.numPages}... (${Math.round(progress.progress * 100)}%)`);
        }
      });
      extracted += `${result.data.text}\n\n`;
    }

    console.log("[PDF OCR] OCR extraction complete", { length: extracted.length });
    return extracted;
  } catch (error) {
    console.error("[PDF OCR] PDF OCR failed:", error);
    throw new Error("Could not run OCR on PDF.");
  }
}

async function extractImageText(file) {
  try {
    if (typeof Tesseract === "undefined") {
      throw new Error("OCR library not loaded.");
    }
    console.log("[Image OCR] extractImageText started", file.name);
    setUploadStatus("Running OCR on image... Please wait.");
    const result = await Tesseract.recognize(file, "eng", {
      logger: (progress) => {
        setUploadStatus(`Running OCR on image... (${Math.round(progress.progress * 100)}%)`);
      }
    });
    console.log("[Image OCR] extracted text length", result.data.text.length);
    return result.data.text;
  } catch (error) {
    console.error("[Image OCR] Could not extract text from image.", error);
    throw new Error("Could not extract text from image.");
  }
}

async function extractAndPopulateResume(file) {
  const extension = file.name.split(".").pop()?.toLowerCase() || "";
  console.log("[Resume Upload] File selected", {
    name: file.name,
    type: file.type,
    size: file.size,
    extension
  });
  setUploadStatus(`File selected: ${file.name}`);
  setLoading(true);

  try {
    let text = "";

    if (["txt", "md"].includes(extension)) {
      console.log("[Resume Upload] Reading plain text file");
      setUploadStatus("Reading resume text file...");
      text = await file.text();
      console.log("[Resume Upload] FileReader completed", { length: text.length });
    } else if (extension === "pdf") {
      setUploadStatus("Reading PDF... Please wait.");
      console.log("[Resume Upload] PDF selected, starting extraction");
      try {
        text = await extractPdfText(file);
      } catch (error) {
        console.warn("[Resume Upload] PDF text extraction failed, falling back to OCR", error);
        setUploadStatus("PDF extraction failed, trying OCR fallback...");
        text = "";
      }
      if (!text.trim() || text.trim().length < 40) {
        setUploadStatus("Extracting text from PDF using OCR...");
        console.log("[Resume Upload] OCR fallback starting for PDF");
        text = await extractPdfImageText(file);
      }
    } else if (["png", "jpg", "jpeg", "gif", "bmp", "webp"].includes(extension)) {
      setUploadStatus("Extracting text from image... Please wait.");
      console.log("[Resume Upload] Image file selected, starting OCR");
      text = await extractImageText(file);
    } else {
      setUploadStatus("Reading unsupported file type as text...");
      console.log("[Resume Upload] Unsupported file type, attempting generic text read", extension);
      text = await file.text();
      console.log("[Resume Upload] Generic FileReader completed", { length: text.length });
      if (!text.trim()) {
        throw new Error("This file format is not directly supported for text extraction yet.");
      }
    }

    const trimmed = text.trim();
    resumeText.value = trimmed;
    updateResumePreview(file.name, trimmed);
    updateHeroScore(0, `Resume loaded: ${file.name}`);
    renderHeroSkills();

    if (trimmed.length) {
      console.log("[Resume Upload] Extracted text length", trimmed.length);
      setUploadStatus(`Extracted ${trimmed.length} characters from ${file.name}.`,'success');
      return trimmed;
    }

    throw new Error("Extraction completed but no text was found.");
  } catch (error) {
    console.error("[Resume Upload] Extraction failed", error);
    setUploadStatus(error.message, "error");
    alert(`${error.message} Please paste your resume text manually if extraction fails.`);
  } finally {
    setLoading(false);
  }
}

async function handleFileUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  console.log("[Resume Upload] file input change event fired");
  await extractAndPopulateResume(file);
  event.target.value = "";
}

async function handleDroppedFile(file) {
  console.log("[Resume Upload] file dropped", file.name, file.type, file.size);
  await extractAndPopulateResume(file);
}

resumeUpload.addEventListener("change", handleFileUpload);
resumeDropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  resumeDropZone.classList.add("drag-over");
});
resumeDropZone.addEventListener("dragleave", () => {
  resumeDropZone.classList.remove("drag-over");
});
resumeDropZone.addEventListener("drop", async (event) => {
  event.preventDefault();
  resumeDropZone.classList.remove("drag-over");
  const file = event.dataTransfer?.files?.[0];
  if (file) {
    await handleDroppedFile(file);
  }
});

resumeDropZone.addEventListener("click", () => resumeUpload.click());
browseBtn.addEventListener("click", () => resumeUpload.click());

document.querySelector("#resumeForm").addEventListener("submit", (event) => {
  event.preventDefault();
  analyzeResume();
});

document.querySelector("#demoBtn").addEventListener("click", () => {
  resumeText.value = demoResume;
  jobText.value = demoJob;
  roleSelect.value = "frontend";
  analyzeResume();
});

fixButton.addEventListener("click", () => {
  const resume = resumeText.value.trim();
  if (!resume) {
    alert("Paste your resume first to generate AI resume fixes.");
    return;
  }
  renderResumeFixes(resume);
});

interviewButton.addEventListener("click", () => {
  const resume = resumeText.value.trim();
  if (!resume) {
    alert("Paste your resume first to generate interview prep questions.");
    return;
  }
  renderInterviewQuestions(resume, jobText.value.trim());
});

roadmapButton.addEventListener("click", () => {
  renderRoadmap(roleSelect.value);
  setPage("roadmap");
});

roleSelect.addEventListener("change", () => {
  currentRoleLabel.textContent = roleSelect.options[roleSelect.selectedIndex].text;
  renderRoadmap(roleSelect.value);
  renderHeroSkills();
  loadLiveJobs();
});

jobText.addEventListener("input", renderHeroSkills);
themeToggle.addEventListener("click", toggleTheme);

pageTabs.forEach((tab) => {
  tab.addEventListener("click", () => setPage(tab.dataset.page));
});

jobSearch.addEventListener("input", renderJobs);
loadLiveJobs();
renderAppliedJobs();
renderHeroSkills();
updateResumePreview();

if (window.motion) {
  motion.animate(
    ".hero-preview-card, .hero-card, .page-tab, .upload-widget, .job-card, .panel-card",
    { opacity: [0, 1], y: [20, 0] },
    { duration: 0.68, easing: "ease-out", delay: 0.08, stagger: 0.05 }
  );
}

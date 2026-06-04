# Resume AI Backend

This backend powers the Resume Analyzer and Job Finder project.

## What It Does

- Creates a Node.js HTTP server
- Serves the frontend files
- Provides the `/api/analyze` API endpoint
- Sends resume text, job description, and target role to Gemini
- Returns structured JSON for:
  - ATS score
  - Verdict
  - Matched skills
  - Missing skills
  - Suggestions
  - Recommended jobs

## Main API Route

```text
POST /api/analyze
```

Request body:

```json
{
  "resume": "Resume text here",
  "jobDescription": "Job description here",
  "role": "Frontend Developer"
}
```

Response body:

```json
{
  "source": "gemini",
  "analysis": {
    "score": 85,
    "verdict": "Strong candidate",
    "summary": "Short AI summary",
    "matchedSkills": ["React", "JavaScript"],
    "missingSkills": ["TypeScript"],
    "actionVerbCount": 4,
    "suggestions": ["Add TypeScript project experience."],
    "recommendedJobs": []
  }
}
```

## How To Run In VS Code

Open this project folder in VS Code:

```text
C:\Users\ROG\Documents\Codex\2026-06-01\i-want-to-build-a-project\outputs\resume-ai-job-finder
```

Then open the terminal and run:

```powershell
cd backend
$env:GEMINI_API_KEY="your_gemini_api_key"
$env:GEMINI_MODEL="gemini-3.1-flash-lite"
npm start
```

Open the app:

```text
http://localhost:8765
```

## Important

Do not paste your Gemini API key directly into `server.js`.
Use environment variables so the key stays private.

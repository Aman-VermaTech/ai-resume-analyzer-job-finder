# Resume AI Analyzer & Job Finder

A beginner-friendly AI project starter that analyzes a resume against a target job description and recommends matching jobs.

## Main Features

- Resume keyword and skill matching
- ATS-style score
- Missing keyword detection
- Resume improvement suggestions
- Live remote job finder powered by Remotive
- Demo data for quick testing

## How To Run Offline

Open `index.html` in any browser.

No backend or installation is required for the starter demo. In this mode, the app uses local keyword logic.

## How To Run With Real AI

From the project root, start the server with:

```powershell
npm start
```

Set your Gemini API key first:

```powershell
$env:GEMINI_API_KEY="your_api_key_here"
```

Then start the Node server:

```powershell
$env:GEMINI_API_KEY="your_api_key_here"
node server.js
```

On this Codex workspace, you can also run:

```powershell
.\run-ai-server.ps1
```

Open:

```text
http://localhost:8765
```

The frontend calls `/api/analyze`, and `server.js` sends this data to the Gemini `generateContent` API when `GEMINI_API_KEY` is set.

If Gemini is not configured or unavailable, the app gracefully falls back to local resume scoring logic.

The backend currently requires:

- `GEMINI_API_KEY` environment variable
- Optional `GEMINI_MODEL` environment variable (default: `gemini-3.1-flash-lite`)

The AI returns structured JSON containing:

- ATS-style score
- Verdict and summary
- Matched skills
- Missing skills
- Suggestions
- Recommended jobs

## Live Jobs

The app calls this backend route for current remote job listings:

```text
GET /api/jobs?search=frontend
```

The backend fetches jobs from the free Remotive public API and converts them into the same card format used by the Recommended Jobs page.

You can change the model with:

```powershell
$env:GEMINI_MODEL="gemini-3.1-flash-lite"
```

If Gemini returns a model-not-found error, use one of the official model IDs from Google AI Studio, such as:

```powershell
$env:GEMINI_MODEL="gemini-2.5-flash-lite"
```

## Suggested Tech Upgrade

For a final-year or portfolio version, convert this into:

- Frontend: React
- Backend: Node.js and Express
- Database: MongoDB
- AI: Gemini API or another LLM provider
- Job search: Adzuna, Jooble, or LinkedIn-style scraped/mock data

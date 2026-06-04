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

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ error: "Method not allowed." }));
    return;
  }

  try {
    const requestUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const search = requestUrl.searchParams.get("search") || requestUrl.searchParams.get("role") || "software developer";
    const apiResponse = await fetch(`https://remotive.com/api/remote-jobs?search=${encodeURIComponent(search)}`);
    const payload = await apiResponse.json();

    if (!apiResponse.ok) {
      throw new Error(payload.message || "Remotive jobs request failed.");
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ source: "remotive", jobs: (payload.jobs || []).slice(0, 20).map(mapRemotiveJob) }));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ error: error.message }));
  }
};

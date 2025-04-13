import { useState } from "react";

const Repositories = ({ repos }) => {
  const [sortBy, setSortBy] = useState("stars");
  const [languageFilter, setLanguageFilter] = useState("all");

  const languages = [
    "all",
    ...new Set(repos.map((repo) => repo.language).filter(Boolean)),
  ];

  const sortedRepos = [...repos].sort((a, b) => {
    if (sortBy === "stars") return b.stargazers_count - a.stargazers_count;
    if (sortBy === "forks") return b.forks_count - a.forks_count;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const filteredRepos = sortedRepos.filter(
    (repo) => languageFilter === "all" || repo.language === languageFilter
  );

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold">10 Recent Repositories</h2>

        <div className="flex gap-4">
          <div>
            <label htmlFor="sort" className="mr-2">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 rounded border"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-color)",
                color: "var(--text-color)",
              }}
            >
              <option value="stars">Stars</option>
              <option value="forks">Forks</option>
              <option value="name">Name</option>
            </select>
          </div>

          <div>
            <label htmlFor="language" className="mr-2">
              Language:
            </label>
            <select
              id="language"
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="px-3 py-1 rounded border"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-color)",
                color: "var(--text-color)",
              }}
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredRepos.length > 0 ? (
          filteredRepos.map((repo) => (
            <div
              key={repo.id}
              className="p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              style={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--border-color)",
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      style={{ color: "var(--primary-color)" }}
                    >
                      {repo.name}
                    </a>
                  </h3>
                  {repo.description && (
                    <p className="text-gray-500 mb-2">{repo.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    ⭐ {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    🍴 {repo.forks_count}
                  </span>
                </div>
              </div>

              {repo.language && (
                <div className="mt-2">
                  <span
                    className="inline-block px-2 py-1 text-xs rounded-full"
                    style={{
                      backgroundColor: "var(--secondary-color)",
                      color: "var(--text-color)",
                    }}
                  >
                    {repo.language}
                  </span>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No repositories found</p>
        )}
      </div>
    </div>
  );
};

export default Repositories;

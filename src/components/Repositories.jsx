import { useState, useMemo } from "react";
import { FaStar, FaCodeBranch, FaExclamationCircle, FaCalendarAlt, FaFilter, FaSort } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

const Repositories = ({ repos, username }) => {
  const [sortBy, setSortBy] = useState("stars");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const languages = useMemo(() => {
    const langSet = new Set(repos.map((repo) => repo.language).filter(Boolean));
    return ["all", ...Array.from(langSet).sort()];
  }, [repos]);

  const languageColors = {
    JavaScript: "#f1e05a",
    TypeScript: "#2b7489",
    Python: "#3572A5",
    Java: "#b07219",
    Go: "#00ADD8",
    Rust: "#dea584",
    Ruby: "#701516",
    PHP: "#4F5D95",
    Swift: "#FA7343",
    Kotlin: "#A97BFF",
    "C++": "#f34b7d",
    C: "#555555",
    "C#": "#178600",
    Shell: "#89e051",
    HTML: "#e34c26",
    CSS: "#563d7c",
  };

  const processedRepos = useMemo(() => {
    let filtered = [...repos];
    
    if (searchTerm) {
      filtered = filtered.filter(repo => 
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        repo.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (languageFilter !== "all") {
      filtered = filtered.filter(repo => repo.language === languageFilter);
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "stars":
          return b.stargazers_count - a.stargazers_count;
        case "forks":
          return b.forks_count - a.forks_count;
        case "updated":
          return new Date(b.updated_at) - new Date(a.updated_at);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [repos, sortBy, languageFilter, searchTerm]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

  return (
    <div className="animate-fadeIn">
      <div className="card-modern p-6 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
              Repositories
            </h2>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {username} has {repos.length} public repositories • {totalStars} total stars • {totalForks} total forks
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-lg border flex-1 lg:flex-initial lg:w-48 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: "var(--bg-tertiary)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
            />
            
            <div className="relative">
              <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border appearance-none cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundColor: "var(--bg-tertiary)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                <option value="stars">Most Stars</option>
                <option value="forks">Most Forks</option>
                <option value="updated">Recently Updated</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>

            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border appearance-none cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundColor: "var(--bg-tertiary)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang === "all" ? "All Languages" : lang}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {processedRepos.length > 0 ? (
          processedRepos.map((repo) => (
            <div
              key={repo.id}
              className="card-modern p-5 group"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-500 transition-colors flex items-center gap-2 group"
                      style={{ color: "var(--accent-primary)" }}
                    >
                      {repo.name}
                      <FiExternalLink className="opacity-0 group-hover:opacity-100 transition-opacity" size={14} />
                    </a>
                    {repo.fork && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                        Fork
                      </span>
                    )}
                  </h3>
                  
                  {repo.description && (
                    <p className="text-sm mb-3 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                      {repo.description}
                    </p>
                  )}

                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {repo.topics.slice(0, 3).map(topic => (
                        <span
                          key={topic}
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: "var(--accent-light)",
                            color: "var(--accent-primary)",
                          }}
                        >
                          {topic}
                        </span>
                      ))}
                      {repo.topics.length > 3 && (
                        <span className="text-xs px-2 py-1" style={{ color: "var(--text-muted)" }}>
                          +{repo.topics.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: languageColors[repo.language] || "#8b949e" }}
                      />
                      <span style={{ color: "var(--text-secondary)" }}>{repo.language}</span>
                    </div>
                  )}
                  
                  <a
                    href={`${repo.html_url}/stargazers`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-yellow-500 transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <FaStar />
                    <span>{repo.stargazers_count.toLocaleString()}</span>
                  </a>
                  
                  <a
                    href={`${repo.html_url}/network/members`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <FaCodeBranch />
                    <span>{repo.forks_count.toLocaleString()}</span>
                  </a>

                  {repo.open_issues_count > 0 && (
                    <a
                      href={`${repo.html_url}/issues`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-red-500 transition-colors"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <FaExclamationCircle />
                      <span>{repo.open_issues_count}</span>
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                  <FaCalendarAlt size={10} />
                  <span>{formatDate(repo.updated_at)}</span>
                </div>
              </div>

              {repo.license && (
                <div className="mt-3 pt-3 border-t" style={{ borderColor: "var(--border-color)" }}>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {repo.license.name}
                  </span>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <FaCodeBranch className="text-2xl text-gray-400" />
            </div>
            <p className="text-lg font-medium mb-2" style={{ color: "var(--text-primary)" }}>
              No repositories found
            </p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {searchTerm ? "Try adjusting your search or filters" : "This user doesn't have any public repositories yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Repositories;
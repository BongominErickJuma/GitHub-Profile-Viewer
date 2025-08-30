import { useState, useEffect, useCallback, useMemo } from "react";
import SearchBar from "./components/SearchBar";
import UserProfile from "./components/UserProfile";
import useLocalStorage from "./hooks/useLocalStorage";
import Repositories from "./components/Repositories";
import SearchHistory from "./components/SearchHistory";
import ThemeToggle from "./components/ThemeToggle";
import LoadingSpinner from "./components/LoadingSpinner";
import { fetchUserData, fetchUserRepos } from "./utils/api";
import "./index.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useLocalStorage("searchHistory", []);
  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", theme === "light" ? "#2563eb" : "#3b82f6");
    }
  }, [theme]);

  const updateSearchHistory = useCallback((username) => {
    setSearchHistory((prev) => {
      const filtered = prev.filter((item) => item !== username);
      return [username, ...filtered].slice(0, 10);
    });
  }, [setSearchHistory]);

  const handleSearch = useCallback(async (searchUsername) => {
    const trimmedUsername = searchUsername?.trim();
    if (!trimmedUsername) {
      setError("Please enter a GitHub username");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [userResponse, reposResponse] = await Promise.allSettled([
        fetchUserData(trimmedUsername),
        fetchUserRepos(trimmedUsername),
      ]);

      if (userResponse.status === "rejected") {
        throw new Error(userResponse.reason?.message || "Failed to fetch user data");
      }

      setUserData(userResponse.value);
      setRepos(reposResponse.status === "fulfilled" ? reposResponse.value : []);
      updateSearchHistory(trimmedUsername);
    } catch (err) {
      const errorMessage = err.response?.status === 404
        ? `User "${trimmedUsername}" not found`
        : err.message || "An unexpected error occurred";
      
      setError(errorMessage);
      setUserData(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  }, [updateSearchHistory]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => prevTheme === "light" ? "dark" : "light");
  }, [setTheme]);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
  }, [setSearchHistory]);

  const hasContent = useMemo(() => userData || error || loading, [userData, error, loading]);

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-10 animate-fadeIn">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                GitHub Profile Viewer
              </h1>
              <p className="text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
                Explore developer profiles and repositories for recruiting
              </p>
            </div>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </header>

        <div className="space-y-6">
          <SearchBar
            username={username}
            setUsername={setUsername}
            onSearch={handleSearch}
            loading={loading}
          />

          {searchHistory.length > 0 && (
            <SearchHistory 
              history={searchHistory} 
              onSelect={handleSearch}
              onClear={clearHistory}
            />
          )}

          {loading && (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          )}

          {error && (
            <div className="card-modern p-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 animate-fadeIn">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <p className="text-red-800 dark:text-red-200 font-medium">{error}</p>
              </div>
            </div>
          )}

          {userData && !loading && (
            <div className="grid gap-8 lg:grid-cols-3 animate-fadeIn">
              <div className="lg:col-span-1">
                <UserProfile userData={userData} />
              </div>
              <div className="lg:col-span-2">
                <Repositories repos={repos} username={userData.login} />
              </div>
            </div>
          )}

          {!hasContent && (
            <div className="text-center py-16 animate-fadeIn">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                Start Exploring GitHub Profiles
              </h2>
              <p style={{ color: "var(--text-secondary)" }}>
                Enter a GitHub username above to view their profile and repositories
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
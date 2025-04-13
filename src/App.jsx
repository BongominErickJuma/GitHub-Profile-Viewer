// src/App.jsx
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import UserProfile from "./components/UserProfile";
import useLocalStorage from "./hooks/useLocalStorage"; // Correct import path
import Repositories from "./components/Repositories";
import SearchHistory from "./components/SearchHistory";
import ThemeToggle from "./components/ThemeToggle";
import LoadingSpinner from "./components/LoadingSpinner";
import { fetchUserData, fetchUserRepos } from "./utils/api";
import "./index.css";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useLocalStorage(
    "searchHistory",
    []
  );
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleSearch = async (username) => {
    if (!username) return;

    setLoading(true);
    setError(null);

    try {
      const [user, repos] = await Promise.all([
        fetchUserData(username),
        fetchUserRepos(username),
      ]);

      setUserData(user);
      setRepos(repos);
      updateSearchHistory(username);
    } catch (err) {
      setError(err.message);
      setUserData(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  const updateSearchHistory = (username) => {
    setSearchHistory((prev) => {
      const newHistory = [
        username,
        ...prev.filter((item) => item !== username),
      ].slice(0, 5);
      return newHistory;
    });
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            GitHub Profile Viewer
          </h1>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>

        <SearchBar
          username={username}
          setUsername={setUsername}
          onSearch={handleSearch}
        />

        {searchHistory.length > 0 && (
          <SearchHistory history={searchHistory} onSelect={handleSearch} />
        )}

        {loading && <LoadingSpinner />}

        {error && (
          <div className="p-4 mb-6 rounded-lg bg-red-100 text-red-800">
            {error}
          </div>
        )}

        {userData && (
          <div className="grid gap-8 md:grid-cols-3 mt-8">
            <div className="md:col-span-1">
              <UserProfile userData={userData} />
            </div>
            <div className="md:col-span-2">
              <Repositories repos={repos} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

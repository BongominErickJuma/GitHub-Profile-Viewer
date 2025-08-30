import { useState, useRef, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = ({ username, setUsername, onSearch, loading }) => {
  const [inputValue, setInputValue] = useState(username);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue(username);
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setUsername(inputValue.trim());
      onSearch(inputValue.trim());
    }
  };

  const handleClear = () => {
    setInputValue("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleClear();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`relative transition-all duration-300 ${isFocused ? "scale-[1.02]" : ""}`}>
        <div className="relative flex items-center">
          <div className="absolute left-4 pointer-events-none">
            <FaSearch 
              className={`transition-colors duration-200 ${
                isFocused ? "text-blue-500" : "text-gray-400"
              }`} 
            />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="Enter GitHub username (e.g., torvalds, gaearon)"
            className="w-full pl-12 pr-32 py-4 text-lg rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 card-modern"
            style={{
              backgroundColor: "var(--card-bg)",
              borderColor: isFocused ? "var(--accent-primary)" : "var(--border-color)",
              color: "var(--text-primary)",
            }}
            disabled={loading}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />

          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-28 p-2 rounded-lg transition-all duration-150 hover:bg-gray-200 dark:hover:bg-gray-700"
              style={{ color: "var(--text-muted)" }}
            >
              <FaTimes />
            </button>
          )}

          <button
            type="submit"
            disabled={loading || !inputValue.trim()}
            className={`absolute right-2 px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
              loading || !inputValue.trim()
                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                : "btn-primary"
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                    fill="none"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading
              </span>
            ) : (
              "Search"
            )}
          </button>
        </div>

        {isFocused && (
          <div className="absolute top-full mt-2 text-xs text-gray-500 dark:text-gray-400 animate-fadeIn">
            Press <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Enter</kbd> to search or <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Esc</kbd> to clear
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
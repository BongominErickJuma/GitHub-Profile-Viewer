import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = ({ theme, toggleTheme }) => {
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="relative p-3 rounded-full transition-all duration-300 hover:scale-110 group"
      style={{
        backgroundColor: isDark ? "var(--bg-tertiary)" : "var(--accent-light)",
        border: `2px solid ${isDark ? "var(--border-color)" : "var(--accent-primary)"}`,
      }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <FaSun
          className={`absolute transition-all duration-300 ${
            isDark ? "opacity-0 rotate-180 scale-0" : "opacity-100 rotate-0 scale-100"
          }`}
          style={{ color: "var(--accent-primary)" }}
          size={20}
        />
        <FaMoon
          className={`absolute transition-all duration-300 ${
            isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-0"
          }`}
          style={{ color: "var(--text-primary)" }}
          size={18}
        />
      </div>
      
      <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-blue-400 dark:group-hover:border-blue-500 transition-all duration-300 animate-pulse" />
    </button>
  );
};

export default ThemeToggle;
const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg"
      style={{
        backgroundColor: "var(--secondary-color)",
        color: "var(--text-color)",
      }}
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;

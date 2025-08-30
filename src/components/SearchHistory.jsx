import { FaHistory, FaTimes, FaClock } from "react-icons/fa";

const SearchHistory = ({ history, onSelect, onClear }) => {
  if (history.length === 0) return null;

  return (
    <div className="card-modern p-4 animate-fadeIn">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FaHistory className="text-blue-500" />
          <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>
            Recent Searches
          </h3>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ 
            backgroundColor: "var(--accent-light)",
            color: "var(--accent-primary)"
          }}>
            {history.length}
          </span>
        </div>
        
        {onClear && (
          <button
            onClick={onClear}
            className="text-sm flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            style={{ color: "var(--text-muted)" }}
            title="Clear history"
          >
            <FaTimes />
            <span>Clear</span>
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {history.map((username, index) => (
          <button
            key={`${username}-${index}`}
            onClick={() => onSelect(username)}
            className="group relative px-4 py-2 text-sm rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md flex items-center gap-2"
            style={{
              backgroundColor: "var(--bg-tertiary)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-color)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--accent-light)";
              e.currentTarget.style.borderColor = "var(--accent-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--bg-tertiary)";
              e.currentTarget.style.borderColor = "var(--border-color)";
            }}
          >
            <FaClock size={12} className="opacity-50" />
            <span className="font-medium">{username}</span>
            
            {index === 0 && (
              <span className="absolute -top-2 -right-2 text-xs px-1.5 py-0.5 bg-green-500 text-white rounded-full font-semibold">
                Latest
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
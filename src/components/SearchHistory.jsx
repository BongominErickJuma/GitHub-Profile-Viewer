const SearchHistory = ({ history, onSelect }) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-500 mb-2">
        Recent searches:
      </h3>
      <div className="flex flex-wrap gap-2">
        {history.map((username, index) => (
          <button
            key={index}
            onClick={() => onSelect(username)}
            className="px-3 py-1 text-sm rounded-full hover:bg-blue-100 transition-colors"
            style={{
              backgroundColor: "var(--secondary-color)",
              color: "var(--text-color)",
            }}
          >
            {username}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;

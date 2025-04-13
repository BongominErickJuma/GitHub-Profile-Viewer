const UserProfile = ({ userData }) => {
  return (
    <div
      className="p-6 rounded-lg shadow-md sticky top-4"
      style={{
        backgroundColor: "var(--card-bg)",
        border: "1px solid var(--border-color)",
      }}
    >
      <div className="flex flex-col items-center mb-4">
        <img
          src={userData.avatar_url}
          alt={`${userData.login}'s avatar`}
          className="w-32 h-32 rounded-full mb-4"
        />
        <h2 className="text-xl font-bold text-center">
          {userData.name || userData.login}
        </h2>
        {userData.name && <p className="text-gray-500">@{userData.login}</p>}
      </div>

      {userData.bio && (
        <p className="mb-4 italic text-center">{userData.bio}</p>
      )}

      <div className="space-y-2">
        {userData.location && (
          <div className="flex items-center">
            <span className="mr-2">📍</span>
            <span>{userData.location}</span>
          </div>
        )}

        <div className="flex justify-between">
          <div className="flex items-center">
            <span className="mr-2">👥</span>
            <span>{userData.followers} followers</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">🤝</span>
            <span>{userData.following} following</span>
          </div>
        </div>
      </div>

      <a
        href={userData.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block text-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        View on GitHub
      </a>
    </div>
  );
};

export default UserProfile;

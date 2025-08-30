import { FaMapMarkerAlt, FaBuilding, FaLink, FaTwitter, FaEnvelope, FaUsers, FaUserFriends, FaBook, FaStar } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

const UserProfile = ({ userData }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const joinDate = new Date(userData.created_at).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="card-modern p-6 sticky top-4 animate-slideIn">
      <div className="flex flex-col items-center">
        <div className="relative group mb-4">
          <img
            src={userData.avatar_url}
            alt={`${userData.login}'s avatar`}
            className="w-32 h-32 rounded-full ring-4 ring-offset-2 ring-blue-500/20 transition-transform duration-300 group-hover:scale-105"
          />
          {userData.hireable && (
            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold animate-pulse">
              Available for hire
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold text-center" style={{ color: "var(--text-primary)" }}>
          {userData.name || userData.login}
        </h2>
        
        {userData.name && (
          <p className="text-lg" style={{ color: "var(--text-muted)" }}>
            @{userData.login}
          </p>
        )}

        {userData.bio && (
          <p className="mt-3 text-center italic" style={{ color: "var(--text-secondary)" }}>
            "{userData.bio}"
          </p>
        )}

        <div className="flex gap-6 mt-4 pb-4 border-b" style={{ borderColor: "var(--border-color)" }}>
          <div className="text-center">
            <div className="flex items-center gap-1">
              <FaUsers className="text-blue-500" />
              <span className="font-bold text-lg">{formatNumber(userData.followers)}</span>
            </div>
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>Followers</span>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1">
              <FaUserFriends className="text-green-500" />
              <span className="font-bold text-lg">{formatNumber(userData.following)}</span>
            </div>
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>Following</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mt-4">
        {userData.company && (
          <div className="flex items-center gap-3">
            <FaBuilding className="flex-shrink-0" style={{ color: "var(--text-muted)" }} />
            <span style={{ color: "var(--text-secondary)" }}>{userData.company}</span>
          </div>
        )}

        {userData.location && (
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="flex-shrink-0" style={{ color: "var(--text-muted)" }} />
            <span style={{ color: "var(--text-secondary)" }}>{userData.location}</span>
          </div>
        )}

        {userData.email && (
          <div className="flex items-center gap-3">
            <FaEnvelope className="flex-shrink-0" style={{ color: "var(--text-muted)" }} />
            <a
              href={`mailto:${userData.email}`}
              className="hover:text-blue-500 transition-colors truncate"
              style={{ color: "var(--text-secondary)" }}
            >
              {userData.email}
            </a>
          </div>
        )}

        {userData.blog && (
          <div className="flex items-center gap-3">
            <FaLink className="flex-shrink-0" style={{ color: "var(--text-muted)" }} />
            <a
              href={userData.blog.startsWith("http") ? userData.blog : `https://${userData.blog}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors truncate"
              style={{ color: "var(--text-secondary)" }}
            >
              {userData.blog}
            </a>
          </div>
        )}

        {userData.twitter_username && (
          <div className="flex items-center gap-3">
            <FaTwitter className="flex-shrink-0" style={{ color: "var(--text-muted)" }} />
            <a
              href={`https://twitter.com/${userData.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              @{userData.twitter_username}
            </a>
          </div>
        )}

        <div className="pt-3 space-y-2 border-t" style={{ borderColor: "var(--border-color)" }}>
          <div className="flex justify-between">
            <span className="flex items-center gap-2">
              <FaBook style={{ color: "var(--text-muted)" }} />
              <span style={{ color: "var(--text-secondary)" }}>Public Repos</span>
            </span>
            <span className="font-semibold">{userData.public_repos}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="flex items-center gap-2">
              <FaStar style={{ color: "var(--text-muted)" }} />
              <span style={{ color: "var(--text-secondary)" }}>Public Gists</span>
            </span>
            <span className="font-semibold">{userData.public_gists}</span>
          </div>

          <div className="text-sm pt-2" style={{ color: "var(--text-muted)" }}>
            Member since {joinDate}
          </div>
        </div>
      </div>

      <a
        href={userData.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 w-full btn-primary flex items-center justify-center gap-2 group"
      >
        View on GitHub
        <FiExternalLink className="transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  );
};

export default UserProfile;
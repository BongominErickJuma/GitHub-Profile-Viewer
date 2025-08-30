import { FaGithub } from "react-icons/fa";

const LoadingSpinner = ({ size = "large", message = "Loading GitHub profile..." }) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 animate-fadeIn">
      <div className="relative mb-4">
        <div
          className={`${sizeClasses[size]} border-4 rounded-full animate-spin`}
          style={{
            borderColor: "var(--border-color)",
            borderTopColor: "var(--accent-primary)",
            borderRightColor: "var(--accent-primary)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <FaGithub
            className="animate-pulse"
            style={{ color: "var(--accent-primary)" }}
            size={size === "large" ? 20 : size === "medium" ? 14 : 10}
          />
        </div>
      </div>
      
      {message && (
        <p className="text-sm font-medium animate-pulse" style={{ color: "var(--text-secondary)" }}>
          {message}
        </p>
      )}

      <div className="flex gap-1 mt-3">
        <div
          className="w-2 h-2 rounded-full animate-bounce"
          style={{
            backgroundColor: "var(--accent-primary)",
            animationDelay: "0ms",
          }}
        />
        <div
          className="w-2 h-2 rounded-full animate-bounce"
          style={{
            backgroundColor: "var(--accent-primary)",
            animationDelay: "150ms",
          }}
        />
        <div
          className="w-2 h-2 rounded-full animate-bounce"
          style={{
            backgroundColor: "var(--accent-primary)",
            animationDelay: "300ms",
          }}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
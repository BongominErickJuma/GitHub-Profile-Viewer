const BASE_URL = "https://api.github.com";

class GitHubAPIError extends Error {
  constructor(message, status, response) {
    super(message);
    this.name = "GitHubAPIError";
    this.status = status;
    this.response = response;
  }
}

const handleResponse = async (response, errorMessage = "Request failed") => {
  if (!response.ok) {
    let errorMsg = errorMessage;
    
    try {
      const errorData = await response.json();
      errorMsg = errorData.message || errorMsg;
    } catch {
      // Fallback if response body is not JSON
    }

    throw new GitHubAPIError(
      errorMsg,
      response.status,
      response
    );
  }

  return response.json();
};

export const fetchUserData = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${encodeURIComponent(username)}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GitHub-Profile-Viewer'
      }
    });

    return await handleResponse(
      response,
      response.status === 404 ? `User "${username}" not found` : "Failed to fetch user data"
    );
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("Network error: Unable to connect to GitHub API. Please check your internet connection.");
    }
    
    throw new Error("An unexpected error occurred while fetching user data");
  }
};

export const fetchUserRepos = async (username, options = {}) => {
  const {
    sort = "updated",
    direction = "desc",
    per_page = 30,
    page = 1,
    type = "public"
  } = options;

  try {
    const params = new URLSearchParams({
      sort,
      direction,
      per_page: Math.min(per_page, 100).toString(),
      page: page.toString(),
      type
    });

    const response = await fetch(
      `${BASE_URL}/users/${encodeURIComponent(username)}/repos?${params}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'GitHub-Profile-Viewer'
        }
      }
    );

    return await handleResponse(response, "Failed to fetch repositories");
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("Network error: Unable to connect to GitHub API. Please check your internet connection.");
    }
    
    throw new Error("An unexpected error occurred while fetching repositories");
  }
};

export const fetchUserGists = async (username, per_page = 10) => {
  try {
    const response = await fetch(
      `${BASE_URL}/users/${encodeURIComponent(username)}/gists?per_page=${per_page}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'GitHub-Profile-Viewer'
        }
      }
    );

    return await handleResponse(response, "Failed to fetch gists");
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    
    throw new Error("An unexpected error occurred while fetching gists");
  }
};

export const searchUsers = async (query, per_page = 10) => {
  try {
    const params = new URLSearchParams({
      q: query,
      per_page: Math.min(per_page, 100).toString(),
      sort: "followers",
      order: "desc"
    });

    const response = await fetch(
      `${BASE_URL}/search/users?${params}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'GitHub-Profile-Viewer'
        }
      }
    );

    const data = await handleResponse(response, "Failed to search users");
    return data.items || [];
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    
    throw new Error("An unexpected error occurred while searching users");
  }
};
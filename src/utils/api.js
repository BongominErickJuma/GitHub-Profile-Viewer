export const fetchUserData = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    throw new Error(
      response.status === 404 ? "User not found" : "Failed to fetch user data"
    );
  }

  const result = await response.json();
  console.log(result);
  return result;
};

export const fetchUserRepos = async (username) => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=stars&per_page=10`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch repositories");
  }
  const result = await response.json();
  console.log(result);
  return result;
};

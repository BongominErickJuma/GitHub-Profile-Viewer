# GitHub Profile Viewer for Recruiters

## Overview

A React application that allows recruiters to quickly view GitHub profiles and repositories without leaving their workflow. The app provides key candidate information and repository details with sorting/filtering capabilities.

## Features

- 🔍 Search GitHub users by username
- 👤 View profile information (avatar, bio, location, followers)
- 📦 Browse repositories with sorting and filtering
- ⏳ Search history (last 5 searches)
- 🌓 Light/Dark mode toggle
- 📱 Fully responsive design

## How to Use

### 1. Searching for a Profile

1. Enter a GitHub username in the search bar
2. Press Enter or click the Search button
3. View the user's profile information in the left panel
4. See their repositories in the right panel

### 2. Using Repository Filters

- **Sort by**:
  - Stars (default)
  - Forks
  - Name
- **Filter by language**:
  - Select from available languages in dropdown
  - "All" shows all repositories

### 3. Accessing Search History

- Recent searches appear below the search bar
- Click any username to search again
- History persists between sessions

### 4. Toggling Dark Mode

- Click the theme toggle button in the top right corner
- The app will remember your preference

## Installation (For Developers)

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Steps

1. Clone the repository:

```bash
git clone https://github.com/BongominErickJuma/GitHub-Profile-Viewer
cd GitHub-Profile-Viewer
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser to:

```
http://localhost:3000
```

## Deployment

The app can be deployed to any static hosting service:

- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [GitHub Pages](https://pages.github.com)

## API Usage

This app uses the public GitHub API:

- Rate limit: 60 requests per hour (unauthenticated)
- Endpoints used:
  - `https://api.github.com/users/{username}`
  - `https://api.github.com/users/{username}/repos`

## Troubleshooting

- **User not found**: Double check the username spelling
- **No repositories shown**: The user may not have public repositories
- **Rate limit exceeded**: Wait an hour or provide a GitHub token in the future

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

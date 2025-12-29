/**
 * GitHub API Integration for Persistent Suggestion Storage
 * 
 * This module handles communication with GitHub to store suggestions persistently.
 * Suggestions are stored as JSON in a GitHub repository.
 * 
 * Environment Variables Required:
 * - VITE_GITHUB_TOKEN: GitHub personal access token with repo access
 * - VITE_GITHUB_REPO_OWNER: Repository owner username
 * - VITE_GITHUB_REPO_NAME: Repository name
 */

export interface GitHubSuggestion {
  id: string;
  text: string;
  timestamp: number;
  visitorId: string;
}

const GITHUB_API_BASE = 'https://api.github.com';
const SUGGESTIONS_FILE = 'suggestions.json';

/**
 * Get the GitHub API configuration from environment variables
 */
function getGitHubConfig() {
  return {
    token: import.meta.env.VITE_GITHUB_TOKEN,
    owner: import.meta.env.VITE_GITHUB_REPO_OWNER,
    repo: import.meta.env.VITE_GITHUB_REPO_NAME,
  };
}

/**
 * Fetch suggestions from GitHub
 */
export async function fetchSuggestionsFromGitHub(): Promise<GitHubSuggestion[]> {
  const config = getGitHubConfig();

  if (!config.token || !config.owner || !config.repo) {
    console.warn('GitHub configuration not complete. Using local storage only.');
    return [];
  }

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${config.owner}/${config.repo}/contents/${SUGGESTIONS_FILE}`,
      {
        headers: {
          Authorization: `token ${config.token}`,
          Accept: 'application/vnd.github.v3.raw',
        },
      }
    );

    if (response.status === 404) {
      // File doesn't exist yet
      return [];
    }

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const content = await response.text();
    return JSON.parse(content);
  } catch (error) {
    console.error('Error fetching suggestions from GitHub:', error);
    return [];
  }
}

/**
 * Save suggestions to GitHub
 */
export async function saveSuggestionsToGitHub(
  suggestions: GitHubSuggestion[]
): Promise<boolean> {
  const config = getGitHubConfig();

  if (!config.token || !config.owner || !config.repo) {
    console.warn('GitHub configuration not complete. Suggestions saved to local storage only.');
    return false;
  }

  try {
    // First, try to get the current file to get its SHA (needed for updates)
    let sha: string | undefined;
    try {
      const getResponse = await fetch(
        `${GITHUB_API_BASE}/repos/${config.owner}/${config.repo}/contents/${SUGGESTIONS_FILE}`,
        {
          headers: {
            Authorization: `token ${config.token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (getResponse.ok) {
        const data = await getResponse.json();
        sha = data.sha;
      }
    } catch (error) {
      // File doesn't exist yet, which is fine
    }

    // Prepare the file content
    const content = JSON.stringify(suggestions, null, 2);
    const encodedContent = btoa(content); // Base64 encode

    // Prepare the request body
    const body: Record<string, unknown> = {
      message: `Update suggestions - ${new Date().toISOString()}`,
      content: encodedContent,
      branch: 'main',
    };

    if (sha) {
      body.sha = sha;
    }

    // Push to GitHub
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${config.owner}/${config.repo}/contents/${SUGGESTIONS_FILE}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${config.token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error saving suggestions to GitHub:', error);
    return false;
  }
}

/**
 * Sync suggestions between local storage and GitHub
 * Fetches from GitHub and merges with local storage
 */
export async function syncSuggestions(): Promise<GitHubSuggestion[]> {
  const localSuggestions = localStorage.getItem('suggestion_collection_suggestions');
  let localData: GitHubSuggestion[] = [];

  if (localSuggestions) {
    try {
      localData = JSON.parse(localSuggestions);
    } catch (error) {
      console.error('Failed to parse local suggestions:', error);
    }
  }

  // Fetch from GitHub
  const gitHubData = await fetchSuggestionsFromGitHub();

  // Merge: combine and deduplicate by ID
  const mergedMap = new Map<string, GitHubSuggestion>();

  gitHubData.forEach((s) => mergedMap.set(s.id, s));
  localData.forEach((s) => mergedMap.set(s.id, s));

  const merged = Array.from(mergedMap.values()).sort(
    (a, b) => b.timestamp - a.timestamp
  );

  // Save merged data back to both local storage and GitHub
  localStorage.setItem('suggestion_collection_suggestions', JSON.stringify(merged));
  await saveSuggestionsToGitHub(merged);

  return merged;
}

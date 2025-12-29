# Suggestion Collection Webpage - Deployment Guide

This guide explains how to deploy the suggestion-collection webpage to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your local machine
- Node.js and pnpm installed

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and log in to your account
2. Click the **+** icon in the top-right corner and select **New repository**
3. Name your repository (e.g., `suggestion-collection-webpage`)
4. Choose **Public** (required for GitHub Pages)
5. Click **Create repository**

## Step 2: Push Code to GitHub

1. Open a terminal in the project directory
2. Initialize git if not already done:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: suggestion collection webpage"
   ```

3. Add the remote repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/suggestion-collection-webpage.git
   git branch -M main
   git push -u origin main
   ```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (gear icon)
3. In the left sidebar, click **Pages**
4. Under "Build and deployment":
   - Source: Select **GitHub Actions**
   - The workflow will automatically deploy from the `main` branch

## Step 4: Configure GitHub Pages Settings

1. In the same **Pages** section:
   - Ensure the deployment source is set to **GitHub Actions**
   - The site will be published to `https://YOUR_USERNAME.github.io/suggestion-collection-webpage/`

## Step 5: Deploy

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:

1. Build the project when you push to `main`
2. Deploy the built files to GitHub Pages
3. Make your site live at the GitHub Pages URL

You can monitor the deployment progress in the **Actions** tab of your repository.

## Local Development

To test the webpage locally before deploying:

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev

# Open http://localhost:3000 in your browser
```

## Features

### Visitor Suggestions
- Visitors can submit one suggestion per browser (tracked via localStorage)
- Suggestions are stored in the browser's local storage
- A "Submit" button appears only when the input field has text

### Admin Dashboard
- Access via the hamburger menu → "Admin Login"
- **Credentials:**
  - Username: `THEWIZARD99`
  - Password: `WIZARD242427`
- View all submitted suggestions with expandable/collapsible cards
- Suggestions are displayed with timestamps and unique IDs

### Persistent Storage

The webpage uses **localStorage** for client-side persistence. For production deployments, you can enhance this by:

1. **GitHub API Integration**: Store suggestions in a GitHub repository
   - Set environment variables:
     - `VITE_GITHUB_TOKEN`: GitHub personal access token
     - `VITE_GITHUB_REPO_OWNER`: Repository owner
     - `VITE_GITHUB_REPO_NAME`: Repository name
   - The app will sync suggestions to GitHub

2. **Serverless Backend**: Use Netlify Functions, Vercel Functions, or AWS Lambda to handle persistent storage

## Security Notes

### Current Implementation (Development)
- Admin credentials are validated client-side using a mock API
- This is suitable for development and low-security environments

### Production Recommendations
1. **Backend Authentication**: Move credential validation to a secure backend server
2. **Password Hashing**: Use bcrypt or Argon2 for password storage
3. **HTTPS**: Ensure all communications use HTTPS
4. **Rate Limiting**: Implement rate limiting on suggestion submissions
5. **Input Validation**: Validate and sanitize all user input on the server
6. **CORS**: Configure proper CORS policies if using a backend API

## Customization

### Changing Admin Credentials
Edit `/client/src/lib/mockApi.ts`:
```typescript
const ADMIN_USERNAME = 'YOUR_USERNAME';
const ADMIN_PASSWORD = 'YOUR_PASSWORD';
```

### Changing the Site Title
Edit `/client/index.html`:
```html
<title>Your Site Title</title>
```

### Changing Colors and Fonts
Edit `/client/src/index.css` to modify:
- Color palette (OKLCH color values)
- Typography (font families and sizes)
- Spacing and border radius

## Troubleshooting

### GitHub Pages Not Updating
1. Check the **Actions** tab for build errors
2. Ensure the workflow file is in `.github/workflows/deploy.yml`
3. Verify the repository is public (GitHub Pages requires this for free accounts)

### Suggestions Not Persisting
- Check browser console for errors
- Verify localStorage is enabled in your browser
- For GitHub API integration, ensure environment variables are set correctly

### Admin Login Not Working
- Verify credentials match those in `/client/src/lib/mockApi.ts`
- Check browser console for error messages
- Clear browser cache and localStorage if issues persist

## Support

For issues or questions:
1. Check the browser console for error messages
2. Review the GitHub Actions logs for build errors
3. Ensure all dependencies are installed: `pnpm install`

## License

This project is provided as-is for educational and personal use.

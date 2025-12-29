# GitHub Pages Deployment Guide

This guide explains how to deploy the Suggestion Collection Webpage to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer
- The project files from this repository

## Step-by-Step Deployment Instructions

### 1. Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and log in to your account
2. Click the **+** icon in the top-right corner and select **New repository**
3. Name your repository: `suggestion-collection-webpage` (or any name you prefer)
4. Choose **Public** (required for GitHub Pages)
5. Click **Create repository**

### 2. Initialize Git and Push to GitHub

Navigate to your project directory and run these commands:

```bash
cd suggestion-collection-webpage
git init
git add .
git commit -m "Initial commit: Suggestion collection webpage"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/suggestion-collection-webpage.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (gear icon)
3. Scroll down to **Pages** section
4. Under "Source", select **Deploy from a branch**
5. Select **main** branch and **/(root)** folder
6. Click **Save**

### 4. Configure for GitHub Pages

The project is already configured for GitHub Pages. The `dist/public` folder contains the built static files that will be served.

### 5. Build and Deploy

Before pushing, build the project:

```bash
pnpm install
pnpm build
```

Then commit and push the `dist` folder:

```bash
git add dist/
git commit -m "Build: Production build for GitHub Pages"
git push
```

### 6. Access Your Website

Your website will be available at:
```
https://YOUR_USERNAME.github.io/suggestion-collection-webpage/
```

It may take a few minutes for GitHub Pages to process and deploy your site.

## Features

### Visitor Submission System
- Visitors can submit one suggestion per browser (tracked via localStorage)
- Submit button appears only when text is entered
- Success message displays after submission
- Suggestions are stored locally and persist across sessions

### Admin Dashboard
- Access via hamburger menu → Admin Login
- **Credentials:**
  - Username: `THEWIZARD99`
  - Password: `WIZARD242427`
- View all submitted suggestions
- Show More/Show Less toggle for each suggestion
- Logout button to return to home page

### Design Features
- Clean, modern minimalist design with warm teal accents
- Responsive layout that works on mobile, tablet, and desktop
- Smooth animations and transitions
- Accessible navigation with hamburger menu

## Persistent Storage

Suggestions are stored using:
- **Client-side:** localStorage (for one-per-visitor tracking)
- **Backend:** Mock API (for demonstration purposes)

For production use with actual persistence, you can:
1. Integrate with a backend service (Firebase, Supabase, etc.)
2. Use GitHub Issues API to store suggestions
3. Implement a custom backend server

## Customization

### Change Admin Credentials

To change the admin credentials, edit `client/src/lib/mockApi.ts`:

```typescript
// Find this section and update the credentials
if (username === 'THEWIZARD99' && password === 'WIZARD242427') {
  // Update these values
}
```

### Modify Design

- **Colors & Typography:** Edit `client/src/index.css`
- **Layout & Components:** Edit files in `client/src/pages/` and `client/src/components/`
- **Content:** Update text in `client/src/pages/Home.tsx`

## Troubleshooting

### Site not appearing after deployment
- Wait 5-10 minutes for GitHub Pages to process
- Check that the repository is public
- Verify that GitHub Pages is enabled in Settings

### Suggestions not persisting
- This is expected behavior - suggestions are stored locally in the browser
- For persistent storage, implement a backend service

### Admin login not working
- Ensure you're using the exact credentials: `THEWIZARD99` / `WIZARD242427`
- Check browser console for any errors (F12 → Console tab)

## Support

For issues or questions:
1. Check the browser console for error messages (F12)
2. Verify all files were deployed correctly
3. Review the project README for additional information

## License

This project is open source and available under the MIT License.

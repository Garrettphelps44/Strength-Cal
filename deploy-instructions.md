# Deployment Instructions

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner and select "New repository"
3. Name your repository: `strength-capacity-app`
4. Make it **Public** (required for free Netlify deployment)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Push to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/strength-capacity-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Netlify

1. Go to [Netlify.com](https://netlify.com) and sign in (you can sign in with GitHub)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your `strength-capacity-app` repository
4. Configure the build settings:
   - **Build command**: Leave empty (not needed for static HTML)
   - **Publish directory**: Leave as `/` (root directory)
5. Click "Deploy site"

## Step 4: Custom Domain (Optional)

1. In your Netlify dashboard, go to "Site settings" → "Domain management"
2. Click "Add custom domain"
3. Enter your desired domain name
4. Follow the DNS configuration instructions

## Step 5: Share Your App

Once deployed, Netlify will provide you with a URL like:
`https://your-app-name.netlify.app`

You can share this URL with anyone to access your Strength Capacity Calculator!

## Troubleshooting

- If you get a 404 error, make sure your `index.html` file is in the root directory
- If the app doesn't work properly, check the browser console for JavaScript errors
- Make sure all files are committed and pushed to GitHub before deploying to Netlify

## Updating Your App

To update your app:

1. Make changes to your files
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update description"
   git push
   ```
3. Netlify will automatically redeploy your site 
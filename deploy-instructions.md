# Deployment Instructions

## Option 1: Netlify Drop (Easiest - No Account Required)

1. Go to https://app.netlify.com/drop
2. Drag and drop the `strength-capacity-app.zip` file from this folder
3. Wait for deployment (usually 30 seconds)
4. Your site will be live at a URL like: https://random-name.netlify.app
5. You can customize the URL in the Netlify dashboard

## Option 2: GitHub Pages (Free Hosting)

1. Go to https://github.com and create a new account (if you don't have one)
2. Click the "+" button and select "New repository"
3. Name it: `strength-capacity-app`
4. Make it Public
5. Don't initialize with README (we already have one)
6. Click "Create repository"
7. Copy the commands GitHub shows you, or run these in this folder:

```bash
git remote add origin https://github.com/YOUR_USERNAME/strength-capacity-app.git
git branch -M main
git push -u origin main
```

8. Go to Settings > Pages
9. Under "Source", select "Deploy from a branch"
10. Select "main" branch and "/ (root)" folder
11. Click "Save"
12. Your site will be live at: https://YOUR_USERNAME.github.io/strength-capacity-app

## Option 3: Vercel (Also Free)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Deploy automatically

## File Structure

Your website consists of:
- `index.html` - Main application file
- `README.md` - Project documentation
- `strength-capacity-app.zip` - Ready-to-deploy package

The app is completely self-contained and doesn't need any additional files or dependencies! 
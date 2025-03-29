# Deploying to Vercel

This guide will help you deploy your Next.js sleep calculator app to Vercel in just a few steps.

## Prerequisites

- A GitHub account
- A Vercel account (you can sign up for free using your GitHub account)

## Step 1: Push your code to GitHub

If your code is not already in a GitHub repository:

1. Create a new repository on GitHub
2. Initialize Git in your project folder (if not already done):
   ```
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Add the GitHub repository as a remote and push:
   ```
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect that it's a Next.js project
5. Configure the project settings if needed (environment variables are already set in the repository)
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI globally:
   ```
   npm install -g vercel
   ```
2. Login to your Vercel account:
   ```
   vercel login
   ```
3. Deploy from your project directory:
   ```
   vercel
   ```
4. Follow the interactive prompts

## Step 3: Configure Custom Domain (Optional)

1. Go to your project in the Vercel Dashboard
2. Navigate to "Settings" > "Domains"
3. Add your custom domain and follow the instructions to set up DNS

## Troubleshooting

If you encounter any issues during deployment:

1. Check the build logs in the Vercel dashboard
2. Ensure your Next.js configuration is correct (next.config.js)
3. Verify that all required environment variables are set
4. Make sure your package.json has the correct build and start scripts

## Next Steps After Deployment

- Set up CI/CD with GitHub Actions or Vercel's automatic deployments
- Configure analytics
- Set up monitoring and error tracking
- Test your site on different devices and browsers

## Support

If you have any questions or need help with your deployment, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs) 
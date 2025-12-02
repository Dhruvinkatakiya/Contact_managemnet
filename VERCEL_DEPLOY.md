# Vercel Deployment Guide

## Important: Update CORS Settings

After deploying, update the CORS origin in `backend/server.js` line 11:

Replace `https://your-app.vercel.app` with your actual Vercel deployment URL.

## Deploy Steps

### Option 1: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Option 2: Using Vercel Dashboard
1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect the configuration
5. Click "Deploy"

## Environment Variables (Set in Vercel Dashboard)

Go to Project Settings → Environment Variables and add:

**Production:**
- `NODE_ENV` = `production`

## After Deployment

1. Get your deployment URL (e.g., `https://contact-managemnet.vercel.app`)
2. Update CORS in `backend/server.js`:
   ```javascript
   origin: process.env.NODE_ENV === 'production' 
     ? ['https://contact-managemnet.vercel.app', /\.vercel\.app$/]
     : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
   ```
3. Commit and push the change
4. Vercel will auto-deploy the update

## Testing

Visit: `https://your-deployment-url.vercel.app`

## Troubleshooting

**404 Errors:**
- Check if `vercel.json` is in the root directory
- Ensure routes are properly configured

**API Not Working:**
- Check CORS settings match your deployment URL
- Verify backend routes start with `/api`
- Check Vercel Function logs in dashboard

**Build Failures:**
- Ensure all dependencies are in `package.json`
- Check build logs in Vercel dashboard

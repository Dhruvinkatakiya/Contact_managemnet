# Deployment Guide

This project can be deployed **entirely on Vercel** (Frontend + Backend as Serverless Functions)

## 🚀 Deploy to Vercel (All-in-One)

### Steps:
1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import `Dhruvinkatakiya/Contact_managemnet` from GitHub
4. Vercel will auto-detect the configuration from `vercel.json`
5. **Important**: Add Environment Variable before deploying:
   - **Name**: `JWT_SECRET`
   - **Value**: Any random secure string (e.g., `your-secret-key-here-change-in-production`)
6. Click **Deploy**

Your app will be live at: `https://contact-managemnet.vercel.app`
- Frontend: `https://contact-managemnet.vercel.app`
- Backend API: `https://contact-managemnet.vercel.app/api`

---

## ⚙️ Configuration Details

The `vercel.json` is configured to:
- Build the frontend from `frontend/` directory
- Deploy backend as serverless functions from `api/` directory
- All dependencies are installed from root `package.json`
- API routes are accessible at `/api/*`

---

## 🔧 Alternative: Deploy Backend Separately (Render/Railway)

If you prefer to deploy backend separately on a different platform:

### Deploy Backend to Render

1. Go to https://render.com
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `contact-management-api`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `JWT_SECRET` = `your-secret-key-here`

6. Click "Create Web Service"

### Connect Frontend to External Backend

In Vercel Dashboard:
- Go to your project → Settings → Environment Variables
- Add variable:
  - **Name**: `VITE_API_URL`
  - **Value**: `https://your-backend-url.onrender.com/api`
- Redeploy frontend

---

## 🧪 Testing

1. Visit your Vercel URL: `https://contact-managemnet.vercel.app`
2. Test backend API: `https://contact-managemnet.vercel.app/api/health`
3. Try signing up with a new account
4. Test contact CRUD operations
5. Check browser console for any errors

---

## 🐛 Troubleshooting

**"Cannot find package 'express'" error:**
- Make sure root `package.json` exists with all dependencies
- Redeploy the project on Vercel
- Check build logs for any installation errors

**Frontend loads but API calls fail:**
- Visit `/api/health` endpoint to check if API is running
- Check browser console for CORS or network errors
- Verify `JWT_SECRET` environment variable is set in Vercel

**Signup/Login not working:**
- Check that API routes are accessible at `/api/auth/signup` and `/api/auth/login`
- Verify JWT_SECRET is set in Vercel environment variables
- Check Vercel function logs for errors

**Backend not responding:**
- Check Render/Railway logs
- Ensure backend is set to production mode
- Verify all dependencies are installed

**CORS errors:**
- Make sure backend CORS includes your Vercel URL
- Check that credentials is set to true

**Data resets after backend restart:**
- This is expected with in-memory storage
- For production, integrate a database (MongoDB, PostgreSQL)

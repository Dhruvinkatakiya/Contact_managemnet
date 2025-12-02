# Deployment Guide

This project requires **two separate deployments**:
1. **Frontend** on Vercel
2. **Backend** on Render/Railway/Heroku

## 🎨 Deploy Frontend to Vercel

### Steps:
1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import `Dhruvinkatakiya/Contact_managemnet` from GitHub
4. Vercel will auto-detect the configuration from `vercel.json`
5. Click **Deploy**

Your frontend will be live at: `https://contact-managemnet.vercel.app`

---

## 🔧 Deploy Backend to Render (Recommended)

### Steps:
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

5. Add Environment Variable:
   - `NODE_ENV` = `production`

6. Click "Create Web Service"

Your backend will be live at: `https://contact-management-api.onrender.com`

---

## 🔗 Connect Frontend to Backend

After both are deployed:

### 1. Update Frontend Environment Variable

In Vercel Dashboard:
- Go to your project → Settings → Environment Variables
- Add new variable:
  - **Name**: `VITE_API_URL`
  - **Value**: `https://contact-management-api.onrender.com/api`
- Redeploy frontend

### 2. Update Backend CORS

Update `backend/server.js` line 11 with your Vercel URL:

```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://contact-managemnet.vercel.app', /\.vercel\.app$/]
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true
}));
```

Commit and push - Render will auto-redeploy!

---

## ⚡ Alternative: Deploy Backend to Railway

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Configure:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`
5. Add environment variable: `NODE_ENV=production`
6. Deploy

---

## 🧪 Testing

1. Visit your Vercel frontend URL
2. Try signing up with a new account
3. Test contact CRUD operations
4. Check browser console for any errors

---

## 🐛 Troubleshooting

**Frontend loads but API calls fail:**
- Check `VITE_API_URL` environment variable in Vercel
- Verify backend is running (visit backend URL)
- Check CORS settings in backend

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

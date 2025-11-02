# 🚀 Deployment Guide

Complete step-by-step guide to deploy your portfolio to production.

## Table of Contents
- [Prerequisites](#prerequisites)
- [MongoDB Atlas Setup](#mongodb-atlas-setup)
- [Firebase Setup](#firebase-setup)
- [Backend Deployment (Render)](#backend-deployment-render)
- [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
- [Post-Deployment](#post-deployment)

---

## Prerequisites

Before deploying, ensure you have:
- ✅ GitHub account
- ✅ MongoDB Atlas account
- ✅ Firebase project
- ✅ Vercel account
- ✅ Render account
- ✅ Gmail account with App Password

---

## MongoDB Atlas Setup

### Step 1: Create Account and Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Click **"Build a Database"**
4. Choose **FREE** tier (M0 Sandbox)
5. Select your preferred cloud provider and region
6. Name your cluster (e.g., "portfolio-cluster")
7. Click **"Create"**

### Step 2: Create Database User

1. Go to **Database Access** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **Password** authentication
4. Set username: `portfolioAdmin`
5. Click **"Autogenerate Secure Password"** (save this!)
6. Set user privileges to **"Read and write to any database"**
7. Click **"Add User"**

### Step 3: Configure Network Access

1. Go to **Network Access** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for production)
4. Click **"Confirm"**

### Step 4: Get Connection String

1. Go to **Database** in the left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `myFirstDatabase` with `portfolio`

Example:
```
mongodb+srv://portfolioAdmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

---

## Firebase Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `portfolio-app`
4. Disable Google Analytics (optional)
5. Click **"Create project"**

### Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **"Get started"**
3. Enable **Email/Password** sign-in method
4. Enable **Google** sign-in method
5. Add your email as the first user:
   - Go to **Users** tab
   - Click **"Add user"**
   - Enter your email and password

### Step 3: Enable Cloud Storage

1. Go to **Storage** in Firebase Console
2. Click **"Get started"**
3. Start in **production mode**
4. Choose a location
5. Click **"Done"**

### Step 4: Update Storage Rules

1. Go to **Storage** → **Rules**
2. Replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

### Step 5: Get Frontend Config

1. Go to **Project Settings** (gear icon)
2. Scroll to **"Your apps"**
3. Click web icon `</>`
4. Register app name: `portfolio-web`
5. Copy the `firebaseConfig` object

### Step 6: Get Backend Service Account

1. Go to **Project Settings** → **Service accounts**
2. Click **"Generate new private key"**
3. Download the JSON file
4. Extract these values:
   - `project_id`
   - `private_key`
   - `client_email`

### Step 7: Enable Analytics (Optional)

1. Go to **Analytics** in Firebase Console
2. Click **"Enable Google Analytics"**
3. Follow the setup wizard

---

## Backend Deployment (Render)

### Step 1: Prepare Repository

1. Ensure your code is pushed to GitHub
2. Make sure `.gitignore` excludes `.env` and `node_modules`

### Step 2: Create Render Account

1. Go to [Render](https://render.com)
2. Sign up with GitHub

### Step 3: Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `portfolio-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### Step 4: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add:

```
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://portfolioAdmin:PASSWORD@cluster0.xxxxx.mongodb.net/portfolio
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
FIREBASE_PROJECT_ID=portfolio-app
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@portfolio-app.iam.gserviceaccount.com
FRONTEND_URL=https://your-portfolio.vercel.app
ADMIN_EMAIL=your_email@gmail.com
```

**Important**: For `FIREBASE_PRIVATE_KEY`, keep the quotes and `\n` characters!

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Copy your backend URL (e.g., `https://portfolio-backend.onrender.com`)

### Step 6: Test API

Visit: `https://your-backend-url.onrender.com/api/health`

You should see:
```json
{
  "success": true,
  "message": "Portfolio API is running"
}
```

---

## Frontend Deployment (Vercel)

### Step 1: Create Vercel Account

1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub

### Step 2: Import Project

1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Add Environment Variables

Click **"Environment Variables"** and add:

```
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=portfolio-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=portfolio-app
VITE_FIREBASE_STORAGE_BUCKET=portfolio-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for deployment (2-5 minutes)
3. Your site will be live at `https://your-project.vercel.app`

### Step 5: Add Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

---

## Post-Deployment

### 1. Update Firebase Authorized Domains

1. Go to Firebase Console → **Authentication** → **Settings**
2. Under **Authorized domains**, add:
   - `your-project.vercel.app`
   - `your-custom-domain.com` (if applicable)

### 2. Update CORS in Backend

Your backend is already configured to accept requests from `FRONTEND_URL`.

### 3. Test All Features

- ✅ Home page loads
- ✅ Dark/light mode toggle works
- ✅ All navigation links work
- ✅ Projects load from database
- ✅ Experiences load from database
- ✅ Contact form sends emails
- ✅ Admin login works
- ✅ Admin dashboard CRUD operations work

### 4. Create First Admin User

1. Go to Firebase Console → **Authentication** → **Users**
2. Click **"Add user"**
3. Enter admin email and password
4. Go to MongoDB Atlas → **Browse Collections**
5. Find the `users` collection
6. Find your user document
7. Update `role` field to `"admin"`

### 5. Add Initial Content

1. Log in to `/login` with your admin credentials
2. Go to `/admin` dashboard
3. Add your first project
4. Add your experiences
5. Test the contact form

### 6. Monitor Your Application

**Render Dashboard:**
- View logs
- Monitor performance
- Check for errors

**Vercel Dashboard:**
- View analytics
- Monitor build logs
- Check deployment status

**MongoDB Atlas:**
- Monitor database usage
- View performance metrics
- Set up alerts

**Firebase Console:**
- Monitor authentication
- Check storage usage
- View analytics (if enabled)

---

## Troubleshooting

### Backend Issues

**Problem**: Backend won't start
- Check Render logs for errors
- Verify all environment variables are set correctly
- Ensure MongoDB connection string is valid

**Problem**: CORS errors
- Verify `FRONTEND_URL` matches your Vercel deployment URL
- Check that frontend is making requests to correct backend URL

### Frontend Issues

**Problem**: White screen after deployment
- Check Vercel build logs
- Verify all environment variables start with `VITE_`
- Ensure `VITE_API_URL` points to your Render backend

**Problem**: Firebase authentication not working
- Verify Firebase config is correct
- Check authorized domains in Firebase Console
- Ensure Firebase project is active

### Database Issues

**Problem**: Cannot connect to MongoDB
- Check IP whitelist in MongoDB Atlas
- Verify connection string format
- Ensure database user has correct permissions

---

## Performance Optimization

### 1. Enable Caching

Add to `vercel.json` in frontend:
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 2. Optimize Images

- Use WebP format
- Compress images before uploading
- Use Firebase Storage CDN

### 3. Monitor Performance

- Use Vercel Analytics
- Enable Firebase Performance Monitoring
- Set up MongoDB Atlas alerts

---

## Security Checklist

- ✅ All sensitive data in environment variables
- ✅ `.env` files in `.gitignore`
- ✅ Rate limiting enabled on API
- ✅ Firebase Storage rules configured
- ✅ MongoDB network access restricted (or monitored)
- ✅ HTTPS enabled (automatic with Vercel/Render)
- ✅ CORS properly configured
- ✅ Input validation on all forms

---

## Maintenance

### Regular Tasks

**Weekly:**
- Check error logs in Render
- Monitor MongoDB usage
- Review contact form messages

**Monthly:**
- Update dependencies
- Review Firebase usage
- Check for security updates

**As Needed:**
- Backup MongoDB data
- Update content via admin dashboard
- Add new projects and experiences

---

## Support

If you encounter issues:

1. Check the logs (Render/Vercel)
2. Review environment variables
3. Test API endpoints directly
4. Check Firebase Console for auth issues
5. Verify MongoDB connection

---

## Next Steps

- 🎨 Customize the design and colors
- 📝 Add your personal content
- 🔍 Set up Google Analytics
- 📧 Configure email templates
- 🚀 Share your portfolio!

---

**Congratulations! Your portfolio is now live! 🎉**

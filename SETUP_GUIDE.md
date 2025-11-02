# 🚀 Complete Portfolio Setup Guide

## Overview
Your portfolio has 5 main navbar sections:
1. **Home** - Landing page with your introduction
2. **About** - Your background and skills
3. **Projects** - Showcase of your work
4. **Experience** - Your work experience timeline
5. **Contact** - Contact form and information

---

## 📋 Prerequisites

### Required Software:
1. **Node.js** (v16 or higher) - Already installed ✅
2. **MongoDB** - Choose one option:
   - **Option A**: MongoDB Compass (Local) - Recommended for development
   - **Option B**: MongoDB Atlas (Cloud) - Free tier available

---

## 🔧 Step-by-Step Setup

### Step 1: Create Backend `.env` File

Create a file at `d:\portfolio\backend\.env` with this content:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/portfolio

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Email Configuration (Optional - for contact form)
# Option A: Gmail (recommended: App Password)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Option B: Custom SMTP (overrides Gmail when SMTP_HOST is set)
# SMTP_HOST=smtp.yourprovider.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=your_smtp_username
# SMTP_PASS=your_smtp_password

# Admin Email (recipient of contact form messages)
ADMIN_EMAIL=1si23is081@sit.ac.in
```

**Note:** If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

---

### Step 2: Install MongoDB

#### Option A: MongoDB Compass (Recommended)

1. Download from: https://www.mongodb.com/try/download/compass
2. Install MongoDB Compass
3. Open Compass and connect to: `mongodb://localhost:27017`
4. The database `portfolio` will be created automatically when you start the backend

#### Option B: MongoDB Atlas (Cloud)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up for free
3. Create a new cluster (Free M0 tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Update `MONGO_URI` in `.env` with your connection string
7. Replace `<password>` with your database password

---

### Step 3: Start MongoDB (If using local MongoDB)

**Windows:**
- MongoDB Compass will start the local server automatically when you connect

**Or manually start MongoDB:**
```bash
# If MongoDB is installed as a service
net start MongoDB
```

---

### Step 4: Start the Backend Server

Open a terminal and run:

```bash
cd d:\portfolio\backend
npm run dev
```

**Expected Output:**
```
🚀 Server running on port 5000
📝 Environment: development
✅ MongoDB Connected: localhost (or your Atlas cluster)
```

---

### Step 5: Start the Frontend Server

Open a **NEW** terminal (keep backend running) and run:

```bash
cd d:\portfolio\frontend
npm run dev
```

**Expected Output:**
```
VITE v5.x.x ready in xxx ms
➜ Local: http://localhost:5173/
```

---

## 🌐 Access Your Portfolio

Once both servers are running:

- **Portfolio Website**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

---

## 📱 Navbar Sections Explained

### 1. Home (`/`)
- Your introduction
- Download Resume button (generates PDF)
- Social links (GitHub, LinkedIn, Email)
- **Status**: ✅ Ready to use

### 2. About (`/about`)
- Your background and story
- Skills and expertise
- **Status**: ✅ Ready to use

### 3. Projects (`/projects`)
- Fetches projects from MongoDB database
- Shows: FinFlow, CareerMitra, WasteNot
- **Requires**: Backend + Database running
- **Status**: ⚠️ Needs data in database

### 4. Experience (`/experience`)
- Work experience timeline
- Fetches from MongoDB database
- **Requires**: Backend + Database running
- **Status**: ⚠️ Needs data in database

### 5. Contact (`/contact`)
- Contact form
- Your contact information
- Sends messages to backend
- **Requires**: Backend running
- **Status**: ✅ Ready to use

---

## 🗄️ Adding Data to Database

### Option 1: Use Admin Dashboard (Recommended)

1. Start both servers
2. Go to: http://localhost:5173/login
3. Login with Firebase authentication
4. Access Admin Dashboard to add:
   - Projects
   - Experience entries
   - View messages

### Option 2: Use MongoDB Compass

1. Open MongoDB Compass
2. Connect to your database
3. Create collections:
   - `projects`
   - `experiences`
   - `messages`
4. Add documents manually

### Option 3: Use API Endpoints

**Add a Project:**
```bash
POST http://localhost:5000/api/projects
Content-Type: application/json

{
  "title": "FinFlow",
  "description": "AI Powered Personal Finance Companion",
  "technologies": ["React", "Node.js", "Firebase"],
  "githubUrl": "https://github.com/Rishusinha26/finflow",
  "liveUrl": "https://finflow.example.com",
  "featured": true
}
```

---

## 🔥 Firebase Setup (Optional - for Admin Authentication)

1. Go to: https://console.firebase.google.com
2. Create a new project
3. Enable Authentication → Email/Password
4. Go to Project Settings → General
5. Copy your Firebase config
6. Update `d:\portfolio\frontend\src\config\firebase.js`

---

## ✅ Verification Checklist

- [ ] Backend `.env` file created
- [ ] MongoDB installed and running
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 5173
- [ ] Can access http://localhost:5173
- [ ] All navbar links work
- [ ] Contact form submits successfully
- [ ] Projects page loads (may be empty initially)
- [ ] Experience page loads (may be empty initially)

---

## 🐛 Troubleshooting

### Backend won't start
- Check if `.env` file exists in `backend` folder
- Verify MongoDB is running
- Check if port 5000 is available

### Frontend won't start
- Check if port 5173 is available
- Run `npm install` in frontend folder

### MongoDB connection error
- Ensure MongoDB is running
- Check `MONGO_URI` in `.env` file
- For Atlas: Check network access and password

### Projects/Experience pages are empty
- This is normal on first run
- Add data via Admin Dashboard or API
- Or use MongoDB Compass to add documents

### Contact form not working
- Ensure backend is running
- Check browser console for errors
- Verify `FRONTEND_URL` in backend `.env`
- For emails: use Gmail App Password (2FA required) or configure SMTP
- Ensure `ADMIN_EMAIL` is set to the admin’s inbox
- Check backend logs for `Email error:` details

### Configure Frontend API Base URL (if needed)
Create `d:\portfolio\frontend\.env` with:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🎯 Quick Start Commands

**Terminal 1 - Backend:**
```bash
cd d:\portfolio\backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd d:\portfolio\frontend
npm run dev
```

**Terminal 3 - MongoDB (if needed):**
```bash
mongod
```

---

## 📞 Your Contact Information

All contact information is already configured:
- **Email**: 1si23is081@sit.ac.in
- **Phone**: +91 7644031967
- **Location**: Tumakuru, Karnataka
- **GitHub**: https://github.com/Rishusinha26
- **LinkedIn**: https://linkedin.com/in/Rishu-Kumar-Sinha

---

## 🎨 Features Included

✅ Dark/Light theme toggle
✅ Responsive design (mobile-friendly)
✅ SEO optimized
✅ Resume download as PDF
✅ Contact form with validation
✅ Admin dashboard for content management
✅ Smooth animations
✅ Social media integration

---

## 📝 Next Steps

1. Create backend `.env` file
2. Start MongoDB
3. Start backend server
4. Start frontend server
5. Visit http://localhost:5173
6. Add your projects and experience via Admin Dashboard
7. Customize content as needed

---

**Need Help?** Check the troubleshooting section or review the error messages in the terminal.

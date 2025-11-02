# ⚡ Quick Start Guide

## 🎯 Goal
Get all navbar sections working: Home, About, Projects, Experience, Contact

---

## 📝 3-Step Setup

### Step 1: Create `.env` File
Copy `backend\.env.template` to `backend\.env`

**Minimum required:**
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/portfolio
FRONTEND_URL=http://localhost:5173
```

---

### Step 2: Install MongoDB

**Easy Option - MongoDB Compass:**
1. Download: https://www.mongodb.com/try/download/compass
2. Install and open
3. Connect to: `mongodb://localhost:27017`
4. Done! ✅

**Cloud Option - MongoDB Atlas:**
1. Sign up: https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `MONGO_URI` in `.env`

---

### Step 3: Start Everything

**Option A - Use Startup Script (Easiest):**
```bash
# Double-click this file:
start.bat
```

**Option B - Manual Start:**

Terminal 1:
```bash
cd d:\portfolio\backend
npm run dev
```

Terminal 2:
```bash
cd d:\portfolio\frontend
npm run dev
```

---

## 🌐 Access Your Portfolio

Open: **http://localhost:5173**

---

## 📱 What Each Section Does

| Section | URL | Requires Backend | Requires Database |
|---------|-----|------------------|-------------------|
| **Home** | `/` | ❌ No | ❌ No |
| **About** | `/about` | ❌ No | ❌ No |
| **Projects** | `/projects` | ✅ Yes | ✅ Yes |
| **Experience** | `/experience` | ✅ Yes | ✅ Yes |
| **Contact** | `/contact` | ✅ Yes | ❌ No |

---

## ✅ Expected Results

### When Backend is Running:
```
🚀 Server running on port 5000
📝 Environment: development
✅ MongoDB Connected: localhost
```

### When Frontend is Running:
```
VITE ready in xxx ms
➜ Local: http://localhost:5173/
```

### All Navbar Sections:
- ✅ **Home** - Shows your intro, resume download works
- ✅ **About** - Shows your background and skills
- ⚠️ **Projects** - May be empty (add via Admin Dashboard)
- ⚠️ **Experience** - May be empty (add via Admin Dashboard)
- ✅ **Contact** - Form works, sends to backend

---

## 🎯 Adding Content

### Projects & Experience will be empty initially. Add them via:

**Option 1 - Admin Dashboard:**
1. Go to: http://localhost:5173/login
2. Login with Firebase
3. Add projects and experience

**Option 2 - MongoDB Compass:**
1. Open MongoDB Compass
2. Connect to database
3. Add documents to `projects` and `experiences` collections

**Option 3 - Sample Data Script:**
```bash
cd d:\portfolio\backend
node scripts/seedData.js
```
(If seed script exists)

---

## 🐛 Common Issues

### "Cannot connect to MongoDB"
- Install MongoDB Compass or use Atlas
- Check if MongoDB is running
- Verify `MONGO_URI` in `.env`

### "Port 5000 already in use"
- Change `PORT=5001` in `.env`
- Or stop other app using port 5000

### "Projects page is empty"
- This is normal on first run
- Add projects via Admin Dashboard
- Or manually in MongoDB

---

## 🚀 You're All Set!

1. Create `.env` file ✅
2. Install MongoDB ✅
3. Run `start.bat` ✅
4. Visit http://localhost:5173 ✅
5. All navbar sections work! 🎉

---

**Full Documentation:** See `SETUP_GUIDE.md` for detailed instructions.

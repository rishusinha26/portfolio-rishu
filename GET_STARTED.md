# 🚀 Get Started - Your Portfolio Journey

Welcome! This guide will help you get your portfolio up and running.

---

## 🎯 Choose Your Path

### Path 1: Quick Start (10 minutes) ⚡
**Best for**: Getting it running ASAP

1. Read [QUICKSTART.md](QUICKSTART.md)
2. Install dependencies
3. Set up environment variables
4. Run locally

**Result**: Portfolio running on localhost

---

### Path 2: Complete Setup (30 minutes) 🛠️
**Best for**: Understanding everything

1. Read [README.md](README.md)
2. Follow [SETUP.md](SETUP.md)
3. Configure all services
4. Test all features

**Result**: Fully configured development environment

---

### Path 3: Deploy to Production (1 hour) 🌐
**Best for**: Going live immediately

1. Complete Path 2
2. Follow [DEPLOYMENT.md](DEPLOYMENT.md)
3. Deploy to Vercel + Render
4. Test in production

**Result**: Live portfolio accessible to everyone

---

## 📚 Essential Reading

### Must Read (15 minutes)
1. **[README.md](README.md)** - Project overview
2. **[QUICKSTART.md](QUICKSTART.md)** - Quick setup

### Recommended (30 minutes)
3. **[SETUP.md](SETUP.md)** - Detailed setup
4. **[FEATURES.md](FEATURES.md)** - What's included
5. **[STRUCTURE.txt](STRUCTURE.txt)** - File organization

### When Needed
- **[API.md](API.md)** - API reference
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Fix issues
- **[CHECKLIST.md](CHECKLIST.md)** - Ensure completeness

---

## 🎬 Step-by-Step Guide

### Step 1: Prerequisites (5 min)
```bash
# Check Node.js version (should be 18+)
node --version

# Check npm
npm --version

# Check git
git --version
```

**Need to install?**
- Node.js: https://nodejs.org/
- Git: https://git-scm.com/

---

### Step 2: Clone & Install (5 min)
```bash
# Clone the repository
cd d:/portfolio

# Install backend
cd backend
npm install

# Install frontend
cd ../frontend
npm install
```

---

### Step 3: Set Up Services (15 min)

#### MongoDB Local
1. Download & install MongoDB Community Server
2. Download & install MongoDB Compass
3. Start MongoDB service (auto-starts on Windows)
4. Connect via Compass: `mongodb://localhost:27017`
5. Database created automatically on first run

#### Firebase
1. Go to https://console.firebase.google.com/
2. Create project
3. Enable Authentication (Email/Password)
4. Enable Cloud Storage
5. Get web config

#### Gmail
1. Enable 2-Step Verification
2. Generate App Password
3. Save for later

---

### Step 4: Configure Environment (5 min)

**Backend** - Create `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolio
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="your-private-key"
FIREBASE_CLIENT_EMAIL=your-client-email
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=your_email@gmail.com
```

**Frontend** - Create `frontend/.env`:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=http://localhost:5000/api
```

---

### Step 5: Run Locally (2 min)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Access:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

### Step 6: Test (5 min)

- [ ] Home page loads
- [ ] Dark/light mode works
- [ ] Contact form submits
- [ ] Check email for message
- [ ] Login at `/login`
- [ ] Access admin at `/admin`

---

### Step 7: Customize (30 min)

1. **Update personal info**:
   - `frontend/src/pages/Home.jsx` - Name, tagline
   - `frontend/src/pages/About.jsx` - Bio, skills
   - `frontend/src/components/Footer.jsx` - Social links

2. **Add content via admin**:
   - Login at `/login`
   - Add projects
   - Add experiences

3. **Customize design**:
   - `frontend/tailwind.config.js` - Colors
   - `frontend/src/index.css` - Global styles

---

### Step 8: Deploy (30 min)

Follow [DEPLOYMENT.md](DEPLOYMENT.md) for:
- Vercel (Frontend)
- Render (Backend)
- Production environment variables

---

## 🆘 Need Help?

### Common Issues

**Backend won't start**
→ Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md#backend-issues)

**Frontend shows errors**
→ Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md#frontend-issues)

**Can't connect to database**
→ Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md#database-issues)

**Email not sending**
→ Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md#email-issues)

---

## 📖 Documentation Map

```
Start Here
    ↓
README.md ──────→ QUICKSTART.md ──────→ Running Locally
    ↓                                         ↓
SETUP.md ────────→ FEATURES.md          Customize
    ↓                                         ↓
DEPLOYMENT.md ──→ Production            Add Content
    ↓                                         ↓
CHECKLIST.md ───→ Verify                Launch! 🚀
```

---

## ✅ Quick Checklist

Before you start:
- [ ] Node.js installed
- [ ] MongoDB Atlas account
- [ ] Firebase account
- [ ] Gmail with 2FA

After setup:
- [ ] Backend running
- [ ] Frontend running
- [ ] Database connected
- [ ] Firebase working
- [ ] Email sending

Before deployment:
- [ ] All features tested
- [ ] Content added
- [ ] Customized design
- [ ] No console errors

---

## 🎯 Your Goals

### Week 1: Setup
- [ ] Get it running locally
- [ ] Understand the structure
- [ ] Test all features

### Week 2: Customize
- [ ] Add your content
- [ ] Customize design
- [ ] Add projects

### Week 3: Deploy
- [ ] Deploy to production
- [ ] Test live site
- [ ] Share with others

---

## 💡 Pro Tips

1. **Start simple** - Get it running first, customize later
2. **Use the checklist** - [CHECKLIST.md](CHECKLIST.md) ensures nothing is missed
3. **Test often** - Test after each change
4. **Read the docs** - Most answers are in the documentation
5. **Ask for help** - Open an issue if stuck

---

## 🎓 Learning Resources

### Understand the Stack
- **React**: https://react.dev/
- **Node.js**: https://nodejs.org/docs/
- **MongoDB**: https://www.mongodb.com/docs/
- **Firebase**: https://firebase.google.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

### Video Tutorials
Search YouTube for:
- "MERN stack tutorial"
- "Firebase authentication"
- "Tailwind CSS crash course"

---

## 🚀 Next Steps

1. **Choose your path** (above)
2. **Follow the guide** step-by-step
3. **Use the checklist** to track progress
4. **Refer to docs** when needed
5. **Deploy and share!**

---

## 📞 Support

- 📖 Documentation: See [INDEX.md](INDEX.md)
- 🐛 Issues: Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- 💬 Questions: Open a GitHub issue
- 📧 Email: (Add your email)

---

## 🎉 You've Got This!

This portfolio includes:
- ✅ Everything you need
- ✅ Complete documentation
- ✅ Step-by-step guides
- ✅ Troubleshooting help
- ✅ Production-ready code

**Ready to build your portfolio? Let's go!** 🚀

---

**Quick Links:**
- [README](README.md) | [Quick Start](QUICKSTART.md) | [Setup](SETUP.md) | [Deploy](DEPLOYMENT.md)
- [API Docs](API.md) | [Features](FEATURES.md) | [Troubleshooting](TROUBLESHOOTING.md)
- [Checklist](CHECKLIST.md) | [Index](INDEX.md) | [Structure](STRUCTURE.txt)

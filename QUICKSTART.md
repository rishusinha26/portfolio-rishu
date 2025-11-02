# ⚡ Quick Start Guide

Get your portfolio running in under 10 minutes!

## Step 1: Install Dependencies (2 min)

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## Step 2: Set Up MongoDB (3 min)

1. Download & Install [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Download & Install [MongoDB Compass](https://www.mongodb.com/try/download/compass)
3. Start MongoDB service (auto-starts on Windows)
4. Open Compass → Connect to `mongodb://localhost:27017`
5. Database will be created automatically when you run the app

## Step 3: Set Up Firebase (3 min)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create project → Enable Authentication (Email/Password)
3. Enable Storage
4. Project Settings → Copy web config
5. Service Accounts → Generate private key

## Step 4: Configure Environment (1 min)

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

## Step 5: Run (1 min)

**Terminal 1:**
```bash
cd backend
npm run dev
```

**Terminal 2:**
```bash
cd frontend
npm run dev
```

## Step 6: Access

- **Portfolio**: http://localhost:5173
- **Admin Login**: http://localhost:5173/login
- **API**: http://localhost:5000

## Next Steps

1. Sign in at `/login` with Firebase credentials
2. Add content via `/admin` dashboard
3. Customize in `frontend/src/pages/`
4. Deploy (see [DEPLOYMENT.md](DEPLOYMENT.md))

## Need Help?

- 📖 Full guide: [SETUP.md](SETUP.md)
- 🚀 Deployment: [DEPLOYMENT.md](DEPLOYMENT.md)
- 📝 Main docs: [README.md](README.md)

**You're all set! 🎉**

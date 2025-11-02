# 🛠️ Local Development Setup Guide

Quick start guide to get your portfolio running locally.

## Prerequisites

Make sure you have these installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **MongoDB Community Server** - [Download](https://www.mongodb.com/try/download/community)
- **MongoDB Compass** - [Download](https://www.mongodb.com/try/download/compass)
- **Firebase Account** - [Sign up](https://firebase.google.com/)

## Quick Start (5 Minutes)

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Set Up MongoDB

1. Install MongoDB Community Server from [MongoDB Downloads](https://www.mongodb.com/try/download/community)
2. Install MongoDB Compass from [Compass Downloads](https://www.mongodb.com/try/download/compass)
3. Start MongoDB service:
   - **Windows**: MongoDB service starts automatically
   - **Mac**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`
4. Open MongoDB Compass and connect to `mongodb://localhost:27017`
5. The database `portfolio` will be created automatically when you run the app

### 3. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Enable Cloud Storage
5. Get your config from Project Settings

### 4. Configure Environment Variables

**Backend** (`backend/.env`):
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/portfolio
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=your_email@gmail.com
```

**Frontend** (`frontend/.env`):
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_API_URL=http://localhost:5000/api
```

### 5. Start Development Servers

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

### 6. Access Your Portfolio

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

---

## Detailed Setup Instructions

### MongoDB Local Setup

#### Install MongoDB Community Server

**Windows:**
1. Download from [MongoDB Downloads](https://www.mongodb.com/try/download/community)
2. Run the installer (choose "Complete" installation)
3. Select "Install MongoDB as a Service"
4. MongoDB will start automatically

**macOS:**
```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update and install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### Install MongoDB Compass

1. Download from [Compass Downloads](https://www.mongodb.com/try/download/compass)
2. Install the application
3. Open MongoDB Compass
4. Connect to `mongodb://localhost:27017`
5. You should see the connection successful

#### Verify MongoDB is Running

```bash
# Check if MongoDB is running
# Windows
sc query MongoDB

# macOS
brew services list | grep mongodb

# Linux
sudo systemctl status mongod
```

#### Using MongoDB Compass

1. **Connect**: Use connection string `mongodb://localhost:27017`
2. **View Databases**: After running the app, you'll see `portfolio` database
3. **Browse Collections**: View `projects`, `messages`, `experiences`, `users`
4. **Query Data**: Use the GUI to query and filter documents
5. **Add/Edit Data**: Manually add or edit documents if needed

### Firebase Setup

#### Create Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name
4. Disable/Enable Google Analytics (optional)
5. Create project

#### Enable Authentication
1. Click "Authentication" in sidebar
2. Click "Get started"
3. Enable "Email/Password" sign-in method
4. Enable "Google" sign-in method (optional)
5. Add your email as first user in "Users" tab

#### Enable Cloud Storage
1. Click "Storage" in sidebar
2. Click "Get started"
3. Start in production mode
4. Choose storage location
5. Click "Done"

#### Update Storage Rules
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

#### Get Web App Config
1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click web icon `</>`
4. Register app
5. Copy firebaseConfig object

#### Get Service Account Key
1. Go to Project Settings → Service accounts
2. Click "Generate new private key"
3. Download JSON file
4. Extract: `project_id`, `private_key`, `client_email`

### Gmail App Password Setup

1. Enable 2-Step Verification:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. Generate App Password:
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and your device
   - Click "Generate"
   - Copy the 16-character password
   - Use this in `EMAIL_PASS` environment variable

---

## Development Workflow

### Starting Development

```bash
# Start backend (Terminal 1)
cd backend
npm run dev

# Start frontend (Terminal 2)
cd frontend
npm run dev
```

### Making Changes

1. **Frontend Changes**: 
   - Edit files in `frontend/src/`
   - Hot reload is enabled
   - Changes appear instantly

2. **Backend Changes**:
   - Edit files in `backend/`
   - Server auto-restarts with nodemon
   - Check terminal for errors

### Testing Features

1. **Test Contact Form**:
   - Go to http://localhost:5173/contact
   - Fill out and submit form
   - Check your email for notification

2. **Test Admin Dashboard**:
   - Go to http://localhost:5173/login
   - Sign in with Firebase credentials
   - Access dashboard at http://localhost:5173/admin

3. **Test API Endpoints**:
   - Use Postman or curl
   - Test endpoints listed in README.md

---

## Common Issues & Solutions

### Backend Won't Start

**Error**: `MongoServerError: bad auth`
- **Solution**: Check MongoDB username and password in connection string

**Error**: `Port 5000 already in use`
- **Solution**: Kill the process using port 5000 or change PORT in .env

**Error**: `Firebase error`
- **Solution**: Verify Firebase credentials in .env

### Frontend Won't Start

**Error**: `Module not found`
- **Solution**: Run `npm install` in frontend directory

**Error**: `Network Error`
- **Solution**: Ensure backend is running on port 5000

**Error**: `Firebase: Error (auth/...)`
- **Solution**: Check Firebase config in frontend .env

### Database Connection Issues

**Error**: `MongoNetworkError`
- **Solution**: Check internet connection and MongoDB Atlas IP whitelist

**Error**: `Authentication failed`
- **Solution**: Verify database user credentials

### Email Not Sending

**Error**: `Invalid login`
- **Solution**: Use Gmail App Password, not regular password

**Error**: `Connection timeout`
- **Solution**: Check if Gmail allows less secure apps (use App Password instead)

---

## Project Structure Explained

```
portfolio/
├── backend/                 # Node.js/Express API
│   ├── config/             # Configuration files
│   │   ├── database.js     # MongoDB connection
│   │   ├── email.js        # Nodemailer setup
│   │   └── firebase.js     # Firebase Admin SDK
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Auth & validation
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   └── server.js          # Entry point
│
├── frontend/               # React/Vite app
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── config/        # API & Firebase config
│   │   ├── context/       # React Context (Auth, Theme)
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   └── public/            # Static assets
│
└── README.md              # Documentation
```

---

## Development Tips

### Hot Reload
- Frontend: Automatic with Vite
- Backend: Automatic with nodemon

### Debugging

**Backend:**
```javascript
console.log('Debug:', variable);
```

**Frontend:**
```javascript
console.log('Debug:', variable);
// Or use React DevTools
```

### Database Management

**View Data:**
1. Go to MongoDB Atlas
2. Click "Browse Collections"
3. View/edit documents

**Reset Data:**
```javascript
// In MongoDB Atlas, delete collections and restart
```

---

## Next Steps

1. ✅ Customize the content
2. ✅ Add your projects via admin dashboard
3. ✅ Update personal information
4. ✅ Customize colors and styling
5. ✅ Test all features
6. ✅ Deploy to production (see DEPLOYMENT.md)

---

## Useful Commands

### Backend
```bash
npm run dev          # Start development server
npm start           # Start production server
npm install         # Install dependencies
```

### Frontend
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm install         # Install dependencies
```

### Git
```bash
git status          # Check changes
git add .           # Stage all changes
git commit -m "msg" # Commit changes
git push            # Push to remote
```

---

## Getting Help

- 📖 Read the [README.md](README.md)
- 🚀 Check [DEPLOYMENT.md](DEPLOYMENT.md)
- 🐛 Check error logs in terminal
- 🔍 Search for error messages online
- 💬 Check Firebase/MongoDB documentation

---

**Happy Coding! 🚀**

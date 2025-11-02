# 🚀 Rishu Kumar Sinha - Full-Stack Developer Portfolio

A complete, production-ready personal portfolio web application built with the MERN stack (MongoDB, Express, React, Node.js) and Firebase integration.

![Portfolio Preview](https://via.placeholder.com/800x400?text=Portfolio+Preview)

## ⚡ Quick Start

**Want to run everything quickly?**

1. **Create `.env` file**: Copy `backend\.env.template` to `backend\.env`
2. **Install MongoDB**: Download [MongoDB Compass](https://www.mongodb.com/try/download/compass)
3. **Run**: Double-click `start.bat` or see [QUICK_START.md](QUICK_START.md)
4. **Visit**: http://localhost:5173

📖 **Detailed Setup**: See [SETUP_GUIDE.md](SETUP_GUIDE.md) for complete instructions.

## ✨ Features

### Frontend
- ⚛️ **React 18** with Vite for blazing-fast development
- 🎨 **Tailwind CSS** for modern, responsive styling
- 🌗 **Dark/Light Mode** with persistent theme switching
- ✨ **Framer Motion** for smooth animations
- 🔥 **Firebase Authentication** for admin login
- 📱 **Fully Responsive** design for all devices
- ♿ **SEO Optimized** with React Helmet
- 🎯 **React Router** for seamless navigation

### Backend
- Node.js + Express
- REST API endpoints
- Mongoose (MongoDB ODM)
- Nodemailer (email sending)
- Firebase Admin SDK (auth verification)
- Deployed on Render or Railway

### Pages
1. **Home** - Hero section with animated introduction
2. **About** - Biography and skills showcase
3. **Projects** - Dynamic project portfolio with filtering
4. **Experience** - Timeline of work, education, and certifications
5. **Contact** - Functional contact form with email notifications
6. **Admin Dashboard** - CRUD operations for all content

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React, Vite, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express, MongoDB, Mongoose |
| **Authentication** | Firebase Auth |
| **Storage** | Firebase Cloud Storage |
| **Email** | Nodemailer |
| **Deployment** | Vercel (Frontend), Render/Railway (Backend) |

## 📁 Project Structure

```
portfolio/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   ├── email.js
│   │   └── firebase.js
│   ├── controllers/
│   │   ├── projectController.js
│   │   ├── messageController.js
│   │   ├── experienceController.js
│   │   └── uploadController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Project.js
│   │   ├── Message.js
│   │   ├── Experience.js
│   │   └── User.js
│   ├── routes/
│   │   ├── projectRoutes.js
│   │   ├── messageRoutes.js
│   │   ├── experienceRoutes.js
│   │   └── uploadRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── SEO.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── config/
│   │   │   ├── api.js
│   │   │   └── firebase.js
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Admin.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Community Server (local installation)
- MongoDB Compass (database GUI)
- Firebase project
- Gmail account (for email notifications)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
NODE_ENV=development

# MongoDB (Local)
MONGO_URI=mongodb://localhost:27017/portfolio

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Firebase Admin SDK
FIREBASE_PROJECT_ID=...
FIREBASE_PRIVATE_KEY=...
FIREBASE_CLIENT_EMAIL=...

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Admin Email
ADMIN_EMAIL=admin@example.com
```

Start the backend server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Backend API URL
VITE_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🔧 Configuration

### MongoDB Setup

1. Create a MongoDB Atlas account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add a database user
4. Whitelist your IP address
5. Get your connection string and add it to `.env`

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** (Email/Password and Google)
4. Enable **Cloud Storage**
5. Enable **Analytics** (optional)
6. Go to Project Settings → Service Accounts
7. Generate a new private key (for backend)
8. Go to Project Settings → General (for frontend config)

### Gmail App Password

1. Enable 2-Step Verification on your Google Account
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Use this password in your `.env` file

## 📡 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (admin only)
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)

### Contact Messages
- `POST /api/contact` - Send contact message
- `GET /api/contact` - Get all messages (admin only)
- `PATCH /api/contact/:id/read` - Mark as read (admin only)
- `DELETE /api/contact/:id` - Delete message (admin only)

### Experiences
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get single experience
- `POST /api/experiences` - Create experience (admin only)
- `PUT /api/experiences/:id` - Update experience (admin only)
- `DELETE /api/experiences/:id` - Delete experience (admin only)

### File Upload
- `POST /api/upload` - Upload file to Firebase Storage (admin only)
- `DELETE /api/upload` - Delete file from Firebase Storage (admin only)

## 🚢 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Set the root directory to `frontend`
5. Add environment variables from `.env`
6. Deploy!

### Backend (Render)

1. Go to [Render](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set the root directory to `backend`
5. Build command: `npm install`
6. Start command: `npm start`
7. Add environment variables
8. Deploy!

### Database (MongoDB Atlas)

- Already cloud-hosted, no additional deployment needed
- Update `MONGO_URI` in production environment variables

## 🎨 Customization

### Update Personal Information

1. **Home Page**: Edit `frontend/src/pages/Home.jsx`
   - Change name, tagline, and social links

2. **About Page**: Edit `frontend/src/pages/About.jsx`
   - Update bio, skills, and resume link

3. **Footer**: Edit `frontend/src/components/Footer.jsx`
   - Update social links and contact info

4. **Colors**: Edit `frontend/tailwind.config.js`
   - Customize the color palette

### Add Content via Admin Dashboard

1. Navigate to `/login`
2. Sign in with Firebase credentials
3. Access the admin dashboard at `/admin`
4. Add/edit/delete projects, experiences, etc.

## 🔒 Security Features

- ✅ Firebase Authentication for admin access
- ✅ JWT token verification
- ✅ Rate limiting on API endpoints
- ✅ Helmet.js for security headers
- ✅ CORS configuration
- ✅ Input validation and sanitization
- ✅ Environment variables for sensitive data

## 📱 Responsive Design

The portfolio is fully responsive and tested on:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Laptops (1024px and up)
- 🖥️ Desktops (1280px and up)

## 🎯 Performance

- ⚡ Vite for fast builds and HMR
- 🎨 Tailwind CSS for minimal CSS bundle
- 📦 Code splitting with React Router
- 🖼️ Lazy loading for images
- 🚀 Optimized production builds

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify all environment variables are set
- Ensure port 5000 is not in use

### Frontend won't connect to backend
- Verify `VITE_API_URL` is correct
- Check CORS settings in backend
- Ensure backend is running

### Firebase authentication issues
- Verify Firebase config is correct
- Check Firebase console for enabled auth methods
- Ensure service account key is valid

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

**Rishu Kumar Sinha**
- Email: 1si23is081@sit.ac.in
- Phone: +91 7644031967
- GitHub: [@Rishusinha26](https://github.com/Rishusinha26)
- LinkedIn: [Rishu Kumar Sinha](https://linkedin.com/in/Rishu-Kumar-Sinha)
- LeetCode: Rishu_sinha.com
- Location: Tumakuru, Karnataka, India

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Firebase for authentication and storage
- MongoDB for the database solution

---

⭐ If you found this helpful, please give it a star!

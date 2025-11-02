# 🔧 Troubleshooting: Projects & Experiences Not Loading

## Common Issues and Solutions

### 1. Backend Server Not Running

**Symptoms:**
- "Failed to load projects/experiences"
- "Network error" in console
- Connection timeout

**Solution:**
```bash
cd backend
npm start
```

Check that you see:
```
✅ MongoDB Connected: ...
🚀 Server running on port 5000
```

---

### 2. Empty Database (No Data)

**Symptoms:**
- Pages load but show "No projects/experiences available"

**Solution - Seed the database:**
```bash
cd backend
node scripts/seedData.js
```

This will populate your database with sample projects and experiences.

---

### 3. API URL Configuration

**Check your frontend `.env` file:**
```env
VITE_API_URL=http://localhost:5000/api
```

Or for production:
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

### 4. CORS Issues

**Symptoms:**
- CORS policy error in browser console
- Requests blocked by browser

**Solution:**
- Check `backend/server.js` - CORS should allow your frontend URL
- Make sure `FRONTEND_URL` in backend `.env` matches your frontend URL

---

### 5. Database Connection Issues

**Symptoms:**
- Backend crashes on startup
- "Error connecting to MongoDB" message

**Solution:**
1. Check MongoDB Atlas connection string in `backend/.env`:
   ```env
   MONGO_URI=mongodb+srv://username:ENCODED_PASSWORD@cluster.mongodb.net/database
   ```

2. **Important:** Special characters in password must be URL-encoded:
   - `@` → `%40`
   - `<` → `%3C`
   - `>` → `%3E`

3. Ensure MongoDB Atlas Network Access allows your IP or `0.0.0.0/0`

---

### 6. Check Browser Console

Open browser Developer Tools (F12) and check:
- Console tab for error messages
- Network tab to see if API requests are being made
- Look for failed requests (red entries)

---

### 7. Verify Backend Health

Test if backend is running:
```bash
curl http://localhost:5000/api/health
```

Or visit in browser: `http://localhost:5000/api/health`

Should return:
```json
{
  "success": true,
  "message": "Portfolio API is running",
  "timestamp": "..."
}
```

---

### 8. Test API Endpoints Directly

**Projects:**
```bash
curl http://localhost:5000/api/projects
```

**Experiences:**
```bash
curl http://localhost:5000/api/experiences
```

Both should return JSON with `{ success: true, data: [...] }`

---

## Quick Fix Checklist

- [ ] Backend server is running (`npm start` in backend folder)
- [ ] MongoDB connection string is correct in `.env`
- [ ] Password in connection string is URL-encoded
- [ ] Database has been seeded (`node scripts/seedData.js`)
- [ ] Frontend `.env` has correct `VITE_API_URL`
- [ ] CORS is configured correctly in `backend/server.js`
- [ ] Check browser console for specific error messages
- [ ] Verify backend health endpoint works

---

## Debug Mode

The updated code now includes console logging:
- Frontend: Check browser console for API requests
- Backend: Check terminal for request logs and database queries

Look for:
- `📡 Fetching projects from: ...`
- `✅ Projects response: ...`
- `📦 Loaded X projects`

If you see errors, the console will show detailed error information.


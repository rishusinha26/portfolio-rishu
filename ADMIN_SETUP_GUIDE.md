# 🔧 Admin Dashboard Setup Guide

This guide will help you fix and set up your admin dashboard.

---

## 🚨 Common Issues Fixed

✅ **Fixed API endpoint paths** in Admin.jsx  
✅ **Added better error messages** for admin access  
✅ **Created script to set user as admin**

---

## 📋 Step-by-Step Setup

### Step 1: Login to Your App

1. **Start your frontend** (if not running):
   ```bash
   cd frontend
   npm run dev
   ```

2. **Go to login page**: `http://localhost:5174/login`

3. **Login** with:
   - Email/Password (if you have an account)
   - OR Google Sign-In

4. **After login**, note your **email address** or **Firebase UID** from the browser console or Firebase console

---

### Step 2: Set Yourself as Admin

After logging in, you need to set your user role to `admin` in the database:

#### **Option A: Using the Script (Recommended)**

1. **Run the setAdmin script**:
   ```bash
   cd backend
   node scripts/setAdmin.js your-email@example.com
   ```
   
   Or with Firebase UID:
   ```bash
   node scripts/setAdmin.js abc123xyz456789
   ```

2. **Check the output** - you should see:
   ```
   ✅ User "your-email@example.com" has been set as admin!
   🎉 You can now access the admin dashboard!
   ```

#### **Option B: Using MongoDB Compass**

1. **Open MongoDB Compass**
2. **Connect** to: `mongodb://localhost:27017`
3. **Navigate** to `portfolio` → `users` collection
4. **Find your user** by email or firebaseUid
5. **Edit the document** and change `role` from `"user"` to `"admin"`
6. **Save** the document

#### **Option C: Using MongoDB Shell**

```javascript
use portfolio
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

---

### Step 3: Access Admin Dashboard

1. **Go to**: `http://localhost:5174/admin`
2. **You should now see**:
   - Dashboard stats
   - Projects tab
   - Messages tab
   - Experiences tab

---

### Step 4: Update Your Hackathon Certificates

Your certificate URLs need to be **direct image links**. Here's how to fix them:

#### **For ImgBB URLs:**

1. **Current format** (wrong): `https://ibb.co/C53qd8mv`
2. **Correct format**: You need the **direct image link**

**How to get the direct link:**
1. Go to https://ibb.co/C53qd8mv (or your image page)
2. Right-click on the image → "Copy image address"
3. You'll get something like: `https://i.ibb.co/xxxxx/image.jpg`

**Update in seed data:**
1. Edit `backend/scripts/seedData.js`
2. Replace certificate URLs with direct image links
3. Run seed script again:
   ```bash
   cd backend
   node scripts/seedData.js
   ```

**OR update via Admin Dashboard:**
1. Go to Admin → Experiences tab
2. Click Edit on your hackathon entry
3. Update the certificate URL with the direct image link
4. Save

---

## 🐛 Troubleshooting

### Issue: "Admin access required" error

**Solution:**
- Make sure you've set yourself as admin (Step 2)
- Check that your user exists in the database
- Verify the role is set to `"admin"` (not `"user"`)

### Issue: "Please login to access admin dashboard"

**Solution:**
- Make sure you're logged in at `/login`
- Check browser console for errors
- Verify Firebase authentication is working

### Issue: Can't delete/edit items

**Solution:**
- Ensure you're set as admin
- Check browser console for error messages
- Verify backend server is running

### Issue: Certificate images not showing

**Solution:**
- Use **direct image links** (not page links)
- Test the URL in a new browser tab
- Ensure URL ends with `.jpg`, `.png`, etc.
- For ImgBB, use `https://i.ibb.co/...` format

---

## 📝 Quick Reference

- **Login Page**: `http://localhost:5174/login`
- **Admin Dashboard**: `http://localhost:5174/admin`
- **Set Admin Script**: `backend/scripts/setAdmin.js`
- **Seed Data Script**: `backend/scripts/seedData.js`

---

## ✅ Checklist

- [ ] Logged in to your app
- [ ] Set user as admin using script or MongoDB
- [ ] Can access `/admin` page
- [ ] Can see projects, messages, experiences
- [ ] Updated certificate URLs to direct image links
- [ ] Certificate images display correctly

---

## 💡 Tips

1. **Keep your email/UID handy** - You'll need it to set admin role
2. **Use direct image links** - Page links won't work for certificates
3. **Test certificate URLs** - Open in new tab to verify they work
4. **Check browser console** - Look for error messages there

---

**You're all set! Your admin dashboard should now be working.** 🎉


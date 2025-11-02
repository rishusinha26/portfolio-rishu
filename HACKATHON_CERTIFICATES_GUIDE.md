# 🏆 Hackathon Certificates Upload Guide

This guide will help you add your two hackathon certificates to your portfolio.

---

## 📋 Current Status

✅ Removed "Full Stack Web Development" work experience  
✅ Removed "Full Stack Web Development" certification  
✅ Added 2 hackathon placeholders to database  

---

## 🚀 Step-by-Step Instructions

### Step 1: Upload Your Certificates

Choose one of these free image hosting services:

#### **Option A: Imgur (Easiest)**
1. Go to https://imgur.com
2. Click "New post" → Upload your certificate image
3. Right-click the uploaded image → "Copy image address"
4. Save the URL (example: `https://i.imgur.com/abc123.jpg`)

#### **Option B: ImgBB**
1. Go to https://imgbb.com
2. Click "Start Uploading" → Upload certificate
3. Copy the "Direct link" 
4. Save the URL https://ibb.co/C53qd8mv (SIH)
https://ibb.co/5WZtHbfY (CSE HACK LITRATE)


#### **Option C: Cloudinary** (Best quality)
1. Sign up at https://cloudinary.com (free)
2. Upload certificate to Media Library
3. Copy the URL from the uploaded file
4. Save the URL

---

### Step 2: Update Hackathon Entries

You have 3 hackathon entries in the database:

1. **SIH College Hackathon** (already has details)
2. **Hackathon Achievement** (placeholder #1 - needs your details)
3. **Hackathon Achievement** (placeholder #2 - needs your details)

#### Method 1: Via Admin Dashboard (Recommended)

1. **Login to Admin Dashboard**
   - Go to: `http://localhost:5174/login`
   - Login with your Firebase account
   - Navigate to `/admin`

2. **Edit Hackathon Entries**
   - Click "Experiences" tab
   - Click the ✏️ Edit button on each hackathon entry
   - Update the following fields:
     - **Title**: Your hackathon achievement title
     - **Organization**: Name of the hackathon/event
     - **Location**: Location of the hackathon
     - **Start Date** / **End Date**: When it happened
     - **Description**: What you achieved/accomplished
     - **Skills**: Technologies/tools used
     - **Certificate URL**: Paste the certificate image URL you uploaded
   - Click "Save"

#### Method 2: Update Seed Data Script

1. **Edit `backend/scripts/seedData.js`**
   - Find the hackathon entries (lines 103-128)
   - Update the placeholder entries with your details:

```javascript
{
  type: 'hackathon',
  title: 'Your Hackathon Achievement Title',
  organization: 'Hackathon Name/Organization',
  location: 'City, Country',
  startDate: new Date('2024-06-01'), // Your date
  endDate: new Date('2024-06-02'),    // Your date
  current: false,
  description: 'Your achievement description...',
  skills: ['Skill1', 'Skill2', 'Skill3'],
  certificateUrl: 'https://i.imgur.com/your-certificate-url.jpg', // Your uploaded URL
  order: 3
}
```

2. **Run Seed Script Again**
   ```bash
   cd backend
   node scripts/seedData.js
   ```

⚠️ **Note**: This will reset ALL data (projects and experiences). Only use if you want to start fresh.

---

### Step 3: Verify Certificates Display

1. **Refresh your frontend** at `http://localhost:5174/experience`
2. **Click "Hackathons" tab**
3. **Verify**:
   - Your hackathon entries appear
   - Certificate images are visible
   - "View Certificate →" links work
   - All details are correct

---

## ✅ Checklist

- [ ] Uploaded Certificate #1 to image hosting service
- [ ] Uploaded Certificate #2 to image hosting service
- [ ] Got URL for Certificate #1
- [ ] Got URL for Certificate #2
- [ ] Updated Hackathon Entry #1 with details and certificate URL
- [ ] Updated Hackathon Entry #2 with details and certificate URL
- [ ] Verified certificates display correctly on frontend
- [ ] Tested "View Certificate" links

---

## 💡 Tips

1. **Image Size**: Keep certificates under 2MB for faster loading
2. **Image Format**: Use JPG for photos, PNG for graphics with text
3. **URL Testing**: Always test certificate URLs in browser before adding
4. **Backup URLs**: Save certificate URLs somewhere safe (notes/document)
5. **Multiple Certificates**: You can add more hackathons via Admin Dashboard

---

## 🆘 Troubleshooting

**Certificate not showing?**
- Check if URL is publicly accessible (try opening in new tab)
- Ensure URL ends with image extension (.jpg, .png, etc.)
- Verify URL is correct (no typos)

**Can't edit in Admin Dashboard?**
- Make sure you're logged in
- Verify you have admin access
- Check browser console for errors

**Need to add more hackathons?**
- Use Admin Dashboard → Experiences → Add Experience
- Select "Hackathon" as the type
- Fill in all details and certificate URL

---

## 📝 Quick Reference

- **Frontend Experience Page**: `http://localhost:5174/experience`
- **Admin Dashboard**: `http://localhost:5174/admin`
- **Seed Data Script**: `backend/scripts/seedData.js`
- **Experience Model**: Supports `certificateUrl` field for hackathons

---

**You're all set! Add your certificate URLs and update your hackathon achievements!** 🎉


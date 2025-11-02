# 📦 Dropbox Resume Setup Guide

Complete guide to upload your resume PDF to Dropbox and use it in your portfolio.

---

## 🚀 Step-by-Step Instructions

### Step 1: Upload Resume to Dropbox

1. **Sign in** to your Dropbox account at https://www.dropbox.com
   - Don't have an account? Sign up for free at https://www.dropbox.com/signup

2. **Navigate** to your Dropbox folder (or create a new folder like "Portfolio" or "Resume")

3. **Upload your resume PDF**:
   - Click "Upload" button (top right)
   - Select your resume PDF file (e.g., `Rishu_Kumar_Sinha_Resume.pdf`)
   - Wait for upload to complete

   

---

### Step 2: Get the Share Link

1. **Right-click** on your uploaded resume PDF file

2. **Click** "Copy link" or "Share" → "Copy link"

3. You'll get a link that looks like this:
   ```
   https://www.dropbox.com/s/abcdef1234567890/resume.pdf?dl=0
   ```

   **Note:** The `?dl=0` means it will open in Dropbox viewer (not download)

---

### Step 3: Convert to Direct Download Link

To make the file download directly instead of opening in Dropbox:

1. **Copy** your sharing link
2. **Change** `?dl=0` to `?dl=1`
3. **That's it!**

**Example:**
```
❌ Original (opens in viewer):
https://www.dropbox.com/s/abcdef1234567890/resume.pdf?dl=0

✅ Direct download:
https://www.dropbox.com/s/abcdef1234567890/resume.pdf?dl=1
```

---

### Step 4: Configure in Your Portfolio

#### **Option A: Using Environment Variable (Recommended)**

1. **Open or create** `frontend/.env` file

2. **Add this line**:
   ```env
   VITE_RESUME_URL=https://www.dropbox.com/s/abcdef1234567890/resume.pdf?dl=1
   ```
   (Replace with your actual Dropbox link)

3. **Save** the file

4. **Restart** your frontend server:
   - Stop the server (Ctrl+C)
   - Start again: `npm run dev`

#### **Option B: Direct in Code**

1. **Open** `frontend/src/pages/About.jsx`

2. **Find** this line (around line 62):
   ```javascript
   const resumePdfUrl = import.meta.env.VITE_RESUME_URL || '';
   ```

3. **Change** it to:
   ```javascript
   const resumePdfUrl = 'https://www.dropbox.com/s/abcdef1234567890/resume.pdf?dl=1';
   ```
   (Replace with your actual Dropbox link)

---

### Step 5: Test It

1. **Visit** your portfolio: `http://localhost:5174/about`

2. **Click** "Download Resume" button

3. **Verify** your resume PDF downloads correctly

---

## 📋 Complete Example

**Your Dropbox sharing link:**
```
https://www.dropbox.com/s/xyz123abc456def789/Rishu_Kumar_Sinha_Resume.pdf?dl=0
```

**Converted to direct download:**
```
https://www.dropbox.com/s/xyz123abc456def789/Rishu_Kumar_Sinha_Resume.pdf?dl=1
```

**Add to `frontend/.env`:**
```env
VITE_RESUME_URL=https://www.dropbox.com/s/xyz123abc456def789/Rishu_Kumar_Sinha_Resume.pdf?dl=1
```

**Result:** ✅ Resume downloads when clicked!

---

## ✅ Verify Your Link Works

Before adding to your portfolio, test the link:

1. **Copy** your direct download link (`?dl=1`)
2. **Paste** it in a new browser tab
3. **Press Enter**
4. **Check**: PDF should download (not open in viewer)

If it opens in Dropbox viewer instead:
- Make sure you changed `?dl=0` to `?dl=1`
- The file must be shared (not private)

---

## 🔒 Privacy Settings

Make sure your resume is accessible:

1. **Right-click** on the resume file in Dropbox
2. **Click** "Share" → "Link settings"
3. **Select** "Anyone with the link can view"
4. **Save** settings

---

## 💡 Tips

1. **Use a descriptive filename**: `Rishu_Kumar_Sinha_Resume.pdf` is better than `resume.pdf`

2. **Keep it updated**: When you update your resume:
   - Upload the new version with the same filename
   - Or update the URL in your `.env` file

3. **Test periodically**: Make sure the link still works

4. **Backup**: Keep a copy of your resume locally

---

## 🆘 Troubleshooting

### Link doesn't download?

**Problem**: Link opens in Dropbox viewer  
**Solution**: Make sure you changed `?dl=0` to `?dl=1`

**Problem**: "File not found" error  
**Solution**: 
- Check the file is shared publicly
- Verify the link is correct
- Make sure file hasn't been deleted

**Problem**: Downloads but wrong file  
**Solution**: 
- Check you copied the correct link
- Verify the filename matches

### Link works in browser but not in portfolio?

**Problem**: Environment variable not loaded  
**Solution**: 
- Make sure you saved `.env` file
- Restart your frontend server
- Check `.env` file is in `frontend/` folder (not root)

**Problem**: CORS error  
**Solution**: Dropbox links usually work fine, but if you see CORS errors, try a different hosting service (Google Drive or GitHub)

---

## 🎯 Quick Checklist

- [ ] Resume PDF uploaded to Dropbox
- [ ] File shared with "Anyone with the link"
- [ ] Copied sharing link
- [ ] Changed `?dl=0` to `?dl=1`
- [ ] Tested link in browser (downloads correctly)
- [ ] Added URL to `frontend/.env` or code
- [ ] Restarted frontend server
- [ ] Tested download button on portfolio

---

**That's it! Your resume is now hosted on Dropbox and ready to download from your portfolio!** 🎉


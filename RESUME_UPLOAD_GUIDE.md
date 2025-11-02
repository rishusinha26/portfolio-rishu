# 📄 Resume Upload Guide

Upload your resume PDF online and use the URL for download instead of generating it dynamically.

---

## 🌟 Benefits

✅ **Simpler** - No complex PDF generation  
✅ **More Reliable** - Direct file download  
✅ **Faster** - Instant download  
✅ **Better Quality** - Use your professionally formatted resume  
✅ **Easier Updates** - Just replace the file online  

---

## 📤 Step 1: Upload Your Resume

Choose one of these free hosting services:

### **Option 1: Google Drive (Recommended)**

1. **Upload your resume PDF** to Google Drive
2. **Right-click** the file → "Get link"
3. **Set permissions** to "Anyone with the link"
4. **Copy the link** - it looks like:
   ```
   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
   ```
5. **Convert to direct download link**:
   ```
   https://drive.google.com/uc?export=download&id=FILE_ID
   ```
   (Replace `FILE_ID` with the ID from the sharing link)

**Example:**
```
Original: https://drive.google.com/file/d/1ABC123xyz789/view?usp=sharing
Direct:   https://drive.google.com/uc?export=download&id=1ABC123xyz789
```

---

### **Option 2: Dropbox**

1. **Upload your resume PDF** to Dropbox
2. **Right-click** → "Copy link"
3. **Change the link** from `?dl=0` to `?dl=1`:
   ```
   Original: https://www.dropbox.com/s/abc123/resume.pdf?dl=0
   Direct:   https://www.dropbox.com/s/abc123/resume.pdf?dl=1
   ```

---

### **Option 3: GitHub (For Developers)**

1. **Create a repository** or use an existing one
2. **Upload** your resume PDF
3. **Get the raw URL**:
   - Click on the file
   - Click "Raw" button
   - Copy the URL
   
**Example:**
```
https://raw.githubusercontent.com/username/repo/main/resume.pdf
```

---

### **Option 4: Cloudinary**

1. **Sign up** at https://cloudinary.com (free)
2. **Upload** your resume PDF
3. **Copy the secure URL**

---

### **Option 5: Firebase Storage** (If you're using Firebase)

1. **Upload** to Firebase Storage
2. **Get the download URL**
3. **Use that URL**

---

## ⚙️ Step 2: Configure Resume URL

### **Method A: Environment Variable (Recommended)**

1. **Open or create** `frontend/.env`
2. **Add this line**:
   ```env
   VITE_RESUME_URL=https://drive.google.com/uc?export=download&id=YOUR_FILE_ID
   ```
3. **Restart** your frontend server

### **Method B: Direct in Code**

1. **Edit** `frontend/src/pages/About.jsx`
2. **Find** the line with `resumePdfUrl`
3. **Update** it:
   ```javascript
   const resumePdfUrl = 'https://your-resume-url.com/resume.pdf';
   ```

---

## ✅ Step 3: Test

1. **Visit** your portfolio: `http://localhost:5174/about`
2. **Click** "Download Resume" button
3. **Verify** your resume PDF downloads correctly

---

## 🔄 How It Works

When you click "Download Resume":

1. **If resume URL is set**: Downloads directly from the URL
2. **If no URL**: Generates PDF dynamically from resume data

---

## 📝 Quick Example

**Google Drive Setup:**

1. Upload `Rishu_Kumar_Sinha_Resume.pdf` to Google Drive
2. Share link: `https://drive.google.com/file/d/1ABC123xyz789/view?usp=sharing`
3. Extract file ID: `1ABC123xyz789`
4. Direct download URL: `https://drive.google.com/uc?export=download&id=1ABC123xyz789`
5. Add to `frontend/.env`:
   ```env
   VITE_RESUME_URL=https://drive.google.com/uc?export=download&id=1ABC123xyz789
   ```
6. Restart frontend → Done! ✅

---

## 💡 Tips

1. **Test the URL** - Make sure it downloads when you open it in browser
2. **Check permissions** - File must be publicly accessible
3. **Use HTTPS** - More secure and reliable
4. **Keep it updated** - Upload new version, same URL works (or update URL)

---

## 🆘 Troubleshooting

**Resume doesn't download?**
- Check if URL is publicly accessible
- Verify URL works in browser
- Check browser console for errors
- Ensure URL points directly to PDF file (not a page)

**URL opens instead of downloading?**
- For Google Drive: Make sure you use the direct download format
- Some browsers may open PDF instead of downloading - this is normal

**Want to switch back to dynamic generation?**
- Just remove or comment out `VITE_RESUME_URL` in `.env`
- The system will automatically use dynamic PDF generation

---

**That's it! Upload your resume once and you're done!** 🎉


# 📊 MongoDB Compass - Manual Data Entry Guide

## Step-by-Step: Adding Your Projects and Experience

---

## 🔌 Step 1: Connect to MongoDB

1. **Open MongoDB Compass**
2. **Connection String**: `mongodb://localhost:27017`
3. Click **"Connect"**

---

## 📁 Step 2: Create Database

1. Click **"Create Database"** button (top left)
2. **Database Name**: `portfolio`
3. **Collection Name**: `projects`
4. Click **"Create Database"**

---

## 📝 Step 3: Add Projects

### Create Projects Collection (if not exists)

1. Select `portfolio` database
2. Click **"Create Collection"**
3. Name: `projects`
4. Click **"Create Collection"**

### Add Project Documents

1. Click on `projects` collection
2. Click **"ADD DATA"** → **"Insert Document"**
3. Copy and paste each project below:

---

### Project 1: FinFlow

```json
{
  "title": "FinFlow - AI Powered Personal Finance Companion",
  "description": "Built a full-stack personal finance web application to simplify money management by helping users track expenses, manage investments, and monitor debts in one unified platform.",
  "longDescription": "Integrated real-time synchronization, secure authentication, AI-driven insights, interactive dashboards, and a chatbot assistant for personalized financial guidance and improved user engagement.",
  "technologies": [
    "React 18",
    "TypeScript",
    "TailwindCSS",
    "Recharts",
    "Node.js",
    "Express.js",
    "Firebase",
    "GEMINI API",
    "Cloud Functions"
  ],
  "githubUrl": "https://github.com/Rishusinha26/finflow",
  "liveUrl": "https://finflow-demo.web.app",
  "imageUrl": "https://via.placeholder.com/600x400?text=FinFlow",
  "featured": true,
  "category": "Full Stack",
  "status": "completed",
  "startDate": "2024-01-01T00:00:00.000Z",
  "endDate": "2024-03-01T00:00:00.000Z",
  "createdAt": "2024-10-31T00:00:00.000Z",
  "updatedAt": "2024-10-31T00:00:00.000Z"
}
```

**Steps:**
1. Click **"ADD DATA"** → **"Insert Document"**
2. Paste the JSON above
3. Click **"Insert"**

---

### Project 2: CareerMitra

```json
{
  "title": "CareerMitra – AI-Powered Educational Guidance Platform",
  "description": "Full-stack educational guidance platform addressing the lack of personalized mentorship, limited college awareness, and missed deadlines by providing a centralized hub for career discovery, college search, and application tracking.",
  "longDescription": "Features include AI-powered aptitude quizzes, personalized career recommendations, searchable college directory, deadline tracker, multilingual support, dark/light mode, voice assistant, and secure authentication.",
  "technologies": [
    "React 18",
    "Vite",
    "TailwindCSS",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Firebase",
    "Axios",
    "React Context API"
  ],
  "githubUrl": "https://github.com/Rishusinha26/careermitra",
  "liveUrl": "https://careermitra-demo.web.app",
  "imageUrl": "https://via.placeholder.com/600x400?text=CareerMitra",
  "featured": true,
  "category": "Full Stack",
  "status": "completed",
  "startDate": "2024-04-01T00:00:00.000Z",
  "endDate": "2024-06-01T00:00:00.000Z",
  "createdAt": "2024-10-31T00:00:00.000Z",
  "updatedAt": "2024-10-31T00:00:00.000Z"
}
```

**Steps:**
1. Click **"ADD DATA"** → **"Insert Document"**
2. Paste the JSON above
3. Click **"Insert"**

---

### Project 3: WasteNot

```json
{
  "title": "WasteNot: AI-Powered Food Waste Reduction Platform",
  "description": "Built WasteNot, a modern food waste reduction platform designed to minimize food loss by connecting farms, restaurants, and food banks, while providing clear impact tracking and user engagement metrics.",
  "longDescription": "Features include home page with hero banner and stats, 3-step process, testimonials, newsletter signup, About and Contact pages, sticky header, mobile menu, dark/light mode, animations, WCAG 2.1 AA compliance, and Firebase authentication.",
  "technologies": [
    "Next.js 15+",
    "TypeScript",
    "TailwindCSS",
    "shadcn/ui",
    "React Hook Form",
    "Zod",
    "next-themes",
    "Inter font",
    "Firebase"
  ],
  "githubUrl": "https://github.com/Rishusinha26/wastenot",
  "liveUrl": "https://wastenot-demo.vercel.app",
  "imageUrl": "https://via.placeholder.com/600x400?text=WasteNot",
  "featured": true,
  "category": "Full Stack",
  "status": "completed",
  "startDate": "2024-07-01T00:00:00.000Z",
  "endDate": "2024-09-01T00:00:00.000Z",
  "createdAt": "2024-10-31T00:00:00.000Z",
  "updatedAt": "2024-10-31T00:00:00.000Z"
}
```

**Steps:**
1. Click **"ADD DATA"** → **"Insert Document"**
2. Paste the JSON above
3. Click **"Insert"**

---

## 💼 Step 4: Add Experience

### Create Experiences Collection

1. In `portfolio` database, click **"Create Collection"**
2. Name: `experiences`
3. Click **"Create Collection"**

### Add Experience Documents

---

### Experience 1: Full Stack Developer

```json
{
  "title": "Full Stack Developer",
  "company": "Personal Projects",
  "location": "Remote",
  "startDate": "2023-09-01T00:00:00.000Z",
  "endDate": null,
  "current": true,
  "description": "Building full-stack web applications using modern technologies like React, Node.js, and MongoDB.",
  "responsibilities": [
    "Developed 3+ full-stack applications with AI integration",
    "Implemented secure authentication and real-time features",
    "Created responsive, accessible user interfaces",
    "Integrated third-party APIs and services",
    "Deployed applications on cloud platforms"
  ],
  "technologies": [
    "React",
    "Node.js",
    "MongoDB",
    "Firebase",
    "TypeScript",
    "TailwindCSS",
    "Express.js",
    "Next.js"
  ],
  "type": "work",
  "createdAt": "2024-10-31T00:00:00.000Z",
  "updatedAt": "2024-10-31T00:00:00.000Z"
}
```

---

### Experience 2: Aurora Club Member

```json
{
  "title": "Core Member - Aurora Club",
  "company": "Siddagange Institute of Technology",
  "location": "Tumakuru, Karnataka",
  "startDate": "2023-09-01T00:00:00.000Z",
  "endDate": null,
  "current": true,
  "description": "Theatrical Club of SIT - Leading activities, mentoring juniors, and coordinating productions and events.",
  "responsibilities": [
    "Led theatrical activities and performances",
    "Mentored junior members in acting and production",
    "Coordinated college events and productions",
    "Achieved 2nd place in Natya Samaroh (Hutsav 2021)",
    "Achieved 3rd place in Mime (IITM 2021)"
  ],
  "technologies": [],
  "type": "extracurricular",
  "createdAt": "2024-10-31T00:00:00.000Z",
  "updatedAt": "2024-10-31T00:00:00.000Z"
}
```

---

### Experience 3: Hackathon Achievements

```json
{
  "title": "Hackathon Participant",
  "company": "Various Hackathons",
  "location": "India",
  "startDate": "2023-01-01T00:00:00.000Z",
  "endDate": "2024-12-01T00:00:00.000Z",
  "current": false,
  "description": "Participated in multiple hackathons, demonstrating problem-solving and teamwork skills.",
  "responsibilities": [
    "HACK-CSE-LERATE: College hackathon participation (Certificate)",
    "SIH College Hackathon: Secured Top 15 position among 70 teams (Certificate)",
    "Contributed to coding, problem-solving, and project development",
    "Demonstrated programming, analytical, and teamwork skills"
  ],
  "technologies": [
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "Git",
    "GitHub"
  ],
  "type": "achievement",
  "createdAt": "2024-10-31T00:00:00.000Z",
  "updatedAt": "2024-10-31T00:00:00.000Z"
}
```

---

## 📧 Step 5: Create Messages Collection (Optional)

1. In `portfolio` database, click **"Create Collection"**
2. Name: `messages`
3. Click **"Create Collection"**

This collection will automatically populate when people use your contact form.

**Sample Message Structure** (for reference):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hi, I'd like to discuss a project opportunity.",
  "read": false,
  "createdAt": "2024-10-31T00:00:00.000Z"
}
```

---

## ✅ Verification

After adding all documents:

1. **Check Projects**: Should see 3 documents in `projects` collection
2. **Check Experiences**: Should see 3 documents in `experiences` collection
3. **Check Messages**: Collection exists (will be empty until someone contacts you)

---

## 🌐 View in Your Portfolio

1. Start your backend: `cd backend && npm run dev`
2. Start your frontend: `cd frontend && npm run dev`
3. Visit: http://localhost:5173/projects
4. Visit: http://localhost:5173/experience

You should now see all your projects and experience!

---

## 🎨 Customizing Your Data

### To Edit a Document:

1. Click on the document in MongoDB Compass
2. Click the **pencil icon** (Edit)
3. Modify the JSON
4. Click **"Update"**

### To Delete a Document:

1. Hover over the document
2. Click the **trash icon**
3. Confirm deletion

### To Add More Projects:

1. Click **"ADD DATA"** → **"Insert Document"**
2. Use the same structure as above
3. Change the values to your project details

---

## 📝 Field Explanations

### Projects Fields:

- **title**: Project name
- **description**: Short description (1-2 sentences)
- **longDescription**: Detailed description
- **technologies**: Array of tech stack items
- **githubUrl**: GitHub repository link
- **liveUrl**: Live demo link
- **imageUrl**: Project screenshot URL
- **featured**: true/false (shows on homepage)
- **category**: "Full Stack", "Frontend", "Backend", etc.
- **status**: "completed", "in-progress", "planned"
- **startDate**: Project start date (ISO format)
- **endDate**: Project end date (ISO format)

### Experience Fields:

- **title**: Job/role title
- **company**: Company/organization name
- **location**: City, State/Country
- **startDate**: Start date (ISO format)
- **endDate**: End date (null if current)
- **current**: true/false
- **description**: Brief overview
- **responsibilities**: Array of bullet points
- **technologies**: Array of tech used
- **type**: "work", "education", "extracurricular", "achievement"

---

## 🚀 Quick Tips

1. **Date Format**: Use ISO 8601 format: `"2024-01-01T00:00:00.000Z"`
2. **Arrays**: Use `["item1", "item2"]` format
3. **Booleans**: Use `true` or `false` (no quotes)
4. **Null**: Use `null` for empty values
5. **Strings**: Always use double quotes `"text"`

---

## 🐛 Common Issues

**Issue**: "Document failed to insert"
**Solution**: Check JSON syntax - missing commas, quotes, or brackets

**Issue**: "Data not showing in portfolio"
**Solution**: 
- Ensure backend is running
- Check browser console for errors
- Verify collection names are correct (lowercase)

**Issue**: "Cannot connect to MongoDB"
**Solution**:
- Ensure MongoDB Compass is running
- Check connection string: `mongodb://localhost:27017`

---

## ✨ You're Done!

Your portfolio database is now populated with:
- ✅ 3 Projects (FinFlow, CareerMitra, WasteNot)
- ✅ 3 Experience entries
- ✅ Messages collection ready

Visit your portfolio to see everything in action! 🎉

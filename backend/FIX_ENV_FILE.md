# 🔧 Fix Your .env File

## The Problem

The error "Invalid scheme" means your `.env` file has the MONGO_URI formatted incorrectly.

## ✅ Correct Format

Your `backend/.env` file should look exactly like this:

```env
MONGO_URI=mongodb+srv://rishu:Rishu%4054321@cluster-portfolio.kuv9nyx.mongodb.net/portfolio?appName=Cluster-portfolio
```

## ❌ Common Mistakes to Avoid

### Wrong Format 1 (with quotes):
```env
MONGO_URI="mongodb+srv://rishu:Rishu%4054321@..."
```
**Remove the quotes!**

### Wrong Format 2 (with spaces):
```env
MONGO_URI = mongodb+srv://...
```
**No spaces around = !**

### Wrong Format 3 (duplicate prefix):
```env
MONGO_URI=MONGO_URI=mongodb+srv://...
```
**Only one MONGO_URI= at the start!**

### Wrong Format 4 (password not encoded):
```env
MONGO_URI=mongodb+srv://rishu:Rishu@54321@...
```
**Password must be URL-encoded: @ = %40**

## 📝 Step-by-Step Fix

1. **Open `backend/.env` file**

2. **Find the MONGO_URI line**

3. **Replace with this (use your actual password, URL-encoded):**
   ```env
   MONGO_URI=mongodb+srv://rishu:Rishu%4054321@cluster-portfolio.kuv9nyx.mongodb.net/portfolio?appName=Cluster-portfolio
   ```

4. **If your password is different**, URL-encode it:
   - `@` → `%40`
   - `<` → `%3C`
   - `>` → `%3E`
   - `#` → `%23`
   - `%` → `%25`

5. **Save the file**

6. **Run the seed script again:**
   ```bash
   cd backend
   node scripts/seedData.js
   ```

## 🧪 Quick Test

To verify your .env is loaded correctly, you can create a test file:

**backend/test-env.js:**
```javascript
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI;
console.log('MONGO_URI value:', uri);
console.log('Starts with mongodb+srv?:', uri?.startsWith('mongodb+srv://'));
```

Run: `node backend/test-env.js`

It should show:
```
MONGO_URI value: mongodb+srv://rishu:****@cluster-portfolio...
Starts with mongodb+srv?: true
```


# 🗄️ MongoDB Atlas Connection Setup

## Connection String Format

Your MongoDB Atlas connection string needs to have the password URL-encoded.

### Your Current Connection String:
```
mongodb+srv://rishu:<Rishu@54321>@cluster-portfolio.kuv9nyx.mongodb.net/?appName=Cluster-portfolio
```

### ✅ Corrected Format (URL-encoded password):

The password `Rishu@54321` needs to be URL-encoded. Special characters:
- `@` becomes `%40`
- `<` becomes `%3C`
- `>` becomes `%3E`

**Correct connection string:**
```
mongodb+srv://rishu:Rishu%4054321@cluster-portfolio.kuv9nyx.mongodb.net/portfolio?appName=Cluster-portfolio
```

Or if your actual password includes the brackets `<>`:
```
mongodb+srv://rishu:%3CRishu%4054321%3E@cluster-portfolio.kuv9nyx.mongodb.net/portfolio?appName=Cluster-portfolio
```

### 📝 Steps to Update:

1. **Open `backend/.env` file**

2. **Add/Update MONGO_URI:**
   ```env
   MONGO_URI=mongodb+srv://rishu:Rishu%4054321@cluster-portfolio.kuv9nyx.mongodb.net/portfolio?appName=Cluster-portfolio
   ```
   
   **Note:** Replace `Rishu%4054321` with your actual URL-encoded password.

3. **Common URL Encoding:**
   - `@` → `%40`
   - `#` → `%23`
   - `%` → `%25`
   - `<` → `%3C`
   - `>` → `%3E`
   - ` ` (space) → `%20`

### 🔒 Security Checklist:

1. ✅ Whitelist IP addresses in MongoDB Atlas
   - Go to: MongoDB Atlas → Network Access
   - Add your server IP or `0.0.0.0/0` for all IPs (development only)

2. ✅ Database user permissions
   - Ensure user has read/write access to your database

3. ✅ Connection string security
   - Never commit `.env` file to git
   - Use environment variables in production (Render, Railway, etc.)

### 🧪 Test Connection:

Run your backend server:
```bash
cd backend
npm start
```

You should see:
```
✅ Connected to MongoDB Atlas: cluster-portfolio-shard-00-00.kuv9nyx.mongodb.net
📊 Database: portfolio
```

### ❌ Common Errors:

1. **"Authentication failed"**
   - Check password URL encoding
   - Verify username and password in MongoDB Atlas

2. **"IP not whitelisted"**
   - Add your IP to MongoDB Atlas Network Access
   - Or temporarily use `0.0.0.0/0` for all IPs

3. **"Server selection timed out"**
   - Check internet connection
   - Verify connection string format
   - Check MongoDB Atlas cluster status


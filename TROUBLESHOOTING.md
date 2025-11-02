# 🔧 Troubleshooting Guide

Common issues and their solutions.

## Table of Contents
- [Installation Issues](#installation-issues)
- [Backend Issues](#backend-issues)
- [Frontend Issues](#frontend-issues)
- [Database Issues](#database-issues)
- [Firebase Issues](#firebase-issues)
- [Email Issues](#email-issues)
- [Deployment Issues](#deployment-issues)

---

## Installation Issues

### npm install fails

**Problem**: Dependencies won't install

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Try with legacy peer deps
npm install --legacy-peer-deps
```

### Node version mismatch

**Problem**: "Unsupported engine" error

**Solution**:
```bash
# Check your Node version
node --version

# Should be v18 or higher
# Install nvm and switch versions
nvm install 18
nvm use 18
```

---

## Backend Issues

### Server won't start

**Problem**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env
PORT=5001
```

### MongoDB connection error

**Problem**: `MongoServerError: bad auth`

**Solutions**:
1. Check username and password in connection string
2. Verify database user exists in MongoDB Atlas
3. Check if password contains special characters (URL encode them)
4. Ensure IP is whitelisted in MongoDB Atlas

**Problem**: `MongoNetworkError: connection timed out`

**Solutions**:
1. Check internet connection
2. Verify IP whitelist in MongoDB Atlas
3. Try "Allow access from anywhere" (0.0.0.0/0)
4. Check firewall settings

### Firebase Admin SDK error

**Problem**: `Error: Firebase app initialization failed`

**Solutions**:
1. Verify `FIREBASE_PRIVATE_KEY` format (keep `\n` characters)
2. Ensure quotes around private key: `"-----BEGIN...-----"`
3. Check project ID matches Firebase Console
4. Verify service account email is correct

### CORS errors

**Problem**: `Access to XMLHttpRequest has been blocked by CORS policy`

**Solutions**:
1. Check `FRONTEND_URL` in backend .env
2. Ensure frontend is running on correct port
3. Verify CORS configuration in `server.js`
4. In production, update to production URLs

### Rate limit errors

**Problem**: `429 Too Many Requests`

**Solutions**:
1. Wait for rate limit window to reset
2. Adjust rate limits in `server.js` for development
3. Use different IP or clear cookies

---

## Frontend Issues

### White screen after build

**Problem**: Blank page in production

**Solutions**:
1. Check browser console for errors
2. Verify all environment variables are set
3. Ensure `VITE_API_URL` is correct
4. Check Vercel build logs
5. Test production build locally:
```bash
npm run build
npm run preview
```

### API calls failing

**Problem**: `Network Error` or `404 Not Found`

**Solutions**:
1. Verify backend is running
2. Check `VITE_API_URL` in .env
3. Ensure backend URL is correct (no trailing slash)
4. Check CORS settings in backend
5. Verify API endpoints exist

### Firebase authentication not working

**Problem**: Login fails or redirects incorrectly

**Solutions**:
1. Check Firebase config in frontend .env
2. Verify all Firebase env variables are set
3. Check authorized domains in Firebase Console
4. Clear browser cache and cookies
5. Check Firebase Console for errors

### Theme not persisting

**Problem**: Theme resets on page reload

**Solutions**:
1. Check browser localStorage
2. Verify ThemeContext is wrapping App
3. Check for localStorage errors in console
4. Try different browser

### Images not loading

**Problem**: Broken image links

**Solutions**:
1. Verify Firebase Storage rules allow public read
2. Check image URLs are correct
3. Ensure files were uploaded successfully
4. Check browser console for 403 errors

---

## Database Issues

### Cannot connect to MongoDB

**Problem**: Connection timeout or authentication failed

**Solutions**:
1. **Check connection string format**:
```
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

2. **Verify credentials**:
   - Username is correct
   - Password is correct (no special characters or URL encoded)
   - Database name is correct

3. **Check network access**:
   - IP is whitelisted in MongoDB Atlas
   - Try 0.0.0.0/0 for testing
   - Check firewall settings

4. **Test connection**:
```bash
# Use MongoDB Compass to test connection
# Or use mongosh
mongosh "your_connection_string"
```

### Data not saving

**Problem**: CRUD operations fail

**Solutions**:
1. Check database user permissions
2. Verify model schemas are correct
3. Check for validation errors in console
4. Ensure required fields are provided

### Queries are slow

**Problem**: Database queries take too long

**Solutions**:
1. Add indexes to frequently queried fields
2. Limit query results
3. Use projection to select only needed fields
4. Check MongoDB Atlas performance metrics

---

## Firebase Issues

### Authentication errors

**Problem**: `auth/invalid-api-key`

**Solution**: Verify `VITE_FIREBASE_API_KEY` is correct

**Problem**: `auth/unauthorized-domain`

**Solution**: Add domain to authorized domains in Firebase Console

**Problem**: `auth/user-not-found`

**Solution**: Create user in Firebase Console → Authentication → Users

### Storage errors

**Problem**: `storage/unauthorized`

**Solutions**:
1. Check Storage rules allow authenticated writes
2. Verify user is logged in
3. Check Firebase token is valid

**Problem**: `storage/quota-exceeded`

**Solutions**:
1. Check Firebase Storage usage
2. Delete unused files
3. Upgrade Firebase plan if needed

### Admin SDK errors

**Problem**: `credential-impl.error Credential implementation provided to initializeApp() via the "credential" property failed`

**Solutions**:
1. Verify service account JSON is correct
2. Check private key format (keep `\n` as `\n`, not actual newlines)
3. Ensure all required fields are present
4. Re-download service account key from Firebase

---

## Email Issues

### Emails not sending

**Problem**: `Invalid login` error

**Solutions**:
1. Use Gmail App Password, not regular password
2. Enable 2-Step Verification on Google Account
3. Generate new App Password
4. Verify `EMAIL_USER` and `EMAIL_PASS` in .env

**Problem**: `Connection timeout`

**Solutions**:
1. Check internet connection
2. Verify Gmail SMTP is not blocked by firewall
3. Try different email service
4. Check Gmail account settings

### Emails going to spam

**Solutions**:
1. Set up SPF and DKIM records (for custom domain)
2. Use professional email content
3. Avoid spam trigger words
4. Send from verified domain

---

## Deployment Issues

### Vercel deployment fails

**Problem**: Build fails on Vercel

**Solutions**:
1. Check build logs in Vercel dashboard
2. Verify all environment variables are set
3. Ensure `package.json` scripts are correct
4. Test build locally: `npm run build`
5. Check Node version compatibility

**Problem**: Environment variables not working

**Solutions**:
1. Ensure variables start with `VITE_` for frontend
2. Redeploy after adding variables
3. Check variable names match exactly
4. No quotes around values in Vercel

### Render deployment fails

**Problem**: Backend won't start on Render

**Solutions**:
1. Check Render logs for errors
2. Verify all environment variables are set
3. Ensure `package.json` has correct start script
4. Check Node version in Render settings
5. Verify MongoDB connection string

**Problem**: `Application failed to respond`

**Solutions**:
1. Check if app is listening on correct PORT
2. Use `process.env.PORT` not hardcoded port
3. Verify health check endpoint works
4. Check Render logs for errors

### Database connection in production

**Problem**: Cannot connect to MongoDB from deployed app

**Solutions**:
1. Whitelist 0.0.0.0/0 in MongoDB Atlas
2. Verify connection string in production env vars
3. Check MongoDB Atlas cluster is active
4. Test connection string locally first

---

## General Debugging Tips

### Check Logs

**Backend**:
```bash
# Local
Check terminal where backend is running

# Render
Dashboard → Logs tab
```

**Frontend**:
```bash
# Local
Check browser console (F12)

# Vercel
Dashboard → Deployments → View Function Logs
```

### Test API Endpoints

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test with verbose output
curl -v http://localhost:5000/api/projects

# Test POST request
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test"}'
```

### Clear Cache

**Browser**:
1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"

**npm**:
```bash
npm cache clean --force
```

### Environment Variables

**Check if loaded**:
```javascript
// Backend
console.log('PORT:', process.env.PORT);

// Frontend
console.log('API URL:', import.meta.env.VITE_API_URL);
```

### Database Queries

**Test in MongoDB Compass**:
1. Connect with connection string
2. Browse collections
3. Test queries manually

---

## Getting Help

If you're still stuck:

1. **Check Documentation**:
   - README.md
   - SETUP.md
   - DEPLOYMENT.md
   - API.md

2. **Search Error Messages**:
   - Google the exact error
   - Check Stack Overflow
   - Search GitHub issues

3. **Check Service Status**:
   - [MongoDB Atlas Status](https://status.mongodb.com/)
   - [Firebase Status](https://status.firebase.google.com/)
   - [Vercel Status](https://www.vercel-status.com/)
   - [Render Status](https://status.render.com/)

4. **Enable Debug Mode**:
```javascript
// Backend - Add to server.js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Frontend - Check network tab in DevTools
```

5. **Create Minimal Reproduction**:
   - Isolate the problem
   - Test with minimal code
   - Remove unnecessary dependencies

---

## Common Error Messages

### `ECONNREFUSED`
- Backend is not running
- Wrong port number
- Firewall blocking connection

### `ENOTFOUND`
- Wrong hostname/URL
- DNS issue
- No internet connection

### `ETIMEDOUT`
- Server not responding
- Network issue
- Firewall blocking

### `401 Unauthorized`
- Missing or invalid token
- User not authenticated
- Token expired

### `403 Forbidden`
- User doesn't have permission
- Not admin role
- CORS issue

### `404 Not Found`
- Wrong URL/endpoint
- Resource doesn't exist
- Route not defined

### `500 Internal Server Error`
- Server-side error
- Check backend logs
- Database connection issue

---

## Prevention Tips

1. **Always check logs first**
2. **Test locally before deploying**
3. **Keep dependencies updated**
4. **Use environment variables**
5. **Backup your database**
6. **Monitor error rates**
7. **Set up alerts**
8. **Document custom changes**

---

**Still having issues? Open an issue on GitHub with:**
- Error message
- Steps to reproduce
- Environment (OS, Node version, etc.)
- What you've tried
- Relevant logs

# 📡 API Documentation

Complete API reference for the Portfolio Backend.

## Base URL

- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-backend.onrender.com/api`

## Authentication

Protected routes require a Firebase ID token in the Authorization header:

```
Authorization: Bearer <firebase_id_token>
```

Get the token from Firebase Auth after login.

---

## Endpoints

### Health Check

#### GET /health

Check if the API is running.

**Response:**
```json
{
  "success": true,
  "message": "Portfolio API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## Projects

### GET /projects

Get all projects.

**Public**: Yes

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "E-Commerce Platform",
      "description": "Full-stack e-commerce application",
      "techStack": ["React", "Node.js", "MongoDB"],
      "imageUrl": "https://storage.googleapis.com/...",
      "githubUrl": "https://github.com/user/project",
      "liveUrl": "https://project.vercel.app",
      "featured": true,
      "order": 1,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### GET /projects/:id

Get a single project by ID.

**Public**: Yes

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "E-Commerce Platform",
    ...
  }
}
```

### POST /projects

Create a new project.

**Auth Required**: Yes (Admin only)

**Request Body:**
```json
{
  "title": "Project Title",
  "description": "Project description",
  "techStack": ["React", "Node.js"],
  "imageUrl": "https://...",
  "githubUrl": "https://github.com/...",
  "liveUrl": "https://...",
  "featured": false,
  "order": 0
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    ...
  }
}
```

### PUT /projects/:id

Update a project.

**Auth Required**: Yes (Admin only)

**Request Body:** Same as POST

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    ...
  }
}
```

### DELETE /projects/:id

Delete a project.

**Auth Required**: Yes (Admin only)

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

---

## Contact Messages

### POST /contact

Send a contact message.

**Public**: Yes

**Rate Limit**: 5 requests per hour per IP

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "I'd like to discuss a project...",
    "read": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### GET /contact

Get all contact messages.

**Auth Required**: Yes (Admin only)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Project Inquiry",
      "message": "I'd like to discuss a project...",
      "read": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### PATCH /contact/:id/read

Mark a message as read.

**Auth Required**: Yes (Admin only)

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "read": true,
    ...
  }
}
```

### DELETE /contact/:id

Delete a contact message.

**Auth Required**: Yes (Admin only)

**Response:**
```json
{
  "success": true,
  "message": "Message deleted successfully"
}
```

---

## Experiences

### GET /experiences

Get all experiences.

**Public**: Yes

**Query Parameters:**
- `type` (optional): Filter by type (work, education, certification, hackathon)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "type": "work",
      "title": "Senior Developer",
      "organization": "Tech Company",
      "location": "San Francisco, CA",
      "startDate": "2023-01-01T00:00:00.000Z",
      "endDate": "2024-01-01T00:00:00.000Z",
      "current": false,
      "description": "Led development of...",
      "skills": ["React", "Node.js"],
      "certificateUrl": "",
      "order": 0,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### GET /experiences/:id

Get a single experience by ID.

**Public**: Yes

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    ...
  }
}
```

### POST /experiences

Create a new experience.

**Auth Required**: Yes (Admin only)

**Request Body:**
```json
{
  "type": "work",
  "title": "Senior Developer",
  "organization": "Tech Company",
  "location": "San Francisco, CA",
  "startDate": "2023-01-01",
  "endDate": "2024-01-01",
  "current": false,
  "description": "Led development of...",
  "skills": ["React", "Node.js"],
  "certificateUrl": "",
  "order": 0
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    ...
  }
}
```

### PUT /experiences/:id

Update an experience.

**Auth Required**: Yes (Admin only)

**Request Body:** Same as POST

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    ...
  }
}
```

### DELETE /experiences/:id

Delete an experience.

**Auth Required**: Yes (Admin only)

**Response:**
```json
{
  "success": true,
  "message": "Experience deleted successfully"
}
```

---

## File Upload

### POST /upload

Upload a file to Firebase Storage.

**Auth Required**: Yes (Admin only)

**Content-Type**: `multipart/form-data`

**Request Body:**
- `file`: File to upload (max 5MB)

**Response:**
```json
{
  "success": true,
  "url": "https://storage.googleapis.com/bucket/filename.jpg",
  "fileName": "1234567890_filename.jpg"
}
```

### DELETE /upload

Delete a file from Firebase Storage.

**Auth Required**: Yes (Admin only)

**Request Body:**
```json
{
  "fileName": "1234567890_filename.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "File deleted successfully"
}
```

---

## Error Responses

All endpoints may return these error responses:

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "No token provided"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Admin access required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 429 Too Many Requests
```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Rate Limits

- **General API**: 100 requests per 15 minutes per IP
- **Contact Form**: 5 requests per hour per IP

---

## Testing with cURL

### Get all projects
```bash
curl http://localhost:5000/api/projects
```

### Send contact message
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello!"
  }'
```

### Create project (with auth)
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN" \
  -d '{
    "title": "New Project",
    "description": "Description",
    "techStack": ["React"],
    "imageUrl": "https://..."
  }'
```

---

## Testing with Postman

1. Import the API endpoints
2. Set base URL variable: `{{baseUrl}}`
3. For protected routes:
   - Add Authorization header
   - Type: Bearer Token
   - Token: Your Firebase ID token

---

## WebSocket Support

Currently not implemented. All communication is via REST API.

---

## Versioning

Current version: **v1**

API versioning will be implemented in future releases.

---

## Support

For issues or questions about the API:
- Check error messages in response
- Review server logs
- Open an issue on GitHub

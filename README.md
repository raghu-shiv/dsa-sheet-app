# 🧠 DSA Sheet App

A full-stack DSA (Data Structures & Algorithms) tracking web application that allows users to register, log in, and mark their completed problems under categorized topics. It supports CRUD operations for topics and problems, along with JWT authentication.

---

## 🌐 Live API

Base URL: `https://dsa-sheet-app.onrender.com`

---

## 📁 Features

- ✅ User Authentication (JWT-based)
- 📌 Track Completed DSA Problems
- 🗂️ Organized by Topics
- 🧩 CRUD operations for Topics and Problems
- 🔒 Secure API with error handling and logging

---

## 📦 API Endpoints

### 🔐 User Authentication

#### Register a New User  
`POST /api/users`  
**Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login  
`POST /api/auth/login`
**Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### 📚 Topics

#### Get All Topics
`POST /api/topics`

#### Create a New Topic
`POST /api/topics`
**Body**:
```json
{
  "title": "Arrays"
  "problems": ["id1", id2",....]
}
```

#### Update a Topic
`POST /api/topics/:id`
**Body**:
```json
{
  "title": "Arrays"
  "problems": ["id1", id2",....]
}
```

### 💡 Problems

#### Get All Problems by Topic
`GET /api/problems/`

#### Add Problems
`POST /api/problems/`
**Body**:
```json
{
  "title": "Two Sum",
  "level": "Easy",
  "youtubeUrl": "https://youtube.com/",
  "leetcodeUrl": "https://leetcode.com/",
  "articleUrl": "https://geeksforgeeks.org/"
}
```

#### Update A Problem
`PATCH /api/problems/:id`
**Body**:
```json
{
  "title": "Two Sum",
  "level": "Easy",
  "youtubeUrl": "https://youtube.com/",
  "leetcodeUrl": "https://leetcode.com/",
  "articleUrl": "https://geeksforgeeks.org/"
}
```

#### Add Problems
`DELETE /api/problems/:id`

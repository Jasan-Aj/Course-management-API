<div align="center">
  <br />
    <a href="#" target="_blank">
      <img src="https://via.placeholder.com/1200x400/1e293b/ffffff?text=Course+Management+API" alt="Course Management API Banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Node.js-black?style=for-the-badge&logoColor=339933&logo=node.js&color=black"/>
    <img src="https://img.shields.io/badge/-Express-black?style=for-the-badge&logoColor=white&logo=express&color=black"/>
    <img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=47A248&logo=mongodb&color=black"/>
    <img src="https://img.shields.io/badge/-JWT-black?style=for-the-badge&logoColor=white&logo=json-web-tokens&color=black"/>
    <br/>
    <img src="https://img.shields.io/badge/Arcjet-000000?style=for-the-badge&logo=arcjet&logoColor=white&color=000000">
    <img src="https://img.shields.io/badge/Inngest-black?style=for-the-badge&logo=inngest&logoColor=white&color=000000">
  </div>

  <h3 align="center">Course Management API</h3>

  <div align="center">
    A production-ready API with automated email workflows, rate limiting, and intelligent user engagement tracking.
  </div>
</div>

---

## 📋 Table of Contents

1. ✨ [Introduction](#-introduction)
2. ⚙️ [Tech Stack](#-tech-stack)
3. 🔋 [Features](#-features)
4. 🏗️ [System Architecture](#-system-architecture)
5. 📁 [Project Structure](#-project-structure)
6. 🤸 [Installation & Setup](#-installation--setup)
7. 📚 [API Endpoints](#-api-endpoints)
 
## ✨ Introduction

**Course Management API** is a robust backend solution designed to handle user registration, course enrollment, and automated user engagement at scale. The system leverages **Inngest** for background job processing and **Arcjet** for advanced rate limiting, ensuring high performance and reliability.

When a user joins the platform, the system automatically triggers a welcome email workflow. Upon course enrollment, users receive personalized onboarding materials. Most impressively, the platform tracks user activity and intelligently sends re-engagement reminders at 7, 14, and 30 days of inactivity—all handled asynchronously through Inngest cron jobs without impacting API response times.

## ⚙️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Node.js & Express** | Core API framework providing robust routing and middleware support |
| **MongoDB with Mongoose** | NoSQL database for flexible user and course data modeling |
| **JWT (JSON Web Tokens)** | Secure, stateless authentication with role-based access control |
| **Arcjet** | Advanced rate limiting and bot protection for all API endpoints |
| **Inngest** | Event-driven background job processing for emails and cron tasks |
| **Mailtrap** | Email testing and delivery in development/staging environments |

## 🔋 Features

👉 **User Authentication**: Secure JWT-based authentication with password hashing (bcrypt) and role-based access control (user/admin).

👉 **Rate Limiting**: Every request passes through **Arcjet** protection, preventing abuse and DDoS attacks with configurable rate limits per endpoint.

👉 **Automated Welcome Emails**: When a user registers, **Inngest** triggers a background job that sends a personalized welcome email.

👉 **Course Enrollment Flow**: Users can browse and enroll in courses. Upon enrollment, an automated onboarding email is queued and sent.

👉 **Smart Inactivity Reminders**: **Inngest cron jobs** run daily to query MongoDB for users inactive for 7, 14, or 30 days and send tailored re-engagement emails.

👉 **Activity Tracking**: Automatic tracking of user last activity to power the reminder system.


## 🏗️ System Architecture
<div align="center">
  <br />
    <a href="#" target="_blank">
      <img src="https://via.placeholder.com/1200x400/1e293b/ffffff?text=Course+Management+API" alt="Course Management API">
    </a>
  <br />
</div>

## 🤸 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Arcjet Account](https://arcjet.com/) for API keys
- [Inngest Account](https://www.inngest.com/) for background jobs

### Environment Variables

**.env (Backend)**
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/course-management

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

# Arcjet
ARCJET_KEY=ajkey_your_arcjet_api_key_here

# Inngest
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
INNGEST_APP_ID=course-management-api

# Email (Mailtrap)
MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASS=your_mailtrap_password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Insatallation Steps

#### 1. Clone the repository
```bash
git clone https://github.com/your-username/course-management-api.git
cd course-management-api
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Set up environment variables

#### 4. Edit .env with your credentials

#### 5. Run the server
```bash
npm run dev
```

#### 6. In a separate terminal
```bash
npx inngest-cli dev
```

## 📚 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create new user |
| `POST` | `/api/auth/login` | User login | 
| `GET` | `/api/auth/profile` | Get user profile |
| `PUT` | `/api/auth/profile` | Update profile |

### Course Endpoints

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/courses` | List all courses | Public |
| `GET` | `/api/courses/:id` | Get course details | Public |
| `POST` | `/api/courses` | Create course | Admin |
| `PUT` | `/api/courses/:id` | Update course | Admin |
| `DELETE` | `/api/courses/:id` | Delete course | Admin |
| `POST` | `/api/courses/:id/enroll` | Enroll in course | User |

---

<div align="center">
  <h3>🚀 Ready to automate your course management?</h3>
  
  <a href="#-installation--setup">
    <img src="https://img.shields.io/badge/Get_Started-4285F4?style=for-the-badge&logo=rocket&logoColor=white" />
  </a>
  
  <br />
  <br />
  
  <p>
    <img src="https://img.shields.io/badge/Contributions-Welcome-brightgreen?style=flat-square" />
    <img src="https://img.shields.io/github/license/your-username/course-management-api" />
  </p>
  
  <p>Built with ❤️ using Node.js, MongoDB, Arcjet & Inngest</p>
</div>

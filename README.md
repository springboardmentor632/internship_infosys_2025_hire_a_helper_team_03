# 🤝 Hire-A-Helper

## 📖 Description/Overview

Hire-A-Helper is a full-stack web application that connects people who need help with various tasks to those willing to assist. The platform enables users to post tasks, browse available opportunities, send requests to help, and manage their profiles. Built with modern web technologies, it features a responsive design, real-time notifications, secure authentication, and an intuitive user interface.

The application facilitates task posting, request management, user authentication with OTP verification, password recovery, profile management with image uploads, and a comprehensive notification system to keep users informed about their tasks and requests.

---

## 📑 Table of Contents

- [✨ Features](#features)
- [🛠️ Tech Stack](#tech-stack)
- [⚙️ Installation](#installation)
- [💡 Usage](#usage)
- [📁 Project Structure](#project-structure)
- [🔌 API Endpoints](#api-endpoints)
- [🔐 Environment Variables](#environment-variables)
- [👥 Contact/Authors](#contactauthors)
- [🗺️ Roadmap](#roadmap)
- [🙏 Acknowledgments](#acknowledgments)

---

## ✨ Features

- **🔒 User Authentication & Authorization**
  - Secure signup and login with JWT tokens
  - OTP verification for email confirmation
  - Password reset functionality with email verification
  - Protected routes for authenticated users only

- **📋 Task Management**
  - Create, edit, and delete tasks
  - Browse available tasks in a feed
  - Filter tasks by status (Active, Completed, Cancelled)
  - Save drafts for later posting
  - Track task statistics on dashboard

- **🤲 Request System**
  - Send requests to help with tasks
  - View incoming and outgoing requests
  - Accept or reject helper requests
  - Real-time request status updates

- **👤 User Profiles**
  - View and edit personal profiles
  - Upload profile pictures with Cloudinary integration
  - Display user statistics and activity

- **🔔 Notifications**
  - Real-time notification system
  - Email notifications for important events
  - In-app notification center
  - Mark notifications as read

- **📱 Responsive Design**
  - Mobile-first approach with Tailwind CSS
  - Bottom navigation for mobile devices
  - Sidebar navigation for desktop
  - Adaptive UI components

---

## 🛠️ Tech Stack

### 🎨 Frontend

| Technology | Version | Purpose |
|------------|---------|----------|
| **React** | v19.2.0 | UI library |
| **React Router DOM** | v7.9.4 | Client-side routing |
| **Tailwind CSS** | v3.4.18 | Utility-first CSS framework |
| **Lucide React** & **React Icons** | Latest | Icon libraries |
| **React Testing Library** | Latest | Testing utilities |

### ⚙️ Backend

| Technology | Version | Purpose |
|------------|---------|----------|
| **Node.js & Express** | v5.1.0 | Server framework |
| **MongoDB & Mongoose** | v8.19.2 | Database and ODM |
| **JWT (jsonwebtoken)** | v9.0.2 | Authentication |
| **bcryptjs** | v3.0.2 | Password hashing |
| **Nodemailer** | v7.0.10 | Email services |
| **Cloudinary** | v1.41.3 | Image hosting and management |
| **Multer** | v2.0.2 | File upload handling |
| **CORS** | Latest | Cross-origin resource sharing |
---

## ⚙️ Installation

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Version | Purpose |
|-------------|---------|----------|
| **Node.js** | v14 or higher | Runtime environment |
| **npm** or **yarn** | Latest | Package manager |
| **MongoDB** | Latest | Database (local or Atlas) |
| **Git** | Latest | Version control |

### 🚀 Step-by-Step Setup

1. **📥 Clone the Repository**
   ```bash
   git clone https://github.com/springboardmentor632/internship_infosys_2025_hire_a_helper_team_03.git
   cd internship_infosys_2025_hire_a_helper_team_03
   ```

2. **🔧 Backend Setup**

   Navigate to the backend directory:
   ```bash
   cd backend
   ```

   Install dependencies:
   ```bash
   npm install
   ```

   Create a `.env` file in the backend directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   
   # Email Configuration
   EMAIL_USER=your_email@example.com
   EMAIL_PASSWORD=your_email_password
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   
   # Resend API (optional)
   RESEND_API_KEY=your_resend_api_key
   ```

   Start the backend server:
   ```bash
   npm start
   ```

   The backend server will run on `http://localhost:5000` 🚀

3. **🎨 Frontend Setup**

   Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

   Install dependencies:
   ```bash
   npm install
   ```

   Create a `.env` file in the frontend directory (if needed):
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

   Start the frontend development server:
   ```bash
   npm start
   ```

   The application will open in your browser at `http://localhost:3000` 🌐

4. **🗄️ Database Setup**

   If using MongoDB locally:
   - Ensure MongoDB is running on your system
   - The application will automatically create the required collections

   If using MongoDB Atlas:
   - Create a cluster on MongoDB Atlas
   - Get your connection string
   - Add it to the `MONGO_URI` in your backend `.env` file

---
<!-- 
## Usage

### Getting Started

1. **Sign Up**
   - Navigate to the signup page
   - Enter your email, password, and other required details
   - Verify your email with the OTP sent to your inbox

2. **Login**
   - Use your credentials to log in
   - You'll be redirected to the dashboard

3. **Post a Task**
   - Click on "Post Task" from the navigation menu
   - Fill in task details (title, description, location, budget)
   - Save as draft or publish immediately

4. **Browse Tasks**
   - Visit the Feed page to see all available tasks
   - Filter tasks by status
   - Click on a task to view details

5. **Send a Request**
   - From the task detail page, click "Send Request"
   - Wait for the task owner to accept or reject

6. **Manage Requests**
   - View incoming requests on your tasks
   - Accept or reject helper requests
   - Track your outgoing requests

7. **Update Profile**
   - Navigate to your profile
   - Click "Edit Profile"
   - Upload a profile picture and update your information -->

### 📸 Example Screenshots

#### 🏠 Home Screen
![Home Screen](frontend/public/HomeScreen.png)
*Landing page with welcome message and call-to-action buttons*

#### 👤 Profile Screen
![Profile Screen](frontend/public/ProfileScreen.png)
*User profile page with personal information and activity statistics*

#### 📊 Dashboard View
![Dashboard Screen](frontend/public/DashboardScreen.png)
*Displays task statistics (Total, Active, Completed) and quick access to recent tasks and requests*

#### 📋 Task Feed
![Task Feed Screen](frontend/public/TaskFeedScreen.png)
*Grid view of available tasks with filter tabs for different task statuses and task cards showing key information*


## 📁 Project Structure

```
internship_infosys_2025_hire_a_helper_team_03/
│
├── backend/
│   ├── config/              # Configuration files
│   │   ├── cloudinary.js    # Cloudinary setup
│   │   └── multer.js        # File upload configuration
│   ├── controller/          # Route controllers
│   │   ├── authController.js
│   │   ├── notificationController.js
│   │   ├── requestController.js
│   │   └── taskController.js
│   ├── middleware/          # Custom middleware
│   │   └── auth.js          # JWT authentication
│   ├── model/               # Mongoose models
│   │   ├── User.js
│   │   ├── Task.js
│   │   ├── Request.js
│   │   └── Notification.js
│   ├── routes/              # API routes
│   │   ├── auth.js
│   │   ├── task.js
│   │   ├── request.js
│   │   └── notification.js
│   ├── services/            # Business logic
│   │   ├── loginService.js
│   │   ├── registrationService.js
│   │   ├── profileService.js
│   │   └── passwordResetService.js
│   ├── utils/               # Utility functions
│   │   ├── emailService.js
│   │   └── tempStorage.js
│   ├── .env                 # Environment variables
│   ├── package.json
│   └── server.js            # Entry point
│
└── frontend/
    ├── public/              # Static files
    ├── src/
    │   ├── Assets/          # Images and static assets
    │   ├── Components/      # Reusable components
    │   │   ├── Header.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── TaskCard.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── ...
    │   ├── Pages/           # Page components
    │   │   ├── Dashboard.jsx
    │   │   ├── Feed.jsx
    │   │   ├── MyTask.jsx
    │   │   ├── login.jsx
    │   │   ├── signup.jsx
    │   │   └── ...
    │   ├── config/          # Frontend configuration
    │   │   └── api.js
    │   ├── App.jsx          # Main app component
    │   └── index.js         # Entry point
    ├── .env                 # Environment variables
    ├── package.json
    └── tailwind.config.js   # Tailwind configuration
```

---

## 🔌 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/verify-otp` | Verify OTP for email | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/forgot-password` | Request password reset | No |
| POST | `/api/auth/reset-password` | Reset password with token | No |
| GET | `/api/auth/profile` | Get user profile | Yes ✅ |
| PUT | `/api/auth/profile` | Update user profile | Yes ✅ |

### 📋 Tasks

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all tasks | No |
| GET | `/api/tasks/:id` | Get task by ID | No |
| POST | `/api/tasks` | Create new task | Yes ✅ |
| PUT | `/api/tasks/:id` | Update task | Yes ✅ |
| DELETE | `/api/tasks/:id` | Delete task | Yes ✅ |
| GET | `/api/tasks/user/:userId` | Get user's tasks | No |

### 🤲 Requests

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/requests` | Get all requests | Yes ✅ |
| GET | `/api/requests/:id` | Get request by ID | Yes ✅ |
| POST | `/api/requests` | Create new request | Yes ✅ |
| PUT | `/api/requests/:id` | Update request status | Yes ✅ |
| DELETE | `/api/requests/:id` | Delete request | Yes ✅ |

### 🔔 Notifications

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/notifications` | Get user notifications | Yes ✅ |
| PUT | `/api/notifications/:id/read` | Mark notification as read | Yes ✅ |
| DELETE | `/api/notifications/:id` | Delete notification | Yes ✅ |

---

## 🔐 Environment Variables

### 🔧 Backend (.env)

```env
# Server Configuration
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/hirehelper
# or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/hirehelper

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Email Configuration (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Resend (Alternative Email Service)
RESEND_API_KEY=your_resend_api_key
```

### 🎨 Frontend (.env)

```env
# API Base URL
REACT_APP_API_URL=http://localhost:5000
```

---

## 👥 Contact/Authors

This project was created as part of the **Infosys Internship 2025** by **Team 03**. 🎓

### 👨‍💻 Team Members

| Role | Name |
|------|------|
| **Developer** | Ankita Prajapati |
| **Developer** | Hasin |
| **Project Mentor** | Springboard Mentor 632 |

---

## 🗺️ Roadmap

### 🎯 Current Version (v1.0)
- ✅ User authentication and authorization
- ✅ Task creation and management
- ✅ Request system
- ✅ Basic notifications
- ✅ Profile management
- ✅ Image upload with Cloudinary

### 🚀 Planned Features (v2.0)
- 🔄 **Real-time Chat**: Direct messaging between task posters and helpers
- 🔄 **Payment Integration**: Secure payment processing for tasks
- 🔄 **Rating System**: Users can rate and review helpers
- 🔄 **Advanced Search**: Filter tasks by location, budget, category, etc.
- 🔄 **Task Categories**: Organize tasks by different categories
- 🔄 **Mobile App**: Native mobile application for iOS and Android
- 🔄 **Analytics Dashboard**: Detailed insights and statistics
- 🔄 **Calendar Integration**: Schedule tasks and track deadlines
- 🔄 **Social Media Integration**: Share tasks on social platforms
- 🔄 **Multi-language Support**: Internationalization for global reach

### 💡 Future Enhancements
- Push notifications for mobile devices
- Advanced filtering and sorting options
- Task recommendations based on user preferences
- Helper verification system
- Geolocation-based task discovery
- Video call integration for task discussions
- Automated task matching algorithm

---

## 🙏 Acknowledgments

- **🎓 Infosys Springboard**: For providing the internship opportunity and mentorshiphip
- **🗄️ MongoDB**: For the excellent NoSQL database solution
- **☁️ Cloudinary**: For seamless image hosting and management
- **🎨 Tailwind CSS**: For the utility-first CSS framework
- **⚛️ React Team**: For the amazing React library
- **💚 Node.js Community**: For the robust backend ecosystem
- **🌟 All Contributors**: Special thanks to all team members who contributed to this project


## 🎉 Conclusion

Building Hire-A-Helper has been an incredible learning journey for our team. 🚀 We set out to create a platform that genuinely helps people connect and support each other, and we're proud of what we've achieved.

This project taught us more than just coding—it showed us the value of teamwork, problem-solving under pressure, and turning ideas into reality. 💡 Every feature, from the authentication system to the task feed, represents countless hours of learning, debugging, and collaboration.

We're grateful to Infosys Springboard for this opportunity and excited to see how this platform can grow. 🌱 If you have feedback or ideas, we'd love to hear from you! 💬

---

**Built by Team 03 - Infosys Internship 2025**

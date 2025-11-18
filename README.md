# 🌿 Mindful Haven - MERN Stack Blog Application

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/ba56d07b-567d-4226-9add-a0518c2c32d5" />
Project url: https://mindfulhaven22.onrender.com/

A full-featured blog application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack, focused on wellness, mindfulness, and mental health content. This project demonstrates seamless integration between front-end and back-end components, including database operations, API communication, state management, and user authentication.

## 📋 Project Overview

Mindful Haven is a modern blogging platform that allows users to:
- Browse and read wellness-related blog posts
- Search and filter content by categories and keywords
- Create, edit, and delete their own blog posts
- Comment on posts and engage with the community
- Manage their profile using secure authentication

## 🚀 Features

### Core Features
- ✅ **Full CRUD Operations** - Create, Read, Update, Delete blog posts
- ✅ **User Authentication** - Secure authentication using Clerk
- ✅ **Category Management** - Organize posts by categories
- ✅ **Search Functionality** - Full-text search with MongoDB text indexes
- ✅ **Comments System** - Users can comment on blog posts
- ✅ **Responsive Design** - Mobile-first design using TailwindCSS
- ✅ **Input Validation** - Comprehensive validation using Joi
- ✅ **Error Handling** - Centralized error handling middleware
- ✅ **API Pagination** - Backend pagination support for posts and comments

### Advanced Features
- ✅ **User Authentication & Authorization** - Clerk integration with protected routes
- ✅ **RESTful API Design** - Well-structured API endpoints
- ✅ **Database Relationships** - Mongoose models with proper references
- ✅ **Loading & Error States** - Optimistic UI updates with proper feedback
- ✅ **Form Validation** - Client-side and server-side validation
- ✅ **Database Seeding** - Sample data for quick development setup

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - UI library
- **Vite 7.1.7** - Build tool and dev server
- **React Router DOM 7.9.4** - Client-side routing
- **TailwindCSS 4.1.16** - Utility-first CSS framework
- **Axios 1.12.2** - HTTP client for API requests
- **Clerk React 5.53.3** - Authentication and user management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 4.21.2** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 8.10.5** - MongoDB object modeling
- **Joi 17.13.3** - Schema validation
- **dotenv 16.4.7** - Environment variable management
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
mern-stack-integration/
├── client/                       # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── layouts/              # Layout components
│   │   │   └── MainLayout.jsx
│   │   ├── pages/                # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── BlogPage.jsx
│   │   │   ├── PostPage.jsx
│   │   │   ├── CreatePostPage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── FeaturesPage.jsx
│   │   │   ├── EnterprisePage.jsx
│   │   │   └── PricingPage.jsx
│   │   ├── services/             # API services
│   │   │   └── api.js
│   │   ├── App.jsx               # Main app component
│   │   └── main.jsx              # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                       # Express backend
│   ├── config/                   # Configuration files
│   │   └── database.js           # MongoDB connection
│   ├── controllers/              # Route controllers
│   │   ├── postController.js
│   │   ├── categoryController.js
│   │   ├── authController.js
│   │   └── commentController.js
│   ├── middleware/               # Custom middleware
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validateRequest.js
│   ├── models/                   # Mongoose models
│   │   ├── user.js
│   │   ├── post.js
│   │   ├── category.js
│   │   └── comment.js
│   ├── routes/                   # API routes
│   │   ├── posts.js
│   │   ├── categories.js
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── comments.js
│   ├── scripts/                  # Utility scripts
│   │   └── seedDatabase.js       # Database seeding
│   ├── utils/                    # Utility functions
│   │   └── asyncHandler.js
│   ├── server.js                 # Entry point
│   └── package.json
│
└── README.md                     # This file
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Clerk account (for authentication)
- Git

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd mern-stack-integration-PhilipOndieki
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd server
npm install
```

#### Environment Variables
Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/mern-blog
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mern-blog

# Clerk Authentication
CLERK_SECRET_KEY=your_clerk_secret_key

# File Upload
MAX_FILE_SIZE=5242880
```

#### Seed the Database (Optional)
```bash
npm run seed
```

This will populate your database with:
- 6 categories (Mindfulness, Meditation, Mental Health, Wellness, Stress Relief, Sleep)
- 3 sample users
- 9 blog posts with detailed content

#### Start the Backend Server
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup

#### Install Dependencies
```bash
cd client
npm install
```

#### Environment Variables
Create a `.env` file in the `client` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

#### Start the Frontend Server
```bash
npm run dev
```

The client will run on `http://localhost:5173`

### 4. Clerk Setup

1. Sign up for a free account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your Publishable Key and Secret Key
4. Add them to the respective `.env` files
5. Configure sign-in and sign-up settings in the Clerk dashboard

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
Most endpoints accept a `clerkId` in the request body for user identification. Protected operations require user authentication.

### Endpoints

#### Posts

##### Get All Posts
```http
GET /api/posts
```

**Query Parameters:**
- `search` (string) - Search term for full-text search
- `category` (string) - Filter by category ID
- `page` (number) - Page number (default: 1)
- `limit` (number) - Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

##### Get Single Post
```http
GET /api/posts/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "...",
    "content": "...",
    "author": {
      "username": "...",
      "email": "..."
    },
    "category": {
      "name": "..."
    },
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

##### Create Post
```http
POST /api/posts
```

**Request Body:**
```json
{
  "title": "Post Title",
  "content": "Post content here...",
  "category": "category_id",
  "clerkId": "user_clerk_id",
  "tags": ["tag1", "tag2"],
  "featuredImage": "https://example.com/image.jpg",
  "isPublished": true
}
```

**Validation Rules:**
- `title`: 3-200 characters, required
- `content`: Minimum 10 characters, required
- `category`: Required
- `tags`: Maximum 10 tags
- `featuredImage`: Must be a valid URL (optional)

##### Update Post
```http
PUT /api/posts/:id
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content...",
  "category": "category_id",
  "isPublished": true
}
```

##### Delete Post
```http
DELETE /api/posts/:id
```

#### Categories

##### Get All Categories
```http
GET /api/categories
```

##### Create Category
```http
POST /api/categories
```

**Request Body:**
```json
{
  "name": "Category Name",
  "description": "Category description"
}
```

#### Comments

##### Get Comments for a Post
```http
GET /api/posts/:postId/comments
```

**Query Parameters:**
- `page` (number) - Page number (default: 1)
- `limit` (number) - Items per page (default: 20)

##### Create Comment
```http
POST /api/posts/:postId/comments
```

**Request Body:**
```json
{
  "content": "Comment text here...",
  "clerkId": "user_clerk_id"
}
```

**Validation Rules:**
- `content`: 1-1000 characters, required
- `clerkId`: Required for authentication

##### Update Comment
```http
PUT /api/comments/:id
```

**Request Body:**
```json
{
  "content": "Updated comment text...",
  "clerkId": "user_clerk_id"
}
```

**Authorization:** Only the comment author can update their comment.

##### Delete Comment
```http
DELETE /api/comments/:id
```

**Request Body:**
```json
{
  "clerkId": "user_clerk_id"
}
```

**Authorization:** Only the comment author can delete their comment.

#### Users

##### Create or Get User
```http
POST /api/users
```

**Request Body:**
```json
{
  "clerkId": "user_clerk_id",
  "email": "user@example.com",
  "username": "username"
}
```

## 🗄️ Database Schema

### User Model
```javascript
{
  clerkId: String (unique, required),
  username: String (unique, required),
  email: String (unique, required),
  firstName: String,
  lastName: String,
  profileImageUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Post Model
```javascript
{
  title: String (required, 3-200 chars),
  content: String (required, min 10 chars),
  author: ObjectId (ref: User, required),
  category: ObjectId (ref: Category, required),
  featuredImage: String (URL),
  tags: [String] (max 10),
  isPublished: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:** Text indexes on `title` and `content` for full-text search

### Category Model
```javascript
{
  name: String (unique, required, 2-50 chars),
  description: String (max 500 chars),
  createdAt: Date,
  updatedAt: Date
}
```

### Comment Model
```javascript
{
  content: String (required, 1-1000 chars),
  author: ObjectId (ref: User, required),
  post: ObjectId (ref: Post, required),
  isEdited: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:** Compound index on `post` and `createdAt` for efficient querying

## 🎨 Frontend Pages

### Public Pages
1. **Home Page** (`/`) - Landing page with featured posts and call-to-action
2. **Blog Page** (`/blog`) - List of all blog posts with search functionality
3. **Post Page** (`/blog/:id`) - Individual post view with full content
4. **About Page** (`/about`) - Information about the platform
5. **Features Page** (`/features`) - Platform features showcase
6. **Pricing Page** (`/pricing`) - Pricing tiers
7. **Enterprise Page** (`/enterprise`) - Enterprise solutions

### Protected Pages
1. **Create Post Page** (`/blog/create`) - Form to create new blog posts (requires authentication)

## 🔐 Authentication Flow

1. User clicks "Sign Up" or "Sign In" button
2. Clerk modal opens for authentication
3. Upon successful authentication, Clerk returns user data
4. Frontend sends user data to backend (`POST /api/users`)
5. Backend creates or retrieves user from MongoDB
6. User can now create posts and comments

## ✅ Task Completion Checklist

### Task 1: Project Setup ✅
- [x] Clear directory structure for client and server
- [x] MongoDB connection using Mongoose
- [x] Express.js server with middleware
- [x] React front-end using Vite
- [x] Proxy configuration for API calls
- [x] Environment variables management

### Task 2: Back-End Development ✅
- [x] RESTful API for blog application
  - [x] GET /api/posts - Get all posts
  - [x] GET /api/posts/:id - Get specific post
  - [x] POST /api/posts - Create post
  - [x] PUT /api/posts/:id - Update post
  - [x] DELETE /api/posts/:id - Delete post
  - [x] GET /api/categories - Get all categories
  - [x] POST /api/categories - Create category
- [x] Mongoose models (Post, Category, User, Comment)
- [x] Input validation using Joi
- [x] Error handling middleware

### Task 3: Front-End Development ✅
- [x] Post list view (BlogPage)
- [x] Single post view (PostPage)
- [x] Create/edit post form (CreatePostPage)
- [x] Navigation and layout (Header, Footer, MainLayout)
- [x] React Router implementation
- [x] React hooks (useState, useEffect)
- [x] API service layer (api.js)

### Task 4: Integration and Data Flow ✅
- [x] API service for backend communication
- [x] State management for posts and categories
- [x] Forms with validation
- [x] Loading and error states
- [x] Optimistic UI patterns

### Task 5: Advanced Features ✅
- [x] User authentication (Clerk integration)
- [x] Protected routes (CreatePostPage)
- [x] Pagination support (backend implementation)
- [x] Search and filtering functionality
- [x] Comments feature (full CRUD)

## 🧪 Testing

### Manual Testing Checklist
- [ ] Create a new blog post
- [ ] Edit an existing post
- [ ] Delete a post
- [ ] Search for posts
- [ ] Filter by category
- [ ] Create a comment
- [ ] Edit own comment
- [ ] Delete own comment
- [ ] Sign up as new user
- [ ] Sign in as existing user
- [ ] Access protected routes

### API Testing with Curl

**Create a Post:**
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Post",
    "content": "This is test content.",
    "category": "category_id",
    "clerkId": "user_clerk_id",
    "isPublished": true
  }'
```

**Get All Posts:**
```bash
curl http://localhost:5000/api/posts
```

**Search Posts:**
```bash
curl "http://localhost:5000/api/posts?search=mindfulness&page=1&limit=10"
```

## 🚀 Deployment

### Backend Deployment (Render, Heroku, Railway)

1. Set environment variables in deployment platform
2. Ensure MongoDB URI points to production database (MongoDB Atlas)
3. Set `NODE_ENV=production`
4. Deploy from GitHub repository

### Frontend Deployment (Vercel, Netlify)

1. Build the production bundle: `npm run build`
2. Set environment variables
3. Deploy the `dist` folder
4. Update CORS settings in backend to allow production URL

### Current Deployment
- **Frontend:** https://mindfulhaven22.onrender.com
- **Backend:** Configured for production with CORS

## 🐛 Known Issues & Future Enhancements

### Known Issues
- Frontend pagination not yet connected to backend (backend ready)
- Comment UI not yet added to PostPage (backend ready)
- Image upload functionality planned but not yet implemented

### Future Enhancements
- [ ] Frontend pagination UI component
- [ ] Comment display and creation UI
- [ ] Rich text editor for post content
- [ ] Image upload with cloud storage (Cloudinary, AWS S3)
- [ ] Like/reaction system for posts
- [ ] User profile pages
- [ ] Email notifications
- [ ] Social sharing
- [ ] Dark mode
- [ ] Post drafts functionality
- [ ] Related posts suggestions
- [ ] Analytics dashboard

## 🤝 Contributing

This project is a learning assignment, but contributions and suggestions are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is created for educational purposes as part of the PLP MERN Stack course.

## 👨‍💻 Author

**Philip Ondieki**
- PLP Tech Student
- GitHub: [@PhilipOndieki](https://github.com/PhilipOndieki)

## 🙏 Acknowledgments

- PLP Academy for the comprehensive MERN stack curriculum
- Clerk for providing excellent authentication services
- The open-source community for amazing tools and libraries

---
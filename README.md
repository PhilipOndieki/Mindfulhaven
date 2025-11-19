# Mindful Haven

**Free Mental Health Support for Kenyan University Students**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

> Breaking barriers to student mental wellness in Kenya through accessible, free, and stigma-free digital support.

**Live Demo:** [https://mindfulhaven22.onrender.com](https://mindfulhaven22.onrender.com)

---

## Table of Contents

- [About](#about)
- [The Problem](#the-problem)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Contact](#contact)
- [License](#license)

---

## About

Mindful Haven is a community-driven mental health platform built specifically for Kenyan university students. We provide free, 24/7 access to evidence-based wellness resources, peer support, and a safe space for students to share their experiences.

### Our Mission

We believe every Kenyan university student deserves access to mental health support—regardless of their ability to pay. Our platform enables students to:

- **Discover** - Access free articles, guides, and resources on mental health topics
- **Connect** - Engage with peers who understand their unique challenges
- **Share** - Contribute their stories to help others and reduce stigma

### Why It Matters

- Built BY students, FOR students
- Understands HELB stress, exam anxiety, and family pressure
- 100% free with no paywalls
- Anonymous and stigma-free
- Available 24/7

---

## The Problem

Kenyan university students face significant mental health challenges with limited access to support:

| Challenge | Impact |
|-----------|--------|
| 78% of students | Experience stress, anxiety, or depression |
| 1:500,000 | Psychiatrist to population ratio in Kenya |
| 85% of students | Don't seek help due to stigma and cost |
| 2-3 counselors | Available for 15,000+ students at most universities |
| KSh 3,000-8,000 | Cost per private therapy session (unaffordable for most) |
| 3-6 weeks | Average wait time for university counseling appointments |

---

## Features

### Core Platform Features

- **Wellness Resources** - Curated articles on mental health, stress management, sleep, mindfulness, and coping strategies
- **Community Stories** - User-submitted experiences and advice from fellow students
- **Search & Filter** - Find content by category or keyword
- **Engagement Tools** - Like, comment, and bookmark content
- **User Profiles** - Track your contributions and saved content

### Technical Features

- **User Authentication** - Secure authentication via Clerk
- **Full CRUD Operations** - Create, read, update, and delete content
- **RESTful API** - Well-structured backend endpoints
- **Responsive Design** - Mobile-first approach using TailwindCSS
- **Real-time Validation** - Client and server-side input validation
- **Admin Dashboard** - Content moderation and analytics

### For Universities

Partner with Mindful Haven to provide your students with:

- White-labeled platform with university branding
- Analytics dashboard for anonymized wellbeing trends
- Campus ambassador program
- Integration with existing counseling services
- Cost-effective solution (KSh 5-10 per student annually)

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1.1 | UI library |
| Vite | 7.1.7 | Build tool and dev server |
| React Router DOM | 7.9.4 | Client-side routing |
| TailwindCSS | 4.1.16 | Utility-first CSS framework |
| Axios | 1.12.2 | HTTP client |
| Clerk React | 5.53.3 | Authentication |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | JavaScript runtime |
| Express.js | 4.21.2 | Web framework |
| MongoDB | 4.4+ | NoSQL database |
| Mongoose | 8.10.5 | ODM for MongoDB |
| Joi | 17.13.3 | Schema validation |
| Paystack | - | Payment processing |

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- MongoDB (local or MongoDB Atlas)
- Clerk account for authentication
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/PhilipOndieki/Mindfulhaven.git
cd Mindfulhaven
```

2. **Backend setup**

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mindful-haven
CLERK_SECRET_KEY=your_clerk_secret_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key
```

Start the server:

```bash
npm run dev
```

3. **Frontend setup**

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Start the client:

```bash
npm run dev
```

4. **Access the application**

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

### Database Seeding (Optional)

Populate the database with sample data:

```bash
cd server
npm run seed
```

---

## Project Structure

```
Mindfulhaven/
├── client/                          # React frontend
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LikeButton.jsx
│   │   │   ├── BookmarkButton.jsx
│   │   │   └── Comments.jsx
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── HowItWorksPage.jsx
│   │   │   ├── ForUniversitiesPage.jsx
│   │   │   ├── CommunityPage.jsx
│   │   │   ├── ResourcesPage.jsx
│   │   │   ├── PostPage.jsx
│   │   │   ├── CreatePostPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── services/
│   │   │   └── api.js               # API service layer
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Express backend
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── postController.js
│   │   ├── categoryController.js
│   │   ├── commentController.js
│   │   ├── likeController.js
│   │   └── bookmarkController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validateRequest.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   ├── Category.js
│   │   ├── Comment.js
│   │   ├── Like.js
│   │   └── Bookmark.js
│   ├── routes/
│   │   ├── posts.js
│   │   ├── categories.js
│   │   ├── comments.js
│   │   ├── likes.js
│   │   └── bookmarks.js
│   ├── services/
│   │   └── paystackService.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## API Documentation

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### Posts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | Get all posts (with pagination, search, filter) |
| GET | `/posts/:id` | Get single post |
| POST | `/posts` | Create new post |
| PUT | `/posts/:id` | Update post |
| DELETE | `/posts/:id` | Delete post |

#### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/categories` | Get all categories |
| POST | `/categories` | Create category |

#### Comments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts/:postId/comments` | Get comments for post |
| POST | `/posts/:postId/comments` | Create comment |
| PUT | `/comments/:id` | Update comment |
| DELETE | `/comments/:id` | Delete comment |

#### Likes & Bookmarks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/posts/:postId/like` | Toggle like on post |
| POST | `/posts/:postId/bookmark` | Toggle bookmark on post |
| GET | `/users/:userId/bookmarks` | Get user's bookmarks |

### Query Parameters

**GET /posts**

| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Full-text search term |
| `category` | string | Filter by category ID |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10) |

### Response Format

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

---

## Database Schema

### User

```javascript
{
  clerkId: String,        // Unique identifier from Clerk
  username: String,       // Display name
  email: String,          // Email address
  profileImageUrl: String,// Avatar URL
  isAdmin: Boolean,       // Admin privileges
  createdAt: Date,
  updatedAt: Date
}
```

### Post

```javascript
{
  title: String,          // 3-200 characters
  content: String,        // Minimum 10 characters
  author: ObjectId,       // Reference to User
  category: ObjectId,     // Reference to Category
  featuredImage: String,  // Image URL
  tags: [String],         // Maximum 10 tags
  isPublished: Boolean,   // Publication status
  likesCount: Number,     // Cached like count
  createdAt: Date,
  updatedAt: Date
}
```

### Category

```javascript
{
  name: String,           // 2-50 characters, unique
  description: String,    // Maximum 500 characters
  createdAt: Date,
  updatedAt: Date
}
```

### Comment

```javascript
{
  content: String,        // 1-1000 characters
  author: ObjectId,       // Reference to User
  post: ObjectId,         // Reference to Post
  isEdited: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Deployment

### Backend (Render/Railway/Heroku)

1. Set environment variables in your deployment platform
2. Connect to MongoDB Atlas for production database
3. Set `NODE_ENV=production`
4. Deploy from GitHub repository

### Frontend (Vercel/Netlify)

1. Build: `npm run build`
2. Set environment variables
3. Deploy the `dist` folder
4. Configure CORS in backend for production URL

### Current Deployment

- **Production:** https://mindfulhaven22.onrender.com

---

## Contributing

We welcome contributions to Mindful Haven! Here's how you can help:

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

### Areas for Contribution

- Content moderation improvements
- Accessibility enhancements
- Mobile app development
- Translation/localization
- UI/UX improvements
- Performance optimization

### Code Standards

- Follow existing code style
- Write descriptive commit messages
- Include tests for new features
- Update documentation as needed

---

## Contact

**Philip Ondieki**

- Email: philipbarongo30@gmail.com
- Phone: +254 703 141 296
- GitHub: [@PhilipOndieki](https://github.com/PhilipOndieki)

### For University Partnerships

Interested in bringing Mindful Haven to your campus? Contact us to discuss partnership opportunities and custom solutions for your institution.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- PLP Academy for the MERN stack curriculum
- Clerk for authentication services
- The open-source community for tools and inspiration
- All the Kenyan students who inspired this project

---

**Built with care for Kenyan university students.**

*You're not alone. We're here for you.*

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import PostPage from './pages/PostPage';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ForUniversitiesPage from './pages/ForUniversitiesPage';
import CommunityPage from './pages/CommunityPage';
import ResourcesPage from './pages/ResourcesPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import EbooksPage from './pages/EbooksPage';
import EbookDetailPage from './pages/EbookDetailPage';
import PaymentVerifyPage from './pages/PaymentVerifyPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import UserSync from './components/UserSync';

function App() {
  return (
    <Router>
      <UserSync /> 
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />
          <Route path="for-universities" element={<ForUniversitiesPage />} />
          <Route path="community" element={<CommunityPage />} />

          {/* Resources Routes (formerly Blog) */}
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="resources/create" element={<CreatePostPage />} />
          <Route path="resources/:id" element={<PostPage />} />
          <Route path="resources/edit/:id" element={<EditPostPage />} />

          {/* Legacy Blog Routes - Redirect to Resources */}
          <Route path="blog" element={<ResourcesPage />} />
          <Route path="blog/:id" element={<PostPage />} />

          {/* E-book Routes */}
          <Route path="ebooks" element={<EbooksPage />} />
          <Route path="ebooks/:id" element={<EbookDetailPage />} />

          {/* Payment Routes */}
          <Route path="payment/verify" element={<PaymentVerifyPage />} />

          {/* User Profile */}
          <Route path="profile" element={<ProfilePage />} />

          {/* Admin Dashboard */}
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
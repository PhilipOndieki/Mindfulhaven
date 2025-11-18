import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import PostPage from './pages/PostPage';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';
import EnterprisePage from './pages/EnterprisePage';
import PricingPage from './pages/PricingPage';
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
          <Route path="features" element={<FeaturesPage />} />
          <Route path="enterprise" element={<EnterprisePage />} />
          <Route path="pricing" element={<PricingPage />} />

          {/* Blog Routes */}
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/create" element={<CreatePostPage />} />
          <Route path="blog/:id" element={<PostPage />} />
          <Route path="/blog/edit/:id" element={<EditPostPage />} />

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
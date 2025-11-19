import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.svg" alt="Mindful Haven" className="h-8 w-8" />
              <span className="text-lg font-semibold">Mindful Haven</span>
            </div>
            <p className="text-gray-600 text-sm max-w-md mb-4">
              Free mental health support for Kenyan university students.
              Access resources, connect with peers, and share your story.
            </p>
            <p className="text-sm text-[#4a7c59] font-medium">
              100% Free. Always.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/resources" className="hover:text-primary transition-colors">
                  Articles & Guides
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-primary transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">About</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link to="/for-universities" className="hover:text-primary transition-colors">
                  For Universities
                </Link>
              </li>
              <li>
                <a
                  href="mailto:philipbarongo30@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} Mindful Haven. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

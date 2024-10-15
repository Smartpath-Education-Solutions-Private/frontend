import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Smart Path Learning</h3>
            <p className="text-gray-400">Empowering learners worldwide</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end space-x-6">
            <Link to="/about" className="hover:text-blue-300 mb-2 md:mb-0">About</Link>
            <Link to="/contact" className="hover:text-blue-300 mb-2 md:mb-0">Contact</Link>
            <Link to="/privacy" className="hover:text-blue-300 mb-2 md:mb-0">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-blue-300 mb-2 md:mb-0">Terms of Service</Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Smart Path Learning. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
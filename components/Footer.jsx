
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Community Events. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-sm hover:text-white">Contact Us</a>
          <a href="#" className="text-sm hover:text-white">Privacy Policy</a>
          <a href="#" className="text-sm hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-8 px-4">
      <div className="max-w-6xl mx-auto text-sm">
        <p className="mb-6">Questions? Call <span className="underline">000-800-040-1843</span></p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
          <div>
            <p className="hover:underline cursor-pointer">FAQ</p>
            <p className="hover:underline cursor-pointer">Investor Relations</p>
            <p className="hover:underline cursor-pointer">Privacy</p>
            <p className="hover:underline cursor-pointer">Speed Test</p>
          </div>
          <div>
            <p className="hover:underline cursor-pointer">Help Centre</p>
            <p className="hover:underline cursor-pointer">Jobs</p>
            <p className="hover:underline cursor-pointer">Cookie Preferences</p>
            <p className="hover:underline cursor-pointer">Legal Notices</p>
          </div>
          <div>
            <p className="hover:underline cursor-pointer">Account</p>
            <p className="hover:underline cursor-pointer">Ways to Watch</p>
            <p className="hover:underline cursor-pointer">Corporate Information</p>
            <p className="hover:underline cursor-pointer">Only on Netflix</p>
          </div>
          <div>
            <p className="hover:underline cursor-pointer">Media Centre</p>
            <p className="hover:underline cursor-pointer">Terms of Use</p>
            <p className="hover:underline cursor-pointer">Contact Us</p>
          </div>
        </div>

        <p className="text-xs">Netflix India Clone © 2025</p>
      </div>
    </footer>
  );
};

export default Footer;

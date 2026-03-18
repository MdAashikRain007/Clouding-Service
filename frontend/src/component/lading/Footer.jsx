import React from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Mail,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white">CloudShare</h3>
            <p className="mt-4 text-sm text-gray-400">
              Secure cloud file sharing for professionals and teams.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="hover:text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Product
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Security</a></li>
              <li><a href="#" className="hover:text-white">Integrations</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Company
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Support
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@cloudshare.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} CloudShare. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
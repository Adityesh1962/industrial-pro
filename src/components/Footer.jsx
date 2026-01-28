import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#ff6b35] to-[#f7931e] rounded-lg flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white">Industrial Pro</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Leading provider of industrial equipment service, maintenance, and repair solutions for businesses worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <span className="text-white font-semibold mb-4 block">Quick Links</span>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-gray-400 hover:text-[#ff6b35] transition-colors text-sm">
                Home
              </Link>
              <Link to="/products" className="text-gray-400 hover:text-[#ff6b35] transition-colors text-sm">
                Products
              </Link>
              <Link to="/booking" className="text-gray-400 hover:text-[#ff6b35] transition-colors text-sm">
                Book Service
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div>
            <span className="text-white font-semibold mb-4 block">Services</span>
            <nav className="flex flex-col gap-2">
              <span className="text-gray-400 text-sm">Equipment Maintenance</span>
              <span className="text-gray-400 text-sm">Repair Services</span>
              <span className="text-gray-400 text-sm">Safety Inspections</span>
              <span className="text-gray-400 text-sm">Parts & Replacements</span>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <span className="text-white font-semibold mb-4 block">Contact Us</span>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#ff6b35] mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#ff6b35] mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">service@industrialpro.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#ff6b35] mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  1234 Industrial Blvd<br />
                  Manufacturing District, TX 75001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 Industrial Pro Equipment Services. All rights reserved.
            </p>
            <div className="flex gap-6">
              <span className="text-gray-500 hover:text-[#ff6b35] transition-colors text-sm cursor-pointer">
                Privacy Policy
              </span>
              <span className="text-gray-500 hover:text-[#ff6b35] transition-colors text-sm cursor-pointer">
                Terms of Service
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
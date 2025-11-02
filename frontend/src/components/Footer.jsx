import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// LeetCode Icon Component
const LeetCodeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662L2.571 12.98c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.152-4.152c.467-.467 1.111-.702 1.824-.702.713 0 1.357.235 1.824.702l2.697 2.607c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.902L12.98 2.57c-.9-.9-2.078-1.354-3.406-1.354s-2.506.454-3.406 1.354L2.157 6.521c-.9.9-1.354 2.078-1.354 3.406s.454 2.506 1.354 3.406l5.011 5.011c.9.9 2.078 1.354 3.406 1.354s2.506-.454 3.406-1.354l2.105-2.105c.514-.514.497-1.365-.038-1.9-.536-.535-1.387-.553-1.902-.039zM20.811 13.01H7.333c-.718 0-1.3.582-1.3 1.3s.582 1.3 1.3 1.3h13.478c.718 0 1.3-.582 1.3-1.3s-.582-1.3-1.3-1.3z"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { 
      icon: Github, 
      href: 'https://github.com/Rishusinha26', 
      label: 'GitHub',
    },
    { 
      icon: Linkedin, 
      href: 'https://www.linkedin.com/in/rishu-kumar-sinha-67a612292/', 
      label: 'LinkedIn',
    },
    { 
      icon: Mail, 
      href: 'mailto:1si23is081@sit.ac.in', 
      label: 'Email',
    },
    { 
      icon: LeetCodeIcon, 
      href: 'https://leetcode.com/u/Rishu__26/', 
      label: 'LeetCode',
      isLeetCode: true,
    },
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="relative bg-[#0a0a0f] border-t border-gray-800 overflow-hidden">
      {/* Code Pattern Background */}
      <div className="absolute inset-0 opacity-[0.02] font-mono text-xs">
        <div className="absolute bottom-20 left-10 text-blue-500/10">export default Footer;</div>
      </div>

      {/* Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-8 z-50 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all border border-blue-500/50"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-6 h-6 text-blue-400" />
              <h3 className="text-2xl font-bold text-white font-mono">
                <span className="text-blue-400">&lt;</span>
                <span className="text-white">Rishu Kumar Sinha</span>
                <span className="text-blue-400"> /&gt;</span>
              </h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-md font-mono text-sm">
              <span className="text-blue-400">//</span> Full-Stack Developer specializing in building exceptional digital experiences.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-lg bg-gray-900/50 ${social.isLeetCode ? 'hover:bg-orange-500/20 text-gray-400 hover:text-orange-300 hover:border-orange-500/50' : 'hover:bg-blue-500/20 text-gray-400 hover:text-blue-300 hover:border-blue-500/50'} transition-all border border-gray-800`}
                  aria-label={social.label}
                >
                  {social.isLeetCode ? (
                    <LeetCodeIcon className="w-5 h-5" />
                  ) : (
                    <social.icon className="w-5 h-5" />
                  )}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 font-mono">
              <span className="text-blue-400">const</span> navigation
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors font-mono text-sm flex items-center gap-2 group"
                  >
                    <span className="text-gray-600 group-hover:text-blue-500">→</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-white mb-4 font-mono">
              <span className="text-blue-400">const</span> contact
            </h4>
            <div className="space-y-3 text-sm text-gray-400 font-mono">
              <a
                href="mailto:1si23is081@sit.ac.in"
                className="block hover:text-blue-400 transition-colors"
              >
                1si23is081@sit.ac.in
              </a>
              <a
                href="tel:+917644031967"
                className="block hover:text-blue-400 transition-colors"
              >
                7644****67
              </a>
              <p className="text-gray-500">Tumakuru, Karnataka</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 flex items-center gap-2 font-mono">
              <span className="text-gray-600">//</span>
              <span>© {currentYear}</span>
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
              <span>by</span>
              <span className="font-semibold text-blue-400">Rishu Kumar Sinha</span>
            </p>
            <p className="text-sm text-gray-500 font-mono">
              <span className="text-gray-600">//</span> Built with React, Node.js & MongoDB
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

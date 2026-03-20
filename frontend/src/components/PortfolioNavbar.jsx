import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const PortfolioNavbar = ({ sections }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const pathToSection = {
      '/about': 'about',
      '/projects': 'projects',
      '/experience': 'experience',
      '/contact': 'contact',
      '/': 'about',
      '/portfolio': 'about',
    };
    const section = pathToSection[location.pathname];
    if (section) {
      setActiveSection(section);
    }
  }, [location.pathname]);

  const handleNavClick = (sectionId) => {
    const sectionToPath = {
      about: '/about',
      projects: '/projects',
      experience: '/experience',
      contact: '/contact',
    };

    const targetPath = sectionToPath[sectionId] || '/';
    setActiveSection(sectionId);
    navigate(targetPath);
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div
          className={`relative rounded-2xl border transition-all duration-300 ${
            scrolled
              ? 'border-cyan-400/35 bg-[#040b17]/92 backdrop-blur-xl shadow-[0_12px_34px_rgba(6,182,212,0.14)]'
              : 'border-cyan-500/20 bg-[#030914]/78 backdrop-blur-md'
          }`}
        >
          <div className="absolute left-3 top-3 h-2 w-2 rounded-full bg-lime-400/90 animate-pulse hidden md:block" />

          <div className="grid grid-cols-[1fr_auto] md:grid-cols-[260px_1fr_220px] items-center gap-3 px-3 py-3">
            <Link to="/" className="group relative flex items-center">
              <div className="w-full rounded-xl border border-cyan-400/30 bg-[#071729]/75 px-3 py-2 transition-all group-hover:border-cyan-300/65 group-hover:shadow-[0_0_16px_rgba(34,211,238,0.25)]">
                <p className="text-[10px] leading-none text-cyan-400/80 tech-code">SYSTEM ID</p>
                <h1 className="tech-heading text-[12px] sm:text-sm font-bold text-cyan-100 tracking-[0.14em] whitespace-nowrap overflow-hidden text-ellipsis">
                  RISHU KUMAR SINHA
                </h1>
              </div>
            </Link>

            <div className="hidden md:flex items-center justify-center">
              <div className="flex items-center gap-1.5 rounded-full border border-cyan-500/25 bg-[#081a2f]/70 px-2 py-1.5">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative px-4 py-2 rounded-full tech-code text-xs font-medium transition-all ${
                      activeSection === link.id
                        ? 'text-cyan-100 bg-cyan-500/16 border border-cyan-500/45'
                        : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/6 border border-transparent'
                    }`}
                  >
                    {link.name}
                    {activeSection === link.id && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center justify-end gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-cyan-500/25 bg-[#0a1d33]/70 hover:bg-[#0d243f] transition-colors text-gray-400 hover:text-cyan-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <Link to="/contact" className="px-4 py-2 rounded-lg tech-code text-xs font-semibold tech-btn-primary whitespace-nowrap">
                SEND SIGNAL
              </Link>
            </div>

            <div className="md:hidden flex items-center justify-end gap-2 col-start-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-cyan-500/25 bg-[#0a1d33]/70 hover:bg-[#0d243f] transition-colors text-gray-400 hover:text-cyan-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg border border-cyan-500/25 bg-[#0a1d33]/70 hover:bg-[#0d243f] transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6 text-gray-400" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="rounded-xl border border-cyan-500/25 bg-[#041120]/95 backdrop-blur-lg px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-all tech-code ${
                    activeSection === link.id
                      ? 'text-cyan-200 bg-cyan-500/10 border border-cyan-500/35'
                      : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/5 border border-transparent'
                  }`}
                  >
                  {link.name}
                </button>
              ))}
              
              <div className="pt-2 border-t border-gray-800 space-y-2">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 tech-btn-primary text-white rounded-lg font-semibold text-center tech-code"
                >
                  SEND SIGNAL
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default PortfolioNavbar;

import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, GraduationCap, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const mainLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/universities', label: t('nav.universities') },
    { path: '/jobs', label: t('nav.jobs') },
    { path: '/community', label: t('nav.community') },
    { path: '/guides', label: t('nav.guides') },
  ];

  const toolsLinks = [
    { path: '/career-help', label: t('nav.careerHelp') },
    { path: '/find-friends', label: t('nav.findFriends') },
    { path: '/culture-guide', label: t('nav.cultureGuide') },
    { path: '/day-simulator', label: t('nav.daySimulator') },
  ];

  const isToolsActive = toolsLinks.some(link => location.pathname === link.path);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <GraduationCap className="h-8 w-8 text-pink-500 group-hover:text-pink-600 transition-colors" />
            </motion.div>
            <span className="text-xl font-display font-black text-gray-900">
              Study<span className="text-pink-500">Bridge</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {mainLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-lg font-semibold transition-all ${
                  location.pathname === link.path
                    ? 'text-pink-600'
                    : 'text-gray-600 hover:text-pink-500'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            {/* Bonjour Buddy Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className={`relative flex items-center gap-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                  isToolsActive
                    ? 'text-pink-600'
                    : 'text-gray-600 hover:text-pink-500'
                }`}
              >
                {t('nav.bonjourBuddy')}
                <ChevronDown className={`w-4 h-4 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
                {isToolsActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>

              <AnimatePresence>
                {toolsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                  >
                    {toolsLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setToolsDropdownOpen(false)}
                        className={`block px-4 py-2.5 text-sm font-semibold transition-all ${
                          location.pathname === link.path
                            ? 'bg-pink-50 text-pink-600'
                            : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side - Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-pink-50 border border-gray-200 hover:border-pink-200 text-gray-700 hover:text-pink-600 transition-all"
            >
              <Globe className="h-5 w-5" />
              <span className="font-bold">{i18n.language === 'en' ? 'EN' : 'FR'}</span>
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 border border-gray-200 text-pink-500 hover:bg-pink-50 transition-all"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {mainLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg font-semibold transition-all ${
                      location.pathname === link.path
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-pink-50 hover:text-pink-600 border border-gray-200'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Bonjour Buddy Section in Mobile */}
                <div className="pt-2">
                  <p className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {t('nav.bonjourBuddy')}
                  </p>
                  {toolsLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg font-semibold transition-all ${
                        location.pathname === link.path
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-pink-50 hover:text-pink-600 border border-gray-200'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;

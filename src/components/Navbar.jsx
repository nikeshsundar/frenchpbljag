import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  const setLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-lg border-b border-gray-800/50' : 'bg-transparent'
    }`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-serif text-white">
              StudyBridge
            </span>
          </Link>

          {/* Desktop Navigation Links - Center */}
          <div className="hidden md:flex items-center space-x-1">
            {mainLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm transition-colors ${
                  location.pathname === link.path
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Bonjour Buddy Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className={`flex items-center gap-1 px-4 py-2 text-sm transition-colors ${
                  isToolsActive
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t('nav.bonjourBuddy')}
                <ChevronDown className={`w-3 h-3 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {toolsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-[#141414] rounded-lg border border-gray-800 py-2 shadow-2xl"
                  >
                    {toolsLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setToolsDropdownOpen(false)}
                        className={`block px-4 py-2.5 text-sm transition-colors ${
                          location.pathname === link.path
                            ? 'text-white bg-gray-800/50'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
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

          {/* Right Side - Contact & Language */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center rounded-full border border-gray-700 p-1 bg-[#111]">
              <button
                onClick={() => setLanguage('fr')}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  i18n.language === 'fr' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  i18n.language === 'en' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Contact Button */}
            <Link
              to="/universities"
              className="flex items-center gap-2 text-sm text-white hover:gap-3 transition-all"
            >
              {t('common.getStarted')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-[#0a0a0a] border-t border-gray-800"
            >
              <div className="py-6 space-y-1">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-sm transition-colors ${
                    location.pathname === '/'
                      ? 'text-white'
                      : 'text-gray-400'
                  }`}
                >
                  {t('nav.home')}
                </Link>
                {mainLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 text-sm transition-colors ${
                      location.pathname === link.path
                        ? 'text-white'
                        : 'text-gray-400'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Bonjour Buddy Section in Mobile */}
                <div className="pt-4 mt-4 border-t border-gray-800">
                  <p className="px-4 py-2 text-xs tracking-widest uppercase text-gray-600">
                    {t('nav.bonjourBuddy')}
                  </p>
                  {toolsLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 text-sm transition-colors ${
                        location.pathname === link.path
                          ? 'text-white'
                          : 'text-gray-400'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Language Toggle Mobile */}
                <div className="pt-4 mt-4 border-t border-gray-800 px-4">
                  <div className="inline-flex items-center rounded-full border border-gray-700 p-1 bg-[#111]">
                    <button
                      onClick={() => setLanguage('fr')}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                        i18n.language === 'fr' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      FR
                    </button>
                    <button
                      onClick={() => setLanguage('en')}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                        i18n.language === 'en' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      EN
                    </button>
                  </div>
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

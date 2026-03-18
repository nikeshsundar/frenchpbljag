import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ArrowDown, GraduationCap, Users, Building2, Globe2, Briefcase, BookOpen, Heart, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const services = [
    {
      icon: GraduationCap,
      title: 'University Search',
      description: 'Find top French universities matching your profile and aspirations.',
      link: '/universities'
    },
    {
      icon: Briefcase,
      title: 'Career Help',
      description: 'Get guidance on internships, jobs, and building your career in France.',
      link: '/career-help'
    },
    {
      icon: Users,
      title: 'Find Friends',
      description: 'Connect with fellow students and build your community abroad.',
      link: '/find-friends'
    },
    {
      icon: Compass,
      title: 'Culture Guide',
      description: 'Navigate French culture, etiquette, and daily life with confidence.',
      link: '/culture-guide'
    }
  ];

  const portfolioItems = [
    {
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop',
      category: 'University',
      title: 'Sorbonne University',
      subtitle: 'Paris, France'
    },
    {
      image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=600&h=400&fit=crop',
      category: 'Architecture',
      title: 'École Polytechnique',
      subtitle: 'Palaiseau, France'
    },
    {
      image: 'https://images.unsplash.com/photo-1471874708433-acd480424946?w=600&h=400&fit=crop',
      category: 'Campus Life',
      title: 'Student Experience',
      subtitle: 'Life in France'
    },
    {
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
      category: 'Graduation',
      title: 'Your Future',
      subtitle: 'Awaits in France'
    }
  ];

  const stats = [
    { value: '500+', label: 'Universities' },
    { value: '20,000+', label: 'Students Helped' },
    { value: '€3-15k', label: 'Yearly Tuition' },
    { value: '95%', label: 'Visa Success' }
  ];

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen flex items-center">
        {/* Background gradient */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: 'radial-gradient(ellipse 80% 50% at 20% 40%, rgba(120, 80, 200, 0.15), transparent)',
            }}
          />
          <div 
            className="absolute top-0 right-0 w-1/2 h-full"
            style={{
              background: 'radial-gradient(ellipse 60% 60% at 80% 20%, rgba(59, 130, 246, 0.1), transparent)',
            }}
          />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Main Headline - Serif like Oxaley */}
              <motion.h1 
                variants={fadeInUp}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif leading-[0.95]"
              >
                Crafting
                <br />
                your future
                <br />
                <span className="serif-italic text-gray-400">through</span>
                <br />
                <span className="serif-italic text-gray-400">education</span>
              </motion.h1>

              {/* Circular badges like Oxaley */}
              <motion.div variants={fadeInUp} className="flex items-center gap-3 pt-4">
                {['S', 'T', 'U', 'D', 'Y'].map((letter, i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-sm font-medium text-gray-400 hover:border-white hover:text-white transition-colors cursor-default"
                  >
                    {letter}
                  </div>
                ))}
              </motion.div>

              {/* Tagline */}
              <motion.p 
                variants={fadeInUp}
                className="text-gray-400 text-sm max-w-xs leading-relaxed"
              >
                We believe good education is key to building strong connections and a successful future in France.
              </motion.p>
            </motion.div>

            {/* Right Side - Portfolio Grid */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-4">
                {portfolioItems.slice(0, 2).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.2 }}
                    className="group relative overflow-hidden rounded-lg aspect-[4/5]"
                  >
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-xs text-gray-300 mb-1">{item.category}</p>
                      <p className="text-sm font-medium">{item.title}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Row - Portfolio link & Scroll */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center justify-between mt-16 pt-8 border-t border-gray-800/50"
          >
            <Link to="/universities" className="text-xs tracking-widest uppercase text-gray-500 hover:text-white transition-colors">
              See our universities
            </Link>

            {/* Mini portfolio previews */}
            <div className="hidden md:flex items-center gap-3">
              {portfolioItems.slice(0, 3).map((item, i) => (
                <div key={i} className="w-12 h-12 rounded overflow-hidden opacity-60 hover:opacity-100 transition-opacity">
                  <img src={item.image} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="flex items-center gap-1 ml-2">
                <div className="w-2 h-2 rounded-full bg-white" />
                <div className="w-2 h-2 rounded-full bg-gray-600" />
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-gray-500">
              <span>Scroll down</span>
              <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center scroll-indicator">
                <ArrowDown className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== ABOUT SECTION ========== */}
      <section className="py-32 relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Left - Big Statement */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-[1.1]">
                At StudyBridge — we believe
                <br />
                that education is not just
                <br />
                about degrees but
                <br />
                <span className="serif-italic text-gray-400">also</span> about creating —
                <br />
                immersive and
                <span className="inline-flex items-center gap-2 mx-3">
                  {['F', 'R', 'A', 'N'].map((l, i) => (
                    <span key={i} className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center text-xs">
                      {l}
                    </span>
                  ))}
                </span>
                <br />
                meaningful — experiences.
              </h2>
            </motion.div>

            {/* Right - Description & Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-between"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mb-12">
                {stats.map((stat, i) => (
                  <div key={i} className="border border-gray-800 rounded-lg p-6 hover:border-gray-600 transition-colors">
                    <div className="text-3xl font-serif mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="space-y-6">
                <p className="text-xs tracking-widest uppercase text-gray-500">About Us</p>
                <p className="text-gray-400 leading-relaxed">
                  We combine guidance and technology to deliver results that not only meet expectations, but exceed them. Your journey to France starts here.
                </p>
                <Link 
                  to="/guides"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:gap-4 transition-all group"
                >
                  Learn More 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== SERVICES SECTION ========== */}
      <section className="py-32 relative">
        {/* Subtle gradient */}
        <div 
          className="absolute top-1/2 right-0 w-1/2 h-96 -translate-y-1/2"
          style={{
            background: 'radial-gradient(ellipse at right, rgba(139, 92, 246, 0.08), transparent 70%)',
          }}
        />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left Label */}
            <div className="lg:col-span-3">
              <p className="text-xs tracking-widest uppercase text-gray-500 sticky top-32">Our Services</p>
            </div>

            {/* Services List */}
            <div className="lg:col-span-9 space-y-0">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    to={service.link}
                    className="group flex items-start gap-8 py-8 border-t border-gray-800 hover:border-gray-600 transition-colors"
                  >
                    {/* Service Title */}
                    <div className="flex-1">
                      <h3 className="text-2xl sm:text-3xl font-serif mb-3 group-hover:text-gray-300 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 text-sm max-w-md">
                        {service.description}
                      </p>
                    </div>

                    {/* Images preview */}
                    <div className="hidden md:flex items-center gap-3">
                      <div className="w-20 h-14 rounded overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                        <img 
                          src={portfolioItems[index % portfolioItems.length].image} 
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-20 h-14 rounded overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                        <img 
                          src={portfolioItems[(index + 1) % portfolioItems.length].image} 
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURED SECTION - Full width image ========== */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(236, 72, 153, 0.15) 100%)',
            }}
          >
            <div className="grid md:grid-cols-2">
              {/* Left Content */}
              <div className="p-12 lg:p-16 flex flex-col justify-center">
                <p className="text-xs tracking-widest uppercase text-gray-400 mb-6">Featured</p>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-6">
                  Day in Life
                  <br />
                  <span className="serif-italic text-gray-400">Simulator</span>
                </h3>
                <p className="text-gray-400 mb-8 max-w-md">
                  Experience a typical day as a student in France. Navigate through morning routines, classes, meals, and social life.
                </p>
                <Link 
                  to="/day-simulator"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:gap-4 transition-all group"
                >
                  Try Simulator
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Right Image */}
              <div className="relative h-80 md:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop"
                  alt="Student life"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent md:from-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== FAQ PREVIEW SECTION ========== */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-5xl font-serif mb-8">
                Frequently
                <br />
                asked —
                <br />
                <span className="serif-italic text-gray-400">questions</span>
              </h2>
              <p className="text-gray-500 text-sm max-w-sm mb-8">
                Everything you need to know about studying in France, from visa requirements to daily expenses.
              </p>
              <Link 
                to="/guides"
                className="inline-flex items-center gap-2 text-sm font-medium hover:gap-4 transition-all group"
              >
                View All Guides
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-0"
            >
              {[
                { q: 'What are the visa requirements?', a: 'Indian students need a long-stay student visa (VLS-TS). Requirements include admission letter, proof of funds, and health insurance.' },
                { q: 'How much does it cost to study?', a: 'Public universities charge €170-380/year for EU students, €2,770-3,770 for non-EU. Private schools range €3,000-20,000/year.' },
                { q: 'Can I work while studying?', a: 'Yes! Students can work up to 964 hours per year (about 20 hours/week during term time).' },
              ].map((faq, i) => (
                <div key={i} className="border-t border-gray-800 py-6">
                  <h4 className="text-lg font-medium mb-2">{faq.q}</h4>
                  <p className="text-gray-500 text-sm">{faq.a}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="py-32 relative overflow-hidden">
        {/* Background gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at 50% 100%, rgba(139, 92, 246, 0.15), transparent 70%)',
          }}
        />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif mb-8">
              Ready to start
              <br />
              <span className="serif-italic text-gray-400">your journey?</span>
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-12">
              Join thousands of Indian students who have successfully made France their academic home.
            </p>
            <Link 
              to="/universities"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-16 border-t border-gray-800">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Logo */}
            <div className="md:col-span-2">
              <div className="text-2xl font-serif mb-4">StudyBridge</div>
              <p className="text-gray-500 text-sm max-w-xs">
                Your gateway to world-class education in France. We guide Indian students through every step of their journey.
              </p>
            </div>

            {/* Links */}
            <div>
              <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Navigation</p>
              <div className="space-y-2">
                {['Universities', 'Jobs', 'Community', 'Guides'].map((link) => (
                  <Link 
                    key={link} 
                    to={`/${link.toLowerCase()}`}
                    className="block text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>

            {/* Bonjour Buddy */}
            <div>
              <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Bonjour Buddy</p>
              <div className="space-y-2">
                {[
                  { name: 'Career Help', path: '/career-help' },
                  { name: 'Find Friends', path: '/find-friends' },
                  { name: 'Culture Guide', path: '/culture-guide' },
                  { name: 'Day Simulator', path: '/day-simulator' },
                ].map((link) => (
                  <Link 
                    key={link.path} 
                    to={link.path}
                    className="block text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-gray-800 text-gray-500 text-xs">
            <p>© 2024 StudyBridge France. All rights reserved.</p>
            <p>Made with care for Indian students</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

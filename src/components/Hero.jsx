import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Users, DollarSign, GraduationCap, TrendingUp, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import EiffelTower from './EiffelTower';
import ArcDeTriomphe from './ArcDeTriomphe';
import LouvrePyramid from './LouvrePyramid';
import AnimatedCounter from './AnimatedCounter';

const Hero = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: GraduationCap, value: 500, label: t('hero.stats.universities'), suffix: '+' },
    { icon: Users, value: 20000, label: t('hero.stats.students'), suffix: '+' },
    { icon: DollarSign, value: '€3-15k', label: t('hero.stats.cost'), isText: true },
    { icon: TrendingUp, value: 95, label: t('hero.stats.visa'), suffix: '%' },
  ];

  // Stagger animation for text
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-pink-50 text-gray-900 min-h-screen flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-96 h-96 bg-pink-200 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-100 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-200 text-pink-600 text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Your Gateway to France</span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-display font-black leading-tight text-gray-900"
            >
              Study in{' '}
              <span className="gradient-text">France</span>
              <br />
              Transform Your Future
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 max-w-xl leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/universities"
                className="group relative px-8 py-4 bg-pink-500 text-white rounded-xl font-bold text-lg hover:bg-pink-600 transition-all transform hover:-translate-y-1 flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center">
                  {t('hero.cta.find')}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <button className="px-8 py-4 bg-white border-2 border-pink-500 text-pink-600 rounded-xl font-bold text-lg hover:bg-pink-50 transition-all transform hover:-translate-y-1 shadow-md">
                {t('hero.cta.chat')}
              </button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-xl p-4 border border-gray-200 shadow-md hover:shadow-lg transition-all"
                >
                  <stat.icon className="h-6 w-6 text-pink-500 mb-2" />
                  <div className="text-2xl md:text-3xl font-black text-pink-500 mb-1">
                    {stat.isText ? (
                      stat.value
                    ) : (
                      <AnimatedCounter 
                        end={stat.value} 
                        suffix={stat.suffix} 
                        duration={2.5}
                      />
                    )}
                  </div>
                  <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - French Landmarks */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Landmark Illustrations */}
            <div className="relative w-full h-[600px]">
              {/* Eiffel Tower - Center */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-auto text-pink-500 opacity-80"
              >
                <EiffelTower className="w-full h-auto drop-shadow-lg" strokeWidth={2.5} />
              </motion.div>

              {/* Arc de Triomphe - Bottom Left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 1.2 }}
                className="absolute bottom-20 left-0 w-56 h-auto text-pink-400 opacity-60"
              >
                <ArcDeTriomphe className="w-full h-auto" strokeWidth={2} />
              </motion.div>

              {/* Louvre Pyramid - Bottom Right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 1.6 }}
                className="absolute bottom-0 right-0 w-52 h-auto text-pink-400 opacity-50"
              >
                <LouvrePyramid className="w-full h-auto" strokeWidth={2} />
              </motion.div>

              {/* Decorative Circles */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-pink-200 rounded-full"
              />
              
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.05, 0.15, 0.05]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-pink-100 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 w-full opacity-50">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="url(#wave-gradient)"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FDF2F8" />
              <stop offset="50%" stopColor="#FCE7F3" />
              <stop offset="100%" stopColor="#FDF2F8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Hero;

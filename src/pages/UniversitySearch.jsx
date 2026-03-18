import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import UniversityFinder from '../components/UniversityFinder';

const UniversitySearch = () => {
  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(139, 92, 246, 0.12), transparent)',
          }}
        />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Explore</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif mb-6">
              Find your
              <br />
              <span className="serif-italic text-gray-400">perfect university</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mb-8">
              Search through 500+ French universities. Filter by location, program, tuition, and find the perfect fit for your academic journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* University Finder */}
      <section className="pb-32">
        <UniversityFinder />
      </section>
    </div>
  );
};

export default UniversitySearch;

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Coffee, Bike, BookOpen, GraduationCap, ShoppingBag, 
  UtensilsCrossed, Megaphone, Baby, Database, Calendar,
  Microscope, ShoppingCart, Smartphone, Dumbbell, MapPin,
  Palette, Dog, Laptop, Languages, Camera, Briefcase, Filter
} from 'lucide-react';
import jobsData from '../data/jobs.json';

const iconMap = {
  Coffee, Bike, BookOpen, GraduationCap, ShoppingBag,
  UtensilsCrossed, Megaphone, Baby, Database, Calendar,
  Microscope, ShoppingCart, Smartphone, Dumbbell, MapPin,
  Palette, Dog, Laptop, Languages, Camera, Briefcase
};

const Jobs = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Hospitality', 'Delivery', 'Campus Jobs', 'Tutoring', 'Retail', 'Childcare', 'Administrative', 'Events', 'Tech', 'Creative', 'Digital', 'Sports & Fitness', 'Tourism', 'Pet Care'];

  const filteredJobs = selectedCategory === 'All' 
    ? jobsData 
    : jobsData.filter(job => job.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 gradient-text">
          {t('jobs.title')}
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          {t('jobs.subtitle')}
        </p>
        <div className="inline-block bg-pink-50 text-pink-800 px-6 py-3 rounded-lg mt-4 border border-pink-200">
          <p className="font-semibold">
            ⚖️ Legal working hours: <span className="text-pink-600">964 hours/year (~20 hrs/week)</span>
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 mr-2 text-gray-600" />
          <span className="font-semibold text-gray-700">{t('jobs.filter')}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Grid */}
      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => {
          const IconComponent = iconMap[job.icon] || Briefcase;
          
          return (
            <motion.div
              key={job.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg p-6 card-hover border border-gray-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="bg-pink-50 p-3 rounded-lg">
                  <IconComponent className="w-6 h-6 text-pink-600" />
                </div>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  €{job.avgPayEur}/hr
                </span>
              </div>

              {/* Title & Category */}
              <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
              <span className="inline-block bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-xs font-medium mb-4 border border-pink-200">
                {job.category}
              </span>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{job.description}</p>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t('jobs.hours')}:</span>
                  <span className="font-semibold text-gray-700">{job.hoursPerWeek}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t('jobs.french')}:</span>
                  <span className="font-semibold text-gray-700">{job.frenchLevel}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">In INR:</span>
                  <span className="font-semibold text-green-700">₹{job.avgPayInr}/hr</span>
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">REQUIREMENTS:</p>
                <div className="flex flex-wrap gap-1">
                  {job.requirements.slice(0, 2).map((req, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              {/* How to Apply */}
              <div className="bg-pink-50 border-l-4 border-pink-500 p-3 text-sm">
                <p className="font-semibold text-pink-900 mb-1">How to Apply:</p>
                <p className="text-pink-700 text-xs">{job.howToApply}</p>
              </div>

              {/* Popular Areas */}
              <div className="mt-4 flex items-center text-xs text-gray-500">
                <MapPin className="w-3 h-3 mr-1" />
                {job.popularAreas.slice(0, 3).join(', ')}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* No Results */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No jobs found in this category.</p>
        </div>
      )}

      {/* Tips Section */}
      <div className="mt-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-display font-bold mb-4">💡 Job Search Tips for International Students</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-semibold mb-2">✅ Start Early</h3>
            <p className="text-sm text-pink-100">Begin your job search as soon as you arrive. Popular positions fill quickly in September!</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-semibold mb-2">📄 Prepare Documents</h3>
            <p className="text-sm text-pink-100">Always carry your student ID, residence permit, and a French CV.</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-semibold mb-2">🗣️ Practice French</h3>
            <p className="text-sm text-pink-100">Even basic French dramatically increases your chances. Focus on customer service phrases!</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-semibold mb-2">🌐 Use Multiple Platforms</h3>
            <p className="text-sm text-pink-100">Check Indeed France, LeBonCoin, university job boards, and LinkedIn regularly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;

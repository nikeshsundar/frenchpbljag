import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Coffee, Bike, BookOpen, GraduationCap, ShoppingBag, 
  UtensilsCrossed, Megaphone, Baby, Database, Calendar,
  Microscope, ShoppingCart, Smartphone, Dumbbell, MapPin,
  Palette, Dog, Laptop, Languages, Camera, Briefcase, ArrowRight
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
    <div className="bg-[#0a0a0a] min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div 
          className="absolute top-0 right-0 w-1/2 h-full"
          style={{
            background: 'radial-gradient(ellipse 60% 60% at 80% 20%, rgba(59, 130, 246, 0.1), transparent)',
          }}
        />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Opportunities</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif mb-6">
              Part-time
              <br />
              <span className="serif-italic text-gray-400">jobs for students</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mb-6">
              {t('jobs.subtitle')}
            </p>
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-lg border border-gray-800 bg-gray-900/50">
              <span className="text-gray-400 text-sm">Legal working hours:</span>
              <span className="text-white font-medium">964 hours/year (~20 hrs/week)</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Filter by category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-white text-black'
                    : 'bg-transparent border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => {
              const IconComponent = iconMap[job.icon] || Briefcase;
              
              return (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group bg-[#111] rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-gray-400" />
                    </div>
                    <span className="text-green-400 font-semibold">
                      €{job.avgPayEur}/hr
                    </span>
                  </div>

                  {/* Title & Category */}
                  <h3 className="text-xl font-serif text-white mb-2">{job.title}</h3>
                  <span className="inline-block text-xs tracking-wider uppercase text-gray-500 mb-4">
                    {job.category}
                  </span>

                  {/* Description */}
                  <p className="text-gray-500 text-sm mb-6 line-clamp-3">{job.description}</p>

                  {/* Details */}
                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('jobs.hours')}</span>
                      <span className="text-gray-400">{job.hoursPerWeek}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('jobs.french')}</span>
                      <span className="text-gray-400">{job.frenchLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">In INR</span>
                      <span className="text-green-400">₹{job.avgPayInr}/hr</span>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="mb-6">
                    <p className="text-xs tracking-wider uppercase text-gray-600 mb-2">Requirements</p>
                    <div className="flex flex-wrap gap-1">
                      {job.requirements.slice(0, 2).map((req, idx) => (
                        <span key={idx} className="bg-gray-800 text-gray-400 px-2 py-1 rounded text-xs">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* How to Apply */}
                  <div className="border-l-2 border-gray-700 pl-4 py-2">
                    <p className="text-xs tracking-wider uppercase text-gray-600 mb-1">How to Apply</p>
                    <p className="text-gray-400 text-xs">{job.howToApply}</p>
                  </div>

                  {/* Popular Areas */}
                  <div className="mt-4 flex items-center text-xs text-gray-600">
                    <MapPin className="w-3 h-3 mr-1" />
                    {job.popularAreas.slice(0, 3).join(', ')}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* No Results */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No jobs found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div 
            className="rounded-2xl p-12 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)',
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-serif mb-8">
              Job search
              <br />
              <span className="serif-italic text-gray-400">tips for students</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Start Early', desc: 'Begin your job search as soon as you arrive. Popular positions fill quickly in September!' },
                { title: 'Prepare Documents', desc: 'Always carry your student ID, residence permit, and a French CV.' },
                { title: 'Practice French', desc: 'Even basic French dramatically increases your chances. Focus on customer service phrases!' },
                { title: 'Use Multiple Platforms', desc: 'Check Indeed France, LeBonCoin, university job boards, and LinkedIn regularly.' },
              ].map((tip, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="text-white font-medium">{tip.title}</h3>
                  <p className="text-gray-400 text-sm">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Jobs;

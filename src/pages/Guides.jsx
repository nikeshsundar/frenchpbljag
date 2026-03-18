import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, FileText, Plane, Home, CreditCard, MapPin, Book, Download } from 'lucide-react';

const Guides = () => {
  const [activeStep, setActiveStep] = useState(0);

  const timeline = [
    {
      month: '12-18 months before',
      title: 'Research & University Selection',
      icon: Book,
      tasks: [
        'Research French universities and programs',
        'Check admission requirements and deadlines',
        'Prepare for language tests (DELF/DALF or IELTS/TOEFL)',
        'Calculate budget including tuition and living costs'
      ],
      tips: 'Start early! Top universities have deadlines as early as January for September intake.'
    },
    {
      month: '10-12 months before',
      title: 'Application Preparation',
      icon: FileText,
      tasks: [
        'Gather academic transcripts and certificates',
        'Prepare statement of purpose and motivation letter',
        'Get letters of recommendation from professors',
        'Take required language proficiency tests',
        'Submit applications through university portals'
      ],
      tips: 'Keep digital and physical copies of all documents. Get transcripts attested if required.'
    },
    {
      month: '8-10 months before',
      title: 'Campus France Registration',
      icon: CheckCircle2,
      tasks: [
        'Create account on Campus France website',
        'Complete the online application form',
        'Upload all required documents',
        'Pay Campus France processing fee',
        'Attend Campus France interview',
        'Receive acceptance letter from university'
      ],
      tips: 'Campus France interview focuses on your motivation and plans. Be honest and prepared!'
    },
    {
      month: '6-8 months before',
      title: 'Student Visa Application',
      icon: Plane,
      tasks: [
        'Receive Campus France approval',
        'Book VFS appointment for visa submission',
        'Prepare financial proof (bank statements, scholarship letters)',
        'Get health insurance for France',
        'Fill out long-stay visa application form',
        'Submit documents at VFS center',
        'Attend visa interview if required'
      ],
      tips: 'Visa processing takes 2-4 weeks. Apply early to avoid last-minute stress!'
    },
    {
      month: '3-6 months before',
      title: 'Accommodation & Travel',
      icon: Home,
      tasks: [
        'Apply for CROUS housing (student residences)',
        'Search for private accommodation if needed',
        'Book flight tickets',
        'Arrange airport pickup or transport',
        'Pack essentials (check baggage limits)',
        'Inform your university of arrival date'
      ],
      tips: 'CROUS is cheapest but fills fast. Private accommodation: avoid paying large deposits before viewing!'
    },
    {
      month: '1-3 months before',
      title: 'Pre-Departure Preparation',
      icon: CreditCard,
      tasks: [
        'Open a forex card or get some Euros',
        'Download essential apps (SNCF, Citymapper, etc.)',
        'Get international student ID (ISIC card)',
        'Photocopy all important documents',
        'Learn basic French phrases',
        'Join Facebook groups of your university'
      ],
      tips: 'Connect with seniors from your university - they can help you settle in!'
    },
    {
      month: 'After Arrival',
      title: 'First Steps in France',
      icon: MapPin,
      tasks: [
        'Validate your visa at OFII (within 3 months)',
        'Register at your university',
        'Open a French bank account',
        'Get a French SIM card',
        'Apply for CAF housing assistance',
        'Register for French healthcare (CPAM)',
        'Get carte de séjour from prefecture'
      ],
      tips: 'CAF can reduce rent by 30-50%! Apply as soon as you have a lease agreement.'
    }
  ];

  return (
    <div className="min-h-screen bg-dark pt-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-serif font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
                Your Step-by-Step Journey
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              From application to arrival - everything you need to know
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Interactive Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 via-violet-500 to-blue-500"></div>

          {/* Timeline Steps */}
          <div className="space-y-12">
            {timeline.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = activeStep === index;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline Dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-10">
                    <motion.button
                      onClick={() => setActiveStep(index)}
                      whileHover={{ scale: 1.2 }}
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/50 scale-110'
                          : 'bg-dark-card border-2 border-purple-500/50 hover:border-purple-400'
                      }`}
                    >
                      <IconComponent className={`w-8 h-8 ${isActive ? 'text-white' : 'text-purple-400'}`} />
                    </motion.button>
                  </div>

                  {/* Content Card */}
                  <div className={`md:w-5/12 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                    <motion.div
                      onClick={() => setActiveStep(index)}
                      whileHover={{ y: -5 }}
                      className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all border ${
                        isActive 
                          ? 'border-purple-500/50 shadow-lg shadow-purple-500/10' 
                          : 'border-white/10 hover:border-purple-500/30'
                      }`}
                    >
                      {/* Mobile Icon */}
                      <div className="md:hidden mb-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isActive 
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
                            : 'bg-purple-500/20'
                        }`}>
                          <IconComponent className={`w-6 h-6 ${isActive ? 'text-white' : 'text-purple-400'}`} />
                        </div>
                      </div>

                      <div className="text-sm font-semibold text-purple-400 mb-2">{step.month}</div>
                      <h3 className="text-2xl font-serif font-bold text-white mb-4">{step.title}</h3>

                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <div className="space-y-2 mb-4">
                            {step.tasks.map((task, idx) => (
                              <div key={idx} className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">{task}</span>
                              </div>
                            ))}
                          </div>

                          <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-3 rounded-r">
                            <p className="text-sm text-yellow-200">
                              <span className="font-semibold">Pro Tip:</span> {step.tips}
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {!isActive && (
                        <button className="text-purple-400 text-sm font-semibold hover:text-purple-300 transition-colors">
                          Click to expand →
                        </button>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all"
          >
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-xl font-serif font-bold mb-3 text-white">Useful Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-purple-400 transition-colors cursor-pointer">• Campus France Official Website</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">• VFS France Visa Information</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">• CROUS Housing Portal</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">• CAF Housing Assistance</li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all"
          >
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-xl font-serif font-bold mb-3 text-white">Cost Breakdown</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Tuition: <span className="text-purple-400">€2,500 - €15,000</span>/year</li>
              <li>• Rent: <span className="text-purple-400">€300 - €800</span>/month</li>
              <li>• Food: <span className="text-purple-400">€200 - €300</span>/month</li>
              <li>• Transport: <span className="text-purple-400">€30 - €75</span>/month</li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all"
          >
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">⏰</span>
            </div>
            <h3 className="text-xl font-serif font-bold mb-3 text-white">Key Deadlines</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Applications: <span className="text-blue-400">Jan - Apr</span></li>
              <li>• Campus France: <span className="text-blue-400">Feb - May</span></li>
              <li>• Visa: <span className="text-blue-400">May - Jul</span></li>
              <li>• Arrival: <span className="text-blue-400">Aug - Sep</span></li>
            </ul>
          </motion.div>
        </div>

        {/* Download CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10"></div>
          <div className="relative p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3">Want a printable checklist?</h2>
            <p className="mb-6 text-purple-100 max-w-2xl mx-auto">
              Download our comprehensive PDF guide with all steps and document requirements
            </p>
            <button className="inline-flex items-center bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-white/25 transition-all transform hover:-translate-y-1">
              <Download className="w-5 h-5 mr-2" />
              Download PDF Guide
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Guides;

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, FileText, Plane, Home, CreditCard, MapPin, Book } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 gradient-text">
          Your Step-by-Step Journey to France
        </h1>
        <p className="text-xl text-gray-600">
          From application to arrival - everything you need to know
        </p>
      </div>

      {/* Interactive Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-pink-400 via-pink-500 to-rose-500"></div>

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
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg scale-110'
                        : 'bg-white border-4 border-pink-500'
                    }`}
                  >
                    <IconComponent className={`w-8 h-8 ${isActive ? 'text-white' : 'text-pink-500'}`} />
                  </motion.button>
                </div>

                {/* Content Card */}
                <div className={`md:w-5/12 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                  <motion.div
                    onClick={() => setActiveStep(index)}
                    whileHover={{ y: -5 }}
                    className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all border ${
                      isActive ? 'border-pink-400 shadow-2xl' : 'border-gray-200'
                    }`}
                  >
                    {/* Mobile Icon */}
                    <div className="md:hidden mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isActive ? 'bg-gradient-to-r from-pink-500 to-rose-500' : 'bg-pink-50'
                      }`}>
                        <IconComponent className={`w-6 h-6 ${isActive ? 'text-white' : 'text-pink-500'}`} />
                      </div>
                    </div>

                    <div className="text-sm font-semibold text-pink-600 mb-2">{step.month}</div>
                    <h3 className="text-2xl font-display font-bold text-gray-800 mb-4">{step.title}</h3>

                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="space-y-2 mb-4">
                          {step.tasks.map((task, idx) => (
                            <div key={idx} className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700 text-sm">{task}</span>
                            </div>
                          ))}
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3">
                          <p className="text-sm text-yellow-800">
                            <span className="font-semibold">💡 Pro Tip:</span> {step.tips}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {!isActive && (
                      <button className="text-pink-600 text-sm font-semibold hover:underline">
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
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">📚</span>
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-900">Useful Resources</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Campus France Official Website</li>
            <li>• VFS France Visa Information</li>
            <li>• CROUS Housing Portal</li>
            <li>• CAF Housing Assistance</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">💰</span>
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-900">Cost Breakdown</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Tuition: €2,500 - €15,000/year</li>
            <li>• Rent: €300 - €800/month</li>
            <li>• Food: €200 - €300/month</li>
            <li>• Transport: €30 - €75/month</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">⏰</span>
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-900">Key Deadlines</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Applications: Jan - Apr</li>
            <li>• Campus France: Feb - May</li>
            <li>• Visa: May - Jul</li>
            <li>• Arrival: Aug - Sep</li>
          </ul>
        </div>
      </div>

      {/* Download CTA */}
      <div className="mt-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-display font-bold mb-3">Want a printable checklist?</h2>
        <p className="mb-6 text-pink-100">Download our comprehensive PDF guide with all steps and document requirements</p>
        <button className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:-translate-y-1">
          Download PDF Guide
        </button>
      </div>
    </div>
  );
};

export default Guides;

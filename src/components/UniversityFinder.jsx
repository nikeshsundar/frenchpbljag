import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, Sparkles, MapPin, Euro, Trophy, ExternalLink, Loader2 } from 'lucide-react';
import universitiesData from '../data/universities.json';
import { matchUniversities } from '../utils/openai';

const UniversityFinder = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [aiMatches, setAiMatches] = useState([]);

  const [formData, setFormData] = useState({
    cgpa: 7.5,
    course: '',
    budget: 10000,
    city: '',
    preferences: ''
  });

  const courses = [
    'Computer Science',
    'Business Administration',
    'Business',
    'Engineering',
    'Medicine',
    'Law',
    'Economics',
    'Mathematics',
    'Physics',
    'International Relations',
    'Marketing',
    'Finance',
    'Management',
    'Political Science',
    'Chemistry',
    'Literature',
    'Data Science',
    'Environmental Science'
  ];

  const handleSubmit = async () => {
    setLoading(true);
    
    // Filter universities based on basic criteria
    const filtered = universitiesData.filter(uni => {
      const cgpaMatch = formData.cgpa >= uni.minCGPA - 0.5; // Allow 0.5 tolerance
      const budgetMatch = formData.budget >= uni.tuitionFees;
      // Partial course matching: check if any program contains the selected course keyword or vice versa
      const courseMatch = !formData.course || uni.programs.some(p => 
        p.toLowerCase().includes(formData.course.toLowerCase()) ||
        formData.course.toLowerCase().includes(p.toLowerCase())
      );
      const cityMatch = !formData.city || uni.city.toLowerCase().includes(formData.city.toLowerCase());
      
      return cgpaMatch && budgetMatch && courseMatch && cityMatch;
    });

    // Sort by QS ranking (lower is better)
    filtered.sort((a, b) => a.qsRanking - b.qsRanking);

    setResults(filtered);
    setStep(4); // Move to results view

    // Get AI recommendations
    try {
      const aiRecommendations = await matchUniversities(formData, filtered.slice(0, 10));
      setAiMatches(aiRecommendations);
    } catch (error) {
      console.error('AI matching failed:', error);
      // Continue with filtered results even if AI fails
    }

    setLoading(false);
  };

  const getMatchScore = (uniName) => {
    const aiMatch = aiMatches.find(m => m.name === uniName);
    return aiMatch?.matchScore || null;
  };

  const getAIInsights = (uniName) => {
    return aiMatches.find(m => m.name === uniName);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-bold mb-4 bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
          {t('finder.title')}
        </h2>
        <p className="text-gray-400 text-lg">
          {t('finder.subtitle')}
        </p>
      </div>

      {/* Multi-step Form */}
      {step <= 3 && (
      <div className="max-w-3xl mx-auto mb-12">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step >= s 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                    : 'bg-white/10 text-gray-500 border border-white/20'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`w-16 h-1 mx-2 rounded transition-all ${
                    step > s 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
                      : 'bg-white/10'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          {/* Step 1: CGPA */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h3 className="text-2xl font-serif font-semibold mb-6 text-white">{t('finder.step1')}</h3>
              <label className="block mb-4 text-gray-300 font-medium">
                {t('finder.cgpa')}: <span className="text-purple-400 text-2xl font-bold">{formData.cgpa.toFixed(1)}</span>/10
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={formData.cgpa}
                onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) })}
                className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>0.0</span>
                <span>5.0</span>
                <span>10.0</span>
              </div>
              <button
                onClick={() => setStep(2)}
                className="mt-8 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg hover:shadow-purple-500/25"
              >
                Next Step
              </button>
            </motion.div>
          )}

          {/* Step 2: Course & Budget */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h3 className="text-2xl font-serif font-semibold mb-6 text-white">{t('finder.step2')}</h3>
              
              <label className="block mb-2 text-gray-300 font-medium">{t('finder.course')}</label>
              <select
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="w-full mb-6 p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="" className="bg-dark-card">{t('finder.selectCourse')}</option>
                {courses.map(course => (
                  <option key={course} value={course} className="bg-dark-card">{course}</option>
                ))}
              </select>

              <label className="block mb-2 text-gray-300 font-medium">
                {t('finder.budget')}: <span className="text-purple-400 font-bold">€{formData.budget.toLocaleString()}</span>/year
              </label>
              <input
                type="range"
                min="2000"
                max="50000"
                step="1000"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>€2k</span>
                <span>€25k</span>
                <span>€50k</span>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
                >
                  {t('common.back')}
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg hover:shadow-purple-500/25"
                >
                  {t('common.nextStep')}
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Preferences */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h3 className="text-2xl font-serif font-semibold mb-6 text-white">{t('finder.step3')}</h3>
              
              <label className="block mb-2 text-gray-300 font-medium">{t('finder.cityOptional', { city: t('finder.city') })}</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder={t('finder.cityPlaceholder')}
                className="w-full mb-6 p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />

              <label className="block mb-2 text-gray-300 font-medium">{t('finder.otherPreferences')}</label>
              <textarea
                value={formData.preferences}
                onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                placeholder={t('finder.preferencesPlaceholder')}
                className="w-full mb-6 p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 h-24"
              />

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
                >
                  {t('common.back')}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg hover:shadow-purple-500/25 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      {t('finder.analyzing')}
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2" />
                      {t('finder.search')}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      )}

      {/* Results - Step 4 */}
      {step === 4 && results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-serif font-bold text-white">
              {t('finder.results')} ({t('finder.resultsCount', { count: results.length })})
            </h3>
            <button
              onClick={() => { setStep(1); setResults([]); setAiMatches([]); }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg font-semibold flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              {t('finder.searchAgain')}
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((uni) => {
              const matchScore = getMatchScore(uni.name);
              const aiInsights = getAIInsights(uni.name);
              
              return (
                <motion.div
                  key={uni.id}
                  whileHover={{ y: -8 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all"
                >
                  <img
                    src={uni.image}
                    alt={uni.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-xl font-semibold text-white">{uni.name}</h4>
                      {matchScore && (
                        <div className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-bold flex items-center border border-purple-500/30">
                          <Sparkles className="w-4 h-4 mr-1" />
                          {matchScore}%
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center text-gray-400 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {uni.city}, {uni.region}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="flex items-center text-gray-400">
                        <Euro className="w-4 h-4 mr-1" />
                        €{uni.tuitionFees.toLocaleString()}/year
                      </span>
                      <span className="flex items-center text-gray-400">
                        <Trophy className="w-4 h-4 mr-1" />
                        QS #{uni.qsRanking}
                      </span>
                    </div>

                    {aiInsights && (
                      <div className="bg-purple-500/10 border-l-4 border-purple-500 p-3 mb-3 text-sm rounded-r">
                        <p className="text-gray-300 mb-2">{aiInsights.reasoning}</p>
                        <p className="text-green-400 font-semibold">✓ {aiInsights.strength}</p>
                        <p className="text-yellow-400">⚠ {aiInsights.consideration}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      {uni.programs.slice(0, 3).map((program, idx) => (
                        <span key={idx} className="bg-white/10 text-purple-300 px-2 py-1 rounded text-xs font-medium border border-white/10">
                          {program}
                        </span>
                      ))}
                    </div>

                    <a
                      href={uni.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg hover:shadow-purple-500/25"
                    >
                      {t('finder.visitWebsite')}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* No Results - Step 4 with 0 results */}
      {step === 4 && results.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-white mb-2">{t('finder.noResultsTitle')}</h3>
          <p className="text-gray-400 mb-6">{t('finder.noResultsDescription')}</p>
          <button
            onClick={() => { setStep(1); setResults([]); setAiMatches([]); }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg font-semibold"
          >
            {t('common.tryAgain')}
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default UniversityFinder;

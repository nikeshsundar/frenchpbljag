import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, Trophy, ArrowRight } from 'lucide-react';
import cultureData from '../data/culture.json';

const CultureGuide = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dosdonts');
  const [dosFilter, setDosFilter] = useState('all');
  const [expandedMistake, setExpandedMistake] = useState(null);
  
  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const tabs = [
    { id: 'dosdonts', label: "Do's & Don'ts" },
    { id: 'greetings', label: 'Greeting Styles' },
    { id: 'quiz', label: 'Culture Quiz' },
    { id: 'mistakes', label: 'Common Mistakes' },
  ];

  const filteredDos = cultureData.dosAndDonts.filter(item => {
    if (dosFilter === 'all') return true;
    if (dosFilter === 'do') return item.type === 'do';
    if (dosFilter === 'dont') return item.type === 'dont';
    return true;
  });

  const handleQuizAnswer = (idx) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);
    if (idx === cultureData.cultureQuiz[currentQuestion].correctIndex) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < cultureData.cultureQuiz.length - 1) {
      setCurrentQuestion(q => q + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizComplete(false);
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 40% 10%, rgba(59, 130, 246, 0.1), transparent)',
          }}
        />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Bonjour Buddy</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif mb-6">
              French culture
              <br />
              <span className="serif-italic text-gray-400">guide</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl">
              Master French etiquette, avoid common mistakes, and feel confident in social situations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="pb-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-black'
                    : 'bg-transparent border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          {/* =================== DO'S & DON'TS =================== */}
          {activeTab === 'dosdonts' && (
            <div>
              {/* Filter */}
              <div className="flex gap-2 mb-8">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'do', label: "Do's" },
                  { id: 'dont', label: "Don'ts" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setDosFilter(f.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      dosFilter === f.id
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-500 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence mode="popLayout">
                  {filteredDos.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-[#111] rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          item.type === 'do' ? 'bg-green-500/20' : 'bg-red-500/20'
                        }`}>
                          {item.type === 'do' ? (
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-400" />
                          )}
                        </div>
                        <div>
                          <span className="text-xs tracking-wider uppercase text-gray-600">
                            {item.category}
                          </span>
                          <h3 className="text-base font-serif text-white mt-1 leading-snug">{item.title}</h3>
                          <p className="text-sm text-gray-500 mt-2 leading-relaxed">{item.explanation}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* =================== GREETING STYLES =================== */}
          {activeTab === 'greetings' && (
            <div className="max-w-4xl">
              <div className="space-y-4">
                {cultureData.greetingStyles.map((greeting, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="bg-[#111] rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="flex-1">
                        <h3 className="text-lg font-serif text-white mb-2">{greeting.situation}</h3>
                        <p className="text-purple-400 font-medium">"{greeting.greeting}"</p>
                        <div className="mt-3">
                          <span className="text-xs font-medium text-gray-600">Gesture: </span>
                          <span className="text-sm text-gray-400">{greeting.gesture}</span>
                        </div>
                      </div>
                      <div className="md:w-72 border-l border-gray-800 pl-6">
                        <p className="text-sm text-gray-500">{greeting.notes}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* =================== CULTURE QUIZ =================== */}
          {activeTab === 'quiz' && (
            <div className="max-w-2xl">
              {!quizStarted && !quizComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center bg-[#111] rounded-xl border border-gray-800 p-12"
                >
                  <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Trophy className="w-10 h-10 text-purple-400" />
                  </div>
                  <h2 className="text-3xl font-serif text-white mb-4">French Culture Quiz</h2>
                  <p className="text-gray-400 mb-2">
                    {cultureData.cultureQuiz.length} questions about French etiquette and social norms.
                  </p>
                  <p className="text-gray-600 text-sm mb-8">
                    Test your knowledge and learn what's polite (and what's not) in France!
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setQuizStarted(true)}
                    className="bg-white text-black px-8 py-4 rounded-lg font-medium flex items-center gap-2 mx-auto hover:bg-gray-100 transition-all"
                  >
                    Start Quiz
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}

              {quizStarted && !quizComplete && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-[#111] rounded-xl border border-gray-800 p-8"
                >
                  {/* Progress */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">
                      Question {currentQuestion + 1} of {cultureData.cultureQuiz.length}
                    </span>
                    <span className="text-sm font-medium text-purple-400">
                      Score: {score}/{currentQuestion + (selectedAnswer !== null ? 1 : 0)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1 mb-8">
                    <div
                      className="bg-purple-500 h-1 rounded-full transition-all"
                      style={{ width: `${((currentQuestion + 1) / cultureData.cultureQuiz.length) * 100}%` }}
                    />
                  </div>

                  {/* Question */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQuestion}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="text-xl font-serif text-white mb-8">
                        {cultureData.cultureQuiz[currentQuestion].scenario}
                      </h3>

                      <div className="space-y-3">
                        {cultureData.cultureQuiz[currentQuestion].options.map((option, idx) => {
                          const isCorrect = idx === cultureData.cultureQuiz[currentQuestion].correctIndex;
                          const isSelected = selectedAnswer === idx;
                          let borderColor = 'border-gray-800';
                          let bgColor = 'bg-transparent';

                          if (showExplanation) {
                            if (isCorrect) {
                              borderColor = 'border-green-500';
                              bgColor = 'bg-green-500/10';
                            } else if (isSelected && !isCorrect) {
                              borderColor = 'border-red-500';
                              bgColor = 'bg-red-500/10';
                            }
                          } else if (isSelected) {
                            borderColor = 'border-gray-600';
                            bgColor = 'bg-gray-800/50';
                          }

                          return (
                            <button
                              key={idx}
                              onClick={() => handleQuizAnswer(idx)}
                              disabled={selectedAnswer !== null}
                              className={`w-full text-left p-4 rounded-lg border ${borderColor} ${bgColor} transition-all ${
                                selectedAnswer === null ? 'hover:border-gray-600 cursor-pointer' : ''
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <span className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium ${
                                  showExplanation && isCorrect ? 'bg-green-500 text-white' :
                                  showExplanation && isSelected && !isCorrect ? 'bg-red-500 text-white' :
                                  'bg-gray-800 text-gray-400'
                                }`}>
                                  {String.fromCharCode(65 + idx)}
                                </span>
                                <span className="text-gray-300 text-sm">{option}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      {showExplanation && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-8"
                        >
                          <div className={`p-5 rounded-lg border ${
                            selectedAnswer === cultureData.cultureQuiz[currentQuestion].correctIndex
                              ? 'bg-green-500/10 border-green-500/30'
                              : 'bg-amber-500/10 border-amber-500/30'
                          }`}>
                            <p className="font-medium text-sm mb-2 text-white">
                              {selectedAnswer === cultureData.cultureQuiz[currentQuestion].correctIndex
                                ? 'Correct!'
                                : 'Not quite!'}
                            </p>
                            <p className="text-sm text-gray-400">
                              {cultureData.cultureQuiz[currentQuestion].explanation}
                            </p>
                          </div>

                          <button
                            onClick={nextQuestion}
                            className="mt-6 w-full bg-white text-black py-4 rounded-lg font-medium hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                          >
                            {currentQuestion < cultureData.cultureQuiz.length - 1 ? 'Next Question' : 'See Results'}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </motion.div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Quiz Complete */}
              {quizComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center bg-[#111] rounded-xl border border-gray-800 p-12"
                >
                  <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Trophy className="w-10 h-10 text-purple-400" />
                  </div>
                  <h2 className="text-3xl font-serif text-white mb-4">Quiz Complete!</h2>
                  <p className="text-5xl font-serif text-purple-400 mb-2">
                    {score}/{cultureData.cultureQuiz.length}
                  </p>
                  <p className="text-gray-400 mb-2">
                    {score === cultureData.cultureQuiz.length
                      ? 'Perfect score! You\'re a French culture expert!'
                      : score >= cultureData.cultureQuiz.length * 0.7
                      ? 'Great job! You know French culture well!'
                      : score >= cultureData.cultureQuiz.length * 0.5
                      ? 'Good effort! Keep learning about French etiquette.'
                      : 'Keep exploring! French culture has many nuances to discover.'}
                  </p>
                  <p className="text-gray-600 text-sm mb-8">
                    {Math.round((score / cultureData.cultureQuiz.length) * 100)}% correct
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={resetQuiz}
                    className="bg-white text-black px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all"
                  >
                    Try Again
                  </motion.button>
                </motion.div>
              )}
            </div>
          )}

          {/* =================== COMMON MISTAKES =================== */}
          {activeTab === 'mistakes' && (
            <div className="max-w-3xl space-y-4">
              {cultureData.commonMistakes.map((item, idx) => {
                const isExpanded = expandedMistake === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-[#111] rounded-xl border border-gray-800 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedMistake(isExpanded ? null : idx)}
                      className="w-full text-left p-6 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        <span className="font-serif text-white">{item.mistake}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                          item.severity === 'high' ? 'bg-red-500/20 text-red-400' : 
                          item.severity === 'medium' ? 'bg-amber-500/20 text-amber-400' : 
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {item.severity === 'high' ? 'Major' : item.severity === 'medium' ? 'Moderate' : 'Minor'}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-gray-800"
                        >
                          <div className="p-6">
                            <div className="flex items-start gap-4">
                              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-green-400 mb-2">What to do instead:</p>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.correction}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif mb-4">
            Culture is learned,
            <br />
            <span className="serif-italic text-gray-400">not memorized</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Don't worry about being perfect. The French appreciate effort and sincerity. When in doubt, be polite, say "Bonjour," and observe what locals do!
          </p>
        </div>
      </section>
    </div>
  );
};

export default CultureGuide;

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, XCircle, HelpCircle, ChevronDown, ChevronUp, Handshake, AlertTriangle, BookOpen, Trophy } from 'lucide-react';
import cultureData from '../data/culture.json';

const categoryColors = {
  Greetings: 'bg-pink-100 text-pink-700',
  Language: 'bg-purple-100 text-purple-700',
  'Public Behavior': 'bg-blue-100 text-blue-700',
  Dining: 'bg-amber-100 text-amber-700',
  Social: 'bg-emerald-100 text-emerald-700',
};

const severityColors = {
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  low: 'bg-green-100 text-green-700 border-green-200',
};

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
    { id: 'dosdonts', label: "Do's & Don'ts", icon: CheckCircle2 },
    { id: 'greetings', label: 'Greeting Styles', icon: Handshake },
    { id: 'quiz', label: 'Culture Quiz', icon: Trophy },
    { id: 'mistakes', label: 'Common Mistakes', icon: AlertTriangle },
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-display font-bold mb-4 gradient-text"
        >
          French Culture Guide
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Master French etiquette, avoid common mistakes, and feel confident in social situations
        </motion.p>
      </div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-2 mb-10"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </motion.div>

      {/* =================== DO'S & DON'TS =================== */}
      {activeTab === 'dosdonts' && (
        <div>
          {/* Filter */}
          <div className="flex justify-center gap-2 mb-8">
            {[
              { id: 'all', label: 'All' },
              { id: 'do', label: "Do's" },
              { id: 'dont', label: "Don'ts" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setDosFilter(f.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  dosFilter === f.id
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-pink-50'
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
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-5 card-hover"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      item.type === 'do' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {item.type === 'do' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${categoryColors[item.category] || 'bg-gray-100 text-gray-700'}`}>
                        {item.category}
                      </span>
                      <h3 className="text-base font-bold text-gray-800 mt-2 leading-snug">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">{item.explanation}</p>
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
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {cultureData.greetingStyles.map((greeting, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-5 card-hover"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{greeting.situation}</h3>
                    <p className="text-pink-600 font-semibold text-base mb-1">"{greeting.greeting}"</p>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                        Gesture: {greeting.gesture}
                      </span>
                    </div>
                  </div>
                  <div className="md:w-72 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg">
                    <p className="text-sm text-yellow-800">{greeting.notes}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* =================== CULTURE QUIZ =================== */}
      {activeTab === 'quiz' && (
        <div className="max-w-2xl mx-auto">
          {!quizStarted && !quizComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-pink-500" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-800 mb-3">French Culture Quiz</h2>
              <p className="text-gray-600 mb-2">
                {cultureData.cultureQuiz.length} questions about French etiquette and social norms.
              </p>
              <p className="text-gray-500 text-sm mb-6">
                Test your knowledge and learn what's polite (and what's not) in France!
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setQuizStarted(true)}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Start Quiz
              </motion.button>
            </motion.div>
          )}

          {quizStarted && !quizComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
            >
              {/* Progress */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-500">
                  Question {currentQuestion + 1} of {cultureData.cultureQuiz.length}
                </span>
                <span className="text-sm font-bold text-pink-600">
                  Score: {score}/{currentQuestion + (selectedAnswer !== null ? 1 : 0)}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
                <div
                  className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all"
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
                  <h3 className="text-xl font-bold text-gray-800 mb-6">
                    {cultureData.cultureQuiz[currentQuestion].scenario}
                  </h3>

                  <div className="space-y-3">
                    {cultureData.cultureQuiz[currentQuestion].options.map((option, idx) => {
                      const isCorrect = idx === cultureData.cultureQuiz[currentQuestion].correctIndex;
                      const isSelected = selectedAnswer === idx;
                      let borderColor = 'border-gray-200';
                      let bgColor = 'bg-white';

                      if (showExplanation) {
                        if (isCorrect) {
                          borderColor = 'border-green-400';
                          bgColor = 'bg-green-50';
                        } else if (isSelected && !isCorrect) {
                          borderColor = 'border-red-400';
                          bgColor = 'bg-red-50';
                        }
                      } else if (isSelected) {
                        borderColor = 'border-pink-400';
                        bgColor = 'bg-pink-50';
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleQuizAnswer(idx)}
                          disabled={selectedAnswer !== null}
                          className={`w-full text-left p-4 rounded-xl border-2 ${borderColor} ${bgColor} transition-all ${
                            selectedAnswer === null ? 'hover:border-pink-300 hover:bg-pink-50/50 cursor-pointer' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                              showExplanation && isCorrect ? 'bg-green-500 text-white' :
                              showExplanation && isSelected && !isCorrect ? 'bg-red-500 text-white' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="text-gray-700 text-sm font-medium">{option}</span>
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
                      className="mt-6"
                    >
                      <div className={`p-4 rounded-xl border ${
                        selectedAnswer === cultureData.cultureQuiz[currentQuestion].correctIndex
                          ? 'bg-green-50 border-green-200'
                          : 'bg-amber-50 border-amber-200'
                      }`}>
                        <p className="font-bold text-sm mb-1">
                          {selectedAnswer === cultureData.cultureQuiz[currentQuestion].correctIndex
                            ? 'Correct!'
                            : 'Not quite!'}
                        </p>
                        <p className="text-sm text-gray-700">
                          {cultureData.cultureQuiz[currentQuestion].explanation}
                        </p>
                      </div>

                      <button
                        onClick={nextQuestion}
                        className="mt-4 w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                      >
                        {currentQuestion < cultureData.cultureQuiz.length - 1 ? 'Next Question' : 'See Results'}
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
              className="text-center bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-pink-500" />
              </div>
              <h2 className="text-3xl font-display font-bold text-gray-800 mb-2">Quiz Complete!</h2>
              <p className="text-5xl font-bold gradient-text mb-2">
                {score}/{cultureData.cultureQuiz.length}
              </p>
              <p className="text-gray-600 mb-2">
                {score === cultureData.cultureQuiz.length
                  ? 'Perfect score! You\'re a French culture expert!'
                  : score >= cultureData.cultureQuiz.length * 0.7
                  ? 'Great job! You know French culture well!'
                  : score >= cultureData.cultureQuiz.length * 0.5
                  ? 'Good effort! Keep learning about French etiquette.'
                  : 'Keep exploring! French culture has many nuances to discover.'}
              </p>
              <p className="text-gray-400 text-sm mb-6">
                {Math.round((score / cultureData.cultureQuiz.length) * 100)}% correct
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetQuiz}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Try Again
              </motion.button>
            </motion.div>
          )}
        </div>
      )}

      {/* =================== COMMON MISTAKES =================== */}
      {activeTab === 'mistakes' && (
        <div className="max-w-3xl mx-auto space-y-4">
          {cultureData.commonMistakes.map((item, idx) => {
            const isExpanded = expandedMistake === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedMistake(isExpanded ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="font-bold text-gray-800">{item.mistake}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full border ${severityColors[item.severity]}`}>
                      {item.severity === 'high' ? 'Major' : item.severity === 'medium' ? 'Moderate' : 'Minor'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-gray-100"
                    >
                      <div className="p-5 pt-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-green-700 text-sm mb-1">What to do instead:</p>
                            <p className="text-gray-600 text-sm leading-relaxed">{item.correction}</p>
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

      {/* Bottom CTA */}
      <div className="mt-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-display font-bold mb-3">Culture is learned, not memorized</h2>
        <p className="text-pink-100 max-w-xl mx-auto">
          Don't worry about being perfect. The French appreciate effort and sincerity. When in doubt, be polite, say "Bonjour," and observe what locals do!
        </p>
      </div>
    </div>
  );
};

export default CultureGuide;

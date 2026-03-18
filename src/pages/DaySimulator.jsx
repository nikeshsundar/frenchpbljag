import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Clock, MapPin, Star, RotateCcw, ChevronRight, Trophy, Volume2, ArrowRight } from 'lucide-react';
import simulatorData from '../data/simulator.json';

const DaySimulator = () => {
  const { t } = useTranslation();
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState([]);

  const maxScore = simulatorData.steps.length * 10;
  const step = simulatorData.steps[currentStep];

  const handleChoice = (idx) => {
    if (selectedChoice !== null) return;
    setSelectedChoice(idx);
    setShowFeedback(true);
    const points = step.choices[idx].points;
    setTotalScore(s => s + points);
    setAnswers(prev => [...prev, { step: currentStep, choiceIdx: idx, points }]);
  };

  const nextStep = () => {
    if (currentStep < simulatorData.steps.length - 1) {
      setCurrentStep(s => s + 1);
      setSelectedChoice(null);
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };

  const restart = () => {
    setStarted(false);
    setCurrentStep(0);
    setSelectedChoice(null);
    setShowFeedback(false);
    setTotalScore(0);
    setCompleted(false);
    setAnswers([]);
  };

  const getScoreTier = () => {
    const s = simulatorData.scoring;
    if (totalScore >= s.excellent.min) return s.excellent;
    if (totalScore >= s.good.min) return s.good;
    if (totalScore >= s.needsWork.min) return s.needsWork;
    return s.beginner;
  };

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139, 92, 246, 0.12), transparent)',
          }}
        />
        <div className="max-w-4xl mx-auto px-6 lg:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Bonjour Buddy</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif mb-6">
              A day in
              <br />
              <span className="serif-italic text-gray-400">France</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              {simulatorData.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          
          {/* =================== START SCREEN =================== */}
          {!started && !completed && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111] rounded-xl border border-gray-800 p-12 text-center"
            >
              <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-5xl">🇫🇷</span>
              </div>
              <h2 className="text-2xl font-serif text-white mb-4">
                {simulatorData.scenario}
              </h2>
              <p className="text-gray-500 mb-8 max-w-lg mx-auto">
                Navigate through 8 real situations you'll face on your first day as an exchange student. Make choices and learn the right way to handle each one!
              </p>
              <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> {simulatorData.steps.length} scenarios
                </span>
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4" /> {maxScore} total points
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> 8 AM - 7 PM
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStarted(true)}
                className="bg-white text-black px-10 py-4 rounded-lg font-medium text-lg hover:bg-gray-100 transition-all flex items-center gap-3 mx-auto"
              >
                Start Your Day
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {/* =================== SCENARIO STEP =================== */}
          {started && !completed && (
            <div>
              {/* Progress Bar */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">
                    Step {currentStep + 1} of {simulatorData.steps.length}
                  </span>
                  <span className="text-sm font-medium text-purple-400">
                    Score: {totalScore}/{maxScore}
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1">
                  <motion.div
                    className="bg-purple-500 h-1 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / simulatorData.steps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Timeline dots */}
                <div className="flex justify-between mt-4">
                  {simulatorData.steps.map((s, idx) => {
                    const answer = answers[idx];
                    let dotColor = 'bg-gray-700';
                    if (idx === currentStep) dotColor = 'bg-purple-500';
                    else if (answer) {
                      dotColor = answer.points === 10 ? 'bg-green-500' : answer.points > 0 ? 'bg-amber-400' : 'bg-red-500';
                    }
                    return (
                      <div key={idx} className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${dotColor} transition-colors`} />
                        <span className="text-xs text-gray-600 mt-2 hidden sm:block">{s.time}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Scenario Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-[#111] rounded-xl border border-gray-800 overflow-hidden"
                >
                  {/* Time & Location Header */}
                  <div 
                    className="p-6"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)',
                    }}
                  >
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-purple-400" />
                        <span className="font-serif text-xl text-white">{step.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-300">{step.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    {/* Situation */}
                    <h3 className="text-xl font-serif text-white mb-8 leading-relaxed">
                      {step.situation}
                    </h3>

                    {/* Choices */}
                    <div className="space-y-3">
                      {step.choices.map((choice, idx) => {
                        let cardStyle = 'border-gray-800 hover:border-gray-700 cursor-pointer';

                        if (showFeedback) {
                          if (choice.isCorrect) {
                            cardStyle = 'border-green-500 bg-green-500/10';
                          } else if (selectedChoice === idx && !choice.isCorrect) {
                            cardStyle = 'border-red-500 bg-red-500/10';
                          } else {
                            cardStyle = 'border-gray-800 opacity-50';
                          }
                        } else if (selectedChoice === idx) {
                          cardStyle = 'border-gray-600 bg-gray-800/50';
                        }

                        return (
                          <motion.button
                            key={idx}
                            whileHover={!showFeedback ? { scale: 1.01 } : {}}
                            onClick={() => handleChoice(idx)}
                            disabled={selectedChoice !== null}
                            className={`w-full text-left p-5 rounded-lg border transition-all ${cardStyle}`}
                          >
                            <div className="flex items-start gap-4">
                              <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium ${
                                showFeedback && choice.isCorrect ? 'bg-green-500 text-white' :
                                showFeedback && selectedChoice === idx && !choice.isCorrect ? 'bg-red-500 text-white' :
                                'bg-gray-800 text-gray-400'
                              }`}>
                                {idx + 1}
                              </span>
                              <span className="text-gray-300">{choice.text}</span>
                              {showFeedback && choice.isCorrect && (
                                <span className="ml-auto text-green-400 font-medium text-sm">+{choice.points} pts</span>
                              )}
                              {showFeedback && selectedChoice === idx && !choice.isCorrect && (
                                <span className="ml-auto text-red-400 font-medium text-sm">+{choice.points} pts</span>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Feedback */}
                    {showFeedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 space-y-5"
                      >
                        {/* Feedback Text */}
                        <div className={`p-5 rounded-lg border ${
                          step.choices[selectedChoice].isCorrect
                            ? 'bg-green-500/10 border-green-500/30'
                            : 'bg-amber-500/10 border-amber-500/30'
                        }`}>
                          <p className="text-sm font-medium mb-2 text-white">
                            {step.choices[selectedChoice].isCorrect ? 'Excellent choice!' : 'Not the best choice...'}
                          </p>
                          <p className="text-sm text-gray-400">{step.choices[selectedChoice].feedback}</p>
                        </div>

                        {/* Best Phrase */}
                        <div className="bg-purple-500/10 rounded-lg p-5 border border-purple-500/20">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-medium text-purple-400">Best phrase for this situation:</span>
                            <button
                              onClick={() => handleSpeak(step.bestPhrase.french)}
                              className="p-2 rounded-lg hover:bg-purple-500/20 transition-colors"
                              title="Listen to pronunciation"
                            >
                              <Volume2 className="w-4 h-4 text-purple-400" />
                            </button>
                          </div>
                          <p className="text-purple-300 font-medium text-lg">{step.bestPhrase.french}</p>
                          <p className="text-gray-500 text-sm mt-2">{step.bestPhrase.english}</p>
                        </div>

                        {/* Next Button */}
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={nextStep}
                          className="w-full bg-white text-black py-4 rounded-lg font-medium hover:bg-gray-100 transition-all flex items-center justify-center gap-3"
                        >
                          {currentStep < simulatorData.steps.length - 1 ? (
                            <>Continue to {simulatorData.steps[currentStep + 1].time} <ChevronRight className="w-5 h-5" /></>
                          ) : (
                            <>See Your Results <Trophy className="w-5 h-5" /></>
                          )}
                        </motion.button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* =================== RESULTS SCREEN =================== */}
          {completed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              {/* Score Card */}
              <div className="bg-[#111] rounded-xl border border-gray-800 p-12 text-center">
                <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Trophy className="w-12 h-12 text-purple-400" />
                </div>
                <h2 className="text-3xl font-serif text-white mb-2">
                  {getScoreTier().title}
                </h2>
                <p className="text-5xl font-serif text-purple-400 mb-4">
                  {totalScore}/{maxScore}
                </p>
                <p className="text-gray-400 max-w-md mx-auto mb-6">
                  {getScoreTier().message}
                </p>

                {/* Score Breakdown Visual */}
                <div className="flex justify-center gap-2 mb-8">
                  {answers.map((a, idx) => (
                    <div
                      key={idx}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-medium text-sm ${
                        a.points === 10 ? 'bg-green-500' : a.points > 0 ? 'bg-amber-400' : 'bg-red-500'
                      }`}
                      title={`Step ${idx + 1}: ${a.points} points`}
                    >
                      {a.points}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={restart}
                  className="bg-white text-black px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all flex items-center gap-2 mx-auto"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </motion.button>
              </div>

              {/* Review All Steps */}
              <div className="bg-[#111] rounded-xl border border-gray-800 p-8">
                <h3 className="text-xl font-serif text-white mb-6">Review Your Day</h3>
                <div className="space-y-5">
                  {simulatorData.steps.map((s, idx) => {
                    const answer = answers[idx];
                    const choice = s.choices[answer?.choiceIdx];
                    return (
                      <div key={idx} className="flex items-start gap-4 pb-5 border-b border-gray-800 last:border-0 last:pb-0">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-medium text-sm ${
                          answer?.points === 10 ? 'bg-green-500' : answer?.points > 0 ? 'bg-amber-400' : 'bg-red-500'
                        }`}>
                          {answer?.points}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {s.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {s.location}
                            </span>
                          </div>
                          <p className="text-gray-300 font-medium text-sm">{s.situation}</p>
                          <p className="text-gray-600 text-xs mt-1">
                            Your choice: {choice?.text}
                          </p>
                          <div className="flex items-center gap-2 mt-3">
                            <button
                              onClick={() => handleSpeak(s.bestPhrase.french)}
                              className="p-1 rounded hover:bg-gray-800 transition-colors"
                            >
                              <Volume2 className="w-3 h-3 text-purple-400" />
                            </button>
                            <span className="text-purple-400 text-xs font-medium italic">
                              {s.bestPhrase.french}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DaySimulator;

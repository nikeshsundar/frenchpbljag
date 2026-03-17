import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Clock, MapPin, Star, RotateCcw, ChevronRight, Trophy, Volume2 } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-display font-bold mb-4 gradient-text"
        >
          A Day in France
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          {simulatorData.description}
        </motion.p>
      </div>

      {/* =================== START SCREEN =================== */}
      {!started && !completed && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center"
        >
          <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">🇫🇷</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-gray-800 mb-3">
            {simulatorData.scenario}
          </h2>
          <p className="text-gray-600 mb-4 max-w-lg mx-auto">
            Navigate through 8 real situations you'll face on your first day as an exchange student. Make choices and learn the right way to handle each one!
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {simulatorData.steps.length} scenarios
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4" /> {maxScore} total points
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> 8 AM - 7 PM
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setStarted(true)}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all"
          >
            Start Your Day
          </motion.button>
        </motion.div>
      )}

      {/* =================== SCENARIO STEP =================== */}
      {started && !completed && (
        <div>
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-500">
                Step {currentStep + 1} of {simulatorData.steps.length}
              </span>
              <span className="text-sm font-bold text-pink-600">
                Score: {totalScore}/{maxScore}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-pink-500 to-rose-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / simulatorData.steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Timeline dots */}
            <div className="flex justify-between mt-3">
              {simulatorData.steps.map((s, idx) => {
                const answer = answers[idx];
                let dotColor = 'bg-gray-200';
                if (idx === currentStep) dotColor = 'bg-pink-500';
                else if (answer) {
                  dotColor = answer.points === 10 ? 'bg-green-500' : answer.points > 0 ? 'bg-amber-400' : 'bg-red-400';
                }
                return (
                  <div key={idx} className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${dotColor} transition-colors`} />
                    <span className="text-xs text-gray-400 mt-1 hidden sm:block">{s.time}</span>
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
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
            >
              {/* Time & Location Header */}
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-5">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-5 h-5" />
                    <span className="font-bold text-lg">{step.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-5 h-5" />
                    <span className="font-semibold">{step.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Situation */}
                <h3 className="text-xl font-bold text-gray-800 mb-6 leading-relaxed">
                  {step.situation}
                </h3>

                {/* Choices */}
                <div className="space-y-3">
                  {step.choices.map((choice, idx) => {
                    let cardStyle = 'border-gray-200 bg-white hover:border-pink-300 hover:bg-pink-50/50 cursor-pointer';

                    if (showFeedback) {
                      if (choice.isCorrect) {
                        cardStyle = 'border-green-400 bg-green-50';
                      } else if (selectedChoice === idx && !choice.isCorrect) {
                        cardStyle = 'border-red-400 bg-red-50';
                      } else {
                        cardStyle = 'border-gray-200 bg-gray-50 opacity-60';
                      }
                    } else if (selectedChoice === idx) {
                      cardStyle = 'border-pink-400 bg-pink-50';
                    }

                    return (
                      <motion.button
                        key={idx}
                        whileHover={!showFeedback ? { scale: 1.01 } : {}}
                        onClick={() => handleChoice(idx)}
                        disabled={selectedChoice !== null}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${cardStyle}`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                            showFeedback && choice.isCorrect ? 'bg-green-500 text-white' :
                            showFeedback && selectedChoice === idx && !choice.isCorrect ? 'bg-red-500 text-white' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className="text-gray-700 font-medium">{choice.text}</span>
                          {showFeedback && choice.isCorrect && (
                            <span className="ml-auto text-green-600 font-bold text-sm">+{choice.points} pts</span>
                          )}
                          {showFeedback && selectedChoice === idx && !choice.isCorrect && (
                            <span className="ml-auto text-red-500 font-bold text-sm">+{choice.points} pts</span>
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
                    className="mt-6 space-y-4"
                  >
                    {/* Feedback Text */}
                    <div className={`p-4 rounded-xl border ${
                      step.choices[selectedChoice].isCorrect
                        ? 'bg-green-50 border-green-200'
                        : 'bg-amber-50 border-amber-200'
                    }`}>
                      <p className="text-sm font-bold mb-1">
                        {step.choices[selectedChoice].isCorrect ? 'Excellent choice!' : 'Not the best choice...'}
                      </p>
                      <p className="text-sm text-gray-700">{step.choices[selectedChoice].feedback}</p>
                    </div>

                    {/* Best Phrase */}
                    <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-pink-600">Best phrase for this situation:</span>
                        <button
                          onClick={() => handleSpeak(step.bestPhrase.french)}
                          className="p-1.5 rounded-lg hover:bg-pink-100 transition-colors"
                          title="Listen to pronunciation"
                        >
                          <Volume2 className="w-4 h-4 text-pink-500" />
                        </button>
                      </div>
                      <p className="text-pink-700 font-bold text-lg">{step.bestPhrase.french}</p>
                      <p className="text-gray-600 text-sm mt-1">{step.bestPhrase.english}</p>
                    </div>

                    {/* Next Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={nextStep}
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
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
          className="space-y-6"
        >
          {/* Score Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
            <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-12 h-12 text-pink-500" />
            </div>
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-2">
              {getScoreTier().title}
            </h2>
            <p className="text-5xl font-bold gradient-text mb-2">
              {totalScore}/{maxScore}
            </p>
            <p className="text-gray-600 max-w-md mx-auto mb-4">
              {getScoreTier().message}
            </p>

            {/* Score Breakdown Visual */}
            <div className="flex justify-center gap-2 mb-6">
              {answers.map((a, idx) => (
                <div
                  key={idx}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                    a.points === 10 ? 'bg-green-500' : a.points > 0 ? 'bg-amber-400' : 'bg-red-400'
                  }`}
                  title={`Step ${idx + 1}: ${a.points} points`}
                >
                  {a.points}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={restart}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </motion.button>
            </div>
          </div>

          {/* Review All Steps */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-display font-bold text-gray-800 mb-4">Review Your Day</h3>
            <div className="space-y-4">
              {simulatorData.steps.map((s, idx) => {
                const answer = answers[idx];
                const choice = s.choices[answer?.choiceIdx];
                return (
                  <div key={idx} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-sm ${
                      answer?.points === 10 ? 'bg-green-500' : answer?.points > 0 ? 'bg-amber-400' : 'bg-red-400'
                    }`}>
                      {answer?.points}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Clock className="w-3 h-3" /> {s.time}
                        <MapPin className="w-3 h-3 ml-2" /> {s.location}
                      </div>
                      <p className="text-gray-800 font-semibold text-sm">{s.situation}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        Your choice: {choice?.text}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleSpeak(s.bestPhrase.french)}
                          className="p-1 rounded hover:bg-pink-50 transition-colors"
                        >
                          <Volume2 className="w-3 h-3 text-pink-500" />
                        </button>
                        <span className="text-pink-600 text-xs font-semibold italic">
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
  );
};

export default DaySimulator;

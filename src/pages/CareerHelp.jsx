import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, Copy, Check, BookOpen, Briefcase, Coffee, Users, Building2, AlertTriangle, Volume2 } from 'lucide-react';
import phrasesData from '../data/frenchPhrases.json';

const categoryConfig = {
  Academic: { icon: BookOpen, color: 'pink', bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200' },
  Professional: { icon: Briefcase, color: 'rose', bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200' },
  'Daily Life': { icon: Coffee, color: 'amber', bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
  Social: { icon: Users, color: 'emerald', bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
  Administrative: { icon: Building2, color: 'blue', bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  Emergency: { icon: AlertTriangle, color: 'red', bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
};

const toneColors = {
  formal: 'bg-purple-100 text-purple-700',
  polite: 'bg-blue-100 text-blue-700',
  informal: 'bg-green-100 text-green-700',
  friendly: 'bg-yellow-100 text-yellow-700',
  neutral: 'bg-gray-100 text-gray-700',
  important: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700',
  apologetic: 'bg-pink-100 text-pink-700',
};

const CareerHelp = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSituation, setExpandedSituation] = useState(null);
  const [copiedPhrase, setCopiedPhrase] = useState(null);

  const categories = ['All', ...Object.keys(categoryConfig)];

  const filteredPhrases = useMemo(() => {
    let filtered = phrasesData;
    if (activeCategory !== 'All') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.situation.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.phrases.some(p =>
          p.french.toLowerCase().includes(q) ||
          p.english.toLowerCase().includes(q) ||
          p.context.toLowerCase().includes(q)
        )
      );
    }
    return filtered;
  }, [activeCategory, searchQuery]);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedPhrase(id);
      setTimeout(() => setCopiedPhrase(null), 2000);
    });
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-display font-bold mb-4 gradient-text"
        >
          French Phrases & Career Help
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Essential French phrases for every situation - with pronunciation guides, tone indicators, and ready-made templates
        </motion.p>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-xl mx-auto mb-8"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search phrases, situations, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition-all text-gray-800 bg-white"
          />
        </div>
      </motion.div>

      {/* Category Filter Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap justify-center gap-2 mb-10"
      >
        {categories.map((cat) => {
          const config = categoryConfig[cat];
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              {cat === 'All' ? 'All Categories' : cat}
            </button>
          );
        })}
      </motion.div>

      {/* Stats Bar */}
      <div className="flex justify-center gap-6 mb-10 text-sm text-gray-500">
        <span>{filteredPhrases.length} situation{filteredPhrases.length !== 1 ? 's' : ''}</span>
        <span>{filteredPhrases.reduce((acc, s) => acc + s.phrases.length, 0)} phrases</span>
      </div>

      {/* Phrase Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredPhrases.map((situation) => {
            const config = categoryConfig[situation.category] || categoryConfig.Academic;
            const IconComp = config.icon;
            const isExpanded = expandedSituation === situation.id;

            return (
              <motion.div
                key={situation.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`bg-white rounded-xl shadow-lg border ${isExpanded ? 'border-pink-400 col-span-1 md:col-span-2 lg:col-span-3' : 'border-gray-200'} overflow-hidden cursor-pointer card-hover`}
                onClick={() => setExpandedSituation(isExpanded ? null : situation.id)}
              >
                {/* Card Header */}
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                      <IconComp className={`w-5 h-5 ${config.text}`} />
                    </div>
                    <div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${config.bg} ${config.text}`}>
                        {situation.category}
                      </span>
                      <h3 className="text-lg font-bold text-gray-800 mt-1">{situation.situation}</h3>
                    </div>
                  </div>

                  {/* Preview (first phrase) */}
                  {!isExpanded && (
                    <div className="bg-gray-50 rounded-lg p-3 mt-3">
                      <p className="text-pink-600 font-semibold text-sm italic">"{situation.phrases[0].french}"</p>
                      <p className="text-gray-500 text-xs mt-1">{situation.phrases[0].english}</p>
                    </div>
                  )}

                  {!isExpanded && (
                    <p className="text-xs text-gray-400 mt-3">
                      {situation.phrases.length} phrases - Click to expand
                    </p>
                  )}
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-gray-100"
                    >
                      <div className={`grid ${situation.phrases.length > 2 ? 'md:grid-cols-2' : ''} gap-4 p-5`}>
                        {situation.phrases.map((phrase, idx) => {
                          const phraseId = `${situation.id}-${idx}`;
                          return (
                            <div
                              key={idx}
                              className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {/* Context */}
                              <p className="text-xs text-gray-400 mb-2">{phrase.context}</p>

                              {/* French */}
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <p className="text-pink-600 font-bold text-base leading-relaxed">
                                  {phrase.french}
                                </p>
                                <div className="flex gap-1 flex-shrink-0">
                                  <button
                                    onClick={() => handleSpeak(phrase.french)}
                                    className="p-1.5 rounded-lg hover:bg-pink-100 transition-colors"
                                    title="Listen to pronunciation"
                                  >
                                    <Volume2 className="w-4 h-4 text-pink-500" />
                                  </button>
                                  <button
                                    onClick={() => handleCopy(phrase.french, phraseId)}
                                    className="p-1.5 rounded-lg hover:bg-pink-100 transition-colors"
                                    title="Copy to clipboard"
                                  >
                                    {copiedPhrase === phraseId ? (
                                      <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                      <Copy className="w-4 h-4 text-gray-400" />
                                    )}
                                  </button>
                                </div>
                              </div>

                              {/* English */}
                              <p className="text-gray-600 text-sm mb-2">{phrase.english}</p>

                              {/* Pronunciation */}
                              <div className="bg-white rounded-lg px-3 py-2 mb-2 border border-gray-200">
                                <p className="text-xs text-gray-400 mb-0.5">Pronunciation</p>
                                <p className="text-gray-700 text-sm font-mono">{phrase.pronunciation}</p>
                              </div>

                              {/* Tone Badge */}
                              <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${toneColors[phrase.tone] || toneColors.neutral}`}>
                                {phrase.tone.charAt(0).toUpperCase() + phrase.tone.slice(1)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* No Results */}
      {filteredPhrases.length === 0 && (
        <div className="text-center py-16">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-400 mb-2">No phrases found</h3>
          <p className="text-gray-400">Try adjusting your search or category filter</p>
        </div>
      )}

      {/* Tips Section */}
      <div className="mt-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-display font-bold mb-4">Tips for Speaking French</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h3 className="font-bold mb-2">Tone Matters</h3>
            <p className="text-pink-100 text-sm">
              Use "vous" (formal) with professors, officials, and strangers. Switch to "tu" (informal) only when invited or with close friends.
            </p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h3 className="font-bold mb-2">Start with Bonjour</h3>
            <p className="text-pink-100 text-sm">
              Always begin any interaction with "Bonjour." Skipping this greeting is the #1 cultural mistake foreigners make.
            </p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h3 className="font-bold mb-2">Practice Makes Perfect</h3>
            <p className="text-pink-100 text-sm">
              Use the pronunciation guides and speak out loud. French people appreciate any effort to speak their language!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerHelp;

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, Copy, Check, BookOpen, Briefcase, Coffee, Users, Building2, AlertTriangle, Volume2, X } from 'lucide-react';
import phrasesData from '../data/frenchPhrases.json';

const categoryConfig = {
  Academic: { icon: BookOpen },
  Professional: { icon: Briefcase },
  'Daily Life': { icon: Coffee },
  Social: { icon: Users },
  Administrative: { icon: Building2 },
  Emergency: { icon: AlertTriangle },
};

const CareerHelp = () => {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language === 'fr';
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSituation, setExpandedSituation] = useState(null);
  const [copiedPhrase, setCopiedPhrase] = useState(null);

  const categories = ['All', ...Object.keys(categoryConfig)];

  const categoryLabels = {
    Academic: isFr ? 'Academique' : 'Academic',
    Professional: isFr ? 'Professionnel' : 'Professional',
    'Daily Life': isFr ? 'Vie quotidienne' : 'Daily Life',
    Social: isFr ? 'Social' : 'Social',
    Administrative: isFr ? 'Administratif' : 'Administrative',
    Emergency: isFr ? 'Urgence' : 'Emergency'
  };

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
    <div className="bg-[#0a0a0a] min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 30% 10%, rgba(139, 92, 246, 0.12), transparent)',
          }}
        />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">{t('nav.bonjourBuddy')}</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif mb-6">
              {isFr ? 'Phrases francaises' : 'French phrases'}
              <br />
              <span className="serif-italic text-gray-400">{isFr ? '& aide carriere' : '& career help'}</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl">
              {t('careerHelp.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="pb-8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600" />
              <input
                type="text"
                placeholder={t('careerHelp.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#111] border border-gray-800 focus:border-gray-600 outline-none transition-all text-white placeholder-gray-600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white text-black'
                      : 'bg-transparent border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
                  }`}
                >
                  {cat === 'All' ? t('careerHelp.allCategories') : categoryLabels[cat] || cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="pb-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex gap-6 text-sm text-gray-600">
            <span>{filteredPhrases.length} {isFr ? (filteredPhrases.length > 1 ? 'situations' : 'situation') : `situation${filteredPhrases.length !== 1 ? 's' : ''}`}</span>
            <span>{filteredPhrases.reduce((acc, s) => acc + s.phrases.length, 0)} {isFr ? 'phrases' : 'phrases'}</span>
          </div>
        </div>
      </section>

      {/* Phrase Cards */}
      <section className="pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
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
                    className={`bg-[#111] rounded-xl border ${isExpanded ? 'border-gray-600 md:col-span-2 lg:col-span-3' : 'border-gray-800 hover:border-gray-700'} overflow-hidden cursor-pointer transition-all`}
                    onClick={() => setExpandedSituation(isExpanded ? null : situation.id)}
                  >
                    {/* Card Header */}
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                          <IconComp className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs tracking-wider uppercase text-gray-500">
                            {categoryLabels[situation.category] || situation.category}
                          </span>
                          <h3 className="text-lg font-serif text-white mt-1">{situation.situation}</h3>
                        </div>
                      </div>

                      {/* Preview (first phrase) */}
                      {!isExpanded && (
                        <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800">
                          <p className="text-purple-400 font-medium italic">"{situation.phrases[0].french}"</p>
                          <p className="text-gray-500 text-sm mt-1">{situation.phrases[0].english}</p>
                        </div>
                      )}

                      {!isExpanded && (
                        <p className="text-xs text-gray-600 mt-4">
                          {situation.phrases.length} {isFr ? 'phrases - Cliquez pour developper' : 'phrases - Click to expand'}
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
                          className="border-t border-gray-800"
                        >
                          <div className={`grid ${situation.phrases.length > 2 ? 'md:grid-cols-2' : ''} gap-4 p-6`}>
                            {situation.phrases.map((phrase, idx) => {
                              const phraseId = `${situation.id}-${idx}`;
                              return (
                                <div
                                  key={idx}
                                  className="bg-[#0a0a0a] rounded-xl p-5 border border-gray-800"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {/* Context */}
                                  <p className="text-xs text-gray-600 mb-3">{phrase.context}</p>

                                  {/* French */}
                                  <div className="flex items-start justify-between gap-2 mb-3">
                                    <p className="text-purple-400 font-semibold text-base leading-relaxed">
                                      {phrase.french}
                                    </p>
                                    <div className="flex gap-1 flex-shrink-0">
                                      <button
                                        onClick={() => handleSpeak(phrase.french)}
                                        className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                                         title={isFr ? 'Ecouter la prononciation' : 'Listen to pronunciation'}
                                      >
                                        <Volume2 className="w-4 h-4 text-gray-500" />
                                      </button>
                                      <button
                                        onClick={() => handleCopy(phrase.french, phraseId)}
                                        className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                                         title={isFr ? 'Copier' : 'Copy to clipboard'}
                                      >
                                        {copiedPhrase === phraseId ? (
                                          <Check className="w-4 h-4 text-green-500" />
                                        ) : (
                                          <Copy className="w-4 h-4 text-gray-500" />
                                        )}
                                      </button>
                                    </div>
                                  </div>

                                  {/* English */}
                                  <p className="text-gray-400 text-sm mb-3">{phrase.english}</p>

                                  {/* Pronunciation */}
                                  <div className="bg-gray-900 rounded-lg px-3 py-2 mb-3 border border-gray-800">
                                     <p className="text-xs text-gray-600 mb-1">{isFr ? 'Prononciation' : 'Pronunciation'}</p>
                                    <p className="text-gray-300 text-sm font-mono">{phrase.pronunciation}</p>
                                  </div>

                                  {/* Tone Badge */}
                                  <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-gray-800 text-gray-400">
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
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-gray-700 mx-auto mb-4" />
               <h3 className="text-xl font-serif text-gray-400 mb-2">{isFr ? 'Aucune phrase trouvee' : 'No phrases found'}</h3>
               <p className="text-gray-600">{isFr ? 'Essayez de modifier la recherche ou le filtre' : 'Try adjusting your search or category filter'}</p>
            </div>
          )}
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl sm:text-4xl font-serif mb-12">
            {isFr ? 'Conseils pour parler' : 'Tips for speaking'}
            <br />
            <span className="serif-italic text-gray-400">{isFr ? 'francais' : 'French'}</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Tone Matters', desc: 'Use "vous" (formal) with professors, officials, and strangers. Switch to "tu" (informal) only when invited or with close friends.' },
              { title: 'Start with Bonjour', desc: 'Always begin any interaction with "Bonjour." Skipping this greeting is the #1 cultural mistake foreigners make.' },
              { title: 'Practice Makes Perfect', desc: 'Use the pronunciation guides and speak out loud. French people appreciate any effort to speak their language!' },
            ].map((tip, i) => (
              <div key={i} className="border-t border-gray-800 pt-6">
                <h3 className="text-white font-medium mb-3">{tip.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerHelp;

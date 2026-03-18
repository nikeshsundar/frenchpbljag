import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Heart, Globe2, MessageCircle, Copy, Check, RefreshCw, Users, Coffee, Music, BookOpen, Dumbbell, Camera, Utensils, Volume2, ArrowRight } from 'lucide-react';

const cities = [
  { name: 'Paris', emoji: '🗼', students: '300,000+' },
  { name: 'Lyon', emoji: '🦁', students: '150,000+' },
  { name: 'Toulouse', emoji: '🚀', students: '120,000+' },
  { name: 'Bordeaux', emoji: '🍷', students: '90,000+' },
  { name: 'Montpellier', emoji: '☀️', students: '70,000+' },
  { name: 'Lille', emoji: '🏰', students: '110,000+' },
  { name: 'Marseille', emoji: '🌊', students: '80,000+' },
  { name: 'Strasbourg', emoji: '🥨', students: '65,000+' },
];

const interests = [
  { id: 'sports', label: 'Sports & Fitness', icon: Dumbbell },
  { id: 'music', label: 'Music & Arts', icon: Music },
  { id: 'cooking', label: 'Cooking & Food', icon: Utensils },
  { id: 'photography', label: 'Photography', icon: Camera },
  { id: 'reading', label: 'Reading & Study', icon: BookOpen },
  { id: 'social', label: 'Socializing', icon: Coffee },
];

const languageLevels = [
  { id: 'beginner', label: 'Beginner (A1-A2)', desc: 'Basic words and phrases' },
  { id: 'intermediate', label: 'Intermediate (B1-B2)', desc: 'Can hold a conversation' },
  { id: 'advanced', label: 'Advanced (C1-C2)', desc: 'Near-fluent or fluent' },
];

const suggestions = {
  Paris: [
    { type: 'Club', name: 'International Student Bureau (BDE)', desc: 'Every university has a BDE that organizes parties, trips, and integration events for students.', tip: 'Ask at your university reception for BDE info on your first day.' },
    { type: 'Meetup', name: 'Polyglot Club Paris', desc: 'Weekly language exchange meetups at cafes where you practice French with locals who want to learn your language.', tip: 'Go to a meetup near Chatelet - most popular area.' },
    { type: 'Place', name: 'Jardin du Luxembourg', desc: 'Beautiful garden where students hang out, read, and socialize. Great place to meet people casually.', tip: 'Bring a book or frisbee - great conversation starters.' },
  ],
  Lyon: [
    { type: 'Club', name: 'ESN Lyon (Erasmus Student Network)', desc: 'Organizes events, trips, and cultural activities specifically for international students.', tip: 'Get their ESNcard for discounts on events and travel.' },
    { type: 'Meetup', name: 'Lyon Language Exchange', desc: 'Meet French and international students over drinks at a different bar each week.', tip: 'Check their Facebook group for weekly locations.' },
    { type: 'Place', name: 'Parc de la Tete d\'Or', desc: 'Lyon\'s massive urban park - perfect for jogging groups, picnics, and meeting students.', tip: 'Sunday afternoons are most popular with students.' },
  ],
  default: [
    { type: 'Club', name: 'University BDE (Student Bureau)', desc: 'Every French university has student associations that organize social events and activities.', tip: 'Sign up during "la semaine d\'integration" (integration week).' },
    { type: 'Meetup', name: 'Language Exchange Events', desc: 'Look for "echange linguistique" events on Meetup.com or Facebook Groups in your city.', tip: 'Offer to teach Hindi or English in exchange for French practice.' },
    { type: 'Place', name: 'University Cafeteria (RU)', desc: 'The cheapest place to eat and the best place to meet classmates. Meals are social events in France.', tip: 'Sit with others and say "Je peux m\'asseoir ici?" (Can I sit here?)' },
  ],
};

const messageTemplates = [
  {
    situation: 'New classmate',
    emoji: '🎓',
    french: 'Salut! Moi c\'est {name}. On est dans le meme cours, non? Tu veux qu\'on revise ensemble?',
    english: 'Hi! I\'m {name}. We\'re in the same class, right? Do you want to study together?',
    pronunciation: 'sa-LOO! mwah say {name}. ohn ay dahn luh mem koor, nohn? too vuh kohn ray-VEEZ ahn-SAHM-bl?',
  },
  {
    situation: 'New neighbor',
    emoji: '🏠',
    french: 'Bonjour! Je suis votre nouveau voisin / nouvelle voisine. Je viens d\'emmenager. Enchanté(e)!',
    english: 'Hello! I\'m your new neighbor. I just moved in. Nice to meet you!',
    pronunciation: 'bon-ZHOOR! zhuh swee votr noo-VO vwah-ZAN. zhuh vyan dahm-ay-nah-ZHAY. ahn-shahn-TAY!',
  },
  {
    situation: 'At a party',
    emoji: '🎉',
    french: 'Salut! Tu connais qui ici? Moi je suis nouveau / nouvelle, je viens de l\'Inde!',
    english: 'Hi! Who do you know here? I\'m new, I\'m from India!',
    pronunciation: 'sa-LOO! too koh-NAY kee ee-SEE? mwah zhuh swee noo-VO, zhuh vyan duh LAHND!',
  },
  {
    situation: 'Language partner',
    emoji: '🗣️',
    french: 'Salut! Je cherche quelqu\'un pour pratiquer le français. Je peux t\'aider avec l\'anglais en échange!',
    english: 'Hi! I\'m looking for someone to practice French with. I can help you with English in exchange!',
    pronunciation: 'sa-LOO! zhuh shairsh kel-KUHN poor prah-tee-KAY luh frahn-SAY. zhuh puh teh-DAY ah-VEK lahn-GLAY ahn ay-SHAHNZH!',
  },
  {
    situation: 'Sports club',
    emoji: '⚽',
    french: 'Salut! Tu fais partie du club? Je voudrais m\'inscrire. Comment ça marche?',
    english: 'Hi! Are you part of the club? I\'d like to sign up. How does it work?',
    pronunciation: 'sa-LOO! too fay par-TEE doo kloob? zhuh voo-DRAY man-SKREER. koh-MAHN sah marsh?',
  },
];

const FindFriends = () => {
  const { t } = useTranslation();
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeMessage, setActiveMessage] = useState(0);
  const [copiedMsg, setCopiedMsg] = useState(false);
  const [userName, setUserName] = useState('');

  const toggleInterest = (id) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleFindFriends = () => {
    if (selectedCity && selectedInterests.length > 0 && selectedLevel) {
      setShowSuggestions(true);
    }
  };

  const getSuggestions = () => {
    return suggestions[selectedCity] || suggestions.default;
  };

  const handleCopyMessage = (text) => {
    const finalText = text.replace(/{name}/g, userName || '[your name]');
    navigator.clipboard.writeText(finalText).then(() => {
      setCopiedMsg(true);
      setTimeout(() => setCopiedMsg(false), 2000);
    });
  };

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text.replace(/{name}/g, userName || 'votre nom'));
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
          className="absolute top-0 right-0 w-1/2 h-full"
          style={{
            background: 'radial-gradient(ellipse 60% 60% at 70% 20%, rgba(236, 72, 153, 0.1), transparent)',
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
              Find friends
              <br />
              <span className="serif-italic text-gray-400">in France</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl">
              Discover where to meet people, join communities, and get ready-made French messages to break the ice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Friend Finder Form */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#111] rounded-xl border border-gray-800 p-8"
              >
                <h2 className="text-2xl font-serif text-white mb-2 flex items-center gap-3">
                  <Users className="w-6 h-6 text-gray-500" />
                  Friend Finder
                </h2>
                <p className="text-gray-600 text-sm mb-8">Select your preferences to get personalized suggestions</p>

                {/* Step 1: City */}
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Where are you studying?
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {cities.map((city) => (
                      <button
                        key={city.name}
                        onClick={() => { setSelectedCity(city.name); setShowSuggestions(false); }}
                        className={`p-3 rounded-lg text-left transition-all border ${
                          selectedCity === city.name
                            ? 'border-white bg-white/5 text-white'
                            : 'border-gray-800 text-gray-400 hover:border-gray-700'
                        }`}
                      >
                        <span className="text-lg mr-2">{city.emoji}</span>
                        <span className="font-medium text-sm">{city.name}</span>
                        <span className="block text-xs text-gray-600 ml-7">{city.students} students</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Interests */}
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    What are your interests?
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {interests.map((item) => {
                      const Icon = item.icon;
                      const isSelected = selectedInterests.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => toggleInterest(item.id)}
                          className={`p-3 rounded-lg flex items-center gap-2 transition-all border text-sm ${
                            isSelected
                              ? 'border-white bg-white/5 text-white'
                              : 'border-gray-800 text-gray-400 hover:border-gray-700'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                          <span className="font-medium">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Language Level */}
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
                    <Globe2 className="w-4 h-4" />
                    Your French level?
                  </h3>
                  <div className="space-y-2">
                    {languageLevels.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => { setSelectedLevel(level.id); setShowSuggestions(false); }}
                        className={`w-full p-3 rounded-lg text-left transition-all border ${
                          selectedLevel === level.id
                            ? 'border-white bg-white/5'
                            : 'border-gray-800 hover:border-gray-700'
                        }`}
                      >
                        <span className={`font-medium text-sm ${selectedLevel === level.id ? 'text-white' : 'text-gray-400'}`}>
                          {level.label}
                        </span>
                        <span className="block text-xs text-gray-600">{level.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Find Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleFindFriends}
                  disabled={!selectedCity || selectedInterests.length === 0 || !selectedLevel}
                  className={`w-full py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    selectedCity && selectedInterests.length > 0 && selectedLevel
                      ? 'bg-white text-black hover:bg-gray-100'
                      : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  Find Where to Meet People
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>

              {/* Suggestions Results */}
              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="mt-8 space-y-4"
                  >
                    <h3 className="text-xl font-serif text-white">
                      Suggestions for {selectedCity}
                    </h3>
                    {getSuggestions().map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-[#111] rounded-xl border border-gray-800 p-6"
                      >
                        <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-3 ${
                          item.type === 'Club' ? 'bg-purple-500/20 text-purple-400' :
                          item.type === 'Meetup' ? 'bg-green-500/20 text-green-400' :
                          'bg-amber-500/20 text-amber-400'
                        }`}>
                          {item.type}
                        </span>
                        <h4 className="text-lg font-serif text-white mb-2">{item.name}</h4>
                        <p className="text-gray-500 text-sm mb-4">{item.desc}</p>
                        <div className="border-l-2 border-gray-700 pl-4 py-1">
                          <p className="text-sm text-gray-400"><span className="text-white">Tip:</span> {item.tip}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: First Message Generator */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#111] rounded-xl border border-gray-800 p-8 sticky top-28"
              >
                <h2 className="text-2xl font-serif text-white mb-2 flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-gray-500" />
                  First Message Generator
                </h2>
                <p className="text-gray-600 text-sm mb-8">
                  Pick a situation and get a ready-made French message with translation and pronunciation
                </p>

                {/* Name Input */}
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Your name (optional)"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-gray-800 focus:border-gray-600 outline-none text-white placeholder-gray-600 text-sm"
                  />
                </div>

                {/* Situation Selector */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {messageTemplates.map((msg, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveMessage(idx)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeMessage === idx
                          ? 'bg-white text-black'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      <span className="mr-1">{msg.emoji}</span> {msg.situation}
                    </button>
                  ))}
                </div>

                {/* Message Display */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMessage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {/* French Message */}
                    <div className="bg-purple-500/10 rounded-xl p-5 border border-purple-500/20">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-purple-400">French Message</span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleSpeak(messageTemplates[activeMessage].french)}
                            className="p-2 rounded-lg hover:bg-purple-500/20 transition-colors"
                            title="Listen"
                          >
                            <Volume2 className="w-4 h-4 text-purple-400" />
                          </button>
                          <button
                            onClick={() => handleCopyMessage(messageTemplates[activeMessage].french)}
                            className="p-2 rounded-lg hover:bg-purple-500/20 transition-colors"
                            title="Copy"
                          >
                            {copiedMsg ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-purple-400" />
                            )}
                          </button>
                        </div>
                      </div>
                      <p className="text-purple-300 font-medium text-lg leading-relaxed">
                        {messageTemplates[activeMessage].french.replace(/{name}/g, userName || '[your name]')}
                      </p>
                    </div>

                    {/* English Translation */}
                    <div className="bg-[#0a0a0a] rounded-xl p-5 border border-gray-800">
                      <span className="text-xs font-medium text-gray-600 block mb-2">English Translation</span>
                      <p className="text-gray-300">
                        {messageTemplates[activeMessage].english.replace(/{name}/g, userName || '[your name]')}
                      </p>
                    </div>

                    {/* Pronunciation */}
                    <div className="bg-[#0a0a0a] rounded-xl p-5 border border-gray-800">
                      <span className="text-xs font-medium text-gray-600 block mb-2">Pronunciation Guide</span>
                      <p className="text-gray-400 font-mono text-sm leading-relaxed">
                        {messageTemplates[activeMessage].pronunciation.replace(/{name}/g, userName || '[your name]')}
                      </p>
                    </div>

                    {/* Shuffle Button */}
                    <button
                      onClick={() => setActiveMessage((activeMessage + 1) % messageTemplates.length)}
                      className="w-full py-3 rounded-lg bg-gray-800 text-gray-400 font-medium text-sm hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Next Situation
                    </button>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif mb-4">
            Making friends
            <br />
            <span className="serif-italic text-gray-400">takes courage</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Remember: French students appreciate effort. Even imperfect French shows respect. Start with "Bonjour" and a smile - you'll be surprised how friendly people are!
          </p>
        </div>
      </section>
    </div>
  );
};

export default FindFriends;

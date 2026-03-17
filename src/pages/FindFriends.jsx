import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Heart, Globe2, MessageCircle, Copy, Check, RefreshCw, Users, Coffee, Music, BookOpen, Dumbbell, Camera, Utensils, Volume2 } from 'lucide-react';

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
    situation: 'At a student party',
    emoji: '🎉',
    french: 'Salut! Tu connais qui ici? Moi je suis nouveau / nouvelle, je viens de l\'Inde!',
    english: 'Hi! Who do you know here? I\'m new, I\'m from India!',
    pronunciation: 'sa-LOO! too koh-NAY kee ee-SEE? mwah zhuh swee noo-VO, zhuh vyan duh LAHND!',
  },
  {
    situation: 'Language exchange partner',
    emoji: '🗣️',
    french: 'Salut! Je cherche quelqu\'un pour pratiquer le français. Je peux t\'aider avec l\'anglais en échange!',
    english: 'Hi! I\'m looking for someone to practice French with. I can help you with English in exchange!',
    pronunciation: 'sa-LOO! zhuh shairsh kel-KUHN poor prah-tee-KAY luh frahn-SAY. zhuh puh teh-DAY ah-VEK lahn-GLAY ahn ay-SHAHNZH!',
  },
  {
    situation: 'Sports club / gym',
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-display font-bold mb-4 gradient-text"
        >
          Find Friends in France
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Discover where to meet people, join communities, and get ready-made French messages to break the ice
        </motion.p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left: Friend Finder Form */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
          >
            <h2 className="text-2xl font-display font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-pink-500" />
              Friend Finder
            </h2>

            {/* Step 1: City */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pink-500" />
                Where are you studying?
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {cities.map((city) => (
                  <button
                    key={city.name}
                    onClick={() => { setSelectedCity(city.name); setShowSuggestions(false); }}
                    className={`p-3 rounded-lg text-left transition-all border ${
                      selectedCity === city.name
                        ? 'border-pink-400 bg-pink-50 text-pink-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-pink-200 hover:bg-pink-50/50'
                    }`}
                  >
                    <span className="text-lg mr-1">{city.emoji}</span>
                    <span className="font-semibold text-sm">{city.name}</span>
                    <span className="block text-xs text-gray-400 ml-7">{city.students} students</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Interests */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500" />
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
                          ? 'border-pink-400 bg-pink-50 text-pink-700'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-pink-200'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-pink-500' : 'text-gray-400'}`} />
                      <span className="font-semibold">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Language Level */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-pink-500" />
                Your French level?
              </h3>
              <div className="space-y-2">
                {languageLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => { setSelectedLevel(level.id); setShowSuggestions(false); }}
                    className={`w-full p-3 rounded-lg text-left transition-all border ${
                      selectedLevel === level.id
                        ? 'border-pink-400 bg-pink-50'
                        : 'border-gray-200 bg-white hover:border-pink-200'
                    }`}
                  >
                    <span className={`font-semibold text-sm ${selectedLevel === level.id ? 'text-pink-700' : 'text-gray-700'}`}>
                      {level.label}
                    </span>
                    <span className="block text-xs text-gray-400">{level.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Find Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleFindFriends}
              disabled={!selectedCity || selectedInterests.length === 0 || !selectedLevel}
              className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
                selectedCity && selectedInterests.length > 0 && selectedLevel
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:shadow-lg'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Find Where to Meet People
            </motion.button>
          </motion.div>

          {/* Suggestions Results */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-6 space-y-4"
              >
                <h3 className="text-xl font-display font-bold text-gray-800">
                  Suggestions for {selectedCity}
                </h3>
                {getSuggestions().map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-xl shadow-md border border-gray-200 p-5 card-hover"
                  >
                    <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-2 ${
                      item.type === 'Club' ? 'bg-pink-100 text-pink-700' :
                      item.type === 'Meetup' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {item.type}
                    </span>
                    <h4 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h4>
                    <p className="text-gray-600 text-sm mb-3">{item.desc}</p>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg">
                      <p className="text-sm text-yellow-800"><span className="font-semibold">Tip:</span> {item.tip}</p>
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
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-24"
          >
            <h2 className="text-2xl font-display font-bold text-gray-800 mb-2 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-pink-500" />
              First Message Generator
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Pick a situation and get a ready-made French message with translation and pronunciation
            </p>

            {/* Name Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none text-gray-700 text-sm"
              />
            </div>

            {/* Situation Selector */}
            <div className="flex flex-wrap gap-2 mb-6">
              {messageTemplates.map((msg, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMessage(idx)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeMessage === idx
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600'
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
                <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-pink-600">French Message</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleSpeak(messageTemplates[activeMessage].french)}
                        className="p-1.5 rounded-lg hover:bg-pink-100 transition-colors"
                        title="Listen"
                      >
                        <Volume2 className="w-4 h-4 text-pink-500" />
                      </button>
                      <button
                        onClick={() => handleCopyMessage(messageTemplates[activeMessage].french)}
                        className="p-1.5 rounded-lg hover:bg-pink-100 transition-colors"
                        title="Copy"
                      >
                        {copiedMsg ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-pink-500" />
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="text-pink-700 font-bold text-lg leading-relaxed">
                    {messageTemplates[activeMessage].french.replace(/{name}/g, userName || '[your name]')}
                  </p>
                </div>

                {/* English Translation */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <span className="text-xs font-semibold text-gray-500 block mb-2">English Translation</span>
                  <p className="text-gray-700 text-base">
                    {messageTemplates[activeMessage].english.replace(/{name}/g, userName || '[your name]')}
                  </p>
                </div>

                {/* Pronunciation */}
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <span className="text-xs font-semibold text-gray-500 block mb-2">Pronunciation Guide</span>
                  <p className="text-gray-600 font-mono text-sm leading-relaxed">
                    {messageTemplates[activeMessage].pronunciation.replace(/{name}/g, userName || '[your name]')}
                  </p>
                </div>

                {/* Shuffle Button */}
                <button
                  onClick={() => setActiveMessage((activeMessage + 1) % messageTemplates.length)}
                  className="w-full py-2.5 rounded-lg bg-gray-100 text-gray-600 font-semibold text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Next Situation
                </button>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-display font-bold mb-3">Making friends takes courage!</h2>
        <p className="text-pink-100 max-w-xl mx-auto">
          Remember: French students appreciate effort. Even imperfect French shows respect. Start with "Bonjour" and a smile - you'll be surprised how friendly people are!
        </p>
      </div>
    </div>
  );
};

export default FindFriends;

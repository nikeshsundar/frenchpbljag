import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      "nav.home": "Home",
      "nav.universities": "Find Universities",
      "nav.jobs": "Part-Time Jobs",
      "nav.community": "Community",
      "nav.guides": "Guides",
      "nav.bonjourBuddy": "Bonjour Buddy",
      "nav.careerHelp": "French Phrases",
      "nav.findFriends": "Find Friends",
      "nav.cultureGuide": "Culture Guide",
      "nav.daySimulator": "Day Simulator",
      
      // Hero Section
      "hero.title": "Your Bridge to French Universities",
      "hero.subtitle": "AI-powered guidance for Indian students pursuing their dreams in France",
      "hero.cta.find": "Find Your University",
      "hero.cta.chat": "Talk to AI Guide",
      "hero.stats.universities": "Universities",
      "hero.stats.students": "Indian Students",
      "hero.stats.cost": "Avg. Annual Cost",
      "hero.stats.visa": "Visa Success",
      
      // University Finder
      "finder.title": "Find Your Perfect University",
      "finder.step1": "Academic Profile",
      "finder.step2": "Course & Budget",
      "finder.step3": "Preferences",
      "finder.cgpa": "Your CGPA",
      "finder.course": "Preferred Course",
      "finder.budget": "Annual Budget",
      "finder.city": "Preferred City",
      "finder.search": "Find Universities",
      "finder.results": "Recommended Universities",
      "finder.match": "Match",
      "finder.fees": "Annual Fees",
      "finder.ranking": "QS Ranking",
      
      // Jobs
      "jobs.title": "Part-Time Job Opportunities",
      "jobs.subtitle": "Work while you study - up to 964 hours per year",
      "jobs.filter": "Filter by Category",
      "jobs.all": "All Jobs",
      "jobs.hourly": "per hour",
      "jobs.hours": "hours/week",
      "jobs.french": "French Level",
      
      // Community
      "community.title": "Connect with Students",
      "community.students": "Student Stories",
      "community.forum": "Discussion Forum",
      "community.helps": "Can help with",
      
      // Career Help
      "careerHelp.title": "French Phrases & Career Help",
      "careerHelp.subtitle": "Essential French phrases for every situation - with pronunciation guides, tone indicators, and ready-made templates",
      "careerHelp.search": "Search phrases, situations, or topics...",
      "careerHelp.allCategories": "All Categories",
      
      // Find Friends
      "findFriends.title": "Find Friends in France",
      "findFriends.subtitle": "Discover where to meet people, join communities, and get ready-made French messages to break the ice",
      "findFriends.finder": "Friend Finder",
      "findFriends.messageGen": "First Message Generator",
      
      // Culture Guide
      "cultureGuide.title": "French Culture Guide",
      "cultureGuide.subtitle": "Master French etiquette, avoid common mistakes, and feel confident in social situations",
      "cultureGuide.dosdonts": "Do's & Don'ts",
      "cultureGuide.greetings": "Greeting Styles",
      "cultureGuide.quiz": "Culture Quiz",
      "cultureGuide.mistakes": "Common Mistakes",
      
      // Day Simulator
      "daySimulator.title": "A Day in France",
      "daySimulator.subtitle": "Navigate through a typical first day as an exchange student",
      "daySimulator.start": "Start Your Day",
      "daySimulator.tryAgain": "Try Again",
      
      // Common
      "common.loading": "Loading...",
      "common.error": "Something went wrong",
      "common.learnMore": "Learn More",
      "common.apply": "Apply Now",
      "common.contact": "Contact",
      "common.getStarted": "Get Started",
      "common.back": "Back",
      "common.nextStep": "Next Step",
      "common.tryAgain": "Try Again",

      // University Search Page
      "universitySearch.eyebrow": "Explore",
      "universitySearch.titlePrefix": "Find your",
      "universitySearch.titleAccent": "perfect university",
      "universitySearch.description": "Search through top French universities. Filter by location, program, tuition, and find the perfect fit for your academic journey.",

      // University Finder extra
      "finder.subtitle": "Answer a few questions and let AI find your perfect match",
      "finder.selectCourse": "Select a course...",
      "finder.cityOptional": "{{city}} (Optional)",
      "finder.otherPreferences": "Other Preferences (Optional)",
      "finder.cityPlaceholder": "e.g., Paris, Lyon, Toulouse...",
      "finder.preferencesPlaceholder": "e.g., Looking for research opportunities, prefer English-taught programs...",
      "finder.analyzing": "Analyzing...",
      "finder.resultsCount": "{{count}} universities found",
      "finder.searchAgain": "Search Again",
      "finder.visitWebsite": "Visit Website",
      "finder.noResultsTitle": "No universities found",
      "finder.noResultsDescription": "Try adjusting your CGPA, budget, or course selection to see more results.",

      // Jobs page extra
      "jobs.eyebrow": "Opportunities",
      "jobs.titlePrefix": "Part-time",
      "jobs.titleAccent": "jobs for students",
      "jobs.legalHoursLabel": "Legal working hours:",
      "jobs.legalHoursValue": "964 hours/year (~20 hrs/week)",
      "jobs.filterTitle": "Filter by category",
      "jobs.inInr": "In INR",
      "jobs.requirements": "Requirements",
      "jobs.howToApply": "How to Apply",
      "jobs.noResults": "No jobs found in this category.",
      "jobs.tipsTitle": "Job search",
      "jobs.tipsAccent": "tips for students",
      "jobs.tip.startEarly.title": "Start Early",
      "jobs.tip.startEarly.desc": "Begin your job search as soon as you arrive. Popular positions fill quickly in September!",
      "jobs.tip.prepareDocs.title": "Prepare Documents",
      "jobs.tip.prepareDocs.desc": "Always carry your student ID, residence permit, and a French CV.",
      "jobs.tip.practiceFrench.title": "Practice French",
      "jobs.tip.practiceFrench.desc": "Even basic French dramatically increases your chances. Focus on customer service phrases!",
      "jobs.tip.usePlatforms.title": "Use Multiple Platforms",
      "jobs.tip.usePlatforms.desc": "Check Indeed France, LeBonCoin, university job boards, and LinkedIn regularly.",

      // Job categories
      "jobs.category.all": "All",
      "jobs.category.hospitality": "Hospitality",
      "jobs.category.delivery": "Delivery",
      "jobs.category.campus": "Campus Jobs",
      "jobs.category.tutoring": "Tutoring",
      "jobs.category.retail": "Retail",
      "jobs.category.childcare": "Childcare",
      "jobs.category.admin": "Administrative",
      "jobs.category.events": "Events",
      "jobs.category.tech": "Tech",
      "jobs.category.creative": "Creative",
      "jobs.category.digital": "Digital",
      "jobs.category.sports": "Sports & Fitness",
      "jobs.category.tourism": "Tourism",
      "jobs.category.pet": "Pet Care"
    }
  },
  fr: {
    translation: {
      // Navigation
      "nav.home": "Accueil",
      "nav.universities": "Trouver des Universités",
      "nav.jobs": "Emplois à Temps Partiel",
      "nav.community": "Communauté",
      "nav.guides": "Guides",
      "nav.bonjourBuddy": "Bonjour Buddy",
      "nav.careerHelp": "Phrases Françaises",
      "nav.findFriends": "Trouver des Amis",
      "nav.cultureGuide": "Guide Culturel",
      "nav.daySimulator": "Simulateur de Journée",
      
      // Hero Section
      "hero.title": "Votre Passerelle vers les Universités Françaises",
      "hero.subtitle": "Guidance par IA pour les étudiants indiens poursuivant leurs rêves en France",
      "hero.cta.find": "Trouvez Votre Université",
      "hero.cta.chat": "Parler au Guide IA",
      "hero.stats.universities": "Universités",
      "hero.stats.students": "Étudiants Indiens",
      "hero.stats.cost": "Coût Annuel Moyen",
      "hero.stats.visa": "Succès de Visa",
      
      // University Finder
      "finder.title": "Trouvez Votre Université Parfaite",
      "finder.step1": "Profil Académique",
      "finder.step2": "Cours et Budget",
      "finder.step3": "Préférences",
      "finder.cgpa": "Votre CGPA",
      "finder.course": "Cours Préféré",
      "finder.budget": "Budget Annuel",
      "finder.city": "Ville Préférée",
      "finder.search": "Trouver des Universités",
      "finder.results": "Universités Recommandées",
      "finder.match": "Correspondance",
      "finder.fees": "Frais Annuels",
      "finder.ranking": "Classement QS",
      
      // Jobs
      "jobs.title": "Opportunités d'Emploi à Temps Partiel",
      "jobs.subtitle": "Travaillez pendant vos études - jusqu'à 964 heures par an",
      "jobs.filter": "Filtrer par Catégorie",
      "jobs.all": "Tous les Emplois",
      "jobs.hourly": "par heure",
      "jobs.hours": "heures/semaine",
      "jobs.french": "Niveau de Français",
      
      // Community
      "community.title": "Connectez-vous avec des Étudiants",
      "community.students": "Histoires d'Étudiants",
      "community.forum": "Forum de Discussion",
      "community.helps": "Peut aider avec",
      
      // Career Help
      "careerHelp.title": "Phrases Françaises & Aide Carrière",
      "careerHelp.subtitle": "Phrases françaises essentielles pour chaque situation - avec guides de prononciation, indicateurs de ton et modèles prêts à l'emploi",
      "careerHelp.search": "Rechercher des phrases, situations ou sujets...",
      "careerHelp.allCategories": "Toutes les Catégories",
      
      // Find Friends
      "findFriends.title": "Trouver des Amis en France",
      "findFriends.subtitle": "Découvrez où rencontrer des gens, rejoindre des communautés et obtenez des messages en français prêts à l'emploi",
      "findFriends.finder": "Trouveur d'Amis",
      "findFriends.messageGen": "Générateur de Premier Message",
      
      // Culture Guide
      "cultureGuide.title": "Guide de la Culture Française",
      "cultureGuide.subtitle": "Maîtrisez l'étiquette française, évitez les erreurs courantes et soyez confiant dans les situations sociales",
      "cultureGuide.dosdonts": "À Faire et À Ne Pas Faire",
      "cultureGuide.greetings": "Styles de Salutation",
      "cultureGuide.quiz": "Quiz Culturel",
      "cultureGuide.mistakes": "Erreurs Courantes",
      
      // Day Simulator
      "daySimulator.title": "Une Journée en France",
      "daySimulator.subtitle": "Naviguez à travers une journée typique en tant qu'étudiant en échange",
      "daySimulator.start": "Commencer Votre Journée",
      "daySimulator.tryAgain": "Réessayer",
      
      // Common
      "common.loading": "Chargement...",
      "common.error": "Quelque chose s'est mal passé",
      "common.learnMore": "En Savoir Plus",
      "common.apply": "Postuler Maintenant",
      "common.contact": "Contact",
      "common.getStarted": "Commencer",
      "common.back": "Retour",
      "common.nextStep": "Étape suivante",
      "common.tryAgain": "Réessayer",

      // University Search Page
      "universitySearch.eyebrow": "Explorer",
      "universitySearch.titlePrefix": "Trouvez votre",
      "universitySearch.titleAccent": "université idéale",
      "universitySearch.description": "Recherchez parmi les meilleures universités françaises. Filtrez par lieu, programme et frais pour trouver la meilleure option pour votre parcours académique.",

      // University Finder extra
      "finder.subtitle": "Répondez à quelques questions et laissez l'IA trouver votre correspondance idéale",
      "finder.selectCourse": "Sélectionnez un cours...",
      "finder.cityOptional": "{{city}} (Optionnel)",
      "finder.otherPreferences": "Autres préférences (Optionnel)",
      "finder.cityPlaceholder": "ex. : Paris, Lyon, Toulouse...",
      "finder.preferencesPlaceholder": "ex. : Je recherche des opportunités de recherche, je préfère les programmes en anglais...",
      "finder.analyzing": "Analyse en cours...",
      "finder.resultsCount": "{{count}} universités trouvées",
      "finder.searchAgain": "Relancer la recherche",
      "finder.visitWebsite": "Visiter le site",
      "finder.noResultsTitle": "Aucune université trouvée",
      "finder.noResultsDescription": "Essayez d'ajuster votre CGPA, votre budget ou votre choix de cours pour voir plus de résultats.",

      // Jobs page extra
      "jobs.eyebrow": "Opportunités",
      "jobs.titlePrefix": "Emplois",
      "jobs.titleAccent": "étudiants à temps partiel",
      "jobs.legalHoursLabel": "Heures légales de travail :",
      "jobs.legalHoursValue": "964 heures/an (~20 h/semaine)",
      "jobs.filterTitle": "Filtrer par catégorie",
      "jobs.inInr": "En INR",
      "jobs.requirements": "Exigences",
      "jobs.howToApply": "Comment postuler",
      "jobs.noResults": "Aucun emploi trouvé dans cette catégorie.",
      "jobs.tipsTitle": "Recherche d'emploi",
      "jobs.tipsAccent": "conseils pour étudiants",
      "jobs.tip.startEarly.title": "Commencez tôt",
      "jobs.tip.startEarly.desc": "Commencez votre recherche d'emploi dès votre arrivée. Les postes populaires se remplissent vite en septembre !",
      "jobs.tip.prepareDocs.title": "Préparez vos documents",
      "jobs.tip.prepareDocs.desc": "Ayez toujours votre carte étudiante, votre titre de séjour et un CV en français.",
      "jobs.tip.practiceFrench.title": "Pratiquez le français",
      "jobs.tip.practiceFrench.desc": "Même un français de base augmente fortement vos chances. Concentrez-vous sur les phrases de service client !",
      "jobs.tip.usePlatforms.title": "Utilisez plusieurs plateformes",
      "jobs.tip.usePlatforms.desc": "Consultez régulièrement Indeed France, LeBonCoin, les plateformes universitaires et LinkedIn.",

      // Job categories
      "jobs.category.all": "Tous",
      "jobs.category.hospitality": "Restauration",
      "jobs.category.delivery": "Livraison",
      "jobs.category.campus": "Emplois campus",
      "jobs.category.tutoring": "Tutorat",
      "jobs.category.retail": "Commerce",
      "jobs.category.childcare": "Garde d'enfants",
      "jobs.category.admin": "Administratif",
      "jobs.category.events": "Événementiel",
      "jobs.category.tech": "Tech",
      "jobs.category.creative": "Créatif",
      "jobs.category.digital": "Digital",
      "jobs.category.sports": "Sport & Fitness",
      "jobs.category.tourism": "Tourisme",
      "jobs.category.pet": "Garde d'animaux"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: (typeof window !== 'undefined' && localStorage.getItem('studybridge_lang')) || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.language;
}

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('studybridge_lang', lng);
  }
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng;
  }
});

export default i18n;

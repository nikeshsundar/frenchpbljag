# 🇫🇷 StudyBridge France

**Your AI-Powered Gateway to French Universities**

StudyBridge France is a comprehensive web platform designed to help Indian students navigate their journey to studying in France. With AI-powered university matching, real-time chat assistance, and a vibrant student community, we make your dream of studying in France accessible and achievable.

![StudyBridge France](https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=1200&h=400&fit=crop)

## ✨ Features

### 🎓 AI-Powered University Finder
- **Smart Matching Algorithm**: Input your CGPA, course preferences, and budget
- **GPT-4 Integration**: Get personalized recommendations with detailed reasoning
- **30+ Top French Universities**: From Sorbonne to HEC Paris
- **Real-time Filtering**: Match score percentages for each university
- **Detailed Insights**: Strengths, considerations, and application tips

### 💬 AI Chat Assistant
- **24/7 Guidance**: Powered by GPT-4o for intelligent responses
- **Comprehensive Knowledge**: Admissions, visas, Campus France, student life
- **Suggested Questions**: Quick answers to common queries
- **Chat History**: Persistent conversation within session

### 💼 Part-Time Jobs Board
- **20+ Job Categories**: From café work to tech internships
- **Salary Information**: Hourly rates in EUR and INR
- **Legal Guidelines**: 964 hours/year working limit clearly stated
- **French Level Requirements**: Know what language skills you need
- **Application Tips**: How and where to apply for each job

### 👥 Student Community
- **Real Student Stories**: Connect with 6+ current Indian students in France
- **Discussion Forum**: 15+ active threads on admissions, visa, housing, and life
- **Direct Contact**: LinkedIn and email connections
- **Peer Support**: Learn from those who've been through the process

### 📚 Interactive Step-by-Step Guide
- **Timeline Visualization**: 7 major milestones from application to arrival
- **Expandable Sections**: Click to reveal detailed checklists
- **Pro Tips**: Insider advice for each stage
- **Resource Links**: Campus France, CROUS, CAF, and more

### 🌐 Bilingual Support
- **English/French Toggle**: Switch languages instantly
- **Localized Content**: Key sections available in both languages

## 🛠 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS with custom French-inspired theme
- **Animations**: Framer Motion for smooth, delightful interactions
- **Routing**: React Router v6
- **Icons**: Lucide React
- **i18n**: react-i18next for bilingual support
- **AI Integration**: OpenAI GPT-4o API
- **Charts**: Recharts for data visualization

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd studybridge-france
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
studybridge-france/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── UniversityFinder.jsx
│   │   └── AIChat.jsx
│   ├── pages/              # Route pages
│   │   ├── Home.jsx
│   │   ├── UniversitySearch.jsx
│   │   ├── Jobs.jsx
│   │   ├── Community.jsx
│   │   └── Guides.jsx
│   ├── data/               # JSON data files
│   │   ├── universities.json    # 30 French universities
│   │   ├── jobs.json           # 20 part-time jobs
│   │   ├── students.json       # Student profiles
│   │   └── forum.json          # Discussion threads
│   ├── utils/              # Utility functions
│   │   ├── openai.js          # AI integration
│   │   └── i18n.js            # Internationalization
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Design Philosophy

**French-Inspired Color Palette:**
- Primary: Deep Navy Blue (#1E3A8A) - Elegance and trust
- Accent: Warm Red (#DC2626) - French flag inspiration
- Success: Mint Green (#10B981) - Growth and opportunity
- Neutral: Soft Cream (#FEF3C7) - Warmth and accessibility

**Typography:**
- Headings: Playfair Display (elegant, French aesthetic)
- Body: Inter (modern, highly readable)

**Animation Strategy:**
- Subtle entrance animations using Framer Motion
- Hover effects on interactive elements
- Smooth page transitions
- Floating elements for visual interest

## 🔑 Key Features Breakdown

### University Matching Algorithm

1. **Basic Filtering**:
   - CGPA match (allows 0.5 tolerance)
   - Budget compatibility
   - Course availability
   - City preference (optional)

2. **AI Enhancement**:
   - Sends filtered results to GPT-4
   - Receives personalized rankings with match scores
   - Gets detailed reasoning, strengths, and considerations
   - Displays AI insights alongside each university

### AI Chat System

- **Context-Aware**: Pre-loaded with knowledge about French education system
- **Suggested Prompts**: Help users get started
- **Conversation Memory**: Maintains chat history during session
- **Error Handling**: Graceful fallbacks if API fails

## 📊 Data Files

All data is stored in JSON format for easy updates:

- **universities.json**: 30 top French institutions with complete details
- **jobs.json**: 20 student-friendly part-time opportunities
- **students.json**: 6 real student profiles with contact info
- **forum.json**: 15 discussion threads with metadata

## 🌍 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import repository in Vercel
3. Add environment variable: `VITE_OPENAI_API_KEY`
4. Deploy!

Your site will be live at: `https://studybridge-france.vercel.app`

### Other Hosting Options
- Netlify
- GitHub Pages
- AWS Amplify
- Render

## 🔐 Security Notes

- **API Key**: Never commit `.env` to version control
- **Rate Limiting**: Consider implementing API rate limits for production
- **CORS**: Configured for development; adjust for production domains

## 🎯 Future Enhancements

- [ ] User authentication for saving university favorites
- [ ] Real-time forum with backend database
- [ ] Scholarship finder feature
- [ ] Virtual campus tours
- [ ] Cost calculator with CAF simulation
- [ ] Mobile app version
- [ ] WhatsApp/Telegram community integration

## 📝 License

This project is created for educational purposes.

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Unsplash for university images
- French universities for their open data
- Indian student community in France for insights

## 📧 Contact

For questions or feedback about this project, please open an issue in the repository.

---

**Made with ❤️ for Indian students dreaming of France**

🇮🇳 ➡️ 🇫🇷

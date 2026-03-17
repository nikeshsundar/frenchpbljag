# 🚀 Quick Start Guide - StudyBridge France

## What You Need to Do Next

### 1. Set Up Your OpenAI API Key

**This is REQUIRED for the AI features to work!**

#### Get Your API Key:
1. Go to https://platform.openai.com/api-keys
2. Sign up or log in with your GitHub account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-...`)

#### Add to Your Project:
1. In the `studybridge-france` folder, create a file named `.env`
2. Add this line (replace with your actual key):
   ```
   VITE_OPENAI_API_KEY=sk-your-actual-key-here
   ```
3. Save the file

**⚠️ IMPORTANT**: 
- Never share this key publicly
- Never commit the `.env` file to Git
- Set a spending limit on your OpenAI account

---

### 2. Run the Development Server

Open terminal in the `studybridge-france` folder and run:

```bash
npm run dev
```

The site will open at: **http://localhost:5173**

---

### 3. Test All Features

✅ **Homepage**:
- Hero section with animated stats
- University Finder form (3 steps)

✅ **Find Universities Page**:
- Fill out CGPA, course, budget
- Click "Find Universities with AI"
- See AI-powered match scores and recommendations

✅ **Jobs Page**:
- Browse 20 part-time jobs
- Filter by category
- See salary in EUR and INR

✅ **Community Page**:
- View 6 student profiles
- Read 15 discussion forum threads

✅ **Guides Page**:
- Interactive timeline (7 steps)
- Click each step to expand

✅ **AI Chat Widget**:
- Click the chat button (bottom-right corner)
- Ask questions about studying in France
- Try suggested questions

✅ **Language Toggle**:
- Click EN/FR button in navbar
- See content switch to French

---

### 4. For Your Project Submission

#### If Showing to Professor:

**Option A - Run Locally:**
1. Make sure `.env` file has your API key
2. Run `npm run dev`
3. Open browser to localhost:5173
4. Demo the features live

**Option B - Deploy to Vercel (5 minutes):**
1. Push code to GitHub
2. Go to https://vercel.com
3. Import your GitHub repository
4. Add environment variable: `VITE_OPENAI_API_KEY` = your key
5. Click Deploy
6. Share the live URL

#### What to Highlight:

🎯 **Novel Features:**
- AI-powered university matching with personalized reasoning
- Real-time AI chat for admissions guidance
- Interactive timeline with animations
- Bilingual support (EN/FR)
- Modern, French-inspired design

📊 **Data Completeness:**
- 30 top French universities with full details
- 20 part-time jobs with practical info
- 6 student profiles with real experiences
- 15 discussion forum threads

🎨 **Design Excellence:**
- Smooth Framer Motion animations
- French flag color palette (blue, white, red)
- Mobile-responsive layout
- Hover effects and micro-interactions

---

### 5. Troubleshooting

**AI features not working?**
- Check `.env` file exists and has correct API key
- Restart dev server after adding `.env`
- Check browser console for errors

**Build errors?**
- Run `npm install` again
- Delete `node_modules` and run `npm install`

**Slow AI responses?**
- Normal! GPT-4 takes 2-5 seconds
- Don't click multiple times

---

### 6. Customization Tips (If You Have Time)

**Change Colors:**
- Edit `tailwind.config.js` - look for `colors` section

**Add More Universities:**
- Edit `src/data/universities.json`
- Copy existing format

**Add More Jobs:**
- Edit `src/data/jobs.json`
- Follow the same structure

**Change Hero Text:**
- Edit `src/components/Hero.jsx`
- Or update translations in `src/utils/i18n.js`

---

## 📝 Project Structure Summary

```
studybridge-france/
├── src/
│   ├── components/       ← React components
│   ├── pages/           ← Main pages (Home, Jobs, etc.)
│   ├── data/            ← JSON files with content
│   ├── utils/           ← AI and i18n utilities
│   └── App.jsx          ← Main app with routing
├── .env                 ← YOUR API KEY (create this!)
├── package.json
└── README.md
```

---

## 💡 Demo Script for Presentation

1. **Introduction** (30 sec)
   - "StudyBridge France helps Indian students find French universities using AI"

2. **Show Homepage** (1 min)
   - Point out hero section, stats, design
   - Click language toggle to show French

3. **Demo University Finder** (2 min)
   - Enter CGPA: 7.5
   - Select course: Computer Science
   - Budget: €10,000
   - Click "Find Universities"
   - Show AI match scores and reasoning

4. **Show AI Chat** (1 min)
   - Click chat widget
   - Ask: "What documents do I need for visa?"
   - Show intelligent response

5. **Quick Tour** (1 min)
   - Jobs page - filter by category
   - Community - student profiles
   - Guides - interactive timeline

6. **Highlight Tech** (30 sec)
   - React + Tailwind for UI
   - GPT-4 for AI features
   - Framer Motion for animations

---

## 🎯 Success Checklist

- [ ] `.env` file created with API key
- [ ] Dev server runs without errors
- [ ] Can navigate to all 5 pages
- [ ] AI Chat responds to questions
- [ ] University Finder shows results
- [ ] Language toggle works
- [ ] Mobile responsive (test by resizing browser)

---

**Good luck with your submission! 🍀**

If everything works, you have a fully functional, AI-powered, beautifully designed website ready to impress! 

**Time to complete setup: ~5 minutes**
**Time to deploy: ~5 minutes**

---

Need help? Check:
- README.md for detailed documentation
- Browser console (F12) for errors
- OpenAI dashboard for API usage

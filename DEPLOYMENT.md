# 🚀 Deployment Guide - StudyBridge France

## Quick Deploy to Vercel (5 Minutes)

### Prerequisites
- GitHub account
- Vercel account (free - sign up at vercel.com)
- Your OpenAI API key

---

## Step-by-Step Deployment

### 1. Push to GitHub

**If you haven't already initialized git:**

```bash
cd studybridge-france
git init
git add .
git commit -m "Initial commit: StudyBridge France"
```

**Create a new repository on GitHub:**
1. Go to https://github.com/new
2. Name it: `studybridge-france`
3. Don't initialize with README (you already have one)
4. Click "Create repository"

**Push your code:**
```bash
git remote add origin https://github.com/YOUR-USERNAME/studybridge-france.git
git branch -M main
git push -u origin main
```

---

### 2. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Easiest)

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with GitHub
3. **Click "Add New Project"**
4. **Import your repository**:
   - Find `studybridge-france` in the list
   - Click "Import"
5. **Configure Project**:
   - Framework Preset: `Vite` (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `dist` (default)
6. **Add Environment Variable**:
   - Click "Environment Variables"
   - Name: `VITE_OPENAI_API_KEY`
   - Value: `sk-your-actual-api-key`
   - Click "Add"
7. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes
   - Get your live URL! 🎉

Your site will be live at: `https://studybridge-france.vercel.app` (or similar)

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd studybridge-france
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name? studybridge-france
# - Directory? ./
# - Override settings? No

# Add environment variable
vercel env add VITE_OPENAI_API_KEY
# Paste your API key when prompted
# Select: Production, Preview, Development (all three)

# Deploy to production
vercel --prod
```

---

### 3. Test Your Deployment

Visit your live URL and test:

✅ Homepage loads with animations
✅ University Finder works
✅ AI Chat responds (may take 5 seconds first time)
✅ Jobs page displays all 20 jobs
✅ Community page shows students
✅ Guides page timeline is interactive
✅ Language toggle works (EN ↔ FR)
✅ Mobile responsive (test on phone)

---

## Alternative: Deploy to Netlify

### Using Netlify Dashboard

1. **Go to Netlify**: https://netlify.com
2. **Sign in** with GitHub
3. **Click "Add new site" → "Import an existing project"**
4. **Connect to GitHub**:
   - Authorize Netlify
   - Select `studybridge-france` repository
5. **Configure Build**:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. **Add Environment Variable**:
   - Go to "Site settings" → "Environment variables"
   - Click "Add a variable"
   - Key: `VITE_OPENAI_API_KEY`
   - Value: Your API key
7. **Deploy site**

Your site will be live at: `https://studybridge-france.netlify.app`

---

## Troubleshooting Deployment Issues

### ❌ Build Fails

**Error: "Cannot find module 'react'"**
- Check `package.json` has all dependencies
- Ensure build command is `npm run build` or `vite build`

**Error: "VITE_OPENAI_API_KEY is not defined"**
- Add environment variable in Vercel/Netlify dashboard
- Make sure it starts with `VITE_` prefix

### ❌ AI Features Don't Work

**Chat/Matching not responding:**
- Check environment variable is set correctly
- Open browser console (F12) for errors
- Verify API key is valid on OpenAI dashboard
- Check you have credits on OpenAI account

**Error: "API key invalid"**
- Re-check your API key in OpenAI dashboard
- Regenerate key if needed
- Update environment variable in Vercel/Netlify

### ❌ Images Not Loading

- University images use Unsplash URLs
- Check internet connection
- Some networks block Unsplash - images will show broken

### ❌ Slow Performance

- First AI request takes 3-5 seconds (normal)
- Images load on-demand (lazy loading would help)
- Consider adding loading states

---

## Post-Deployment Checklist

✅ **Test all pages**
- [ ] Homepage hero section
- [ ] University finder with AI
- [ ] AI chat widget
- [ ] Jobs filtering
- [ ] Community profiles
- [ ] Guides timeline

✅ **Test features**
- [ ] Language toggle
- [ ] Mobile responsiveness
- [ ] AI responses
- [ ] External links

✅ **Performance**
- [ ] Page load < 3 seconds
- [ ] Animations smooth
- [ ] No console errors

✅ **Share**
- [ ] Copy your live URL
- [ ] Test on different devices
- [ ] Ready for presentation!

---

## Custom Domain (Optional)

### Add Custom Domain to Vercel

1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Enter your domain (e.g., `studybridge-france.com`)
4. Follow DNS instructions
5. Wait for DNS propagation (5-60 minutes)

### Cost
- Vercel hosting: **Free** (with limits)
- Custom domain: ~$10-15/year (buy from Namecheap, GoDaddy, etc.)

---

## Monitoring & Analytics (Optional)

### Add Google Analytics

1. Get GA4 tracking ID
2. Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Vercel Analytics

- Enable in Vercel dashboard
- Get insights on:
  - Page views
  - User locations
  - Performance metrics

---

## Updating Your Deployed Site

### Auto-Deploy on Git Push

Vercel automatically redeploys when you push to `main` branch:

```bash
# Make changes to your code
git add .
git commit -m "Add new feature"
git push origin main

# Vercel auto-deploys in 1-2 minutes!
```

### Manual Redeploy

In Vercel dashboard:
1. Go to "Deployments"
2. Click "..." on latest deployment
3. Click "Redeploy"

---

## Cost Considerations

### Free Tier Limits

**Vercel Free:**
- ✅ Unlimited sites
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains
- ⚠️ Function execution: 100 hours/month

**OpenAI Free Trial:**
- $5 credit (expires after 3 months)
- GPT-4o: ~$0.01 per request
- **Estimate**: ~500 AI interactions with $5

**Recommendation for Demo:**
- Use free trial for project presentation
- Set spending limit on OpenAI ($5-10)
- Monitor usage in OpenAI dashboard

---

## Demo Day Preparation

### Before Presentation:

1. **Test your live site** 30 minutes before
2. **Have backup**: Run `npm run dev` locally in case internet fails
3. **Prepare talking points**:
   - Show AI matching live
   - Demonstrate chat feature
   - Highlight design and animations
4. **Open multiple tabs**:
   - Live site homepage
   - University finder page
   - Jobs page
   - Community page
5. **Clear browser cache** for fresh load times

### During Demo:

1. Start with homepage (hero section)
2. Use university finder:
   - CGPA: 7.5
   - Course: Computer Science
   - Budget: €10,000
3. Show AI match scores
4. Open chat, ask: "What documents for visa?"
5. Quick tour of other pages
6. Show mobile view (resize browser)
7. Toggle language
8. Mention tech stack

**Total demo time: 3-5 minutes**

---

## Useful Links

- **Your Live Site**: `https://your-project.vercel.app`
- **Vercel Dashboard**: https://vercel.com/dashboard
- **OpenAI Usage**: https://platform.openai.com/usage
- **GitHub Repo**: https://github.com/YOUR-USERNAME/studybridge-france

---

## Success! 🎉

Your StudyBridge France site is now:
- ✅ Live and accessible worldwide
- ✅ Automatically updated with git push
- ✅ HTTPS secure
- ✅ Fast and optimized
- ✅ Ready to impress!

**Share your link**: `https://studybridge-france.vercel.app`

---

**Need help?**
- Vercel docs: https://vercel.com/docs
- Check browser console (F12) for errors
- Test API key in OpenAI playground

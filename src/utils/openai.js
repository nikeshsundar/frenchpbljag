import axios from 'axios';

const GITHUB_TOKEN = import.meta.env.VITE_OPENAI_API_KEY;

// Check if we have a GitHub token (starts with 'ghp_' or 'github_pat_')
const isGitHubToken = GITHUB_TOKEN && (GITHUB_TOKEN.startsWith('ghp_') || GITHUB_TOKEN.startsWith('github_pat_'));

// GitHub Models API endpoint (free GPT-4o access)
const GITHUB_MODELS_URL = 'https://models.inference.ai.azure.com/chat/completions';

// --- Offline Fallback Responses ---

const offlineChatResponses = {
  'visa': `For a French student visa, you'll need:
• Valid passport (at least 6 months validity)
• Campus France registration & interview completion
• University acceptance letter
• Proof of financial resources (~€615/month or €7,380/year)
• Health insurance
• Passport-sized photos
• Completed visa application form

The process typically takes 2-4 weeks. Start by registering on the Campus France website (www.inde.campusfrance.org), then book a VFS appointment after approval.`,

  'cost': `Living costs in France vary by city:
• Paris: €1,000-1,500/month (rent €500-900 + food €200-300 + transport €75)
• Lyon/Toulouse: €700-1,000/month (rent €350-600 + food €200-250 + transport €30-50)
• Smaller cities: €600-800/month

Tuition at public universities is very affordable: €2,770/year for most programs. Private schools range from €6,000-€45,000/year. Don't forget to apply for CAF housing assistance - it can reduce your rent by 30-50%!`,

  'work': `As an international student in France, you can work up to 964 hours per year (roughly 20 hours/week). Common student jobs include:
• Tutoring (€15-25/hr)
• Hospitality/Restaurants (€11-14/hr)
• Campus jobs - library, admin (€11-13/hr)
• Delivery services (flexible hours)

No additional work permit is needed - your student visa covers this. Just ensure your employer has a copy of your residence permit.`,

  'campus france': `Campus France is the French government agency that manages international student admissions. Here's the process:
1. Create an account on the Campus France India website
2. Fill out the online form with your academic details
3. Upload required documents (transcripts, language certificates, etc.)
4. Pay the processing fee (~₹15,000)
5. Attend the Campus France interview (focus: motivation & study plans)
6. Receive approval, then apply for your student visa

Start this process 8-10 months before your intended start date.`,

  'housing': `Student housing options in France:
• CROUS residences: €200-400/month (cheapest, apply early!)
• Private studios: €400-900/month depending on city
• Shared apartments (colocation): €300-600/month
• Homestay: €400-700/month (includes meals sometimes)

Tips: Apply for CROUS as soon as possible - spots fill fast. Use platforms like Studapart, LeBonCoin, or PAP for private housing. Always apply for CAF (housing assistance) once you have your lease!`,

  'scholarship': `Scholarships available for Indian students in France:
• Eiffel Excellence Scholarship: Covers living expenses (€1,181/month for Master's)
• Charpak Scholarship: For Indian students, various amounts
• Campus France scholarships: Check their portal regularly
• University-specific scholarships: Each university has their own

Tips: Apply early (6-8 months before), maintain good academics (7.5+ CGPA preferred), write a strong motivation letter explaining why France and your specific program.`,

  'language': `French language requirements:
• Most English-taught programs: IELTS 6.0-6.5 or TOEFL 80-90
• French-taught programs: DELF B2 or TCF B2 minimum
• Some universities accept Duolingo English Test

Tips: Even for English programs, basic French (A2) is highly recommended for daily life. Many universities offer free French courses. Start learning basics before arrival - apps like Duolingo help!`,

  'default': `Great question! Here's some general guidance for studying in France:

France offers excellent education at affordable tuition rates. Public universities charge around €2,770/year, and there are many scholarship opportunities available through Campus France, Eiffel Excellence Scholarship, and individual universities.

The key steps are: 1) Choose your program, 2) Register with Campus France, 3) Apply for your student visa, 4) Arrange housing, and 5) Prepare for arrival.

Feel free to ask me about:
• Visa requirements and process
• Living costs in different cities
• Part-time work opportunities
• Campus France registration
• Housing options (CROUS, private)
• Scholarships and funding
• Language requirements`
};

function getOfflineChatResponse(userMessage) {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes('visa') || msg.includes('document') || msg.includes('permit')) {
    return offlineChatResponses['visa'];
  }
  if (msg.includes('cost') || msg.includes('expensive') || msg.includes('money') || msg.includes('budget') || msg.includes('living') || msg.includes('paris') || msg.includes('afford')) {
    return offlineChatResponses['cost'];
  }
  if (msg.includes('work') || msg.includes('job') || msg.includes('part-time') || msg.includes('part time') || msg.includes('earn') || msg.includes('income')) {
    return offlineChatResponses['work'];
  }
  if (msg.includes('campus france') || msg.includes('campusfrance') || msg.includes('admission') || msg.includes('apply') || msg.includes('application') || msg.includes('process')) {
    return offlineChatResponses['campus france'];
  }
  if (msg.includes('hous') || msg.includes('accommodation') || msg.includes('rent') || msg.includes('crous') || msg.includes('apartment') || msg.includes('stay') || msg.includes('live')) {
    return offlineChatResponses['housing'];
  }
  if (msg.includes('scholar') || msg.includes('fund') || msg.includes('financial') || msg.includes('eiffel') || msg.includes('charpak') || msg.includes('free')) {
    return offlineChatResponses['scholarship'];
  }
  if (msg.includes('french') || msg.includes('language') || msg.includes('ielts') || msg.includes('toefl') || msg.includes('delf') || msg.includes('tcf') || msg.includes('english')) {
    return offlineChatResponses['language'];
  }
  
  return offlineChatResponses['default'];
}

function getOfflineUniversityMatches(filteredUniversities) {
  return filteredUniversities.slice(0, 7).map((uni, index) => ({
    name: uni.name,
    matchScore: Math.max(60, 95 - index * 5),
    reasoning: `${uni.name} in ${uni.city} offers strong programs with a QS ranking of #${uni.qsRanking}. Tuition is €${uni.tuitionFees.toLocaleString()}/year.`,
    strength: uni.strengths ? uni.strengths[0] : 'Quality education at competitive tuition rates',
    consideration: uni.tuitionFees > 10000 ? 'Higher tuition - explore scholarship options' : 'Research specific program prerequisites carefully'
  }));
}

// --- API Functions ---

export const matchUniversities = async (studentProfile, filteredUniversities) => {
  if (!isGitHubToken) {
    await new Promise(resolve => setTimeout(resolve, 800));
    return getOfflineUniversityMatches(filteredUniversities);
  }

  try {
    const response = await axios.post(
      GITHUB_MODELS_URL,
      {
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are an expert French university admission counselor helping Indian students. 
Analyze student profiles and recommend the best universities from the provided list.
Be specific, practical, and encouraging. Consider CGPA fit, budget, program quality, and career prospects.`
          },
          {
            role: 'user',
            content: `Student Profile:
- CGPA: ${studentProfile.cgpa}/10
- Preferred Course: ${studentProfile.course}
- Budget: €${studentProfile.budget}/year
- Preferences: ${studentProfile.preferences || 'None specified'}

Filtered Universities (already meeting minimum criteria):
${JSON.stringify(filteredUniversities, null, 2)}

Task: Rank the top 5-7 universities for this student. For each university, provide:
1. Match Score (0-100%)
2. Why it's a good fit (2-3 sentences)
3. One specific strength relevant to their profile
4. One consideration or challenge

Return ONLY valid JSON array in this exact format:
[
  {
    "name": "University Name",
    "matchScore": 95,
    "reasoning": "This university is perfect because...",
    "strength": "Specific strength for this student",
    "consideration": "One thing to consider"
  }
]`
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      },
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const content = response.data.choices[0].message.content;
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Invalid response format from AI');
  } catch (error) {
    console.error('Error matching universities, falling back to offline:', error);
    return getOfflineUniversityMatches(filteredUniversities);
  }
};

export const chatWithAI = async (messages) => {
  // If no valid token, return offline response
  if (!isGitHubToken) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    return getOfflineChatResponse(lastUserMessage?.content || '');
  }

  try {
    const response = await axios.post(
      GITHUB_MODELS_URL,
      {
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are a helpful and friendly expert advisor for Indian students wanting to study in France. Your name is StudyBridge AI Guide.

You provide accurate, practical information about:
- French university admissions process
- Campus France registration and requirements  
- Student visa application steps and timeline
- Cost of living in different French cities
- Part-time work regulations (964 hours/year, ~20hrs/week)
- Student accommodation options (CROUS vs private)
- French culture and student life
- Banking, health insurance, and administrative tasks
- Specific universities and their programs
- Scholarships like Eiffel, Charpak, and university-specific ones
- Language requirements (IELTS, TOEFL, DELF, TCF)

Be warm, encouraging, and specific. Use bullet points and examples when helpful. Keep responses concise but informative (2-4 paragraphs max).
If you don't know something, admit it and suggest where to find the information.
Always encourage the student and remind them that studying in France is achievable!`
          },
          ...messages
        ],
        temperature: 0.8,
        max_tokens: 600
      },
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error in AI chat, falling back to offline:', error);
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    return getOfflineChatResponse(lastUserMessage?.content || '');
  }
};

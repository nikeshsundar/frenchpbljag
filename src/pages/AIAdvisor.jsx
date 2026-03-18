import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Loader2, Sparkles, Bot, User, Trash2, 
  MessageSquare, GraduationCap, Plane, Home, Briefcase,
  Heart, BookOpen, Clock, ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { chatWithAI } from '../utils/openai';

const AIAdvisor = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Bonjour! I'm your personal AI advisor for studying in France. 

I'm here to help you with everything - from choosing the right university to settling into French life. Think of me as your experienced friend who's been through it all.

**I can help you with:**
- University selection & applications
- Visa process & documentation
- Cost of living & budgeting
- Finding accommodation
- Part-time job opportunities
- French culture & language tips
- Student life in different cities

Feel free to ask me anything in detail - I'm here to have a real conversation with you!`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickTopics = [
    { icon: GraduationCap, label: 'University Selection', prompt: 'I need help choosing the right university in France. Can you ask me about my profile and preferences to give personalized recommendations?' },
    { icon: Plane, label: 'Visa Process', prompt: 'Can you guide me through the complete French student visa process step by step? What documents do I need and what are the timelines?' },
    { icon: Home, label: 'Accommodation', prompt: 'I\'m worried about finding accommodation in France. Can you explain all my options - CROUS, private rentals, shared apartments - and help me understand what\'s best for my budget?' },
    { icon: Briefcase, label: 'Part-time Jobs', prompt: 'Can I work while studying in France? Tell me about the rules, what kind of jobs are available for international students, and how to find them.' },
    { icon: Heart, label: 'Student Life', prompt: 'What\'s student life really like in France? Tell me about the culture, making friends, social activities, and how to adapt as an Indian student.' },
    { icon: BookOpen, label: 'French Language', prompt: 'I\'m worried about the language barrier. How much French do I really need? Can you give me a realistic plan to learn French before and after arriving?' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async (question = input) => {
    if (!question.trim() || loading) return;

    const userMessage = { 
      role: 'user', 
      content: question,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setIsTyping(true);

    try {
      const response = await chatWithAI([...messages, userMessage]);
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response,
        timestamp: new Date()
      }]);
    } catch (error) {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please make sure the OpenAI API key is configured correctly. In the meantime, feel free to explore other resources on our site or try again later.',
        timestamp: new Date()
      }]);
    }

    setLoading(false);
  };

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: `Chat cleared! Let's start fresh. 

What would you like to know about studying in France? I'm here to help with universities, visas, accommodation, student life, and more.`,
      timestamp: new Date()
    }]);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatMessage = (content) => {
    // Convert markdown-style formatting to JSX
    return content.split('\n').map((line, i) => {
      // Bold text
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Bullet points
      if (line.startsWith('- ')) {
        return (
          <div key={i} className="flex items-start gap-2 my-1">
            <span className="text-purple-400 mt-1">•</span>
            <span dangerouslySetInnerHTML={{ __html: line.substring(2) }} />
          </div>
        );
      }
      // Numbered lists
      const numberedMatch = line.match(/^(\d+)\.\s(.*)$/);
      if (numberedMatch) {
        return (
          <div key={i} className="flex items-start gap-2 my-1">
            <span className="text-purple-400 font-semibold min-w-[20px]">{numberedMatch[1]}.</span>
            <span dangerouslySetInnerHTML={{ __html: numberedMatch[2] }} />
          </div>
        );
      }
      // Regular paragraph
      if (line.trim()) {
        return <p key={i} className="my-2" dangerouslySetInnerHTML={{ __html: line }} />;
      }
      return <br key={i} />;
    });
  };

  return (
    <div className="min-h-screen bg-dark pt-20">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link 
              to="/"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </Link>
            <div>
              <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-400" />
                AI Study Advisor
              </h1>
              <p className="text-gray-400 text-sm">Your personal guide to studying in France</p>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all border border-white/10 hover:border-red-500/30"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear Chat</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Quick Topics */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 sticky top-24">
              <h3 className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Quick Topics
              </h3>
              <div className="space-y-2">
                {quickTopics.map((topic, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(topic.prompt)}
                    disabled={loading}
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-purple-500/20 text-left transition-all border border-white/10 hover:border-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <topic.icon className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                    <span className="text-sm text-gray-300 group-hover:text-white">{topic.label}</span>
                  </button>
                ))}
              </div>

              {/* Tips */}
              <div className="mt-6 p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20">
                <h4 className="text-sm font-semibold text-purple-300 mb-2">Tips for better answers</h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Be specific about your situation</li>
                  <li>• Mention your field of study</li>
                  <li>• Share your budget constraints</li>
                  <li>• Ask follow-up questions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 flex flex-col h-[calc(100vh-200px)] min-h-[500px]">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                        : 'bg-gradient-to-r from-violet-600 to-purple-600'
                    }`}>
                      {msg.role === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>

                    {/* Message Content */}
                    <div className={`flex-1 max-w-[80%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                      <div className={`inline-block p-4 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-tr-sm'
                          : 'bg-white/10 text-gray-200 rounded-tl-sm border border-white/10'
                      }`}>
                        <div className={`text-sm leading-relaxed ${msg.role === 'user' ? '' : 'prose prose-invert prose-sm max-w-none'}`}>
                          {msg.role === 'user' ? msg.content : formatMessage(msg.content)}
                        </div>
                      </div>
                      <div className={`text-xs text-gray-500 mt-1 flex items-center gap-1 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        <Clock className="w-3 h-3" />
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white/10 p-4 rounded-2xl rounded-tl-sm border border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                        <span className="text-sm text-gray-400">Thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/10 bg-black/20">
                <div className="flex items-end gap-3">
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                      rows={1}
                      className="w-full p-4 pr-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none min-h-[56px] max-h-[200px]"
                      style={{ height: 'auto' }}
                      onInput={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
                      }}
                    />
                  </div>
                  <button
                    onClick={() => handleSend()}
                    disabled={loading || !input.trim()}
                    className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25 flex-shrink-0"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  AI responses are generated and may not always be accurate. Verify important information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAdvisor;

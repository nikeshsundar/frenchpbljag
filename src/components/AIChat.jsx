import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { chatWithAI } from '../utils/openai';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! 👋 I\'m your AI guide for studying in France. Ask me anything about admissions, visas, student life, or universities!'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestedQuestions = [
    'What documents do I need for a student visa?',
    'How much does it cost to live in Paris?',
    'Can I work part-time as a student?',
    'What is Campus France?',
    'Best cities for Computer Science students?'
  ];

  const handleSend = async (question = input) => {
    if (!question.trim() || loading) return;

    const userMessage = { role: 'user', content: question };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatWithAI([...messages, userMessage]);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please make sure you have set up your OpenAI API key in the .env file.'
      }]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
        style={{ zIndex: 9999 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
            style={{ zIndex: 9999 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                <div>
                  <h3 className="font-semibold">AI Admission Guide</h3>
                  <p className="text-xs text-pink-100">Powered by GPT-4o</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-pink-500 text-white rounded-br-none shadow-md'
                        : 'bg-white text-gray-800 rounded-bl-none shadow-md border border-gray-200'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-lg rounded-bl-none shadow-md border border-gray-200">
                    <Loader2 className="w-5 h-5 animate-spin text-pink-500" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 bg-white border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2 mt-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.slice(0, 3).map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      className="text-xs bg-pink-50 text-pink-600 px-3 py-1 rounded-full hover:bg-pink-100 transition-all border border-pink-200"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={loading || !input.trim()}
                  className="bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;

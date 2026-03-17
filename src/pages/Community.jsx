import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Linkedin, Mail, MessageSquare, ThumbsUp, MessageCircle, Tag, Send, X, User } from 'lucide-react';
import studentsData from '../data/students.json';
import forumData from '../data/forum.json';

const Community = () => {
  const { t } = useTranslation();
  const [selectedThread, setSelectedThread] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [newThreadOpen, setNewThreadOpen] = useState(false);
  const [threads, setThreads] = useState(forumData);
  
  // Sample replies for demonstration
  const [threadReplies, setThreadReplies] = useState({
    1: [
      { id: 1, author: 'Sophie L.', content: 'B1 is generally recommended, but B2 makes you much more competitive. Some programs accept English-taught with just basic French.', date: '2026-03-11', upvotes: 15 },
      { id: 2, author: 'Marie D.', content: 'I got in with B1 but struggled in first semester. Definitely aim for B2 if possible!', date: '2026-03-11', upvotes: 8 }
    ],
    2: [
      { id: 1, author: 'Thomas K.', content: 'Bring proof of funds, acceptance letter, passport photos, and previous transcripts. They might ask about your study plans.', date: '2026-03-13', upvotes: 22 },
      { id: 2, author: 'Priya S.', content: 'Also prepare a motivation statement in French! They asked me why France specifically.', date: '2026-03-13', upvotes: 12 },
      { id: 3, author: 'Amit R.', content: 'The interview was friendly for me. Just be honest and show genuine interest in your program.', date: '2026-03-14', upvotes: 9 }
    ],
    3: [
      { id: 1, author: 'Lucas M.', content: 'CROUS is cheapest (~200-400€/month) but waitlists are long. Apply ASAP!', date: '2026-03-09', upvotes: 18 },
      { id: 2, author: 'Nina P.', content: 'I used Studapart.com - found a studio for 550€ in Lyon suburbs. Pretty reliable.', date: '2026-03-10', upvotes: 14 }
    ]
  });

  const categoryColors = {
    'Admissions': 'bg-pink-100 text-pink-700 border-pink-200',
    'Visa': 'bg-green-100 text-green-700 border-green-200',
    'Housing': 'bg-purple-100 text-purple-700 border-purple-200',
    'Student Life': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Jobs': 'bg-blue-100 text-blue-700 border-blue-200'
  };

  const handleAddReply = (threadId) => {
    if (!replyText.trim()) return;
    
    const newReply = {
      id: (threadReplies[threadId]?.length || 0) + 1,
      author: 'You',
      content: replyText,
      date: new Date().toISOString().split('T')[0],
      upvotes: 0
    };

    setThreadReplies(prev => ({
      ...prev,
      [threadId]: [...(prev[threadId] || []), newReply]
    }));

    // Update reply count in thread
    setThreads(prev => prev.map(thread => 
      thread.id === threadId 
        ? { ...thread, replies: thread.replies + 1 }
        : thread
    ));

    setReplyText('');
  };

  const handleUpvote = (threadId) => {
    setThreads(prev => prev.map(thread =>
      thread.id === threadId
        ? { ...thread, upvotes: thread.upvotes + 1 }
        : thread
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          {t('community.title')}
        </h1>
        <p className="text-xl text-gray-600">
          Learn from students already living their French dream
        </p>
      </div>

      {/* Student Stories */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 flex items-center text-gray-900">
          <span className="bg-pink-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">👨‍🎓</span>
          {t('community.students')}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentsData.map((student) => (
            <motion.div
              key={student.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden card-hover border border-gray-200"
            >
              <div className="h-32 bg-gradient-to-r from-pink-500 to-rose-500"></div>
              <div className="relative px-6 pb-6">
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-24 h-24 rounded-full border-4 border-white absolute -top-12 left-6"
                />
                <div className="pt-14">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{student.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{student.course}</p>
                  <p className="text-sm font-semibold text-pink-600 mb-3">{student.university}</p>
                  <p className="text-xs text-gray-500 mb-4">📍 {student.city} • Year {student.year}</p>
                  
                  <div className="bg-pink-50 border-l-4 border-pink-500 p-3 mb-4 text-sm italic text-gray-700">
                    "{student.quote}"
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 mb-2">{t('community.helps')}:</p>
                    <div className="flex flex-wrap gap-1">
                      {student.helpsWith.map((help, idx) => (
                        <span key={idx} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                          {help}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={student.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-all text-sm"
                    >
                      <Linkedin className="w-4 h-4 mr-1" />
                      LinkedIn
                    </a>
                    <a
                      href={`mailto:${student.email}`}
                      className="flex-1 flex items-center justify-center bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-all text-sm"
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Discussion Forum */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center text-gray-900">
            <span className="bg-pink-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">💬</span>
            {t('community.forum')}
          </h2>
          <button 
            onClick={() => setNewThreadOpen(true)}
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-all shadow-md font-semibold"
          >
            + New Discussion
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="space-y-4">
            {threads.map((thread) => (
              <motion.div
                key={thread.id}
                whileHover={{ x: 5 }}
                onClick={() => setSelectedThread(thread)}
                className="border border-gray-200 rounded-lg p-4 hover:border-pink-400 hover:shadow-md transition-all cursor-pointer bg-white"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[thread.category] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                        {thread.category}
                      </span>
                      <span className="text-xs text-gray-500">{thread.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 hover:text-pink-600 mb-2">
                      {thread.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{thread.excerpt}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {thread.tags.map((tag, idx) => (
                        <span key={idx} className="flex items-center bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpvote(thread.id);
                    }}
                    className="flex items-center hover:text-pink-600 transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {thread.upvotes}
                  </button>
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {thread.replies} replies
                  </div>
                  <span className="text-xs">by {thread.author}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Thread Detail Modal */}
      <AnimatePresence>
        {selectedThread && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedThread(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white border border-white/30">
                      {selectedThread.category}
                    </span>
                    <h2 className="text-2xl font-bold mt-3 mb-2">{selectedThread.title}</h2>
                    <p className="text-pink-100 text-sm">by {selectedThread.author} • {selectedThread.date}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedThread(null)}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Original Post */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-gray-800">{selectedThread.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedThread.tags.map((tag, idx) => (
                      <span key={idx} className="bg-white text-gray-600 px-3 py-1 rounded-full text-xs border border-gray-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Replies */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-gray-900 text-lg">{threadReplies[selectedThread.id]?.length || 0} Replies</h3>
                  {threadReplies[selectedThread.id]?.map((reply) => (
                    <motion.div
                      key={reply.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-pink-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">{reply.author}</span>
                            <span className="text-xs text-gray-500">{reply.date}</span>
                          </div>
                          <p className="text-gray-700 text-sm mb-2">{reply.content}</p>
                          <button className="text-xs text-gray-500 hover:text-pink-600 flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            {reply.upvotes}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Reply Input */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Add Your Reply</h4>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Share your thoughts, experience, or advice..."
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 resize-none"
                    rows="4"
                  />
                  <button
                    onClick={() => handleAddReply(selectedThread.id)}
                    className="mt-3 bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-all flex items-center gap-2 font-semibold"
                  >
                    <Send className="w-4 h-4" />
                    Post Reply
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <div className="mt-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-8 md:p-12 text-white text-center shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Want to share your story?</h2>
        <p className="text-lg mb-6 text-pink-100">
          Help future students by sharing your journey and insights about studying in France!
        </p>
        <button className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:-translate-y-1">
          Share Your Story
        </button>
      </div>
    </div>
  );
};

export default Community;

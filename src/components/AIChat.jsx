import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIChat = () => {
  return (
    <Link to="/ai-advisor">
      <motion.button
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/50 transition-all"
        style={{ zIndex: 9999 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </Link>
  );
};

export default AIChat;

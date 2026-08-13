import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Stethoscope, X, Send, Bot, Maximize2, Sparkles, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatWithDoctorApi } from '../../services/api';

const FloatingAIDoctorWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'doctor',
      text: "Hello! I'm Dr. Healora. Need quick medical advice or clarification on your symptoms?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, loading]);

  if (location.pathname === '/ai-doctor') {
    return null;
  }

  const handleSend = async () => {
    if (!inputMessage.trim() || loading) return;

    const userMsg = { sender: 'user', text: inputMessage };
    setMessages((prev) => [...prev, userMsg]);
    const query = inputMessage;
    setInputMessage('');
    setLoading(true);

    const res = await chatWithDoctorApi({
      message: query,
      history: messages.map((m) => ({ sender: m.sender, text: m.text }))
    });

    setLoading(false);
    setMessages((prev) => [
      ...prev,
      {
        sender: 'doctor',
        text: res.response || 'Dr. Healora is currently offline.'
      }
    ]);
  };

  return (

    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white px-4 py-3.5 rounded-full shadow-2xl shadow-emerald-600/40 border border-emerald-400/40 transition cursor-pointer group"
          >
            <div className="relative">
              <Stethoscope className="w-6 h-6 text-emerald-100 group-hover:rotate-12 transition transform" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-300 border-2 border-emerald-900 rounded-full animate-ping" />
            </div>
            <span className="font-extrabold text-sm tracking-wide pr-1">Ask Dr. Healora</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Pop-up Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-80 sm:w-96 bg-white dark:bg-emerald-950 border border-emerald-100 dark:border-emerald-900/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[500px]"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600/50 border border-emerald-400/30 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-emerald-200" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm flex items-center gap-1.5">
                    Dr. Healora AI <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                  </h4>
                  <span className="text-[10px] text-emerald-200/90 font-medium">Virtual Clinical Consultant</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/ai-doctor');
                  }}
                  className="p-1.5 hover:bg-emerald-700/60 rounded-xl text-emerald-200 transition"
                  title="Expand to full screen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-emerald-700/60 rounded-xl text-emerald-200 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-emerald-950/20 custom-scrollbar">
              {messages.map((m, idx) => {
                const isDoc = m.sender === 'doctor';
                return (
                  <div key={idx} className={`flex gap-2 ${isDoc ? 'justify-start' : 'justify-end'}`}>
                    {isDoc && (
                      <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                        isDoc
                          ? 'bg-white dark:bg-emerald-900/40 text-slate-800 dark:text-slate-100 border border-emerald-100 dark:border-emerald-800'
                          : 'bg-emerald-600 text-white font-medium'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Dr. Healora is typing...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Modal Input */}
            <div className="p-3 bg-white dark:bg-emerald-950 border-t border-emerald-100 dark:border-emerald-900/60 flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Dr. Healora..."
                className="flex-1 bg-slate-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={handleSend}
                disabled={!inputMessage.trim() || loading}
                className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl disabled:opacity-40 transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingAIDoctorWidget;

import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Stethoscope,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Key,
  Trash2,
  Plus,
  Bot,
  User as UserIcon,
  AlertTriangle,
  FileText,
  Copy,
  Check,
  RefreshCw,
  ShieldAlert,
  ChevronRight,
  HeartPulse,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  chatWithDoctorApi,
  getAiDoctorStatusApi,
  getDoctorHistoryApi,
  getDoctorSessionApi
} from '../services/api';
import useAuth from '../hooks/useAuth';

const PRESET_QUESTIONS = [
  'What are the common symptoms and causes of this disease?',
  'What home remedies & diet should I follow?',
  'Which doctor specialist should I consult for this condition?',
  'What red flag symptoms mean I should go to emergency room urgently?'
];

const AIDoctorPage = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  // State
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeContext, setActiveContext] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [pastSessions, setPastSessions] = useState([]);
  const [speakingMsgIndex, setSpeakingMsgIndex] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const chatEndRef = useRef(null);

  // Initialize from location state (e.g., coming from PredictionResultPage or DiseaseDetailsPage)
  useEffect(() => {
    if (location.state?.diseaseContext) {
      setActiveContext(location.state.diseaseContext);
    }
  }, [location.state]);

  // Initial welcome message & status check
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchHistory();
    }


    const initialText = location.state?.diseaseContext?.diseaseName
      ? `Hello! I'm Dr. Healora. I see you're inquiring about **${location.state.diseaseContext.diseaseName}** (Symptoms: ${(location.state.diseaseContext.symptoms || []).join(', ')}). How can I assist you with your diagnosis, treatment options, or care plan today?`
      : `Hello! I am Dr. Healora, your virtual AI Clinical Consultant. You can ask me any medical questions regarding diseases, symptoms, OTC remedies, lab test interpretations, or dietary health. How are you feeling today?`;

    setMessages([
      {
        sender: 'doctor',
        text: initialText,
        timestamp: new Date().toISOString()
      }
    ]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const fetchHistory = async () => {
    const historyRes = await getDoctorHistoryApi();
    if (historyRes.success && historyRes.data) {
      setPastSessions(historyRes.data);
    }
  };

  const handleSendMessage = async (textToSend = null) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || loading) return;

    const userMsg = {
      sender: 'user',
      text: query,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    // Format chat history for API payload
    const formattedHistory = messages.map((m) => ({
      sender: m.sender,
      text: m.text
    }));

    const response = await chatWithDoctorApi({
      message: query,
      history: formattedHistory,
      medicalContext: activeContext,
      sessionId
    });

    setLoading(false);

    if (response.sessionId) {
      setSessionId(response.sessionId);
    }

    const doctorMsg = {
      sender: 'doctor',
      text: response.response || 'I apologize, I am experiencing temporary connectivity issues. Please try again.',
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, doctorMsg]);

    if (isAuthenticated && user) {
      fetchHistory();
    }
  };



  const handleSpeech = (text, index) => {
    if ('speechSynthesis' in window) {
      if (speakingMsgIndex === index) {
        window.speechSynthesis.cancel();
        setSpeakingMsgIndex(null);
        return;
      }

      window.speechSynthesis.cancel();
      // Clean markdown tags for speech synthesis
      const cleanText = text.replace(/[*_#`~[\]()]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setSpeakingMsgIndex(null);
      utterance.onerror = () => setSpeakingMsgIndex(null);

      setSpeakingMsgIndex(index);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleMicToggle = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
    };

    recognition.start();
  };

  const handleCopyText = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleLoadSession = async (session) => {
    setLoading(true);
    const sessionData = await getDoctorSessionApi(session._id);
    setLoading(false);

    if (sessionData.success && sessionData.data) {
      setSessionId(session._id);
      setActiveContext(sessionData.data.activeDiseaseContext || null);
      setMessages(sessionData.data.messages);
    }
  };

  const handleNewConsultation = () => {
    setSessionId(null);
    setActiveContext(null);
    setMessages([
      {
        sender: 'doctor',
        text: "Hello! I am Dr. Healora. I've reset our conversation window. How can I assist you with your health today?",
        timestamp: new Date().toISOString()
      }
    ]);
  };

  const renderFormattedText = (text) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      let formattedLine = line;

      if (line.startsWith('🩺') || line.startsWith('💡') || line.startsWith('👨‍⚕️') || line.startsWith('🚨') || line.startsWith('###') || line.startsWith('##')) {
        return (
          <h4 key={idx} className="font-bold text-base md:text-lg text-emerald-900 dark:text-emerald-300 mt-3 mb-1.5 flex items-center gap-2 border-b border-emerald-100 dark:border-emerald-800/40 pb-1">
            {line.replace(/#/g, '').trim()}
          </h4>
        );
      }

      if (line.trim().startsWith('*') || line.trim().startsWith('-')) {
        return (
          <li key={idx} className="ml-4 list-disc text-sm text-slate-700 dark:text-slate-300 my-0.5 leading-relaxed">
            {renderInlineMarkdown(line.trim().substring(1).trim())}
          </li>
        );
      }

      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="text-sm text-slate-700 dark:text-slate-200 my-1 leading-relaxed">
          {renderInlineMarkdown(line)}
        </p>
      );
    });
  };

  const renderInlineMarkdown = (text) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-emerald-950 dark:text-emerald-200">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i} className="italic text-slate-800 dark:text-slate-300">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded text-xs border border-emerald-200 dark:border-emerald-800">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-6 md:p-8 shadow-2xl border border-emerald-700/50">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-200 p-0.5 shadow-lg flex items-center justify-center">
                <div className="w-full h-full bg-emerald-950 rounded-[14px] flex items-center justify-center">
                  <Stethoscope className="w-8 h-8 text-emerald-300" />
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-400 border-2 border-emerald-900 rounded-full animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white dark:text-white">
                  Dr. Healora <span className="text-xs font-semibold px-2.5 py-0.5 bg-emerald-700/80 border border-emerald-400/30 rounded-full text-emerald-200 uppercase tracking-widest">AI M.D.</span>
                </h1>

              </div>
              <p className="text-emerald-100/90 text-sm mt-1 max-w-xl font-medium">
                24/7 Virtual Clinical Consultant powered by Gemini AI. Ask questions about your disease, treatment advice, precautions & lab tests.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={handleNewConsultation}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-bold transition border border-white/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Consult</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Grid: Past Sessions Sidebar + Active Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar: Saved Consultations (Visible on Desktop / Logged-in) */}
        {user && pastSessions.length > 0 && (
          <div className="lg:col-span-1 bg-white/80 dark:bg-emerald-950/40 backdrop-blur-xl rounded-3xl p-4 border border-emerald-100 dark:border-emerald-900/40 shadow-xl space-y-4 flex flex-col max-h-[650px]">
            <div className="flex items-center justify-between px-2 pt-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Past Consultations
              </h3>
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                {pastSessions.length}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {pastSessions.map((session) => {
                const isActive = sessionId === session._id;
                return (
                  <button
                    key={session._id}
                    onClick={() => handleLoadSession(session)}
                    className={`w-full text-left p-3 rounded-2xl transition border flex items-start gap-2.5 cursor-pointer ${
                      isActive
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                        : 'bg-emerald-50/50 dark:bg-emerald-900/20 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/50 border-emerald-100/60 dark:border-emerald-800/40 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <Stethoscope className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isActive ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">{session.title}</p>
                      <p className={`text-[10px] ${isActive ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'}`}>
                        {new Date(session.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Right / Center Chat Room */}
        <div className={`space-y-4 ${user && pastSessions.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
          {/* Active Disease Context Pill */}
          {activeContext && (
            <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-3.5 flex items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-600 text-white rounded-xl">
                  <HeartPulse className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                      Active Medical Context:
                    </span>
                    <span className="text-sm font-extrabold text-emerald-950 dark:text-emerald-100">
                      {activeContext.diseaseName}
                    </span>
                  </div>
                  {activeContext.symptoms && (
                    <p className="text-xs text-emerald-700/80 dark:text-emerald-300 truncate max-w-lg">
                      Symptoms: {activeContext.symptoms.join(', ')}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => setActiveContext(null)}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 dark:bg-rose-950/50 px-2.5 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 transition cursor-pointer"
              >
                Clear Context
              </button>
            </div>
          )}

          {/* Chat Messages Area */}
          <div className="bg-white/80 dark:bg-emerald-950/40 backdrop-blur-xl rounded-3xl border border-emerald-100 dark:border-emerald-900/40 shadow-xl p-4 md:p-6 min-h-[480px] max-h-[580px] flex flex-col justify-between">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {messages.map((msg, index) => {
                const isDoctor = msg.sender === 'doctor';
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${isDoctor ? 'justify-start' : 'justify-end'}`}
                  >
                    {isDoctor && (
                      <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shadow-md flex-shrink-0 mt-1">
                        <Stethoscope className="w-5 h-5" />
                      </div>
                    )}

                    <div className={`max-w-[85%] md:max-w-[78%] rounded-3xl p-4 md:p-5 text-sm shadow-sm relative group ${
                      isDoctor
                        ? 'bg-slate-50 dark:bg-emerald-900/30 text-slate-900 dark:text-slate-100 border border-emerald-100 dark:border-emerald-800/40 rounded-tl-sm'
                        : 'bg-emerald-600 text-white font-medium rounded-tr-sm shadow-md shadow-emerald-600/15'
                    }`}>
                      {isDoctor && (
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-100 dark:border-emerald-800/40 text-xs text-emerald-800 dark:text-emerald-300 font-bold">
                          <span className="flex items-center gap-1.5">
                            <Bot className="w-3.5 h-3.5" /> Dr. Healora M.D.
                          </span>
                          <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition">
                            <button
                              onClick={() => handleSpeech(msg.text, index)}
                              className="p-1 hover:bg-emerald-200/50 dark:hover:bg-emerald-800/60 rounded-lg text-emerald-700 dark:text-emerald-300 transition cursor-pointer"
                              title={speakingMsgIndex === index ? 'Stop audio' : 'Listen to Dr. Healora'}
                            >
                              {speakingMsgIndex === index ? (
                                <VolumeX className="w-4 h-4 text-rose-500 animate-pulse" />
                              ) : (
                                <Volume2 className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() => handleCopyText(msg.text, index)}
                              className="p-1 hover:bg-emerald-200/50 dark:hover:bg-emerald-800/60 rounded-lg text-emerald-700 dark:text-emerald-300 transition cursor-pointer"
                              title="Copy response"
                            >
                              {copiedIndex === index ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="space-y-1">
                        {isDoctor ? renderFormattedText(msg.text) : <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>}
                      </div>

                      <div className={`text-[10px] mt-2 text-right ${isDoctor ? 'text-slate-400 dark:text-slate-400' : 'text-emerald-100'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>

                    {!isDoctor && (
                      <div className="w-9 h-9 rounded-2xl bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                        <UserIcon className="w-5 h-5" />
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 items-center text-emerald-700 dark:text-emerald-300 text-xs font-semibold p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 w-fit">
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                  <span>Dr. Healora is reviewing medical parameters and synthesizing advice...</span>
                </motion.div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            <div className="mt-4 pt-3 border-t border-emerald-100 dark:border-emerald-900/40">
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Suggested Clinical Questions:
              </p>
              <div className="flex flex-wrap gap-2">
                {PRESET_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    disabled={loading}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-800/50 text-emerald-800 dark:text-emerald-200 border border-emerald-200/70 dark:border-emerald-800 transition cursor-pointer disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={handleMicToggle}
                className={`p-3 rounded-2xl border transition cursor-pointer ${
                  isListening
                    ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                    : 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
                }`}
                title={isListening ? 'Stop recording' : 'Speak to Dr. Healora'}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                placeholder="Ask Dr. Healora about diseases, symptoms, precautions, diet..."
                disabled={loading}
                className="flex-1 bg-slate-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || loading}
                className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl border border-emerald-500 transition shadow-lg shadow-emerald-600/20 disabled:opacity-40 cursor-pointer"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDoctorPage;



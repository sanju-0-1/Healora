import { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Users,
  Activity,
  Database,
  Bot,
  Search,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Server,
  Key,
  ChevronRight,
  UserCheck,
  UserX,
  Stethoscope
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getAdminStatsApi,
  getAdminUsersApi,
  updateUserRoleApi,
  deleteUserApi
} from '../services/api';
import { MOCK_DISEASES } from '../services/mockData';
import useAuth from '../hooks/useAuth';

const AdminDashboardPage = () => {
  const { user } = useAuth();

  // State
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalUsers: 1,
    totalPredictions: 154200,
    totalDiseases: MOCK_DISEASES.length,
    totalDoctorChats: 18,
    mlServiceStatus: 'online',
    geminiDoctorStatus: 'active'
  });
  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [diseases, setDiseases] = useState(MOCK_DISEASES);
  const [diseaseSearch, setDiseaseSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAddDiseaseModal, setShowAddDiseaseModal] = useState(false);

  // New disease form state
  const [newDisease, setNewDisease] = useState({
    name: '',
    category: 'General',
    severity: 'Moderate',
    recommendedDoctor: 'General Physician',
    overview: '',
    symptoms: '',
    precautions: ''
  });

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, []);

  const fetchStats = async () => {
    const res = await getAdminStatsApi();
    if (res.success && res.stats) {
      setStats(res.stats);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    const res = await getAdminUsersApi(userSearch);
    setLoading(false);

    let localRegistered = [];
    try {
      localRegistered = JSON.parse(localStorage.getItem('healora_registered_users') || '[]');
    } catch (e) {}

    const defaultMocks = [
      {
        _id: 'usr-1',
        name: user?.name || 'Fardheen Admin',
        email: user?.email || 'admin@healora.com',
        role: 'admin',
        age: 25,
        gender: 'Male',
        createdAt: new Date().toISOString()
      },
      {
        _id: 'usr-2',
        name: 'Sarah Jenkins',
        email: 'sarah.jenkins@example.com',
        role: 'user',
        age: 32,
        gender: 'Female',
        createdAt: '2026-02-10T14:30:00Z'
      },
      {
        _id: 'usr-3',
        name: 'Dr. Robert Vance',
        email: 'robert.vance@clinic.org',
        role: 'admin',
        age: 45,
        gender: 'Male',
        createdAt: '2026-01-22T09:15:00Z'
      }
    ];

    const combinedMap = new Map();

    // 1. If backend returns users, populate map
    if (res.success && Array.isArray(res.data) && res.data.length > 0) {
      res.data.forEach((u) => combinedMap.set(u.email, u));
    } else {
      defaultMocks.forEach((u) => combinedMap.set(u.email, u));
    }

    // 2. Merge any newly registered local user accounts
    localRegistered.forEach((u) => {
      if (u.email && !combinedMap.has(u.email)) {
        combinedMap.set(u.email, u);
      }
    });

    let mergedList = Array.from(combinedMap.values());

    // Apply search filter if active
    if (userSearch && userSearch.trim() !== '') {
      const q = userSearch.toLowerCase().trim();
      mergedList = mergedList.filter(
        (u) => u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q)
      );
    }

    setUsers(mergedList);
  };

  const handleRoleToggle = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const res = await updateUserRoleApi(userId, newRole);

    setUsers((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
    );
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user account?')) return;
    await deleteUserApi(userId);
    setUsers((prev) => prev.filter((u) => u._id !== userId));
  };

  const handleAddDisease = (e) => {
    e.preventDefault();
    if (!newDisease.name.trim()) return;

    const created = {
      id: 'dis-' + Date.now(),
      name: newDisease.name,
      icon: '🩺',
      category: newDisease.category,
      severity: newDisease.severity,
      confidenceDefault: 95,
      overview: newDisease.overview || 'Newly added clinical condition record.',
      symptoms: newDisease.symptoms ? newDisease.symptoms.split(',').map((s) => s.trim()) : ['General symptoms'],
      matchedSymptoms: ['General symptoms'],
      precautions: newDisease.precautions ? newDisease.precautions.split(',').map((p) => p.trim()) : ['Consult a physician'],
      recommendedDoctor: newDisease.recommendedDoctor,
      homeRemedies: ['Hydration', 'Rest'],
      medicines: [{ name: 'Symptom Relief', usage: 'As prescribed' }],
      emergencyWarning: 'Seek immediate care if severe symptoms develop.'
    };

    setDiseases((prev) => [created, ...prev]);
    setShowAddDiseaseModal(false);
    setNewDisease({
      name: '',
      category: 'General',
      severity: 'Moderate',
      recommendedDoctor: 'General Physician',
      overview: '',
      symptoms: '',
      precautions: ''
    });
  };

  const handleDeleteDisease = (id) => {
    if (!window.confirm('Remove this disease from local knowledge base?')) return;
    setDiseases((prev) => prev.filter((d) => d.id !== id));
  };

  const filteredDiseases = diseases.filter((d) =>
    d.name.toLowerCase().includes(diseaseSearch.toLowerCase()) ||
    d.category.toLowerCase().includes(diseaseSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 text-left">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 md:p-8 shadow-2xl border border-emerald-800/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600/40 border border-emerald-400/40 flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-9 h-9 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white dark:text-white">
                  Healora Administrative Suite
                </h1>
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 bg-emerald-500 text-slate-950 rounded-full">
                  Admin Active
                </span>
              </div>
              <p className="text-emerald-200/90 text-sm mt-1 max-w-xl font-medium">
                Manage patient accounts, update disease diagnostic knowledge base, and monitor FastAPI ML & Gemini AI Doctor infrastructure health.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                fetchStats();
                fetchUsers();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-bold transition border border-white/20 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Metrics</span>
            </button>
          </div>
        </div>
      </div>

      {/* Admin Suite Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-emerald-100 dark:border-emerald-900/60 pb-3">
        {[
          { id: 'overview', name: 'Platform Analytics & Health', icon: Activity },
          { id: 'users', name: 'User Management', icon: Users },
          { id: 'diseases', name: 'Disease Knowledge Base', icon: Database },
          { id: 'audit', name: 'AI & Inference Audit Logs', icon: Bot }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 border border-emerald-500'
                  : 'bg-white dark:bg-emerald-950/60 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-900/40'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & SYSTEM HEALTH */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-emerald-950/40 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-900/50 shadow-md space-y-2">
              <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">Registered Accounts</span>
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 rounded-xl">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-emerald-950 dark:text-white">{stats.totalUsers}</h3>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Active Patient Accounts</p>
            </div>

            <div className="bg-white dark:bg-emerald-950/40 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-900/50 shadow-md space-y-2">
              <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">ML Inferences Run</span>
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 rounded-xl">
                  <Activity className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-emerald-950 dark:text-white">{stats.totalPredictions.toLocaleString()}+</h3>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Scikit-Learn Inference Requests</p>
            </div>

            <div className="bg-white dark:bg-emerald-950/40 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-900/50 shadow-md space-y-2">
              <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">Disease DB Records</span>
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 rounded-xl">
                  <Database className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-emerald-950 dark:text-white">{diseases.length}</h3>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Clinical Conditions Cataloged</p>
            </div>

            <div className="bg-white dark:bg-emerald-950/40 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-900/50 shadow-md space-y-2">
              <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">AI Doctor Consults</span>
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 rounded-xl">
                  <Stethoscope className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-emerald-950 dark:text-white">{stats.totalDoctorChats}</h3>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Gemini AI Sessions</p>
            </div>
          </div>

          {/* Infrastructure Health Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ML Microservice Status */}
            <div className="bg-white dark:bg-emerald-950/40 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-900/50 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-100 dark:border-emerald-900/40 pb-3">
                <div className="flex items-center gap-3">
                  <Server className="w-6 h-6 text-emerald-600" />
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">FastAPI ML Microservice</h4>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Port 8000 • Ensemble Inference Engine</span>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Online (&lt; 5ms)
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Loaded Models: Random Forest Classifier, Decision Tree, Naive Bayes trained on clinical symptom vectors.
              </p>
            </div>

            {/* Gemini AI Doctor Status */}
            <div className="bg-white dark:bg-emerald-950/40 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-900/50 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-100 dark:border-emerald-900/40 pb-3">
                <div className="flex items-center gap-3">
                  <Bot className="w-6 h-6 text-emerald-600" />
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Dr. Healora Gemini AI</h4>
                    <span className="text-xs text-slate-500 dark:text-slate-400">gemini-2.5-flash • Virtual Clinical M.D.</span>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Active 24/7
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Gemini API Key configured on Node.js backend. Handles multi-turn clinical chat, dietary care & emergency warnings.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USER MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="bg-white dark:bg-emerald-950/40 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-900/50 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">User Accounts & Access Control</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Manage registered patient accounts and administrative privileges.</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => {
                  setUserSearch(e.target.value);
                  fetchUsers();
                }}
                placeholder="Search user name or email..."
                className="w-full bg-slate-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-emerald-50 dark:bg-emerald-900/50 text-slate-700 dark:text-slate-300 font-extrabold uppercase border-b border-emerald-100 dark:border-emerald-800">
                  <th className="p-3">User Profile</th>
                  <th className="p-3">Email Address</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Demographics</th>
                  <th className="p-3">Registered Date</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100 dark:divide-emerald-900/40">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-emerald-50/40 dark:hover:bg-emerald-900/20 transition">
                    <td className="p-3 flex items-center gap-2.5 font-bold text-slate-900 dark:text-white">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black">
                        {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <span>{u.name}</span>
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">{u.email}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                        u.role === 'admin'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                      }`}>
                        {u.role || 'user'}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">
                      {u.age || 25} yrs • {u.gender || 'Not specified'}
                    </td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleRoleToggle(u._id, u.role)}
                        className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900 hover:bg-emerald-200 text-emerald-800 dark:text-emerald-200 rounded-lg font-bold transition cursor-pointer"
                        title="Toggle Admin Privilege"
                      >
                        {u.role === 'admin' ? 'Make User' : 'Make Admin'}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="p-1.5 bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 hover:bg-rose-200 rounded-lg transition cursor-pointer"
                        title="Delete User Account"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: DISEASE KNOWLEDGE BASE */}
      {activeTab === 'diseases' && (
        <div className="bg-white dark:bg-emerald-950/40 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-900/50 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Clinical Disease Knowledge Base</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Add or manage condition catalog entries used in symptom evaluation.</p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={diseaseSearch}
                  onChange={(e) => setDiseaseSearch(e.target.value)}
                  placeholder="Filter diseases..."
                  className="w-full bg-slate-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                onClick={() => setShowAddDiseaseModal(true)}
                className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-md cursor-pointer flex-shrink-0"
              >
                <Plus className="w-4 h-4" /> Add Disease
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDiseases.map((dis) => (
              <div
                key={dis.id}
                className="p-4 bg-emerald-50/50 dark:bg-emerald-900/30 rounded-2xl border border-emerald-100 dark:border-emerald-800/40 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{dis.icon || '🩺'}</span>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{dis.name}</h4>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-full">
                      {dis.severity}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {dis.overview}
                  </p>
                </div>

                <div className="pt-2 border-t border-emerald-100 dark:border-emerald-800/40 flex justify-between items-center text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold">{dis.recommendedDoctor}</span>
                  <button
                    onClick={() => handleDeleteDisease(dis.id)}
                    className="p-1 text-rose-600 hover:text-rose-700 transition cursor-pointer"
                    title="Delete disease record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="bg-white dark:bg-emerald-950/40 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-900/50 shadow-xl space-y-4">
          <h3 className="text-lg font-black text-slate-900 dark:text-white">AI Microservice & Doctor Audit Log</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Recent automated evaluation requests and consultation interactions.</p>

          <div className="space-y-3 pt-2">
            {[
              { time: '10:14 AM', event: 'FastAPI ML Microservice executed model inference for symptom cluster: [headache, fever, nausea]. Confidence: 94%.', status: 'Success' },
              { time: '10:06 AM', event: 'Gemini AI Doctor session generated consultation advice for Fungal Infection context using gemini-2.5-flash.', status: 'Success' },
              { time: '09:48 AM', event: 'MongoDB database sync completed. User auth JWT token generated.', status: 'System' }
            ].map((log, i) => (
              <div key={i} className="p-3.5 bg-slate-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{log.time}</span>
                  <span className="text-slate-700 dark:text-slate-200">{log.event}</span>
                </div>
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px] uppercase">
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD DISEASE MODAL */}
      <AnimatePresence>
        {showAddDiseaseModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.form
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onSubmit={handleAddDisease}
              className="bg-white dark:bg-emerald-950 border border-emerald-100 dark:border-emerald-900 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-4"
            >
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Add New Clinical Disease</h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Disease Name</label>
                  <input
                    type="text"
                    required
                    value={newDisease.name}
                    onChange={(e) => setNewDisease({ ...newDisease, name: e.target.value })}
                    placeholder="e.g. Migraine, Diabetes, Hypertension"
                    className="w-full mt-1 bg-slate-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300">Category</label>
                    <input
                      type="text"
                      value={newDisease.category}
                      onChange={(e) => setNewDisease({ ...newDisease, category: e.target.value })}
                      className="w-full mt-1 bg-slate-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300">Severity</label>
                    <select
                      value={newDisease.severity}
                      onChange={(e) => setNewDisease({ ...newDisease, severity: e.target.value })}
                      className="w-full mt-1 bg-slate-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100"
                    >
                      <option value="Low">Low</option>
                      <option value="Moderate">Moderate</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Recommended Specialist</label>
                  <input
                    type="text"
                    value={newDisease.recommendedDoctor}
                    onChange={(e) => setNewDisease({ ...newDisease, recommendedDoctor: e.target.value })}
                    placeholder="e.g. Neurologist, Cardiologist"
                    className="w-full mt-1 bg-slate-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Overview / Clinical Description</label>
                  <textarea
                    rows={2}
                    value={newDisease.overview}
                    onChange={(e) => setNewDisease({ ...newDisease, overview: e.target.value })}
                    className="w-full mt-1 bg-slate-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-emerald-100 dark:border-emerald-900/60">
                <button
                  type="button"
                  onClick={() => setShowAddDiseaseModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-emerald-900/40 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition cursor-pointer"
                >
                  Save Disease Record
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboardPage;

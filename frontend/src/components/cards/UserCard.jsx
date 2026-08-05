import { useState, useRef } from 'react';
import { Camera, Mail, Calendar, Shield, Upload, Check, Image as ImageIcon } from 'lucide-react';
import Badge from '../ui/Badge';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import useAuth from '../../hooks/useAuth';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200'
];

const UserCard = ({ user }) => {
  const { updateUserProfile } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || AVATAR_PRESETS[0]);
  const [customUrl, setCustomUrl] = useState('');
  const fileInputRef = useRef(null);

  if (!user) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAvatar = () => {
    const finalAvatar = customUrl.trim() ? customUrl : selectedAvatar;
    updateUserProfile({ avatar: finalAvatar });
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center gap-4">
          {/* Avatar Image with Hover Camera Overlay */}
          <div className="relative group cursor-pointer" onClick={() => setIsModalOpen(true)}>
            <img
              src={user.avatar || AVATAR_PRESETS[0]}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 shadow-sm transition duration-200 group-hover:opacity-80"
            />
            <div className="absolute inset-0 bg-slate-900/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
              className="absolute -bottom-1 -right-1 p-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition"
              title="Change Profile Picture"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{user.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
              <Mail className="w-3.5 h-3.5" />
              {user.email}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="success" size="sm">
                Patient Verified
              </Badge>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Change Photo
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>Age: <strong>{user.age || 28} Yrs</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Shield className="w-4 h-4 text-teal-500" />
            <span>Gender: <strong>{user.gender || 'Male'}</strong></span>
          </div>
        </div>
      </div>

      {/* Avatar Changer Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Change Profile Picture">
        <div className="space-y-6 text-left">
          {/* Active Preview */}
          <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
            <img
              src={customUrl.trim() ? customUrl : selectedAvatar}
              alt="Avatar Preview"
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-md"
            />
            <span className="text-xs font-semibold text-slate-500">Live Preview</span>
          </div>

          {/* Option 1: File Upload */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Option 1: Upload from Computer</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <Button
              variant="outline"
              fullWidth
              icon={Upload}
              onClick={() => fileInputRef.current?.click()}
            >
              Choose Image File (JPEG, PNG, WebP)
            </Button>
          </div>

          {/* Option 2: Choose Preset */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Option 2: Select Avatar Preset</label>
            <div className="grid grid-cols-6 gap-2">
              {AVATAR_PRESETS.map((preset, idx) => {
                const isSelected = selectedAvatar === preset && !customUrl;
                return (
                  <div
                    key={idx}
                    onClick={() => { setSelectedAvatar(preset); setCustomUrl(''); }}
                    className={`relative rounded-full cursor-pointer overflow-hidden border-2 transition ${
                      isSelected ? 'border-blue-600 scale-105 shadow-md' : 'border-transparent hover:opacity-80'
                    }`}
                  >
                    <img src={preset} alt={`Preset ${idx + 1}`} className="w-10 h-10 rounded-full object-cover" />
                    {isSelected && (
                      <div className="absolute inset-0 bg-blue-600/40 flex items-center justify-center text-white">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Option 3: Image URL */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Option 3: Image Web URL</label>
            <div className="relative">
              <input
                type="text"
                placeholder="https://example.com/my-photo.jpg"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveAvatar}>
              Save Profile Picture
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserCard;

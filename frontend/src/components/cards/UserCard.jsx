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
      <div className="p-6 bg-white dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/60 rounded-3xl shadow-sm space-y-4">
        <div className="flex items-center gap-4">
          {/* Avatar Image with Hover Camera Overlay */}
          <div className="relative group cursor-pointer" onClick={() => setIsModalOpen(true)}>
            <img
              src={user.avatar || AVATAR_PRESETS[0]}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-emerald-600 shadow-md transition duration-200 group-hover:opacity-80"
            />
            <div className="absolute inset-0 bg-emerald-950/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
              className="absolute -bottom-1 -right-1 p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-md transition cursor-pointer"
              title="Change Profile Photo"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <h3 className="text-lg font-black text-emerald-950 dark:text-white">{user.name}</h3>
            <p className="text-xs font-semibold text-emerald-800/80 dark:text-emerald-300 flex items-center gap-1.5 mt-0.5">
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              {user.email}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="success" size="sm">
                Patient Verified
              </Badge>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
              >
                Change Photo
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-emerald-100 dark:border-emerald-900/60 text-xs font-semibold text-emerald-900 dark:text-emerald-200">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>Age: <strong>{user.age || 28} Yrs</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Gender: <strong>{user.gender || 'Male'}</strong></span>
          </div>
        </div>
      </div>

      {/* Avatar Changer Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Update Profile Picture">
        <div className="space-y-6 text-left">
          {/* Active Preview */}
          <div className="flex flex-col items-center justify-center p-5 bg-emerald-50/50 dark:bg-emerald-900/40 rounded-2xl border border-emerald-100 dark:border-emerald-900/60 space-y-3">
            <img
              src={customUrl.trim() ? customUrl : selectedAvatar}
              alt="Avatar Preview"
              className="w-24 h-24 rounded-full object-cover border-4 border-emerald-600 shadow-md"
            />
            <span className="text-xs font-extrabold text-emerald-950 dark:text-white">Live Avatar Preview</span>
          </div>

          {/* Option 1: File Upload */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-emerald-950 dark:text-emerald-200">
              Option 1: Upload Image File
            </label>
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
              className="font-bold"
            >
              Choose Image File (JPEG, PNG, WebP)
            </Button>
          </div>

          {/* Option 2: Choose Preset */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-emerald-950 dark:text-emerald-200">
              Option 2: Select Preset Avatar
            </label>
            <div className="grid grid-cols-6 gap-2">
              {AVATAR_PRESETS.map((preset, idx) => {
                const isSelected = selectedAvatar === preset && !customUrl;
                return (
                  <div
                    key={idx}
                    onClick={() => { setSelectedAvatar(preset); setCustomUrl(''); }}
                    className={`relative rounded-full cursor-pointer overflow-hidden border-2 transition ${
                      isSelected ? 'border-emerald-600 scale-105 shadow-md' : 'border-transparent hover:opacity-80'
                    }`}
                  >
                    <img src={preset} alt={`Preset ${idx + 1}`} className="w-10 h-10 rounded-full object-cover" />
                    {isSelected && (
                      <div className="absolute inset-0 bg-emerald-600/50 flex items-center justify-center text-white">
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
            <label className="block text-xs font-black uppercase tracking-wider text-emerald-950 dark:text-emerald-200">
              Option 3: Web Image URL
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="https://example.com/my-photo.jpg"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-white rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <ImageIcon className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-emerald-100 dark:border-emerald-900/60 flex justify-end gap-3">
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveAvatar} className="font-bold">
              Save Photo
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserCard;

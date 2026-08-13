import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock, Camera, Image as ImageIcon, ShieldCheck } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import UserCard from '../components/cards/UserCard';
import ToastNotification from '../components/ui/ToastNotification';
import useAuth from '../hooks/useAuth';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile, logout } = useAuth();
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const { register: regProfile, handleSubmit: handleSubmitProfile } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      age: user?.age || 28,
      gender: user?.gender || 'Male',
      avatar: user?.avatar || ''
    }
  });

  const { register: regPass, handleSubmit: handleSubmitPass, reset: resetPass } = useForm();

  const onUpdateProfile = (data) => {
    updateUserProfile(data);
    setToastMessage('Profile details updated successfully!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const onChangePassword = () => {
    resetPass();
    setToastMessage('Password changed successfully!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto pb-16">
      <div className="space-y-1">
        <h1 className="text-3xl sm:text-4xl font-black text-emerald-950 dark:text-white flex items-center gap-3">
          <User className="w-8 h-8 text-emerald-600" />
          Patient Settings & Profile
        </h1>
        <p className="text-sm font-medium text-emerald-800/80 dark:text-emerald-300">
          Manage your personal information, profile photo, and security credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <UserCard user={user} />
        </div>

        <div className="md:col-span-2 space-y-6">
          {/* Edit Profile Form */}
          <div className="p-6 bg-white dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/60 rounded-3xl shadow-sm space-y-4">
            <h3 className="font-black text-emerald-950 dark:text-white text-base">Edit Personal Information</h3>

            <form onSubmit={handleSubmitProfile(onUpdateProfile)} className="space-y-4">
              <Input label="Full Name" icon={User} {...regProfile('name')} />
              <Input label="Email Address" icon={Mail} {...regProfile('email')} />
              <Input label="Profile Avatar URL" icon={ImageIcon} placeholder="https://..." {...regProfile('avatar')} />

              <div className="grid grid-cols-2 gap-4">
                <Input label="Age" type="number" {...regProfile('age')} />
                <div className="space-y-1.5">
                  <label className="block text-xs font-extrabold text-emerald-950 dark:text-emerald-200 uppercase tracking-wider">Gender</label>
                  <select
                    {...regProfile('gender')}
                    className="w-full px-4 py-2.5 bg-white dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-white rounded-2xl text-xs font-bold focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" variant="primary" size="md" className="font-black healora-glow">
                  Save Profile Changes
                </Button>
              </div>
            </form>
          </div>

          {/* Change Password Form */}
          <div className="p-6 bg-white dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/60 rounded-3xl shadow-sm space-y-4">
            <h3 className="font-black text-emerald-950 dark:text-white text-base">Security & Password</h3>

            <form onSubmit={handleSubmitPass(onChangePassword)} className="space-y-4">
              <Input label="Current Password" type="password" icon={Lock} placeholder="••••••••" {...regPass('currentPass', { required: true })} />
              <Input label="New Password" type="password" icon={Lock} placeholder="••••••••" {...regPass('newPass', { required: true })} />

              <div className="flex justify-end pt-2">
                <Button type="submit" variant="outline" size="md" className="font-bold">
                  Update Password
                </Button>
              </div>
            </form>
          </div>

          <div className="p-6 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-2xl flex justify-between items-center">
            <div>
              <h4 className="font-bold text-rose-800 dark:text-rose-300 text-sm">Account Session</h4>
              <p className="text-xs text-rose-600 dark:text-rose-400">Sign out of your active session on this device.</p>
            </div>
            <Button variant="danger" size="sm" onClick={() => { logout(); navigate('/'); }}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <ToastNotification message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
};

export default UserProfilePage;

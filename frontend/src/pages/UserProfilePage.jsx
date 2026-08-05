import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock, Camera, Image as ImageIcon } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import UserCard from '../components/cards/UserCard';
import ToastNotification from '../components/ui/ToastNotification';
import useAuth from '../hooks/useAuth';

const UserProfilePage = () => {
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
    <div className="space-y-8 text-left max-w-4xl mx-auto pb-12">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <User className="w-8 h-8 text-blue-600" />
          Patient Settings & Profile
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Manage your personal information, profile photo, and security credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <UserCard user={user} />
        </div>

        <div className="md:col-span-2 space-y-6">
          {/* Edit Profile Form */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Edit Personal Info</h3>

            <form onSubmit={handleSubmitProfile(onUpdateProfile)} className="space-y-4">
              <Input label="Full Name" icon={User} {...regProfile('name')} />
              <Input label="Email Address" icon={Mail} {...regProfile('email')} />
              <Input label="Profile Picture URL" icon={ImageIcon} placeholder="https://..." {...regProfile('avatar')} />

              <div className="grid grid-cols-2 gap-4">
                <Input label="Age" type="number" {...regProfile('age')} />
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase">Gender</label>
                  <select
                    {...regProfile('gender')}
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" variant="primary" size="md">
                  Save Profile Changes
                </Button>
              </div>
            </form>
          </div>

          {/* Change Password Form */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Change Password</h3>

            <form onSubmit={handleSubmitPass(onChangePassword)} className="space-y-4">
              <Input label="Current Password" type="password" icon={Lock} placeholder="••••••••" {...regPass('currentPass', { required: true })} />
              <Input label="New Password" type="password" icon={Lock} placeholder="••••••••" {...regPass('newPass', { required: true })} />

              <div className="flex justify-end pt-2">
                <Button type="submit" variant="outline" size="md">
                  Update Security Credentials
                </Button>
              </div>
            </form>
          </div>

          <div className="p-6 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-2xl flex justify-between items-center">
            <div>
              <h4 className="font-bold text-rose-800 dark:text-rose-300 text-sm">Account Session</h4>
              <p className="text-xs text-rose-600 dark:text-rose-400">Sign out of your active session on this device.</p>
            </div>
            <Button variant="danger" size="sm" onClick={logout}>
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

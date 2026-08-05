import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, User, Phone, MapPin, Send, MessageSquare, AlertCircle } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ToastNotification from '../components/ui/ToastNotification';
import AlertBox from '../components/ui/AlertBox';

const ContactPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [showToast, setShowToast] = useState(false);

  const onSubmit = () => {
    reset();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto pb-12">
      <div className="space-y-2 text-center max-w-xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Contact & Emergency Support</h1>
        <p className="text-xs text-slate-500">Have questions about Healora AI or need assistance? Reach out to our team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="md:col-span-2 p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl space-y-6">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" /> Send Us a Message
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Your Name"
                icon={User}
                placeholder="John Doe"
                error={errors.name?.message}
                {...register('name', { required: 'Name is required' })}
              />
              <Input
                label="Email Address"
                icon={Mail}
                type="email"
                placeholder="name@example.com"
                error={errors.email?.message}
                {...register('email', { required: 'Email is required' })}
              />
            </div>

            <Input
              label="Subject"
              placeholder="Question regarding prediction report"
              error={errors.subject?.message}
              {...register('subject', { required: 'Subject is required' })}
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase">Message</label>
              <textarea
                rows={4}
                placeholder="How can we assist you?"
                className="w-full p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                {...register('message', { required: 'Message cannot be empty' })}
              />
              {errors.message && <p className="text-xs text-rose-500">{errors.message.message}</p>}
            </div>

            <Button type="submit" variant="primary" fullWidth size="lg" icon={Send}>
              Send Inquiry
            </Button>
          </form>
        </div>

        {/* Contact Info Sidebar */}
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Direct Channels</h4>
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/50 text-blue-600 rounded-lg">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-semibold text-slate-900 dark:text-white">Email Support</span>
                  <span>support@healora.ai</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-50 dark:bg-teal-950/50 text-teal-600 rounded-lg">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-semibold text-slate-900 dark:text-white">Toll-Free Helpline</span>
                  <span>+1 (800) 555-HEAL</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 dark:bg-purple-950/50 text-purple-600 rounded-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-semibold text-slate-900 dark:text-white">Headquarters</span>
                  <span>Silicon Valley Medical AI Hub, CA</span>
                </div>
              </div>
            </div>
          </div>

          <AlertBox
            type="danger"
            title="Emergency Care"
            message="If experiencing life-threatening symptoms, dial 911 or visit the emergency department immediately."
          />
        </div>
      </div>

      <ToastNotification message="Your message has been sent successfully!" isVisible={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
};

export default ContactPage;

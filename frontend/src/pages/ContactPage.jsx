import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, User, Phone, MapPin, Send, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';
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
    <div className="space-y-8 text-left max-w-4xl mx-auto pb-16">
      <div className="space-y-2 text-center max-w-xl mx-auto">
        <span className="px-4 py-1.5 bg-[#F5FBF7] dark:bg-[#063D30] text-[#1A6B4F] dark:text-[#4ECCA3] text-xs font-black rounded-full border border-[#D4E8DD] dark:border-[#13523D]">
          24/7 Clinical AI Support
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1A6B4F] dark:text-[#FFFFFF] font-heading">
          Contact Healora AI Team
        </h1>
        <p className="text-xs font-semibold text-[#1A2E2A]/80 dark:text-[#F5FBF7]/80">
          Questions regarding your symptom analysis, account management, or technical platform assistance? Reach out to us anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="md:col-span-2 p-8 bg-[#FFFFFF] dark:bg-[#063D30] border border-[#D4E8DD] dark:border-[#13523D] rounded-3xl shadow-xl healer-aura-glow space-y-6">
          <h3 className="font-black text-[#1A6B4F] dark:text-[#FFFFFF] text-lg flex items-center gap-2.5 font-heading">
            <MessageSquare className="w-5 h-5 text-[#4ECCA3]" /> Send Us a Message
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Your Full Name"
                icon={User}
                placeholder="Dr. Sarah Jenkins"
                error={errors.name?.message}
                {...register('name', { required: 'Name is required' })}
              />
              <Input
                label="Email Address"
                icon={Mail}
                type="email"
                placeholder="sarah@example.com"
                error={errors.email?.message}
                {...register('email', { required: 'Email is required' })}
              />
            </div>

            <Input
              label="Inquiry Subject"
              placeholder="Question regarding diagnostic model prediction accuracy..."
              error={errors.subject?.message}
              {...register('subject', { required: 'Subject is required' })}
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-black text-[#1A6B4F] dark:text-[#4ECCA3] uppercase tracking-wider">
                Detailed Message
              </label>
              <textarea
                rows={4}
                placeholder="How can our clinical AI team assist you today?"
                className="w-full p-4 bg-[#FFFFFF] dark:bg-[#042E24] border border-[#D4E8DD] dark:border-[#13523D] text-[#1A2E2A] dark:text-[#F5FBF7] placeholder-[#1A6B4F]/40 dark:placeholder-[#4ECCA3]/40 rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-[#4ECCA3] focus:outline-none"
                {...register('message', { required: 'Message cannot be empty' })}
              />
              {errors.message && <p className="text-xs text-rose-500 font-bold">{errors.message.message}</p>}
            </div>

            <Button type="submit" variant="primary" fullWidth size="lg" icon={Send} className="healer-gold-btn font-black">
              Transmit Inquiry
            </Button>
          </form>
        </div>

        {/* Contact Info Sidebar */}
        <div className="space-y-6">
          <div className="p-6 bg-[#FFFFFF] dark:bg-[#063D30] border border-[#D4E8DD] dark:border-[#13523D] rounded-3xl shadow-sm space-y-5">
            <h4 className="font-black text-[#1A6B4F] dark:text-[#FFFFFF] text-base font-heading">Direct Channels</h4>
            <div className="space-y-4 text-xs font-semibold text-[#1A2E2A] dark:text-[#F5FBF7]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#F5FBF7] dark:bg-[#042E24] text-[#1A6B4F] dark:text-[#4ECCA3] rounded-xl border border-[#D4E8DD]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-black text-[#1A6B4F] dark:text-[#FFFFFF]">Email Support</span>
                  <span>care@healora.ai</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#F5FBF7] dark:bg-[#042E24] text-[#1A6B4F] dark:text-[#4ECCA3] rounded-xl border border-[#D4E8DD]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-black text-[#1A6B4F] dark:text-[#FFFFFF]">Toll-Free Helpline</span>
                  <span>+1 (800) 432-HEAL</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#F5FBF7] dark:bg-[#042E24] text-[#1A6B4F] dark:text-[#4ECCA3] rounded-xl border border-[#D4E8DD]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-black text-[#1A6B4F] dark:text-[#FFFFFF]">AI Research Labs</span>
                  <span>Medical AI Campus, CA</span>
                </div>
              </div>
            </div>
          </div>

          <AlertBox
            type="info"
            title="Emergency Notice"
            message="For life-threatening emergencies, please dial 911 or visit your nearest emergency room immediately."
          />
        </div>
      </div>

      {showToast && (
        <ToastNotification
          title="Message Sent Successfully"
          message="Our clinical team will reply to your inquiry within 24 hours."
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default ContactPage;


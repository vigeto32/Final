import { useState, FormEvent } from 'react';
import { Mail, Send, User, MessageSquare } from 'lucide-react';

interface ContactSectionProps {
  heading: string;
  description: string;
}

export default function ContactSection({ heading, description }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    await new Promise(resolve => setTimeout(resolve, 1500));

    setSubmitStatus('success');
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setSubmitStatus('idle'), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 font-orbitron mb-4 inline-block">
            {heading}
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg font-exo">{description}</p>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 rounded-lg opacity-30 blur"></div>

          <form onSubmit={handleSubmit} className="relative bg-gray-900 border border-cyan-500/30 rounded-lg p-8 space-y-6">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500"></div>

            <div className="space-y-2">
              <label htmlFor="name" className="block text-cyan-400 font-mono text-sm mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 font-mono"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-cyan-400 font-mono text-sm mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 font-mono"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-cyan-400 font-mono text-sm mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full bg-gray-800 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none font-mono"
                placeholder="Your message here..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full group relative px-8 py-4 bg-transparent border-2 border-cyan-500 text-cyan-400 font-bold text-lg rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] disabled:opacity-50 disabled:cursor-not-allowed font-exo tracking-wide"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>

            {submitStatus === 'success' && (
              <div className="p-4 bg-green-500/10 border border-green-500 rounded-lg text-green-400 font-mono text-sm text-center animate-pulse">
                Message sent successfully!
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-400 font-mono text-sm text-center">
                Failed to send message. Please try again.
              </div>
            )}

            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500"></div>
          </form>
        </div>

        <div className="mt-12 text-center">
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="px-6 py-3 bg-gray-900 border border-cyan-500/30 rounded-lg hover:border-cyan-500 transition-all duration-300 cursor-default">
              <div className="text-xs text-gray-500 font-mono mb-1">EMAIL</div>
              <div className="text-cyan-400 font-mono">ryan.co@example.com</div>
            </div>
            <div className="px-6 py-3 bg-gray-900 border border-cyan-500/30 rounded-lg hover:border-cyan-500 transition-all duration-300 cursor-default">
              <div className="text-xs text-gray-500 font-mono mb-1">LOCATION</div>
              <div className="text-cyan-400 font-mono">Philippines</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-20 right-20 w-48 h-48 border border-green-500/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 border border-cyan-500/20 rotate-45 animate-spin-slow"></div>
    </section>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Loader, MessageSquare, Code } from 'lucide-react';
import api from '../config/api';
import Button from '../components/Button';
import SEO from '../components/SEO';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/contact', formData);
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: '1si23is081@sit.ac.in',
      href: 'mailto:1si23is081@sit.ac.in',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '7644****67',
      href: 'tel:+917644031967',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Tumakuru, Karnataka',
      href: null,
    },
  ];

  return (
    <>
      <SEO 
        title="Contact - Full-Stack Developer Portfolio"
        description="Get in touch with me for collaboration opportunities, project inquiries, or just to say hello."
      />
      
      <div className="min-h-screen pt-20 pb-16 bg-[#0a0a0f] relative overflow-hidden">
        {/* Code Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03] font-mono text-xs">
          <div className="absolute top-20 left-10 text-blue-500/10">function sendMessage() {'{'}</div>
          <div className="absolute top-32 left-14 text-blue-500/10">return &lt;Form /&gt;</div>
          <div className="absolute top-44 left-10 text-blue-500/10">{'}'}</div>
        </div>

        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        {/* Subtle Orbs */}
        <div className="absolute inset-0 z-0 opacity-15">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 35, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -35, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <MessageSquare className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              <span className="text-blue-400 font-mono">(</span>
              <span className="text-white">Let's Connect</span>
              <span className="text-blue-400 font-mono">)</span>
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mt-6 font-mono">
              <span className="text-blue-400">//</span> Send me a message
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <Code className="w-5 h-5 text-blue-400" />
                <h2 className="text-2xl font-bold text-white font-mono">contactForm()</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                    <span className="text-blue-400">const</span> name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all font-mono"
                    placeholder='""'
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                    <span className="text-blue-400">const</span> email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all font-mono"
                    placeholder='""'
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                    <span className="text-gray-500">//</span> subject (optional)
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all font-mono"
                    placeholder='""'
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                    <span className="text-blue-400">const</span> message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all resize-none font-mono"
                    placeholder='""'
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold transition-all shadow-lg shadow-purple-500/30 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-mono"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      sendMessage()
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Code className="w-5 h-5 text-purple-400" />
                  <h2 className="text-2xl font-bold text-white font-mono">contactInfo</h2>
                </div>
                <p className="text-gray-300 mb-8">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    const Content = info.href ? (
                      <a
                        href={info.href}
                        className="group block bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-purple-500/50 transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                            <Icon className="w-6 h-6 text-purple-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-blue-400 font-mono text-sm">const</span>
                              <h3 className="text-lg font-semibold text-white font-mono">{info.title.toLowerCase()}</h3>
                              <span className="text-blue-400 font-mono text-sm">=</span>
                            </div>
                            <p className="text-gray-300 group-hover:text-purple-300 transition-colors font-mono text-sm">
                              "{info.value}"
                            </p>
                          </div>
                        </div>
                      </a>
                    ) : (
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-purple-500/20 rounded-lg">
                            <Icon className="w-6 h-6 text-purple-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-blue-400 font-mono text-sm">const</span>
                              <h3 className="text-lg font-semibold text-white font-mono">{info.title.toLowerCase()}</h3>
                              <span className="text-blue-400 font-mono text-sm">=</span>
                            </div>
                            <p className="text-gray-300 font-mono text-sm">"{info.value}"</p>
                          </div>
                        </div>
                      </div>
                    );

                    return (
                      <motion.div
                        key={info.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        {Content}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <p className="text-sm text-gray-400 leading-relaxed font-mono">
                  <span className="text-blue-400">//</span> Quick Response Time<br />
                  <span className="text-blue-400">//</span> Available for collaborations<br />
                  <span className="text-blue-400">//</span> Always open to new opportunities
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Trophy, Calendar, MapPin, Loader, Code } from 'lucide-react';
import api from '../config/api';
import SEO from '../components/SEO';
import toast from 'react-hot-toast';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await api.get('/experiences');
      setExperiences(response.data.data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      toast.error('Failed to load experiences');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'all', label: 'All', icon: Briefcase },
    { id: 'work', label: 'Work', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certification', label: 'Certifications', icon: Award },
    { id: 'hackathon', label: 'Hackathons', icon: Trophy },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'work':
        return Briefcase;
      case 'education':
        return GraduationCap;
      case 'certification':
        return Award;
      case 'hackathon':
        return Trophy;
      default:
        return Briefcase;
    }
  };

  const filteredExperiences = activeTab === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.type === activeTab);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <Loader className="w-12 h-12 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Experience - Full-Stack Developer Portfolio"
        description="My professional experience, education, certifications, and achievements in web development."
      />
      
      <div className="min-h-screen pt-20 pb-16 bg-[#0a0a0f] relative overflow-hidden">
        {/* Code Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03] font-mono text-xs">
          <div className="absolute top-20 left-10 text-blue-500/10">const timeline = []</div>
          <div className="absolute top-32 left-14 text-blue-500/10">timeline.push(...)</div>
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
              x: [0, 40, 0],
              y: [0, -25, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -40, 0],
              y: [0, 35, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Code className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              <span className="text-blue-400 font-mono">{'{'}</span>
              <span className="text-white">Experience</span>
              <span className="text-blue-400 font-mono">{'}'}</span>
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto rounded-full"></div>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all border font-mono text-sm ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 border-blue-500/50'
                    : 'bg-gray-900/50 text-gray-300 hover:bg-gray-800/50 border-gray-800 hover:border-blue-500/40'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Timeline */}
          {filteredExperiences.length === 0 ? (
            <div className="text-center py-20 bg-gray-900/50 border border-gray-800 rounded-xl">
              <Code className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg font-mono">
                <span className="text-gray-600">//</span> No experiences available yet
              </p>
            </div>
          ) : (
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 hidden md:block"></div>

              <div className="space-y-6">
                {filteredExperiences.map((exp, index) => {
                  const Icon = getIcon(exp.type);
                  return (
                    <motion.div
                      key={exp._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-6 top-8 w-4 h-4 bg-blue-400 rounded-full border-4 border-[#0a0a0f] hidden md:block shadow-lg shadow-blue-500/50"></div>

                      {/* Content Card */}
                      <div className="md:ml-20 bg-gray-900/50 border border-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-blue-500/30 transition-all">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                            <Icon className="w-6 h-6 text-blue-400" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                              <div>
                                <h3 className="text-xl font-bold text-white font-mono">
                                  {exp.title}
                                </h3>
                                <p className="text-blue-400 font-medium font-mono text-sm">
                                  <span className="text-gray-600">//</span> {exp.organization}
                                </p>
                              </div>
                              <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-full text-sm font-medium capitalize font-mono">
                                {exp.type}
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-3 font-mono">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4 text-blue-400" />
                                {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                              </div>
                              {exp.location && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4 text-blue-400" />
                                  {exp.location}
                                </div>
                              )}
                            </div>

                            {exp.description && (
                              <p className="text-gray-300 mb-3">
                                {exp.description}
                              </p>
                            )}

                            {exp.skills && exp.skills.length > 0 && (
                              <div className="mb-3">
                                <p className="text-xs text-gray-500 font-mono mb-2">
                                  <span className="text-blue-400">const</span> skills = [
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {exp.skills.map((skill, idx) => (
                                    <span
                                      key={idx}
                                      className="px-3 py-1 text-xs bg-gray-800/50 border border-gray-700 text-gray-300 rounded-lg font-mono"
                                    >
                                      "{skill}"
                                    </span>
                                  ))}
                                </div>
                                <p className="text-xs text-gray-500 font-mono mt-2">];</p>
                              </div>
                            )}

                            {exp.certificateUrl && (
                              <div className="mt-4">
                                <a
                                  href={exp.certificateUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/30 font-mono text-sm"
                                >
                                  <Trophy className="w-4 h-4" />
                                  View Certificate
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Experience;

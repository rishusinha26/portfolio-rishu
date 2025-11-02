import { motion } from 'framer-motion';
import { Download, Code, Database, Cloud, Palette, Music, Gamepad2, BookOpen, Award, TrendingUp, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import Button from '../components/Button';
import SEO from '../components/SEO';
import ResumePDF from '../components/ResumePDF';
import { resumeData } from '../data/resumeData';

const About = () => {
  const skills = [
    {
      category: 'Frontend',
      icon: Code,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      items: ['HTML', 'CSS', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux'],
    },
    {
      category: 'Backend',
      icon: Database,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      items: ['Python', 'Node.js', 'Express', 'MongoDB'],
    },
    {
      category: 'Cloud & Tools',
      icon: Cloud,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      items: ['Firebase', 'Git', 'Vercel'],
    },
    {
      category: 'Design',
      icon: Palette,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      items: ['Figma', 'UI/UX', 'Responsive Design', 'Accessibility'],
    },
  ];

  const hobbies = ['Playing', 'Music', 'Coding', 'Reading', 'Gaming'];

  const photoUrl = 'https://i.ibb.co/r20cMQn5/Whats-App-Image-2025-11-01-at-20-36-49-2f885c5a.jpg';
  
  const [stats, setStats] = useState([
    { label: 'Projects Completed', value: 0, target: 5, icon: Code },
    { label: 'Technologies Mastered', value: 0, target: 15, icon: TrendingUp },
    { label: 'Hackathons Participated', value: 0, target: 3, icon: Award },
  ]);

  const resumePdfUrl = import.meta.env.VITE_RESUME_URL || 'https://www.dropbox.com/scl/fi/cb6i39g0uvi4nzmm71b3e/RESUME-1SI23IS081.pdf?rlkey=4u2giqxyrdzm08ruarnuij69o&st=t2zbe2bl&dl=1';
  
  const handleDownloadResume = async () => {
    if (resumePdfUrl) {
      try {
        const link = document.createElement('a');
        link.href = resumePdfUrl;
        link.download = 'Rishu_Kumar_Sinha_Resume.pdf';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      } catch (error) {
        console.error('Error downloading resume:', error);
      }
    }

    try {
      const resumeContent = document.getElementById('resume-content');
      if (!resumeContent) return;
      
      const clonedContent = resumeContent.cloneNode(true);
      clonedContent.style.width = '210mm';
      clonedContent.style.maxWidth = '210mm';
      clonedContent.style.backgroundColor = 'white';
      clonedContent.style.color = 'black';
      clonedContent.style.padding = '20mm';
      clonedContent.style.fontFamily = 'Arial, sans-serif';
      
      const links = clonedContent.querySelectorAll('a');
      links.forEach(link => {
        link.style.color = '#0066cc';
        link.style.textDecoration = 'underline';
        link.style.cursor = 'pointer';
        link.style.fontWeight = 'normal';
        const parent = link.parentElement;
        if (parent) {
          parent.style.color = '#000000';
        }
      });
      
      clonedContent.style.position = 'absolute';
      clonedContent.style.left = '-9999px';
      clonedContent.style.top = '0';
      clonedContent.style.zIndex = '-1';
      document.body.appendChild(clonedContent);

      await new Promise(resolve => setTimeout(resolve, 200));

      const opt = {
        margin: [10, 10, 10, 10],
        filename: 'Rishu_Kumar_Sinha_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          letterRendering: true,
          onclone: (clonedDoc) => {
            const clonedLinks = clonedDoc.querySelectorAll('a');
            clonedLinks.forEach(link => {
              link.style.color = '#0066cc';
              link.style.textDecoration = 'underline';
              link.style.fontWeight = 'normal';
            });
          }
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
        enableLinks: true
      };

      await html2pdf().set(opt).from(clonedContent).save();
      document.body.removeChild(clonedContent);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  useEffect(() => {
    const animateCounters = () => {
      setStats(prevStats => 
        prevStats.map(stat => {
          if (stat.value < stat.target) {
            const increment = Math.ceil(stat.target / 30);
            return {
              ...stat,
              value: Math.min(stat.value + increment, stat.target)
            };
          }
          return stat;
        })
      );
    };

    const interval = setInterval(animateCounters, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SEO 
        title="About - Full-Stack Developer Portfolio"
        description="Learn more about my skills, experience, and passion for web development."
      />
      
      <div className="min-h-screen pt-20 pb-16 bg-[#0a0a0f] relative overflow-hidden">
        {/* Code Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03] font-mono text-xs">
          <div className="absolute top-20 left-10 text-blue-500/10">class Developer {'{'}</div>
          <div className="absolute top-32 left-14 text-blue-500/10">skills: ['React', 'Node']</div>
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
              scale: [1, 1.3, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Code Style */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              <span className="text-blue-400 font-mono">&lt;</span>
              <span className="text-white">About</span>
              <span className="text-blue-400 font-mono"> /&gt;</span>
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto rounded-full"></div>
          </motion.div>

          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Profile Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="relative rounded-xl overflow-hidden border-2 border-blue-500/30 shadow-2xl">
                  <img
                    src={photoUrl}
                    alt="Rishu Kumar Sinha"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: '500px' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-96 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center rounded-xl">
                          <div class="text-white text-6xl font-bold font-mono">RKS</div>
                        </div>
                      `;
                    }}
                  />
                  {/* Code comment overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                    <p className="text-xs text-blue-400 font-mono">
                      <span className="text-gray-500">//</span> Full-Stack Developer
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Bio */}
              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-blue-400 font-mono text-lg">const</span>
                    <span className="text-white text-2xl font-bold">developer</span>
                    <span className="text-blue-400 font-mono">=</span>
                    <span className="text-green-400 font-mono">{'{'}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    I'm a passionate full-stack developer specializing in building scalable web applications 
                    using modern technologies. With expertise in React, Node.js, and MongoDB, I transform ideas 
                    into exceptional digital experiences.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    I'm always eager to learn new technologies and take on challenging projects that push 
                    the boundaries of what's possible on the web.
                  </p>
                  <div className="mt-4 text-gray-500 font-mono text-sm">
                    <span className="text-green-400">{'} '}</span>
                    <span className="text-gray-600">;</span>
                  </div>
                </div>
                
                <Button icon={Download} onClick={handleDownloadResume} className="w-full">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center text-white mb-4">
              <span className="text-blue-400 font-mono">[</span>
              <span className="text-white">Skills & Technologies</span>
              <span className="text-blue-400 font-mono">]</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gray-900/50 border ${skill.borderColor} rounded-xl p-6 hover:border-opacity-50 transition-all`}
                >
                  <div className={`w-12 h-12 ${skill.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                    <skill.icon className={`w-6 h-6 ${skill.color}`} />
                  </div>
                  <h3 className={`text-xl font-bold ${skill.color} mb-4 font-mono`}>
                    {skill.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 text-xs bg-gray-800/50 border border-gray-700 text-gray-300 rounded-lg font-mono"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mb-20"
          >
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-8 text-center font-mono">
                <span className="text-blue-400">const</span>
                <span className="text-gray-500 ml-2">stats</span>
                <span className="text-blue-400 ml-2">=</span>
                <span className="text-green-400 ml-2">{'{'}</span>
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  const percentage = (stat.value / stat.target) * 100;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                      className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center relative overflow-hidden"
                    >
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-blue-500/10 via-purple-500/10 to-transparent transition-all duration-1000"
                        style={{ height: `${percentage}%` }}
                      />
                      <div className="relative z-10">
                        <div className={`w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 border border-blue-500/30`}>
                          <Icon className={`w-8 h-8 text-blue-400`} />
                        </div>
                        <motion.span
                          key={stat.value}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="text-4xl font-bold text-white block mb-2 font-mono"
                        >
                          {stat.value}+
                        </motion.span>
                        <h3 className="text-lg font-semibold text-gray-300">
                          {stat.label}
                        </h3>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 h-2 rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Hobbies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center font-mono">
                <span className="text-blue-400">const</span>
                <span className="text-gray-500 ml-2">hobbies</span>
                <span className="text-blue-400 ml-2">=</span>
                <span className="text-green-400 ml-2">[</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {hobbies.map((hobby, index) => (
                  <motion.div
                    key={hobby}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-gray-800/50 border border-gray-700 rounded-lg px-6 py-3 hover:border-blue-500/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      {hobby === 'Music' && <Music className="w-5 h-5 text-blue-400" />}
                      {hobby === 'Playing' && <Gamepad2 className="w-5 h-5 text-blue-400" />}
                      {hobby === 'Reading' && <BookOpen className="w-5 h-5 text-blue-400" />}
                      {!['Music', 'Playing', 'Reading'].includes(hobby) && (
                        <div className="w-5 h-5 rounded-full bg-blue-400/30"></div>
                      )}
                      <span className="text-gray-300 font-medium font-mono">"{hobby}"</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-4 text-gray-500 font-mono text-sm">
                <span className="text-green-400">];</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hidden Resume Component for PDF generation */}
      <div style={{ display: 'none' }}>
        <ResumePDF />
      </div>
    </>
  );
};

export default About;

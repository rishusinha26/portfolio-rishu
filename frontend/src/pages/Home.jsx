import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail, Code2, Terminal, Zap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import SEO from '../components/SEO';
import ResumePDF from '../components/ResumePDF';
import html2pdf from 'html2pdf.js';

const Home = () => {
  const photoUrl = 'https://i.ibb.co/r20cMQn5/Whats-App-Image-2025-11-01-at-20-36-49-2f885c5a.jpg';
  const resumePdfUrl = import.meta.env.VITE_RESUME_URL || '';
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  
  const roles = ['Full-Stack Developer', 'Problem Solver', 'Tech Enthusiast', 'Code Architect'];
  const [currentRole, setCurrentRole] = useState(0);
  const [displayRole, setDisplayRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const current = roles[currentRole];
    
    const timeout = setTimeout(() => {
      if (!isDeleting && displayRole.length < current.length) {
        setDisplayRole(current.slice(0, displayRole.length + 1));
      } else if (!isDeleting && displayRole.length === current.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayRole.length > 0) {
        setDisplayRole(current.slice(0, displayRole.length - 1));
      } else if (isDeleting && displayRole.length === 0) {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayRole, isDeleting, currentRole, roles]);

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
      clonedContent.style.position = 'absolute';
      clonedContent.style.left = '-9999px';
      document.body.appendChild(clonedContent);

      await new Promise(resolve => setTimeout(resolve, 200));

      const opt = {
        margin: [10, 10, 10, 10],
        filename: 'Rishu_Kumar_Sinha_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
        enableLinks: true
      };

      await html2pdf().set(opt).from(clonedContent).save();
      document.body.removeChild(clonedContent);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const stats = [
    { label: 'Projects', value: '5+', icon: Code2 },
    { label: 'Experience', value: '2+', icon: Zap },
    { label: 'Hackathons', value: '3+', icon: Terminal },
  ];

  return (
    <>
      <SEO 
        title="Home - Full-Stack Developer Portfolio"
        description="Welcome to my portfolio. I'm a full-stack developer specializing in React, Node.js, and MongoDB."
      />
      
      <div ref={containerRef} className="relative min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
        {/* Code Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03] font-mono text-xs">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59,130,246,0.1) 2px, rgba(59,130,246,0.1) 4px)`,
          }}></div>
          <div className="absolute top-20 left-10 text-blue-500/10">function developer() {'{'}</div>
          <div className="absolute top-32 left-14 text-blue-500/10">return &lt;Code /&gt;</div>
          <div className="absolute top-44 left-10 text-blue-500/10">{'}'}</div>
          <div className="absolute top-60 right-20 text-purple-500/10">const tech = ['React', 'Node']</div>
        </div>

        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        {/* Glow Orbs */}
        <div className="absolute inset-0 z-0 opacity-15">
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
          />
        </div>

        {/* Main Content */}
        <motion.div
          style={{ y, opacity }}
          className="relative z-20 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Left Section - Code Style */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8 text-center lg:text-left"
              >
                {/* Code Comment */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg text-gray-400 flex items-center justify-center lg:justify-start gap-2 font-mono"
                >
                  <span className="text-blue-500">//</span>
                  <span>Hello, I'm</span>
                  <span className="text-white font-semibold">Rishu Kumar Sinha</span>
                </motion.p>

                {/* Main Heading with Brackets */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight"
                >
                  <span className="text-blue-400 font-mono">&lt;</span>
                  <span className="text-white">Building Digital</span>
                  <span className="text-blue-400 font-mono"> /&gt;</span>
                  <br />
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
                    Experiences
                  </span>
                </motion.h1>

                {/* Role Typing Effect */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-xl sm:text-2xl text-gray-400 h-8 flex items-center justify-center lg:justify-start font-mono"
                >
                  <span className="text-blue-400">const</span>
                  <span className="text-gray-500 ml-2">role =</span>
                  <span className="text-green-400 ml-2">"{displayRole}"</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-blue-400 ml-1"
                  >
                    |
                  </motion.span>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex flex-wrap gap-8 justify-center lg:justify-start"
                >
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      className="flex items-center gap-3 bg-gray-900/50 border border-blue-500/20 rounded-lg px-4 py-3"
                    >
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <stat.icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white font-mono">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all flex items-center gap-2 border border-blue-500/30"
                    >
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      Let's Talk
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                  
                  <motion.button
                    onClick={handleDownloadResume}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-gray-700 text-gray-300 hover:text-white hover:border-blue-500/50 rounded-lg font-semibold transition-all flex items-center gap-2 bg-gray-900/50"
                  >
                    <Download className="w-5 h-5" />
                    Download Resume
                  </motion.button>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="flex gap-4 justify-center lg:justify-start"
                >
                  {[
                    { icon: Github, href: 'https://github.com/Rishusinha26', label: 'GitHub' },
                    { icon: Linkedin, href: 'https://www.linkedin.com/in/rishu-kumar-sinha-67a612292/', label: 'LinkedIn' },
                    { icon: Mail, href: 'mailto:1si23is081@sit.ac.in', label: 'Email' },
                  ].map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 1.3 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-lg bg-gray-900/50 hover:bg-blue-500/20 text-gray-400 hover:text-blue-300 transition-all border border-gray-800 hover:border-blue-500/50"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Section - Profile Image with Code Frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative flex justify-center"
              >
                {/* Code Brackets Decoration */}
                <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-6xl text-blue-500/20 font-mono hidden lg:block">
                  {'{'}
                </div>
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-6xl text-blue-500/20 font-mono hidden lg:block">
                  {'}'}
                </div>

                {/* Glow Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-blue-500/20 rounded-full"
                  style={{ width: '420px', height: '420px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                />

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-lg overflow-hidden border-4 border-blue-500/30 shadow-2xl shadow-blue-500/20"
                >
                  <img
                    src={photoUrl}
                    alt="Rishu Kumar Sinha"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold font-mono">
                          RKS
                        </div>
                      `;
                    }}
                  />
                  {/* Code comment overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-xs text-blue-400 font-mono">// Full-Stack Developer</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hidden Resume Component for PDF Generation */}
      <div style={{ position: 'absolute', left: '-9999px' }}>
        <ResumePDF />
      </div>
    </>
  );
};

export default Home;

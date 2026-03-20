import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail, Code2, Terminal, Zap, ChevronRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import SEO from '../components/SEO';
import ResumePDF from '../components/ResumePDF';
import html2pdf from 'html2pdf.js';

// LeetCode Icon Component
const LeetCodeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662L2.571 12.98c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.152-4.152c.467-.467 1.111-.702 1.824-.702.713 0 1.357.235 1.824.702l2.697 2.607c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.902L12.98 2.57c-.9-.9-2.078-1.354-3.406-1.354s-2.506.454-3.406 1.354L2.157 6.521c-.9.9-1.354 2.078-1.354 3.406s.454 2.506 1.354 3.406l5.011 5.011c.9.9 2.078 1.354 3.406 1.354s2.506-.454 3.406-1.354l2.105-2.105c.514-.514.497-1.365-.038-1.9-.536-.535-1.387-.553-1.902-.039zM20.811 13.01H7.333c-.718 0-1.3.582-1.3 1.3s.582 1.3 1.3 1.3h13.478c.718 0 1.3-.582 1.3-1.3s-.582-1.3-1.3-1.3z"/>
  </svg>
);

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
    { label: 'LeetCode Problems', value: '250+', icon: Award },
  ];

  return (
    <>
      <SEO 
        title="Home - Full-Stack Developer Portfolio"
        description="Welcome to my portfolio. I'm a full-stack developer specializing in React, Node.js, and MongoDB."
      />
      
      <div ref={containerRef} className="relative min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(0deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'backgroundShift 30s linear infinite',
          }}></div>
        </div>

        {/* Animated Code Pattern */}
        <div className="absolute inset-0 opacity-[0.04] font-mono text-xs pointer-events-none">
          <div className="absolute top-20 left-10 text-cyan-500 animate-code-float">
            {'<root>'}<br/>
            {'  <component/>'}<br/>
            {'</root>'}
          </div>
          <div className="absolute top-32 right-20 text-purple-500 animate-code-float" style={{animationDelay: '1s'}}>
            const data = [...]<br/>
            return &lt;App /&gt;
          </div>
          <div className="absolute bottom-32 left-1/4 text-cyan-500 animate-code-float" style={{animationDelay: '2s'}}>
            function render() {'{'}<br/>
            {'  '} return elements<br/>
            {'}'}
          </div>
        </div>

        {/* Particle Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: '100%',
              }}
              animate={{
                y: [-100 * (Math.random() + 1), -window.innerHeight],
                x: [0, (Math.random() - 0.5) * 200],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                delay: i * 2,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        {/* Radar Scan Effect */}
        <motion.div
          className="absolute top-1/3 left-1/2 w-96 h-96 -translate-x-1/2 border-2 border-cyan-500/20 rounded-full animate-radar opacity-30 pointer-events-none"
          style={{
            boxShadow: '0 0 30px rgba(0, 255, 255, 0.1) inset',
          }}
        />

        {/* Horizontal Scan Line */}
        <motion.div
          className="absolute top-1/2 h-0.5 w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20 animate-h-scan"
          style={{
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
          }}
        />

        {/* Glow Orbs */}
        <div className="absolute inset-0 z-0">
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
            className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500 rounded-full blur-3xl opacity-15"
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
            className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-15"
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
                  className="text-lg text-gray-400 flex items-center justify-center lg:justify-start gap-2 font-mono group cursor-default"
                >
                  <span className="text-cyan-500 group-hover:animate-glitch">//</span>
                  <span className="group-hover:text-cyan-300 transition-colors">$ sudo welcome</span>
                </motion.p>

                {/* Main Heading with Brackets */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight font-mono group"
                >
                  <span className="text-cyan-400 group-hover:animate-pulse">&lt;</span>
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-pulse group-hover:animate-neon-flicker">DEVELOPER</span>
                  <span className="text-cyan-400 group-hover:animate-pulse">/&gt;</span>
                  <br />
                  <span className="block bg-gradient-to-r from-lime-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mt-2">
                    Stack: MERN
                  </span>
                </motion.h1>

                {/* Role Typing Effect */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-xl sm:text-2xl text-gray-400 h-8 flex items-center justify-center lg:justify-start font-mono"
                >
                  <span className="text-cyan-400">$</span>
                  <span className="text-gray-500 ml-2">role =</span>
                  <span className="text-lime-400 ml-2 font-bold">"{displayRole}"</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-cyan-400 ml-1 text-2xl"
                  >
                    █
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
                      className="flex items-center gap-3 bg-gray-900/50 border border-cyan-500/40 rounded-lg px-4 py-3 hover:scale-tech tech-card group cursor-pointer"
                      style={{
                        boxShadow: '0 0 10px rgba(0, 255, 255, 0.2), inset 0 0 10px rgba(0, 255, 255, 0.05)',
                      }}
                      whileHover={{
                        scale: 1.08,
                        boxShadow: '0 0 30px rgba(0, 255, 255, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.15)',
                        transition: { duration: 0.3 },
                      }}
                    >
                      <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30 group-hover:bg-cyan-500/20 transition-all">
                        <stat.icon className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-cyan-400 font-mono group-hover:text-cyan-200 transition-colors">{stat.value}</div>
                        <div className="text-sm text-gray-400 font-mono group-hover:text-gray-200 transition-colors">{stat.label}</div>
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
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white rounded-lg font-semibold font-mono shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/70 transition-all flex items-center gap-2 border border-cyan-400/60 hover:border-cyan-300 uppercase text-sm tracking-wider overflow-hidden"
                    >
                      {/* Animated background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 rounded-lg -z-10"
                        animate={{
                          x: [-100, 100],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                      <span className="text-cyan-300 group-hover:text-cyan-100 transition-colors">&gt;</span>
                      <span className="group-hover:translate-x-1 transition-transform">Hire Me</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                  
                  <motion.button
                    onClick={handleDownloadResume}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-8 py-4 border-2 border-cyan-500/60 text-cyan-300 hover:text-cyan-100 hover:border-cyan-400 rounded-lg font-semibold font-mono transition-all flex items-center gap-2 bg-gray-900/50 uppercase text-sm tracking-wider relative overflow-hidden"
                  >
                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 rounded-lg -z-10"
                      transition={{ duration: 0.3 }}
                    />
                    <span className="text-cyan-400">[</span>
                    <Download className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
                    <span>Resume</span>
                    <span className="text-cyan-400">]</span>
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
                    { icon: Github, href: 'https://github.com/Rishusinha26', label: 'GitHub', color: 'hover:text-cyan-300 hover:border-cyan-500/60 hover:shadow-neon-cyan' },
                    { icon: Linkedin, href: 'https://www.linkedin.com/in/rishu-kumar-sinha-67a612292/', label: 'LinkedIn', color: 'hover:text-cyan-300 hover:border-cyan-500/60 hover:shadow-neon-cyan' },
                    { icon: Mail, href: 'mailto:1si23is081@sit.ac.in', label: 'Email', color: 'hover:text-lime-300 hover:border-lime-500/60' },
                    { icon: LeetCodeIcon, href: 'https://leetcode.com/u/Rishu__26/', label: 'LeetCode', color: 'hover:text-orange-400 hover:border-orange-500/60' },
                  ].map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 1.3 + index * 0.1 }}
                      whileHover={{ 
                        scale: 1.2, 
                        y: -5,
                        rotate: 5,
                      }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 rounded-lg bg-gray-900/50 ${social.color} text-gray-400 transition-all border border-gray-700 font-mono font-bold relative group overflow-hidden`}
                      aria-label={social.label}
                    >
                      {/* Glow background on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 rounded-lg -z-10"
                        transition={{ duration: 0.3 }}
                      />
                      {social.label === 'LeetCode' ? (
                        <LeetCodeIcon className="w-5 h-5 relative z-10 group-hover:drop-shadow-lg transition-all" />
                      ) : (
                        <social.icon className="w-5 h-5 relative z-10 group-hover:drop-shadow-lg transition-all" />
                      )}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Section - Profile Image with Code Frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative flex justify-center group"
              >
                {/* Animated Code Brackets Decoration */}
                <motion.div
                  className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-6xl text-cyan-500/30 font-mono hidden lg:block transition-colors group-hover:text-cyan-400"
                  animate={{
                    y: [-10, 10, -10],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  {'{'}
                </motion.div>
                <motion.div
                  className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-6xl text-cyan-500/30 font-mono hidden lg:block transition-colors group-hover:text-cyan-400"
                  animate={{
                    y: [10, -10, 10],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  {'}'}
                </motion.div>

                {/* Animated Glow Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-cyan-400/40 rounded-full group-hover:border-cyan-300/70 transition-colors"
                  style={{ width: '420px', height: '420px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                />

                {/* Secondary animated ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-dotted border-purple-500/30 rounded-full group-hover:border-purple-400/60 transition-colors"
                  style={{ width: '480px', height: '480px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                />

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-lg overflow-hidden border-4 border-cyan-400/50 shadow-2xl shadow-cyan-500/30 group-hover:border-cyan-300/80 group-hover:shadow-cyan-400/60 transition-all"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 40px rgba(0, 255, 255, 0.5), 0 0 80px rgba(0, 255, 255, 0.3)',
                  }}
                >
                  <img
                    src={photoUrl}
                    alt="Rishu Kumar Sinha"
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white text-6xl font-bold font-mono">
                          RKS
                        </div>
                      `;
                    }}
                  />
                  {/* Code comment overlay */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                  >
                    <p className="text-xs text-cyan-300 font-mono">// Full-Stack Developer</p>
                  </motion.div>
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

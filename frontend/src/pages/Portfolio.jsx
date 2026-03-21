import { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Code, Database, Cloud, Palette, Music, Gamepad2, BookOpen, Award, TrendingUp, ExternalLink, Github, Loader, FolderOpen, Briefcase, GraduationCap, Trophy, Calendar, MapPin, Mail, Phone, Send, MessageSquare, Gauge, Zap, ShieldCheck, Cpu, Workflow, Radar } from 'lucide-react';
import api from '../config/api';
import Button from '../components/Button';
import SEO from '../components/SEO';
import PortfolioNavbar from '../components/PortfolioNavbar';
import ResumePDF from '../components/ResumePDF';
import html2pdf from 'html2pdf.js';
import toast from 'react-hot-toast';

const Portfolio = () => {
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);

  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [contactServiceConfigured, setContactServiceConfigured] = useState(true);
  const [contactServiceStatusLoaded, setContactServiceStatusLoaded] = useState(false);
  const [showIntroGateway, setShowIntroGateway] = useState(true);
  const [bootSequence, setBootSequence] = useState(false);
  const [photoZoomTransition, setPhotoZoomTransition] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0.2);
  const [timelineDrawProgress, setTimelineDrawProgress] = useState(0);
  const [focusedField, setFocusedField] = useState('');
  const [performanceSafe, setPerformanceSafe] = useState(false);
  const [packetTrails, setPacketTrails] = useState([]);
  const introTimerRef = useRef(null);
  const introZoomTimerRef = useRef(null);
  const location = useLocation();

  const photoUrl = 'https://i.ibb.co/r20cMQn5/Whats-App-Image-2025-11-01-at-20-36-49-2f885c5a.jpg';
  const resumePdfUrl = import.meta.env.VITE_RESUME_URL || 'https://www.dropbox.com/scl/fi/cb6i39g0uvi4nzmm71b3e/RESUME-1SI23IS081.pdf?rlkey=4u2giqxyrdzm08ruarnuij69o&st=t2zbe2bl&dl=1';

  const skills = [
    {
      category: 'Frontend',
      icon: Code,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      proficiency: 92,
      items: ['HTML', 'CSS', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux'],
    },
    {
      category: 'Backend',
      icon: Database,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      proficiency: 88,
      items: ['Python', 'Node.js', 'Express', 'REST API', 'FastAPI'],
    },
    {
      category: 'Database',
      icon: Database,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      proficiency: 85,
      items: ['MongoDB', 'SQL'],
    },
    {
      category: 'Libraries & Frameworks',
      icon: Code,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/30',
      proficiency: 81,
      items: ['NumPy', 'Pandas'],
    },
    {
      category: 'Cloud & Tools',
      icon: Cloud,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      proficiency: 86,
      items: ['Firebase', 'Git', 'Vercel'],
    },
    {
      category: 'Design',
      icon: Palette,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      proficiency: 79,
      items: ['Figma', 'UI/UX', 'Responsive Design', 'Accessibility'],
    },
    {
      category: 'CS Fundamentals',
      icon: BookOpen,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      proficiency: 87,
      items: ['DSA', 'DBMS', 'Operating Systems', 'OOPS', 'Computer Networks'],
    },
  ];

  const ambientParticleSeeds = [4, 11, 18, 26, 33, 41, 52, 61, 69, 76, 84, 93];

  const hobbies = ['Playing', 'Music', 'Coding', 'Reading', 'Gaming'];

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

  const tabs = [
    { id: 'all', label: 'All', icon: Briefcase },
    { id: 'work', label: 'Work', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certification', label: 'Certifications', icon: Award },
    { id: 'hackathon', label: 'Hackathons', icon: Trophy },
  ];

  const introSkills = ['MERN Stack', 'React + Node.js', 'MongoDB', 'FastAPI', 'DSA'];

  const introStats = [
    { label: 'Role', value: 'Full-Stack Developer' },
    { label: 'Current Focus', value: 'Web + AI Solutions' },
    { label: 'Education', value: 'B.E. in Information Science' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, experiencesRes, contactStatusRes] = await Promise.all([
          api.get('/projects'),
          api.get('/experiences'),
          api.get('/contact/config-status').catch(() => null),
        ]);

        const projectsArray = Array.isArray(projectsRes.data?.data || projectsRes.data) 
          ? (projectsRes.data?.data || projectsRes.data) 
          : [];
        const experiencesArray = Array.isArray(experiencesRes.data?.data || experiencesRes.data)
          ? (experiencesRes.data?.data || experiencesRes.data)
          : [];

        const normalizedProjects = projectsArray.map((project) => ({
          ...project,
          image: project.image || project.imageUrl || '',
          tags: project.tags || project.techStack || [],
          liveLink: project.liveLink || project.liveUrl || project.live || '',
          github: project.github || project.githubUrl || project.sourceCode || project.repository || '',
        }));

        setProjects(normalizedProjects);
        setExperiences(experiencesArray);

        if (contactStatusRes?.data?.success) {
          setContactServiceConfigured(Boolean(contactStatusRes.data.configured));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load portfolio data');
        setProjects([]);
        setExperiences([]);
      } finally {
        setContactServiceStatusLoaded(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
  };

  const handleContactChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    if (!contactServiceConfigured) {
      toast.error('Contact email service is not configured yet. Please try again later.');
      return;
    }

    setSubmitLoading(true);

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
      toast.error(error?.message || error.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitLoading(false);
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

  const normalizeExternalUrl = (url) => {
    if (!url) return '';
    const trimmed = url.trim();
    if (!trimmed) return '';
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
  };

  useEffect(() => {
    if (!location.hash) return;
    const sectionId = location.hash.replace('#', '');
    const element = document.getElementById(sectionId);
    if (!element) return;

    const timeoutId = setTimeout(() => {
      const offset = 88;
      const targetY = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [location.hash]);

  useEffect(() => {
    const pathToSection = {
      '/about': 'about',
      '/projects': 'projects',
      '/experience': 'experience',
      '/contact': 'contact',
    };

    const sectionId = pathToSection[location.pathname];
    if (!sectionId) return;

    const timeoutId = setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (!element) return;
      const offset = 88;
      const targetY = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }, 120);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  useEffect(() => {
    let lastY = window.scrollY;
    let lastTime = performance.now();

    const handleScroll = () => {
      const currentY = window.scrollY;
      const currentTime = performance.now();
      const deltaY = Math.abs(currentY - lastY);
      const deltaTime = Math.max(currentTime - lastTime, 1);
      const velocity = Math.min(2, (deltaY / deltaTime) * 10);

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (currentY / scrollable) * 100 : 0;

      const timelineEl = experienceRef.current;
      if (timelineEl) {
        const rect = timelineEl.getBoundingClientRect();
        const start = window.innerHeight * 0.9;
        const end = window.innerHeight * 0.2;
        const rawProgress = (start - rect.top) / (rect.height + start - end);
        const clamped = Math.max(0, Math.min(1, rawProgress));
        setTimelineDrawProgress(clamped);
      }

      setScrollProgress(progress);
      setScrollVelocity(velocity);

      lastY = currentY;
      lastTime = currentTime;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4;
    const lowCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
    if (reducedMotion || lowMemory || lowCpu) {
      setPerformanceSafe(true);
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('performance-safe', performanceSafe);
    return () => document.body.classList.remove('performance-safe');
  }, [performanceSafe]);

  useEffect(() => {
    document.body.style.overflow = showIntroGateway ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
      if (introTimerRef.current) {
        clearTimeout(introTimerRef.current);
      }
      if (introZoomTimerRef.current) {
        clearTimeout(introZoomTimerRef.current);
      }
    };
  }, [showIntroGateway]);

  const handleEnterPortfolio = () => {
    if (bootSequence) return;
    setBootSequence(true);
    setPhotoZoomTransition(false);

    introZoomTimerRef.current = setTimeout(() => {
      setPhotoZoomTransition(true);
    }, 1650);

    introTimerRef.current = setTimeout(() => {
      setShowIntroGateway(false);
      setBootSequence(false);
      setPhotoZoomTransition(false);
    }, 2850);
  };

  const handleMagneticMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--cursor-x', `${x}px`);
    e.currentTarget.style.setProperty('--cursor-y', `${y}px`);
  };

  const handleMagneticLeave = (e) => {
    e.currentTarget.style.setProperty('--cursor-x', '50%');
    e.currentTarget.style.setProperty('--cursor-y', '50%');
  };

  const emitDataPackets = (event, count = 8) => {
    if (performanceSafe || !event?.currentTarget) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const packets = Array.from({ length: count }, (_, index) => ({
      id: `${Date.now()}-${index}-${Math.random().toString(16).slice(2)}`,
      x: originX + (Math.random() * 24 - 12),
      y: originY + (Math.random() * 16 - 8),
      dx: (window.innerWidth - originX) * (0.6 + Math.random() * 0.3),
      dy: -originY * (0.55 + Math.random() * 0.25),
      delay: index * 0.03,
      size: 2 + (index % 3),
    }));

    setPacketTrails((prev) => [...prev, ...packets]);

    window.setTimeout(() => {
      const ids = new Set(packets.map((packet) => packet.id));
      setPacketTrails((prev) => prev.filter((packet) => !ids.has(packet.id)));
    }, 1200);
  };

  return (
    <>
      <SEO 
        title="Full-Stack Developer Portfolio - Rishu Kumar Sinha"
        description="Explore my complete portfolio including skills, projects, experience, and get in touch."
      />

      <AnimatePresence>
        {showIntroGateway && (
          <motion.section
            key="intro-gateway"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className={`intro-tech-screen ${photoZoomTransition ? 'intro-portal-engage' : ''}`}
          >
            <div className="intro-grid-overlay" />
            <div className="intro-ambient-ring intro-ambient-ring-a" />
            <div className="intro-ambient-ring intro-ambient-ring-b" />
            <div className="intro-noise-layer" />
            <div className="intro-floating-code intro-floating-code-a">{'<dev/>'}</div>
            <div className="intro-floating-code intro-floating-code-b">{'{ api: online }'}</div>
            <div className="intro-floating-code intro-floating-code-c">{'[ui, ux, data]'} </div>
            <div className="intro-content-shell">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={
                  photoZoomTransition
                    ? { opacity: 0, y: -20, scale: 3.2, x: '30%', rotate: 1.6, transition: { duration: 0.62, ease: 'easeInOut' } }
                    : { opacity: 1, y: 0, scale: 1, x: '0%', transition: { duration: 0.55 } }
                }
                transition={{ duration: 0.55 }}
                className="intro-photo-wrap"
              >
                <div className="intro-photo-orbit intro-photo-orbit-a" />
                <div className="intro-photo-orbit intro-photo-orbit-b" />
                <img src={photoUrl} alt="Rishu Kumar Sinha" className="intro-photo" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.55 }}
                className="intro-dossier"
              >
                <div className="intro-header-row">
                  <p className="tech-code text-xs text-cyan-300">SYSTEM PREVIEW :: PERSONAL DOSSIER</p>
                  <span className="intro-status-dot" />
                </div>
                <motion.h1
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.45 }}
                  className={`tech-heading text-3xl sm:text-4xl text-white mt-2 leading-tight intro-glitch-title ${photoZoomTransition ? 'intro-title-glitch-burst' : ''}`}
                >
                  RISHU KUMAR SINHA
                </motion.h1>
                <p className="text-gray-300 mt-3 max-w-3xl">
                  Building responsive products with strong frontend UX, scalable backend systems, and practical
                  engineering decisions.
                </p>

                <div className="grid sm:grid-cols-3 gap-3 mt-5">
                  {introStats.map((item) => (
                    <div key={item.label} className="intro-stat-card">
                      <p className="tech-code text-[11px] text-cyan-400">{item.label}</p>
                      <p className="text-sm text-white mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {introSkills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ y: -3 }}
                      className="tech-chip intro-chip-animated"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={(e) => {
                    emitDataPackets(e, 10);
                    handleEnterPortfolio();
                  }}
                  disabled={bootSequence}
                  className="intro-popup-btn cta-micro-btn"
                >
                  <span className="intro-btn-core" />
                  <span className="relative z-[2]">{bootSequence ? 'Launching Interface...' : 'Enter Portfolio Interface'}</span>
                </motion.button>
              </motion.div>
            </div>

            {bootSequence && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={photoZoomTransition ? { opacity: 0.25 } : { opacity: 1 }}
                exit={{ opacity: 0 }}
                className="intro-boot-overlay"
              >
                <div className="intro-cinematic-grid" />
                <div className="intro-cinematic-ring intro-cinematic-ring-a" />
                <div className="intro-cinematic-ring intro-cinematic-ring-b" />
                <div className="intro-cinematic-flash" />
                <div className="intro-shutter intro-shutter-1" />
                <div className="intro-shutter intro-shutter-2" />
                <div className="intro-shutter intro-shutter-3" />
                {photoZoomTransition && <div className="intro-glitch-bars" />}
                <div className="intro-boot-box">
                  <p className="tech-code text-cyan-300 text-xs mb-3">Decrypting portfolio matrix...</p>
                  <p className="intro-boot-line">[01] AUTH OK</p>
                  <p className="intro-boot-line">[02] MODULES READY</p>
                  <p className="intro-boot-line">[03] RENDERING UI</p>
                  <div className="intro-loader-track">
                    <motion.div
                      className="intro-loader-fill"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2.35, ease: 'easeInOut' }}
                    />
                  </div>
                  <p className="tech-code text-[11px] text-cyan-200/90 mt-3">Compiling visuals • Streaming projects • Sync complete</p>
                </div>
              </motion.div>
            )}

            {photoZoomTransition && <div className="intro-zoom-vortex" />}
            {photoZoomTransition && <div className="intro-shockwave" />}
          </motion.section>
        )}
      </AnimatePresence>
      
      <PortfolioNavbar />

      {!showIntroGateway && (
        <div className="nav-progress-rail" aria-hidden="true">
          <div className="nav-progress-fill" style={{ width: `${scrollProgress}%` }} />
        </div>
      )}

      {packetTrails.length > 0 && (
        <div className="packet-trail-layer" aria-hidden="true">
          {packetTrails.map((packet) => (
            <span
              key={packet.id}
              className="packet-trail"
              style={{
                '--packet-x': `${packet.x}px`,
                '--packet-y': `${packet.y}px`,
                '--packet-dx': `${packet.dx}px`,
                '--packet-dy': `${packet.dy}px`,
                '--packet-delay': `${packet.delay}s`,
                '--packet-size': `${packet.size}px`,
              }}
            />
          ))}
        </div>
      )}

      <div className="interface-shell text-white" style={{ '--scroll-velocity': `${Math.max(0.2, scrollVelocity)}` }}>
        <svg className="circuit-overlay" viewBox="0 0 1200 2800" preserveAspectRatio="none" aria-hidden="true">
          <path className="circuit-path circuit-path-a" d="M40 90 C 260 40, 500 150, 760 100 C 920 70, 1040 120, 1160 210" />
          <path className="circuit-path circuit-path-b" d="M90 740 C 290 660, 540 760, 800 700 C 980 660, 1080 760, 1150 910" />
          <path className="circuit-path circuit-path-c" d="M60 1460 C 280 1520, 520 1400, 760 1480 C 920 1540, 1060 1470, 1140 1650" />
          <path className="circuit-path circuit-path-d" d="M70 2120 C 260 2060, 500 2180, 760 2120 C 940 2080, 1060 2180, 1140 2360" />
        </svg>
        <div className="ambient-particle-field" aria-hidden="true">
          {ambientParticleSeeds.map((seed, index) => (
            <span
              key={seed}
              className="ambient-particle"
              style={{
                left: `${seed}%`,
                animationDelay: `${(index % 6) * 0.5}s`,
                animationDuration: `${8 + (index % 5) * 1.4}s`,
              }}
            />
          ))}
        </div>
        {/* ABOUT SECTION */}
        <section ref={aboutRef} id="about" className="section-blueprint min-h-screen pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] font-mono text-xs">
            <div className="absolute top-20 left-10 text-cyan-500/10">class Developer {'{'}</div>
            <div className="absolute top-32 left-14 text-cyan-500/10">skills: ['React', 'Node']</div>
            <div className="absolute top-44 left-10 text-cyan-500/10">{'}'}</div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="tech-heading text-4xl sm:text-5xl font-bold text-white mb-4">
                <span className="text-cyan-400 font-mono">&lt;</span>
                <span className="text-white">About</span>
                <span className="text-cyan-400 font-mono"> /&gt;</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mx-auto rounded-full"></div>
            </motion.div>

            {/* Bio Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-20"
            >
              <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="notch-card neo-command-panel p-6 md:p-8 flex flex-col gap-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-500/25 pb-4">
                    <div>
                      <p className="tech-code text-xs text-cyan-300">PROFILE DOSSIER</p>
                      <p className="tech-code text-[10px] text-cyan-500/80 mt-1">FULL-STACK ENGINEERING TRACK</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="tech-chip">MERN</span>
                      <span className="tech-chip">FASTAPI</span>
                      <span className="tech-chip">BUILD v4.0</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-[1.3fr_1fr] gap-4">
                    <div className="notch-card p-5">
                      <h3 className="tech-heading text-2xl text-white mb-3">Building for Real Users</h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        I design and ship complete products from interface to infrastructure with a focus on
                        clear architecture, speed, and long-term maintainability.
                      </p>
                      <div className="space-y-2 text-sm text-gray-200">
                        <p className="flex items-center gap-2"><Zap className="w-4 h-4 text-cyan-400" /> Product-grade full-stack web applications</p>
                        <p className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-cyan-400" /> Authentication and secure user flows</p>
                        <p className="flex items-center gap-2"><Database className="w-4 h-4 text-cyan-400" /> API, database, and data-model engineering</p>
                        <p className="flex items-center gap-2"><Gauge className="w-4 h-4 text-cyan-400" /> Optimization for performance and scalability</p>
                      </div>
                    </div>

                    <div className="command-feed">
                      <p className="tech-code text-[11px] text-cyan-300 mb-3">QUICK SNAPSHOT</p>
                      <div className="space-y-3">
                        <div className="telemetry-card p-3">
                          <p className="tech-code text-[10px] text-cyan-400 flex items-center gap-2"><Cpu className="w-3.5 h-3.5" /> Experience</p>
                          <p className="tech-heading text-white text-lg mt-1">3+ Years</p>
                        </div>
                        <div className="telemetry-card p-3">
                          <p className="tech-code text-[10px] text-cyan-400 flex items-center gap-2"><Workflow className="w-3.5 h-3.5" /> Core Stack</p>
                          <p className="tech-heading text-white text-lg mt-1">MERN + FastAPI</p>
                        </div>
                        <div className="telemetry-card p-3">
                          <p className="tech-code text-[10px] text-cyan-400 flex items-center gap-2"><Radar className="w-3.5 h-3.5" /> Availability</p>
                          <p className="tech-heading text-white text-lg mt-1">Open to Build</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <a
                    href="https://leetcode.com/u/Rishu__26/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="notch-card p-4 block hover:border-amber-400/60 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="tech-code text-[11px] text-cyan-400 mb-1 flex items-center gap-2">
                        <img
                          src="https://cdn.simpleicons.org/leetcode/F89F1B"
                          alt="LeetCode"
                          className="w-4 h-4"
                        />
                        LEETCODE TRACKER
                      </p>
                      <p className="tech-heading text-white text-xl">450+ SOLVED</p>
                    </div>
                  </a>

                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      emitDataPackets(e, 8);
                      handleDownloadResume();
                    }}
                    className="w-full px-8 py-4 tech-btn-primary rounded-lg font-semibold tech-code shadow-lg shadow-cyan-500/40 transition-all flex items-center justify-center gap-2 uppercase text-sm tracking-wider cta-micro-btn"
                  >
                    <Download className="w-5 h-5" />
                    Download Resume
                  </motion.button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="scanner-shell scanner-shell-advanced p-4"
                >
                  <div className="scanner-grid" />
                  <div className="scanner-beam" />
                  <div className="scanner-ring" />
                  <div className="scanner-ring scanner-ring-delayed" />
                  <div className="floating-tech-icons" aria-hidden="true">
                    <Cpu className="tech-float-icon tech-float-icon-a" />
                    <ShieldCheck className="tech-float-icon tech-float-icon-b" />
                    <Workflow className="tech-float-icon tech-float-icon-c" />
                  </div>
                  <div className="scanner-node scanner-node-a" />
                  <div className="scanner-node scanner-node-b" />
                  <div className="scanner-node scanner-node-c" />

                  <div className="scanner-core scanner-core-circle">
                    <img src={photoUrl} alt="Rishu Kumar Sinha" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent" />
                  </div>

                  <div className="absolute top-4 left-4 hud-box px-3 py-2">
                    <p className="tech-code text-[11px] text-cyan-300">PROFILE SCANNER: LOCKED</p>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-3">
                    <div className="hud-box px-3 py-2">
                      <p className="tech-code text-[10px] text-cyan-400">ROLE</p>
                      <p className="tech-code text-xs text-white">FULL-STACK DEV</p>
                    </div>
                    <div className="hud-box px-3 py-2">
                      <p className="tech-code text-[10px] text-cyan-400">FOCUS</p>
                      <p className="tech-code text-xs text-white">WEB + AI</p>
                    </div>
                  </div>

                  <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-2">
                    <span className="data-pill">AUTH_LAYER</span>
                    <span className="data-pill">API_GATEWAY</span>
                    <span className="data-pill">DB_CLUSTER</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <h3 className="tech-heading text-3xl font-bold text-center text-white mb-4">
                <span className="text-cyan-400 font-mono">[</span>
                <span className="text-white section-title-typed">Skills & Technologies</span>
                <span className="text-cyan-400 font-mono">]</span>
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                    className={`notch-card border ${skill.borderColor} rounded-xl p-6 hover:border-opacity-50 transition-all tech-card hover-scale-tech magnetic-surface`}
                  >
                    <div className={`w-12 h-12 ${skill.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                      <skill.icon className={`w-6 h-6 ${skill.color}`} />
                    </div>
                    <h4 className={`text-xl font-bold ${skill.color} mb-4 font-mono`}>
                      {skill.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <span key={item} className="tech-chip">
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-[11px] tech-code text-cyan-300 mb-1">
                        <span>Proficiency</span>
                        <span>{skill.proficiency}%</span>
                      </div>
                      <div className="skill-meter-track">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: 0.12 * index }}
                          className="skill-meter-fill"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hobbies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="notch-card p-8 tech-card hover-glow-cyan">
                <h3 className="text-2xl font-bold text-white mb-6 text-center font-mono">
                  <span className="text-cyan-400">const</span>
                  <span className="text-gray-500 ml-2">hobbies</span>
                  <span className="text-cyan-400 ml-2">=</span>
                  <span className="text-lime-400 ml-2">[</span>
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {hobbies.map((hobby, index) => (
                    <motion.div
                      key={hobby}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ y: -4, scale: 1.04 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                      className="bg-gray-800/50 border border-gray-700 rounded-lg px-6 py-3 hover:border-cyan-500/50 transition-all hover-scale-tech"
                    >
                      <div className="flex items-center gap-3">
                        {hobby === 'Music' && <Music className="w-5 h-5 text-cyan-400" />}
                        {hobby === 'Playing' && <Gamepad2 className="w-5 h-5 text-cyan-400" />}
                        {hobby === 'Reading' && <BookOpen className="w-5 h-5 text-cyan-400" />}
                        {hobby === 'Coding' && <Code className="w-5 h-5 text-cyan-400" />}
                        {hobby === 'Gaming' && <Gamepad2 className="w-5 h-5 text-cyan-400" />}
                        <span className="text-gray-300 font-medium font-mono">"{hobby}"</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="text-center mt-4 text-gray-500 font-mono text-sm">
                  <span className="text-lime-400">];</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section ref={projectsRef} id="projects" className="section-blueprint min-h-screen pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl animate-pulse animation-delay-2000" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="tech-heading text-4xl sm:text-5xl font-bold text-white mb-4">
                <span className="text-cyan-400 font-mono">&lt;</span>
                <span className="text-white section-title-typed">Projects</span>
                <span className="text-cyan-400 font-mono"> /&gt;</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mx-auto rounded-full"></div>
            </motion.div>

            {loading ? (
              <div className="flex items-center justify-center h-96">
                <Loader className="w-12 h-12 animate-spin text-cyan-400" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -10, scale: 1.01 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                    className="group notch-card border border-cyan-500/30 rounded-xl overflow-hidden hover:border-cyan-300 transition-all tech-card hover-lift magnetic-surface hologram-card"
                  >
                    <div className="px-4 py-2 border-b border-cyan-500/20 bg-black/25 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-lime-400/80" />
                      </div>
                      <span className="text-[11px] text-cyan-300/80 tech-code">project_{index + 1}.tsx</span>
                    </div>
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-cyan-600 to-purple-600">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FolderOpen className="w-16 h-16 text-cyan-400/50" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{project.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags?.map((tag) => (
                          <span key={tag} className="tech-chip">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        {project.liveLink && (
                          <a href={normalizeExternalUrl(project.liveLink)} target="_blank" rel="noopener noreferrer" className="tech-btn-primary flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-mono text-sm">
                            <ExternalLink className="w-4 h-4" />
                            Live
                          </a>
                        )}
                        {project.github && (
                          <a href={normalizeExternalUrl(project.github)} target="_blank" rel="noopener noreferrer" className="tech-btn-outline flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-mono text-sm">
                            <Github className="w-4 h-4" />
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section ref={experienceRef} id="experience" className="section-blueprint min-h-screen pt-32 pb-20 relative overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="tech-heading text-4xl sm:text-5xl font-bold text-white mb-4">
                <span className="text-cyan-400 font-mono">&lt;</span>
                <span className="text-white section-title-typed">Experience</span>
                <span className="text-cyan-400 font-mono"> /&gt;</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mx-auto rounded-full"></div>
            </motion.div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono transition-all ${
                      activeTab === tab.id
                        ? 'bg-cyan-600 text-white border border-cyan-400'
                        : 'bg-gray-900/50 text-gray-400 border border-gray-700 hover:border-cyan-500/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Experience List */}
            <div className="space-y-6 timeline-wrap" style={{ '--timeline-progress': timelineDrawProgress }}>
              {filteredExperiences.map((exp, index) => (
                <motion.div
                  key={exp._id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="notch-card border border-cyan-500/30 rounded-xl p-8 tech-card hover-glow-cyan timeline-card"
                >
                  <span className="timeline-node" aria-hidden="true" />
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                      <p className="text-cyan-400 font-mono">{exp.company || exp.institution}</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 font-mono text-sm">
                      <Calendar className="w-4 h-4" />
                      {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                    </div>
                  </div>
                  {exp.location && (
                    <div className="flex items-center gap-2 text-gray-400 mb-4 font-mono text-sm">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </div>
                  )}
                  {exp.type === 'education' && exp.cgpa && (
                    <div className="mb-4">
                        <span className="tech-chip !text-lime-300 !border-lime-500/50 !bg-lime-500/10">
                        CGPA: {exp.cgpa}
                      </span>
                    </div>
                  )}
                  <p className="text-gray-300 mb-4">{exp.description}</p>
                  {exp.skills && (
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <span key={i} className="tech-chip">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section ref={contactRef} id="contact" className="section-blueprint min-h-screen pt-32 pb-20 relative overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="tech-heading text-4xl sm:text-5xl font-bold text-white mb-4">
                <span className="text-cyan-400 font-mono">&lt;</span>
                <span className="text-white section-title-typed">Contact</span>
                <span className="text-cyan-400 font-mono"> /&gt;</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mx-auto rounded-full"></div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={info.title}
                    href={info.href || '#'}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                    className="notch-card border border-cyan-500/30 rounded-xl p-6 text-center tech-card hover-lift magnetic-surface"
                  >
                    <div className="w-16 h-16 bg-cyan-500/10 rounded-lg flex items-center justify-center mx-auto mb-4 border border-cyan-500/30">
                      <Icon className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
                    <p className="text-gray-300 font-mono">{info.value}</p>
                  </motion.a>
                );
              })}
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="notch-card border border-cyan-500/30 rounded-xl p-8 tech-card hover-glow-cyan max-w-2xl mx-auto"
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Send me a Message</h3>
              {contactServiceStatusLoaded && !contactServiceConfigured && (
                <div className="mb-6 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-amber-200 text-sm tech-code">
                  Contact email service is currently not configured on the server. Messages cannot be delivered right now.
                </div>
              )}
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleContactChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono input-scanner ${focusedField === 'name' ? 'input-scanner-active' : ''}`}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleContactChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono input-scanner ${focusedField === 'email' ? 'input-scanner-active' : ''}`}
                    required
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleContactChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField('')}
                  minLength={2}
                  maxLength={150}
                  className={`w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono input-scanner ${focusedField === 'subject' ? 'input-scanner-active' : ''}`}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleContactChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField('')}
                  rows="6"
                  minLength={10}
                  maxLength={5000}
                  className={`w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono resize-none input-scanner ${focusedField === 'message' ? 'input-scanner-active' : ''}`}
                  required
                ></textarea>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => emitDataPackets(e, 9)}
                  disabled={submitLoading || !contactServiceConfigured}
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold font-mono shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/70 transition-all flex items-center justify-center gap-2 border border-cyan-400/60 hover:border-cyan-300 uppercase text-sm tracking-wider group h-14 cta-micro-btn"
                >
                  {submitLoading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>
      </div>

      {!showIntroGateway && (
        <button
          type="button"
          onClick={() => setPerformanceSafe((prev) => !prev)}
          className="perf-toggle-btn"
        >
          FX: {performanceSafe ? 'SAFE' : 'HIGH'}
        </button>
      )}

      {/* Hidden Resume Component for PDF generation */}
      <div style={{ display: 'none' }}>
        <ResumePDF />
      </div>
    </>
  );
};

export default Portfolio;

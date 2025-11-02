import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Loader, FolderOpen, Code } from 'lucide-react';
import api from '../config/api';
import SEO from '../components/SEO';
import toast from 'react-hot-toast';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
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
        title="Projects - Full-Stack Developer Portfolio"
        description="Explore my portfolio of web development projects built with React, Node.js, and modern technologies."
      />
      
      <div className="min-h-screen pt-20 pb-16 bg-[#0a0a0f] relative overflow-hidden">
        {/* Code Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03] font-mono text-xs">
          <div className="absolute top-20 left-10 text-blue-500/10">const projects = []</div>
          <div className="absolute top-32 left-14 text-blue-500/10">projects.map(p =&gt; ...)</div>
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
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -30, 0],
              y: [0, 30, 0],
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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <FolderOpen className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              <span className="text-blue-400 font-mono">[</span>
              <span className="text-white">Projects</span>
              <span className="text-blue-400 font-mono">]</span>
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mt-6 font-mono">
              <span className="text-blue-400">//</span> A collection of my work
            </p>
          </motion.div>

          {/* Projects Grid */}
          {projects.length === 0 ? (
            <div className="text-center py-20 bg-gray-900/50 border border-gray-800 rounded-xl">
              <Code className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg font-mono">
                <span className="text-gray-600">//</span> No projects available yet
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-blue-500/30 transition-all group"
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold font-mono">
                        {project.title.charAt(0)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold text-white font-mono">
                        {project.title}
                      </h3>
                      <p className="text-xs text-blue-400 font-mono mt-1">
                        <span className="text-gray-500">//</span> {project.title.toLowerCase().replace(/\s+/g, '-')}
                      </p>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 font-mono mb-2">
                        <span className="text-blue-400">const</span> techStack = [
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 4).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 text-xs bg-gray-800/50 border border-gray-700 text-gray-300 rounded-lg font-mono"
                          >
                            "{tech}"
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-3 py-1 text-xs bg-gray-800/50 border border-gray-700 text-gray-400 rounded-lg font-mono">
                            +{project.techStack.length - 4} more
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 font-mono mt-2">];</p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 pt-4 border-t border-gray-800">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors border border-gray-700 hover:border-blue-500/50 font-mono text-sm"
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg transition-all shadow-lg shadow-blue-500/30 font-mono text-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderKanban, 
  Mail, 
  Briefcase, 
  Plus,
  Trash2,
  Edit,
  Loader,
  X,
  Save
} from 'lucide-react';
import api from '../config/api';
import Button from '../components/Button';
import SEO from '../components/SEO';
import toast from 'react-hot-toast';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // Reset form when editing item changes
  useEffect(() => {
    if (editingItem) {
      if (activeTab === 'projects') {
        setFormData({
          title: editingItem.title || '',
          description: editingItem.description || '',
          techStack: editingItem.techStack?.join(', ') || '',
          imageUrl: editingItem.imageUrl || '',
          githubUrl: editingItem.githubUrl || '',
          liveUrl: editingItem.liveUrl || '',
          featured: editingItem.featured || false,
          order: editingItem.order || 0
        });
      } else if (activeTab === 'experiences') {
        setFormData({
          type: editingItem.type || 'work',
          title: editingItem.title || '',
          organization: editingItem.organization || '',
          location: editingItem.location || '',
          startDate: editingItem.startDate ? new Date(editingItem.startDate).toISOString().split('T')[0] : '',
          endDate: editingItem.endDate ? new Date(editingItem.endDate).toISOString().split('T')[0] : '',
          current: editingItem.current || false,
          description: editingItem.description || '',
          skills: editingItem.skills?.join(', ') || '',
          certificateUrl: editingItem.certificateUrl || '',
          order: editingItem.order || 0
        });
      }
    } else {
      // Reset to default values for new item
      if (activeTab === 'projects') {
        setFormData({
          title: '',
          description: '',
          techStack: '',
          imageUrl: '',
          githubUrl: '',
          liveUrl: '',
          featured: false,
          order: 0
        });
      } else if (activeTab === 'experiences') {
        setFormData({
          type: 'work',
          title: '',
          organization: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
          skills: '',
          certificateUrl: '',
          order: 0
        });
      }
    }
  }, [editingItem, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'projects':
          const projectsRes = await api.get('/projects');
          setProjects(projectsRes.data.data || []);
          break;
        case 'messages':
          const messagesRes = await api.get('/contact');
          setMessages(messagesRes.data.data || []);
          break;
        case 'experiences':
          const experiencesRes = await api.get('/experiences');
          setExperiences(experiencesRes.data.data || []);
          break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response?.status === 403) {
        toast.error('Admin access required. Please set yourself as admin.');
      } else if (error.response?.status === 401) {
        toast.error('Please login to access admin dashboard');
      } else {
        toast.error(error.response?.data?.message || 'Failed to load data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, type) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const endpointMap = {
        'projects': `/projects/${id}`,
        'experiences': `/experiences/${id}`,
        'contact': `/contact/${id}`,
        'messages': `/contact/${id}`
      };
      
      const endpoint = endpointMap[type] || `/${type}/${id}`;
      await api.delete(endpoint);
      toast.success('Item deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Delete error:', error);
      if (error.response?.status === 403) {
        toast.error('Admin access required. Please set yourself as admin.');
      } else {
        toast.error(error.response?.data?.message || 'Failed to delete item');
      }
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await api.patch(`/contact/${id}/read`);
      toast.success('Message marked as read');
      fetchData();
    } catch (error) {
      console.error('Mark as read error:', error);
      if (error.response?.status === 403) {
        toast.error('Admin access required. Please set yourself as admin.');
      } else {
        toast.error(error.response?.data?.message || 'Failed to update message');
      }
    }
  };

  const handleOpenModal = (item = null) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      let dataToSend = { ...formData };

      // Process arrays (techStack, skills)
      if (activeTab === 'projects') {
        dataToSend.techStack = formData.techStack
          .split(',')
          .map(tech => tech.trim())
          .filter(tech => tech.length > 0);
      } else if (activeTab === 'experiences') {
        dataToSend.skills = formData.skills
          .split(',')
          .map(skill => skill.trim())
          .filter(skill => skill.length > 0);
        
        // Handle dates
        if (dataToSend.startDate) {
          dataToSend.startDate = new Date(dataToSend.startDate);
        }
        if (dataToSend.endDate && !dataToSend.current) {
          dataToSend.endDate = new Date(dataToSend.endDate);
        } else if (dataToSend.current) {
          dataToSend.endDate = null;
        }
      }

      // Convert order to number
      if (dataToSend.order) {
        dataToSend.order = parseInt(dataToSend.order) || 0;
      }

      let endpoint;
      let method;

      if (editingItem) {
        // Update existing item
        endpoint = activeTab === 'projects' 
          ? `/projects/${editingItem._id}`
          : `/experiences/${editingItem._id}`;
        method = 'put';
        await api.put(endpoint, dataToSend);
        toast.success(`${activeTab === 'projects' ? 'Project' : 'Experience'} updated successfully`);
      } else {
        // Create new item
        endpoint = activeTab === 'projects' ? '/projects' : '/experiences';
        method = 'post';
        await api.post(endpoint, dataToSend);
        toast.success(`${activeTab === 'projects' ? 'Project' : 'Experience'} created successfully`);
      }

      handleCloseModal();
      fetchData();
    } catch (error) {
      console.error('Submit error:', error);
      if (error.response?.status === 403) {
        toast.error('Admin access required. Please set yourself as admin.');
      } else if (error.response?.status === 401) {
        toast.error('Please login to access admin dashboard');
      } else {
        toast.error(error.response?.data?.message || `Failed to ${editingItem ? 'update' : 'create'} item`);
      }
    } finally {
      setFormLoading(false);
    }
  };

  const tabs = [
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'messages', label: 'Messages', icon: Mail },
    { id: 'experiences', label: 'Experiences', icon: Briefcase },
  ];

  const stats = [
    { label: 'Total Projects', value: projects.length, color: 'bg-blue-500' },
    { label: 'Unread Messages', value: messages.filter(m => !m.read).length, color: 'bg-green-500' },
    { label: 'Experiences', value: experiences.length, color: 'bg-purple-500' },
  ];

  return (
    <>
      <SEO title="Admin Dashboard - Portfolio" />
      
      <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your portfolio content
            </p>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <div className={`w-12 h-12 ${stat.color} rounded-lg mb-4`}></div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader className="w-8 h-8 animate-spin text-primary-600" />
              </div>
            ) : (
              <>
                {/* Projects Tab */}
                {activeTab === 'projects' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Projects
                      </h2>
                      <Button 
                        icon={Plus} 
                        onClick={() => handleOpenModal(null)}
                      >
                        Add Project
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {projects.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No projects found. Add your first project!</p>
                      ) : (
                        projects.map((project) => (
                        <div
                          key={project._id}
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                            <div className="flex items-center gap-4 flex-1">
                            {project.imageUrl && (
                              <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                            )}
                              <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {project.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {project.techStack?.slice(0, 3).join(', ')}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                                onClick={() => handleOpenModal(project)}
                                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                title="Edit"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(project._id, 'projects')}
                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* Messages Tab */}
                {activeTab === 'messages' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                      Contact Messages
                    </h2>
                    <div className="space-y-4">
                      {messages.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No messages yet.</p>
                      ) : (
                        messages.map((message) => (
                        <div
                          key={message._id}
                          className={`p-4 rounded-lg ${
                            message.read
                              ? 'bg-gray-50 dark:bg-gray-700'
                              : 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {message.name}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {message.email}
                              </p>
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(message.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-3">
                            {message.message}
                          </p>
                          <div className="flex gap-2">
                            {!message.read && (
                              <button
                                onClick={() => handleMarkAsRead(message._id)}
                                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                Mark as Read
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(message._id, 'contact')}
                                className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* Experiences Tab */}
                {activeTab === 'experiences' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Experiences
                      </h2>
                      <Button 
                        icon={Plus}
                        onClick={() => handleOpenModal(null)}
                      >
                        Add Experience
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {experiences.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No experiences found. Add your first experience!</p>
                      ) : (
                        experiences.map((exp) => (
                        <div
                          key={exp._id}
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                            <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {exp.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {exp.organization} • {exp.type}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                                onClick={() => handleOpenModal(exp)}
                                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                title="Edit"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(exp._id, 'experiences')}
                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit */}
      <AnimatePresence>
        {showModal && (activeTab === 'projects' || activeTab === 'experiences') && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingItem ? `Edit ${activeTab === 'projects' ? 'Project' : 'Experience'}` : `Add New ${activeTab === 'projects' ? 'Project' : 'Experience'}`}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {activeTab === 'projects' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description || ''}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tech Stack (comma-separated) *
                      </label>
                      <input
                        type="text"
                        name="techStack"
                        value={formData.techStack || ''}
                        onChange={handleInputChange}
                        required
                        placeholder="React, Node.js, MongoDB"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Image URL *
                      </label>
                      <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl || ''}
                        onChange={handleInputChange}
                        required
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          GitHub URL
                        </label>
                        <input
                          type="url"
                          name="githubUrl"
                          value={formData.githubUrl || ''}
                          onChange={handleInputChange}
                          placeholder="https://github.com/..."
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Live URL
                        </label>
                        <input
                          type="url"
                          name="liveUrl"
                          value={formData.liveUrl || ''}
                          onChange={handleInputChange}
                          placeholder="https://example.com"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Order
                        </label>
                        <input
                          type="number"
                          name="order"
                          value={formData.order || 0}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="featured"
                          checked={formData.featured || false}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                        />
                        <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          Featured
                        </label>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Type *
                      </label>
                      <select
                        name="type"
                        value={formData.type || 'work'}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="work">Work</option>
                        <option value="education">Education</option>
                        <option value="certification">Certification</option>
                        <option value="hackathon">Hackathon</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Organization *
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Start Date *
                        </label>
                        <input
                          type="date"
                          name="startDate"
                          value={formData.startDate || ''}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          End Date {!formData.current && '*'}
                        </label>
                        <input
                          type="date"
                          name="endDate"
                          value={formData.endDate || ''}
                          onChange={handleInputChange}
                          disabled={formData.current}
                          required={!formData.current}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="current"
                        checked={formData.current || false}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Currently ongoing
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description || ''}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Skills (comma-separated)
                      </label>
                      <input
                        type="text"
                        name="skills"
                        value={formData.skills || ''}
                        onChange={handleInputChange}
                        placeholder="React, Node.js, MongoDB"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Certificate URL
                      </label>
                      <input
                        type="url"
                        name="certificateUrl"
                        value={formData.certificateUrl || ''}
                        onChange={handleInputChange}
                        placeholder="https://example.com/certificate.jpg"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Order
                      </label>
                      <input
                        type="number"
                        name="order"
                        value={formData.order || 0}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </>
                )}

                <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {formLoading ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        {editingItem ? 'Update' : 'Create'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Admin;

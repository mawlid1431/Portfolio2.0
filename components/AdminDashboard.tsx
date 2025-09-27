import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { toast } from 'sonner';
import {
  getServices,
  getProjects,
  addService,
  addProject,
  updateService,
  updateProject,
  deleteService,
  deleteProject
} from '../utils/supabase/database';
import { Service, Project } from '../utils/supabase/client';
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  Users,
  Briefcase,
  Globe,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'services' | 'projects'>('services');
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showServiceDialog, setShowServiceDialog] = useState(false);
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form states
  const [serviceForm, setServiceForm] = useState({
    name: '',
    price: '',
    description: ''
  });

  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    is_live: false,
    link: '',
    image: '',
    technology: '',
    official_link: ''
  });

  // Load data
  const loadData = async () => {
    try {
      setLoading(true);
      const [servicesData, projectsData] = await Promise.all([
        getServices(),
        getProjects()
      ]);
      setServices(servicesData);
      setProjects(projectsData);
    } catch (error) {
      toast.error('Failed to load data');
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Service handlers
  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingService) {
        const updated = await updateService(editingService.id, serviceForm);
        if (updated) {
          toast.success('Service updated successfully');
          await loadData();
        }
      } else {
        const added = await addService(serviceForm);
        if (added) {
          toast.success('Service added successfully');
          await loadData();
        }
      }
      resetServiceForm();
    } catch (error) {
      toast.error('Failed to save service');
      console.error('Error saving service:', error);
    }
  };

  const handleServiceDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        const deleted = await deleteService(id);
        if (deleted) {
          toast.success('Service deleted successfully');
          await loadData();
        }
      } catch (error) {
        toast.error('Failed to delete service');
        console.error('Error deleting service:', error);
      }
    }
  };

  const resetServiceForm = () => {
    setServiceForm({ name: '', price: '', description: '' });
    setEditingService(null);
    setShowServiceDialog(false);
  };

  const openServiceDialog = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setServiceForm({
        name: service.name,
        price: service.price,
        description: service.description
      });
    } else {
      resetServiceForm();
    }
    setShowServiceDialog(true);
  };

  // Project handlers
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject) {
        const updated = await updateProject(editingProject.id, projectForm);
        if (updated) {
          toast.success('Project updated successfully');
          await loadData();
        }
      } else {
        const added = await addProject(projectForm);
        if (added) {
          toast.success('Project added successfully');
          await loadData();
        }
      }
      resetProjectForm();
    } catch (error) {
      toast.error('Failed to save project');
      console.error('Error saving project:', error);
    }
  };

  const handleProjectDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const deleted = await deleteProject(id);
        if (deleted) {
          toast.success('Project deleted successfully');
          await loadData();
        }
      } catch (error) {
        toast.error('Failed to delete project');
        console.error('Error deleting project:', error);
      }
    }
  };

  const resetProjectForm = () => {
    setProjectForm({
      name: '',
      description: '',
      is_live: false,
      link: '',
      image: '',
      technology: '',
      official_link: ''
    });
    setEditingProject(null);
    setShowProjectDialog(false);
  };

  const openProjectDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setProjectForm({
        name: project.name,
        description: project.description,
        is_live: project.is_live,
        link: project.link || '',
        image: project.image || '',
        technology: project.technology,
        official_link: project.official_link || ''
      });
    } else {
      resetProjectForm();
    }
    setShowProjectDialog(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    onLogout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </button>
              <div className="w-px h-6 bg-gray-600"></div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={loadData}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 border-blue-600/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-400">Total Services</CardTitle>
                <Briefcase className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{services.length}</div>
                <p className="text-xs text-gray-400">Active service offerings</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-r from-purple-600/20 to-purple-800/20 border-purple-600/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-400">Total Projects</CardTitle>
                <Globe className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{projects.length}</div>
                <p className="text-xs text-gray-400">
                  {projects.filter(p => p.is_live).length} live projects
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          <Button
            onClick={() => setActiveTab('services')}
            variant={activeTab === 'services' ? 'default' : 'outline'}
            className={activeTab === 'services' 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'border-gray-600 text-gray-300 hover:bg-gray-700'
            }
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Services
          </Button>
          <Button
            onClick={() => setActiveTab('projects')}
            variant={activeTab === 'projects' ? 'default' : 'outline'}
            className={activeTab === 'projects' 
              ? 'bg-purple-600 hover:bg-purple-700' 
              : 'border-gray-600 text-gray-300 hover:bg-gray-700'
            }
          >
            <Globe className="w-4 h-4 mr-2" />
            Projects
          </Button>
        </div>

        {/* Content */}
        {activeTab === 'services' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key="services"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Services Management</h2>
              <Button
                onClick={() => openServiceDialog()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto"></div>
                <p className="text-gray-400 mt-2">Loading services...</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {services.map((service) => (
                  <Card key={service.id} className="bg-gray-800/50 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                      <div>
                        <CardTitle className="text-white">{service.name}</CardTitle>
                        <CardDescription className="text-green-400 font-medium">
                          {service.price}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => openServiceDialog(service)}
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleServiceDelete(service.id)}
                          size="sm"
                          variant="outline"
                          className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key="projects"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Projects Management</h2>
              <Button
                onClick={() => openProjectDialog()}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent mx-auto"></div>
                <p className="text-gray-400 mt-2">Loading projects...</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {projects.map((project) => (
                  <Card key={project.id} className="bg-gray-800/50 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                      <div>
                        <CardTitle className="text-white flex items-center gap-2">
                          {project.name}
                          <Badge 
                            className={project.is_live 
                              ? 'bg-green-600 text-white' 
                              : 'bg-gray-600 text-gray-300'
                            }
                          >
                            {project.is_live ? 'Live' : 'Development'}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-blue-400">
                          {project.technology}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => openProjectDialog(project)}
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleProjectDelete(project.id)}
                          size="sm"
                          variant="outline"
                          className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-sm mb-2">{project.description}</p>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          View Project →
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Service Dialog */}
      <Dialog open={showServiceDialog} onOpenChange={setShowServiceDialog}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>
              {editingService ? 'Edit Service' : 'Add New Service'}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {editingService ? 'Update service information' : 'Create a new service offering'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleServiceSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300">Service Name</label>
              <Input
                value={serviceForm.name}
                onChange={(e) => setServiceForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Web Development"
                className="bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Price Range</label>
              <Input
                value={serviceForm.price}
                onChange={(e) => setServiceForm(prev => ({ ...prev, price: e.target.value }))}
                placeholder="e.g., $500-$2000"
                className="bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Description</label>
              <Textarea
                value={serviceForm.description}
                onChange={(e) => setServiceForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your service..."
                className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={resetServiceForm}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
              >
                {editingService ? 'Update' : 'Add'} Service
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Project Dialog */}
      <Dialog open={showProjectDialog} onOpenChange={setShowProjectDialog}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {editingProject ? 'Update project information' : 'Create a new project showcase'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleProjectSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300">Project Name</label>
                <Input
                  value={projectForm.name}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Portfolio Website"
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_live"
                  checked={projectForm.is_live}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, is_live: e.target.checked }))}
                  className="rounded"
                />
                <label htmlFor="is_live" className="text-sm font-medium text-gray-300">
                  Project is Live
                </label>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Description</label>
              <Textarea
                value={projectForm.description}
                onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your project..."
                className="bg-gray-700 border-gray-600 text-white min-h-[80px]"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300">Live URL</label>
                <Input
                  value={projectForm.link}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, link: e.target.value }))}
                  placeholder="https://yourproject.com"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300">GitHub URL</label>
                <Input
                  value={projectForm.official_link}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, official_link: e.target.value }))}
                  placeholder="https://github.com/..."
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Image URL</label>
              <Input
                value={projectForm.image}
                onChange={(e) => setProjectForm(prev => ({ ...prev, image: e.target.value }))}
                placeholder="https://example.com/image.jpg"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Technologies</label>
              <Input
                value={projectForm.technology}
                onChange={(e) => setProjectForm(prev => ({ ...prev, technology: e.target.value }))}
                placeholder="React, TypeScript, Tailwind CSS"
                className="bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={resetProjectForm}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700"
              >
                {editingProject ? 'Update' : 'Add'} Project
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
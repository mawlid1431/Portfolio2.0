import React, { useState, useEffect } from 'react';
import { getServices, getProjects, addService, addProject } from '../utils/supabase/database';
import { Service, Project } from '../utils/supabase/client';

const DatabaseTest: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [populating, setPopulating] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔌 Testing database connection...');
      
      const servicesData = await getServices();
      const projectsData = await getProjects();
      
      setServices(servicesData);
      setProjects(projectsData);
      
      console.log('✅ Data fetched successfully:', {
        services: servicesData.length,
        projects: projectsData.length
      });
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('❌ Database error:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const populateDatabase = async () => {
    setPopulating(true);
    
    // Sample data
    const sampleServices = [
      {
        name: 'Web Development',
        price: '$500-$2000',
        description: 'Custom website development using modern technologies like React, TypeScript, and Tailwind CSS.'
      },
      {
        name: 'Mobile App Development',
        price: '$1000-$5000',
        description: 'Cross-platform mobile applications using React Native or Flutter.'
      },
      {
        name: 'E-commerce Solutions',
        price: '$800-$3000',
        description: 'Complete e-commerce platforms with payment integration and inventory management.'
      }
    ];

    const sampleProjects = [
      {
        name: 'Portfolio Website',
        description: 'Modern, responsive portfolio website with animations and dark mode support.',
        is_live: true,
        link: 'https://mowlid.dev',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
        technology: 'React, TypeScript, Tailwind CSS, Framer Motion',
        official_link: 'https://github.com/mawlid1431/portfolio'
      },
      {
        name: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with payment processing and inventory management.',
        is_live: true,
        link: 'https://shop.example.com',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
        technology: 'Next.js, Supabase, Stripe, PostgreSQL',
        official_link: 'https://github.com/mawlid1431/ecommerce'
      }
    ];

    try {
      // Add services if none exist
      if (services.length === 0) {
        for (const service of sampleServices) {
          await addService(service);
        }
      }

      // Add projects if none exist
      if (projects.length === 0) {
        for (const project of sampleProjects) {
          await addProject(project);
        }
      }

      // Refresh data
      await fetchData();
      
    } catch (err) {
      console.error('Error populating database:', err);
      setError('Failed to populate database');
    } finally {
      setPopulating(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>Make sure you have:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Created the tables in your Supabase SQL Editor</li>
            <li>Set up the correct environment variables</li>
            <li>Enabled Row Level Security policies</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Database Connection Test</h1>
        <div className="flex gap-4">
          <button
            onClick={fetchData}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Refresh Data'}
          </button>
          <button
            onClick={populateDatabase}
            disabled={populating || loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {populating ? 'Adding Data...' : 'Add Sample Data'}
          </button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Services Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Services ({services.length})
          </h2>
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="border rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                <p className="text-sm text-green-600 font-medium">{service.price}</p>
                <p className="text-gray-600 text-sm mt-2">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">
            Projects ({projects.length})
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.is_live 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {project.is_live ? 'Live' : 'In Development'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                <p className="text-xs text-blue-600">{project.technology}</p>
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm mt-1 block"
                  >
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Connection Status */}
      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
          <span className="text-green-700 font-medium">
            ✅ Database connection successful! Found {services.length} services and {projects.length} projects.
          </span>
        </div>
      </div>
    </div>
  );
};

export default DatabaseTest;
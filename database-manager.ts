import { 
  getServices, 
  getProjects, 
  addService, 
  addProject, 
  testDatabaseConnection 
} from './utils/supabase/database';

// Re-export all functions from database.ts for easy access
export { 
  getServices, 
  getProjects, 
  addService, 
  addProject,
  updateService,
  updateProject, 
  deleteService,
  deleteProject,
  testDatabaseConnection 
} from './utils/supabase/database';

// Initialize database with sample data
export async function initializeDatabase() {
  console.log('🚀 Initializing database...');
  
  // Test connection first
  const connected = await testDatabaseConnection();
  if (!connected) {
    console.error('❌ Database connection failed');
    return false;
  }

  // Check if data already exists
  const existingServices = await getServices();
  const existingProjects = await getProjects();

  if (existingServices.length > 0 && existingProjects.length > 0) {
    console.log('📊 Database already has data. Skipping initialization.');
    return true;
  }

  // Add sample services only if none exist
  if (existingServices.length === 0) {
    const sampleServices = [
      {
        name: 'Web Development',
        price: '$500-$2000',
        description: 'Custom website development using modern technologies like React, TypeScript, and Tailwind CSS'
      },
      {
        name: 'Mobile App Development', 
        price: '$1000-$5000',
        description: 'Cross-platform mobile applications using React Native or Flutter'
      },
      {
        name: 'E-commerce Solutions',
        price: '$800-$3000',
        description: 'Complete e-commerce platforms with payment integration and inventory management'
      },
      {
        name: 'UI/UX Design',
        price: '$300-$1000',
        description: 'User interface and experience design for web and mobile applications'
      },
      {
        name: 'Database Design',
        price: '$400-$1500', 
        description: 'Database architecture and optimization for scalable applications'
      },
      {
        name: 'API Development',
        price: '$600-$2500',
        description: 'RESTful API development and integration services'
      }
    ];

    console.log('📝 Adding sample services...');
    for (const service of sampleServices) {
      await addService(service);
    }
  }

  // Add sample projects only if none exist
  if (existingProjects.length === 0) {
    const sampleProjects = [
      {
        name: 'Portfolio Website',
        description: 'Modern, responsive portfolio website with animations and dark mode',
        is_live: true,
        link: 'https://mowlid.dev',
        image: '/images/portfolio-project.jpg',
        technology: 'React, TypeScript, Tailwind CSS, Framer Motion',
        official_link: 'https://github.com/mawlid1431/portfolio'
      },
      {
        name: 'E-commerce Platform', 
        description: 'Full-stack e-commerce solution with payment processing and inventory management',
        is_live: true,
        link: 'https://shop.example.com',
        image: '/images/ecommerce-project.jpg',
        technology: 'Next.js, Supabase, Stripe, PostgreSQL',
        official_link: 'https://github.com/mawlid1431/ecommerce'
      },
      {
        name: 'Task Management App',
        description: 'Collaborative task management application with real-time updates',
        is_live: false,
        link: '',
        image: '/images/task-app-project.jpg',
        technology: 'React, Node.js, Socket.io, MongoDB',
        official_link: 'https://github.com/mawlid1431/task-manager'
      },
      {
        name: 'Social Media Dashboard',
        description: 'Analytics dashboard for social media management and scheduling',
        is_live: true,
        link: 'https://social-dashboard.example.com',
        image: '/images/dashboard-project.jpg', 
        technology: 'Vue.js, Express.js, Chart.js, MySQL',
        official_link: 'https://github.com/mawlid1431/social-dashboard'
      }
    ];

    console.log('🏗️ Adding sample projects...');
    for (const project of sampleProjects) {
      await addProject(project);
    }
  }

  console.log('✅ Database initialization completed!');
  return true;
}
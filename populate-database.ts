import { addService, addProject } from './utils/supabase/database';

// Sample services data
const sampleServices = [
  {
    name: 'Web Development',
    price: '$500-$2000',
    description: 'Custom website development using modern technologies like React, TypeScript, and Tailwind CSS. Perfect for businesses looking to establish a strong online presence.'
  },
  {
    name: 'Mobile App Development',
    price: '$1000-$5000',
    description: 'Cross-platform mobile applications using React Native or Flutter. Build once, deploy everywhere with native performance.'
  },
  {
    name: 'E-commerce Solutions',
    price: '$800-$3000',
    description: 'Complete e-commerce platforms with payment integration and inventory management. Turn your business ideas into profitable online stores.'
  },
  {
    name: 'UI/UX Design',
    price: '$300-$1000',
    description: 'User interface and experience design for web and mobile applications. Create intuitive and engaging digital experiences.'
  },
  {
    name: 'Database Design',
    price: '$400-$1500',
    description: 'Database architecture and optimization for scalable applications. Ensure your data is structured for performance and growth.'
  },
  {
    name: 'API Development',
    price: '$600-$2500',
    description: 'RESTful API development and integration services. Connect your applications with robust and secure backend services.'
  }
];

// Sample projects data
const sampleProjects = [
  {
    name: 'Portfolio Website',
    description: 'Modern, responsive portfolio website with animations and dark mode support. Built with React, TypeScript, and Framer Motion.',
    is_live: true,
    link: 'https://mowlid.dev',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
    technology: 'React, TypeScript, Tailwind CSS, Framer Motion',
    official_link: 'https://github.com/mawlid1431/portfolio'
  },
  {
    name: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with payment processing, inventory management, and admin dashboard.',
    is_live: true,
    link: 'https://shop.example.com',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
    technology: 'Next.js, Supabase, Stripe, PostgreSQL',
    official_link: 'https://github.com/mawlid1431/ecommerce'
  },
  {
    name: 'Task Management App',
    description: 'Collaborative task management application with real-time updates, team collaboration, and project tracking.',
    is_live: false,
    link: '',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop',
    technology: 'React, Node.js, Socket.io, MongoDB',
    official_link: 'https://github.com/mawlid1431/task-manager'
  },
  {
    name: 'Social Media Dashboard',
    description: 'Analytics dashboard for social media management and scheduling with comprehensive reporting and insights.',
    is_live: true,
    link: 'https://social-dashboard.example.com',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
    technology: 'Vue.js, Express.js, Chart.js, MySQL',
    official_link: 'https://github.com/mawlid1431/social-dashboard'
  },
  {
    name: 'Digital Learning Platform',
    description: 'Online learning platform with course management, video streaming, and progress tracking for educators.',
    is_live: true,
    link: 'https://learn.example.com',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&h=300&fit=crop',
    technology: 'Angular, Firebase, Video.js',
    official_link: 'https://github.com/mawlid1431/learning-platform'
  },
  {
    name: 'Restaurant Management System',
    description: 'Complete restaurant management solution with POS, inventory, staff management, and customer analytics.',
    is_live: false,
    link: '',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop',
    technology: 'React Native, Django, PostgreSQL',
    official_link: 'https://github.com/mawlid1431/restaurant-system'
  }
];

// Function to populate the database
export async function populateDatabase() {
  console.log('🚀 Starting database population...');
  
  try {
    // Add services
    console.log('📝 Adding services...');
    for (const service of sampleServices) {
      const result = await addService(service);
      if (result) {
        console.log(`✅ Added service: ${service.name}`);
      } else {
        console.log(`❌ Failed to add service: ${service.name}`);
      }
    }

    // Add projects
    console.log('🏗️ Adding projects...');
    for (const project of sampleProjects) {
      const result = await addProject(project);
      if (result) {
        console.log(`✅ Added project: ${project.name}`);
      } else {
        console.log(`❌ Failed to add project: ${project.name}`);
      }
    }

    console.log('🎉 Database population completed!');
    return true;
  } catch (error) {
    console.error('❌ Error populating database:', error);
    return false;
  }
}

// Run if called directly
if (typeof window !== 'undefined') {
  (window as any).populateDatabase = populateDatabase;
  console.log('💡 Run populateDatabase() in console to add sample data');
}
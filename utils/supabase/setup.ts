import { supabase } from './client';

// Database setup and table creation
export async function setupDatabase(): Promise<boolean> {
  try {
    console.log('Setting up database tables...');

    // Create services table
    const servicesTableSQL = `
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // Create projects table
    const projectsTableSQL = `
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        is_live BOOLEAN DEFAULT false,
        link VARCHAR(500),
        image VARCHAR(500),
        technology VARCHAR(255) NOT NULL,
        official_link VARCHAR(500),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // Execute table creation queries
    const { error: servicesError } = await supabase.rpc('execute_sql', { 
      query: servicesTableSQL 
    });

    const { error: projectsError } = await supabase.rpc('execute_sql', { 
      query: projectsTableSQL 
    });

    if (servicesError) {
      console.error('Error creating services table:', servicesError);
    }

    if (projectsError) {
      console.error('Error creating projects table:', projectsError);
    }

    if (!servicesError && !projectsError) {
      console.log('✅ Database tables created successfully!');
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error setting up database:', error);
    return false;
  }
}

// Alternative method using direct SQL execution (if RPC doesn't work)
export async function createTablesDirectly(): Promise<void> {
  try {
    // Try to check if tables exist by querying them
    const { error: servicesCheckError } = await supabase
      .from('services')
      .select('id')
      .limit(1);

    const { error: projectsCheckError } = await supabase
      .from('projects')
      .select('id')
      .limit(1);

    if (servicesCheckError) {
      console.log('Services table does not exist, it will be created via Supabase dashboard');
    } else {
      console.log('✅ Services table exists');
    }

    if (projectsCheckError) {
      console.log('Projects table does not exist, it will be created via Supabase dashboard');
    } else {
      console.log('✅ Projects table exists');
    }

  } catch (error) {
    console.error('Error checking tables:', error);
  }
}

// Insert sample data for testing
export async function insertSampleData(): Promise<boolean> {
  try {
    console.log('Inserting sample data...');

    // Sample services
    const sampleServices = [
      {
        name: "Web Development",
        price: "$500-2000",
        description: "Full-stack web development services using modern technologies like React, Node.js, and databases."
      },
      {
        name: "Mobile App Development",
        price: "$800-3000",
        description: "Native and cross-platform mobile application development for iOS and Android."
      },
      {
        name: "Database Design",
        price: "$300-1000",
        description: "Database architecture, design, and optimization services for scalable applications."
      }
    ];

    // Sample projects
    const sampleProjects = [
      {
        name: "E-commerce Platform",
        description: "A modern e-commerce platform built with React and Node.js, featuring payment integration and admin dashboard.",
        is_live: true,
        link: "https://example-ecommerce.com",
        image: "/api/placeholder/400/300",
        technology: "React, Node.js, PostgreSQL",
        official_link: "https://github.com/example/ecommerce"
      },
      {
        name: "Task Management App",
        description: "A collaborative task management application with real-time updates and team collaboration features.",
        is_live: true,
        link: "https://example-tasks.com",
        image: "/api/placeholder/400/300",
        technology: "Vue.js, Express, MongoDB",
        official_link: "https://github.com/example/tasks"
      },
      {
        name: "Weather Dashboard",
        description: "A responsive weather dashboard that provides detailed weather information and forecasts.",
        is_live: false,
        link: "",
        image: "/api/placeholder/400/300",
        technology: "React, OpenWeather API",
        official_link: "https://github.com/example/weather"
      }
    ];

    // Insert sample services
    const { error: servicesError } = await supabase
      .from('services')
      .insert(sampleServices);

    if (servicesError) {
      console.error('Error inserting sample services:', servicesError);
    } else {
      console.log('✅ Sample services inserted');
    }

    // Insert sample projects
    const { error: projectsError } = await supabase
      .from('projects')
      .insert(sampleProjects);

    if (projectsError) {
      console.error('Error inserting sample projects:', projectsError);
    } else {
      console.log('✅ Sample projects inserted');
    }

    return !servicesError && !projectsError;
  } catch (error) {
    console.error('Error inserting sample data:', error);
    return false;
  }
}

// Clear all data (for testing purposes)
export async function clearAllData(): Promise<boolean> {
  try {
    console.log('Clearing all data...');

    const { error: servicesError } = await supabase
      .from('services')
      .delete()
      .neq('id', 0); // Delete all rows

    const { error: projectsError } = await supabase
      .from('projects')
      .delete()
      .neq('id', 0); // Delete all rows

    if (servicesError || projectsError) {
      console.error('Error clearing data:', { servicesError, projectsError });
      return false;
    }

    console.log('✅ All data cleared');
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
}
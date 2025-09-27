import { supabase, Service, Project } from './client';

// Services Management Functions
export async function getServices(): Promise<Service[]> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching services:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error in getServices:', err);
    return [];
  }
}

export async function addService(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Promise<Service | null> {
  try {
    const { data, error } = await supabase
      .from('services')
      .insert(service)
      .select()
      .single();

    if (error) {
      console.error('Error adding service:', error);
      return null;
    }

    console.log('✅ Service added successfully!');
    return data;
  } catch (err) {
    console.error('Error in addService:', err);
    return null;
  }
}

export async function updateService(id: number, service: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Promise<Service | null> {
  try {
    const { data, error } = await supabase
      .from('services')
      .update(service)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating service:', error);
      return null;
    }

    console.log('✅ Service updated successfully!');
    return data;
  } catch (err) {
    console.error('Error in updateService:', err);
    return null;
  }
}

export async function deleteService(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting service:', error);
      return false;
    }

    console.log('✅ Service deleted successfully!');
    return true;
  } catch (err) {
    console.error('Error in deleteService:', err);
    return false;
  }
}

// Projects Management Functions  
export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error in getProjects:', err);
    return [];
  }
}

export async function addProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();

    if (error) {
      console.error('Error adding project:', error);
      return null;
    }

    console.log('✅ Project added successfully!');
    return data;
  } catch (err) {
    console.error('Error in addProject:', err);
    return null;
  }
}

export async function updateProject(id: number, project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .update(project)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating project:', error);
      return null;
    }

    console.log('✅ Project updated successfully!');
    return data;
  } catch (err) {
    console.error('Error in updateProject:', err);
    return null;
  }
}

export async function deleteProject(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
      return false;
    }

    console.log('✅ Project deleted successfully!');
    return true;
  } catch (err) {
    console.error('Error in deleteProject:', err);
    return false;
  }
}

// Utility Functions
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    // Test services table
    const { error: servicesError } = await supabase
      .from('services')
      .select('count', { count: 'exact' });

    // Test projects table
    const { error: projectsError } = await supabase
      .from('projects')
      .select('count', { count: 'exact' });

    if (servicesError || projectsError) {
      console.error('Database connection test failed:', {
        servicesError,
        projectsError
      });
      return false;
    }

    console.log('✅ Database connection test successful!');
    return true;
  } catch (err) {
    console.error('Database connection error:', err);
    return false;
  }
}

// Real-time subscriptions (optional - for live updates)
export function subscribeToServices(callback: (services: Service[]) => void) {
  return supabase
    .channel('services-changes')
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'services' 
      }, 
      async () => {
        const services = await getServices();
        callback(services);
      }
    )
    .subscribe();
}

export function subscribeToProjects(callback: (projects: Project[]) => void) {
  return supabase
    .channel('projects-changes')
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'projects' 
      }, 
      async () => {
        const projects = await getProjects();
        callback(projects);
      }
    )
    .subscribe();
}
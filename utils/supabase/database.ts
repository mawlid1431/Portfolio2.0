import { supabase, Service, Project } from './client';

// Orders types
export interface Order {
  id: number;
  order_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address_street?: string;
  address_city?: string;
  address_postal?: string;
  address_country?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at?: string;
}

export interface OrderItem {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
}

// Contacts types
export interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
  updated_at?: string;
}

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

    // Test orders table
    const { error: ordersError } = await supabase
      .from('orders')
      .select('count', { count: 'exact' });

    if (servicesError || projectsError || ordersError) {
      console.error('Database connection test failed:', {
        servicesError,
        projectsError,
        ordersError
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

// Orders Management Functions
export async function getOrders(): Promise<Order[]> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error in getOrders:', err);
    return [];
  }
}

export async function addOrder(orderData: Omit<Order, 'id' | 'created_at' | 'updated_at'>): Promise<Order | null> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (error) {
      console.error('Error adding order:', error);
      return null;
    }

    console.log('✅ Order added successfully!');
    return data;
  } catch (err) {
    console.error('Error in addOrder:', err);
    return null;
  }
}

export async function updateOrderStatus(id: number, status: Order['status']): Promise<Order | null> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating order status:', error);
      return null;
    }

    console.log('✅ Order status updated successfully!');
    return data;
  } catch (err) {
    console.error('Error in updateOrderStatus:', err);
    return null;
  }
}

export async function deleteOrder(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting order:', error);
      return false;
    }

    console.log('✅ Order deleted successfully!');
    return true;
  } catch (err) {
    console.error('Error in deleteOrder:', err);
    return false;
  }
}

// Contacts Management Functions
export async function getContacts(): Promise<Contact[]> {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error in getContacts:', err);
    return [];
  }
}

export async function addContact(contactData: Omit<Contact, 'id' | 'created_at' | 'updated_at'>): Promise<Contact | null> {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .insert([contactData])
      .select()
      .single();

    if (error) {
      console.error('Error adding contact:', error);
      return null;
    }

    console.log('✅ Contact added successfully!');
    return data;
  } catch (err) {
    console.error('Error in addContact:', err);
    return null;
  }
}

export async function updateContactStatus(id: number, status: Contact['status']): Promise<Contact | null> {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating contact status:', error);
      return null;
    }

    console.log('✅ Contact status updated successfully!');
    return data;
  } catch (err) {
    console.error('Error in updateContactStatus:', err);
    return null;
  }
}

export async function deleteContact(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting contact:', error);
      return false;
    }

    console.log('✅ Contact deleted successfully!');
    return true;
  } catch (err) {
    console.error('Error in deleteContact:', err);
    return false;
  }
}
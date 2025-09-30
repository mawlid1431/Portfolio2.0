import { supabase } from './client';

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

// Get all orders
export const getOrders = async (): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getOrders:', error);
    throw error;
  }
};

// Add new order
export const addOrder = async (orderData: Omit<Order, 'id' | 'created_at' | 'updated_at'>): Promise<Order | null> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (error) {
      console.error('Error adding order:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in addOrder:', error);
    throw error;
  }
};

// Update order status
export const updateOrderStatus = async (id: number, status: Order['status']): Promise<Order | null> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating order status:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in updateOrderStatus:', error);
    throw error;
  }
};

// Delete order
export const deleteOrder = async (id: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting order:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteOrder:', error);
    throw error;
  }
};
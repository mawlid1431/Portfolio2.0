import { supabase } from './client';

// Simple test functions
export async function testBasicConnection() {
  try {
    console.log('Testing basic Supabase connection...');
    console.log('Testing connection to Supabase...');
    
    // Try a simple query
    const { data, error } = await supabase
      .from('services')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Connection error:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Basic connection successful');
    return { success: true, data };
  } catch (err) {
    console.error('Connection test failed:', err);
    return { success: false, error: String(err) };
  }
}

export async function testSimpleInsert() {
  try {
    console.log('Testing simple insert...');
    
    // Try to insert a simple test service
    const testService = {
      name: 'Test Service',
      price: '$100',
      description: 'This is a test service to check database functionality'
    };
    
    const { data, error } = await supabase
      .from('services')
      .insert(testService)
      .select()
      .single();
    
    if (error) {
      console.error('Insert error:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Insert successful:', data);
    return { success: true, data };
  } catch (err) {
    console.error('Insert test failed:', err);
    return { success: false, error: String(err) };
  }
}

export async function testSimpleSelect() {
  try {
    console.log('Testing simple select...');
    
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .limit(5);
    
    if (error) {
      console.error('Select error:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Select successful:', data);
    return { success: true, data };
  } catch (err) {
    console.error('Select test failed:', err);
    return { success: false, error: String(err) };
  }
}

export async function runAllTests() {
  console.log('=== Running Database Tests ===');
  
  const connectionTest = await testBasicConnection();
  console.log('Connection Test Result:', connectionTest);
  
  const selectTest = await testSimpleSelect();
  console.log('Select Test Result:', selectTest);
  
  const insertTest = await testSimpleInsert();
  console.log('Insert Test Result:', insertTest);
  
  return {
    connection: connectionTest,
    select: selectTest,
    insert: insertTest
  };
}
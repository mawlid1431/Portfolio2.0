import { useState, useEffect } from 'react';
import { testDatabaseConnection, getServices, getProjects } from '../utils/supabase/database';
import { createTablesDirectly, insertSampleData, clearAllData } from '../utils/supabase/setup';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const DatabaseDebug = () => {
  const [status, setStatus] = useState<string>('');
  const [services, setServices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const logStatus = (message: string) => {
    setStatus(prev => prev + '\n' + new Date().toLocaleTimeString() + ': ' + message);
  };

  const testConnection = async () => {
    setLoading(true);
    logStatus('Testing database connection...');
    
    try {
      const isConnected = await testDatabaseConnection();
      if (isConnected) {
        logStatus('✅ Database connection successful!');
      } else {
        logStatus('❌ Database connection failed!');
      }
    } catch (error) {
      logStatus('❌ Connection error: ' + String(error));
    }
    
    setLoading(false);
  };

  const checkTables = async () => {
    setLoading(true);
    logStatus('Checking database tables...');
    
    try {
      await createTablesDirectly();
      logStatus('✅ Table check completed');
    } catch (error) {
      logStatus('❌ Table check error: ' + String(error));
    }
    
    setLoading(false);
  };

  const loadData = async () => {
    setLoading(true);
    logStatus('Loading data from database...');
    
    try {
      const servicesData = await getServices();
      const projectsData = await getProjects();
      
      setServices(servicesData);
      setProjects(projectsData);
      
      logStatus(`✅ Loaded ${servicesData.length} services and ${projectsData.length} projects`);
    } catch (error) {
      logStatus('❌ Data loading error: ' + String(error));
    }
    
    setLoading(false);
  };

  const addSampleData = async () => {
    setLoading(true);
    logStatus('Adding sample data...');
    
    try {
      const success = await insertSampleData();
      if (success) {
        logStatus('✅ Sample data added successfully');
        await loadData(); // Refresh data after adding
      } else {
        logStatus('❌ Failed to add sample data');
      }
    } catch (error) {
      logStatus('❌ Sample data error: ' + String(error));
    }
    
    setLoading(false);
  };

  const clearData = async () => {
    if (confirm('Are you sure you want to clear all data?')) {
      setLoading(true);
      logStatus('Clearing all data...');
      
      try {
        const success = await clearAllData();
        if (success) {
          logStatus('✅ All data cleared');
          setServices([]);
          setProjects([]);
        } else {
          logStatus('❌ Failed to clear data');
        }
      } catch (error) {
        logStatus('❌ Clear data error: ' + String(error));
      }
      
      setLoading(false);
    }
  };

  const clearLog = () => {
    setStatus('');
  };

  useEffect(() => {
    // Auto-load data on component mount
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Database Debug Panel</h1>
        
        {/* Control Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Button onClick={testConnection} disabled={loading} variant="outline">
            Test Connection
          </Button>
          <Button onClick={checkTables} disabled={loading} variant="outline">
            Check Tables
          </Button>
          <Button onClick={loadData} disabled={loading} variant="outline">
            Load Data
          </Button>
          <Button onClick={addSampleData} disabled={loading} variant="outline">
            Add Sample Data
          </Button>
          <Button onClick={clearData} disabled={loading} variant="destructive">
            Clear All Data
          </Button>
          <Button onClick={clearLog} variant="secondary">
            Clear Log
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Status Log */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Debug Log</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm bg-gray-900 p-4 rounded max-h-96 overflow-y-auto whitespace-pre-wrap">
                {status || 'No log messages yet...'}
              </pre>
            </CardContent>
          </Card>

          {/* Data Display */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Current Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Services ({services.length})</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {services.length > 0 ? (
                    services.map((service, idx) => (
                      <div key={idx} className="bg-gray-900 p-3 rounded text-sm">
                        <strong>{service.name}</strong> - {service.price}
                        <br />
                        <span className="text-gray-400">{service.description?.substring(0, 100)}...</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No services found</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Projects ({projects.length})</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {projects.length > 0 ? (
                    projects.map((project, idx) => (
                      <div key={idx} className="bg-gray-900 p-3 rounded text-sm">
                        <strong>{project.name}</strong> - {project.technology}
                        <br />
                        <span className="text-gray-400">{project.description?.substring(0, 100)}...</span>
                        <br />
                        <span className={`text-xs ${project.is_live ? 'text-green-400' : 'text-red-400'}`}>
                          {project.is_live ? 'Live' : 'Not Live'}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No projects found</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Button 
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="mr-4"
          >
            Back to Portfolio
          </Button>
          <Button 
            onClick={() => window.location.href = '/admin'}
            variant="outline"
          >
            Go to Admin Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DatabaseDebug;
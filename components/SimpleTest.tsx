import { useState } from 'react';
import { runAllTests } from '../utils/supabase/tests';
import { Button } from '../components/ui/button';

const SimpleTest = () => {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    try {
      const testResults = await runAllTests();
      setResults(testResults);
      console.log('All test results:', testResults);
    } catch (error) {
      console.error('Test failed:', error);
      setResults({ error: String(error) });
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh' }}>
      <h1>Simple Database Test</h1>
      
      <Button 
        onClick={runTests} 
        disabled={loading}
        style={{ margin: '10px 0' }}
      >
        {loading ? 'Running Tests...' : 'Run Database Tests'}
      </Button>

      {results && (
        <div style={{ marginTop: '20px' }}>
          <h2>Test Results:</h2>
          <pre style={{ 
            backgroundColor: '#333', 
            padding: '10px', 
            borderRadius: '5px',
            overflow: 'auto',
            fontSize: '12px'
          }}>
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <Button onClick={() => window.location.href = '/debug'}>
          Go to Full Debug Page
        </Button>
        <Button onClick={() => window.location.href = '/admin'} style={{ marginLeft: '10px' }}>
          Go to Admin Dashboard
        </Button>
        <Button onClick={() => window.location.href = '/'} style={{ marginLeft: '10px' }}>
          Go to Portfolio
        </Button>
      </div>
    </div>
  );
};

export default SimpleTest;
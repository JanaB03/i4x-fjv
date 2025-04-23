import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const LoginPage = () => {
  const { login, isLoading, error } = useApp();
  const [accessCode, setAccessCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (accessCode.trim()) {
      const success = await login(accessCode.trim());
      if (success) {
        navigate('/');
      }
    }
  };

  // Demo login helpers
  const loginAsClient = async () => {
    const success = await login('1234');
    if (success) navigate('/');
  };

  const loginAsStaff = async () => {
    const success = await login('staff1');
    if (success) navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-orange-500">BridgeGap</span>
            <span className="text-2xl font-bold text-blue-700 ml-1">Connect</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Left side (form) */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-2">Reach out for support now!</h1>
            <p className="text-lg text-gray-600 mb-8">Talk with our team <span className="text-orange-500 font-semibold">today</span>.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="accessCode" className="block text-sm font-medium mb-1">
                  Access Code
                </label>
                <Input
                  id="accessCode"
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Enter your access code"
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>
              
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-md font-medium"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
            
            <div className="mt-8 border-t pt-6">
              <p className="text-sm text-gray-500 mb-4 text-center">
                Don't have an access code? Visit any Father Joe's Villages location or contact an outreach worker.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  onClick={loginAsClient}
                  className="border-blue-300 text-blue-600 hover:bg-blue-50"
                >
                  Client Demo
                </Button>
                <Button 
                  variant="outline" 
                  onClick={loginAsStaff}
                  className="border-blue-300 text-blue-600 hover:bg-blue-50"
                >
                  Staff Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side (image) */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-800 to-blue-500 p-8">
          <div className="h-full flex flex-col justify-center items-center">
            <div className="max-w-lg">
              <img 
                src="/api/placeholder/600/400" 
                alt="Support Illustration" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
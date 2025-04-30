import React, { useState } from 'react';
import { Book, MapPin, MessageCircle } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
  navigateTo?: (screen: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, navigateTo }) => {
  const [accessCode, setAccessCode] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode.trim().length > 0) {
      onLogin();
    }
  };
  
  // For demo, create quick login buttons
  const handleDemoLogin = () => {
    onLogin();
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Login Header */}
      <header className="bg-[#1D2D5C] shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-[#FF7F50] text-2xl font-bold">CommuniCare</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-white px-3 py-2">
              <Book size={20} className="mr-2" />
              <span>Resources</span>
            </button>
            
            <button 
              className="flex items-center text-white px-3 py-2"
              onClick={() => navigateTo && navigateTo('mapPage')}
            >
              <MapPin size={20} className="mr-2" />
              <span>Map</span>
            </button>
            
            <button className="flex items-center text-white px-3 py-2">
              <MessageCircle size={20} className="mr-2" />
              <span>Chat</span>
            </button>
            
            <button 
              className="bg-[#FFBA00] text-white px-6 py-2 rounded-md"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Two-column layout */}
      <main className="flex-1 flex">
        {/* Left column (form) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-2">Reach out for support now!</h1>
            <p className="text-lg text-gray-600 mb-8">Talk with our team <span className="text-[#FF7F50] font-semibold">today</span>.</p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="accessCode" className="block text-sm font-medium mb-2">
                  Access Code
                </label>
                <input
                  id="accessCode"
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Enter your access code"
                  className="w-full p-4 border rounded-md"
                  required
                />
              </div>
              
              <button 
                onClick={handleLogin}
                className="w-full bg-[#FF7F50] hover:bg-[#E5563C] text-white py-4 rounded-md font-medium"
              >
                Login
              </button>
            </div>
            
            <div className="mt-8 border-t pt-6">
              <p className="text-sm text-gray-500 mb-4 text-center">
                Don't have an access code? Visit any service location or contact an outreach worker.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={handleDemoLogin}
                  className="border border-blue-300 text-blue-600 hover:bg-blue-50 py-3 rounded-md"
                >
                  Client Demo
                </button>
                <button 
                  onClick={handleDemoLogin}
                  className="border border-blue-300 text-blue-600 hover:bg-blue-50 py-3 rounded-md"
                >
                  Staff Demo
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column - solid color background - hidden on mobile */}
        <div className="hidden md:block md:w-1/2 bg-[#1D2D5C]">
          <div className="h-full flex flex-col justify-center items-center p-8">
            <div className="text-[#FF7F50] text-3xl font-bold mb-4">CommuniCare</div>
            <div className="text-white text-lg">Connect with services and support</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginScreen;
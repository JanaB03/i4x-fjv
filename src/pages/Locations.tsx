import React, { useState } from 'react';
import { 
  MapPin, 
  User, 
  QrCode,
  Printer,
  Home,
  MessageCircle,
  CheckCircle,
  Trash2,
  Send,
  Clock,
  Navigation,
  Locate,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Plus,
  MapPinOff,
  UserPlus,
  Settings,
  BookOpen,
  LogOut,
  Zap,
  X,
  Search,
  Share,
  Book
} from 'lucide-react';

// Import the MapPage component
import MapPage from './MapPage';

const CommuniCare = () => {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userView, setUserView] = useState('client'); // 'client' or 'staff'
  
  // Render appropriate screen based on login state and active screen
  const renderContent = () => {
    if (!isLoggedIn) {
      // If we're on the map page, we allow viewing it without login
      if (activeScreen === 'mapPage') {
        return <MapPage goBack={() => setActiveScreen('home')} />;
      }
      return <LoginScreen onLogin={() => setIsLoggedIn(true)} navigateTo={setActiveScreen} />;
    }
    
    switch(activeScreen) {
      case 'messages':
        return <MessagesScreen goBack={() => setActiveScreen('home')} userView={userView} />;
      case 'mapTracker':
        return <MobileClinicTracker goBack={() => setActiveScreen('home')} userView={userView} />;
      case 'shareLocation':
        return <ShareLocationScreen goBack={() => setActiveScreen('home')} userView={userView} />;
      case 'myCode':
        return <MyCodeScreen goBack={() => setActiveScreen('home')} />;
      case 'checkIn':
        return <CheckInScreen goBack={() => setActiveScreen('home')} userView={userView} />;
      case 'mapPage':
        return <MapPage goBack={() => setActiveScreen('home')} />;
      default:
        return (
          <HomeScreen 
            userView={userView}
            toggleUserView={() => setUserView(userView === 'client' ? 'staff' : 'client')}
            navigateTo={setActiveScreen}
            onLogout={() => setIsLoggedIn(false)}
          />
        );
    }
  };
  
  // Don't show the header when we're on the map page, since it has its own
  const showHeader = activeScreen !== 'mapPage' && isLoggedIn;
  // Don't show mobile nav on map page
  const showMobileNav = activeScreen !== 'mapPage' && isLoggedIn;
  
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {showHeader && (
        <MainHeader 
          onHomeClick={() => setActiveScreen('home')} 
          userView={userView}
          onLogout={() => setIsLoggedIn(false)}
          navigateTo={setActiveScreen}
        />
      )}
      
      {activeScreen !== 'mapPage' ? (
        <div className="container mx-auto px-4 md:px-6">
          {renderContent()}
        </div>
      ) : (
        renderContent()
      )}
      
      {showMobileNav && (
        <MobileNav 
          activeScreen={activeScreen} 
          setActiveScreen={setActiveScreen} 
        />
      )}
    </div>
  );
};

// Updated Main Header Component with map navigation
const MainHeader = ({ onHomeClick, userView, onLogout, navigateTo }) => {
  return (
    <header className="bg-[#1D2D5C] text-white py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <button onClick={onHomeClick} className="flex items-center">
          <span className="text-[#FF7F50] text-2xl font-bold">CommuniCare</span>
        </button>
      </div>
      
      <div className="hidden md:flex items-center space-x-6">
        <button className="flex items-center text-white px-3 py-2">
          <BookOpen size={20} className="mr-2" />
          <span>Resources</span>
        </button>
        
        <button 
          className="flex items-center text-white px-3 py-2"
          onClick={() => navigateTo('mapPage')}
        >
          <MapPin size={20} className="mr-2" />
          <span>Map</span>
        </button>
        
        <button 
          className="flex items-center text-white px-3 py-2"
          onClick={() => navigateTo('messages')}
        >
          <MessageCircle size={20} className="mr-2" />
          <span>Chat</span>
        </button>
        
        <button 
          onClick={onLogout}
          className="bg-[#FF7F50] text-white rounded-full px-4 py-2 flex items-center"
        >
          <span className="mr-2">Logout</span>
          <div className="h-6 w-6 bg-[#E5563C] rounded-full flex items-center justify-center text-white">
            T
          </div>
        </button>
      </div>
    </header>
  );
};

// Update the LoginScreen to include Map access option
const LoginScreen = ({ onLogin, navigateTo }) => {
  const [accessCode, setAccessCode] = useState('');
  
  const handleLogin = (e) => {
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
              onClick={() => navigateTo('mapPage')}
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

// Map Page Component
const MapPage = ({ goBack }) => {
  const [showOverview, setShowOverview] = useState(true);
  const [activeButton, setActiveButton] = useState(null);
  
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#1D2D5C] text-white py-3 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-[#FF7F50] text-2xl font-bold">CommuniCare</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <button className="flex items-center text-white px-3 py-2">
            <Book size={20} className="mr-2" />
            <span>Resources</span>
          </button>
          
          <button className="flex items-center text-white px-3 py-2 border-b-2 border-[#FF7F50]">
            <MapPin size={20} className="mr-2" />
            <span>Map</span>
          </button>
          
          <button className="flex items-center text-white px-3 py-2">
            <MessageCircle size={20} className="mr-2" />
            <span>Chat</span>
          </button>
          
          <button className="bg-[#FFBA00] text-white px-6 py-2 rounded-md">
            Login
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-1 bg-blue-50 flex">
        {/* Left Sidebar */}
        <div className="w-full md:w-96 p-4 flex flex-col">
          <h1 className="text-3xl font-bold text-[#1D2D5C] mb-6">Location Services</h1>
          
          {/* Overview Card */}
          {showOverview && (
            <div className="bg-white rounded-lg shadow p-6 mb-4 relative">
              <button 
                onClick={() => setShowOverview(false)}
                className="absolute top-2 right-2"
              >
                <X size={20} />
              </button>
              <h2 className="text-[#1D2D5C] text-xl font-bold mb-2">Overview</h2>
              <p className="text-gray-700">
                Our Map tool allows you to view locations of service providers, track real-time positions of the Father Joe's Villages Street Health team, and share your location to help us best service you!
              </p>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button 
              className={`bg-blue-200 rounded-lg p-4 flex flex-col items-center justify-center h-32 transition-all ${activeButton === 'streetHealth' ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setActiveButton('streetHealth')}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <MapPin size={24} className="text-blue-600" />
              </div>
              <span className="text-center font-medium text-[#1D2D5C]">Street Health's location</span>
            </button>
            
            <button 
              className={`bg-purple-200 rounded-lg p-4 flex flex-col items-center justify-center h-32 transition-all ${activeButton === 'providers' ? 'ring-2 ring-purple-500' : ''}`}
              onClick={() => setActiveButton('providers')}
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <MapPin size={24} className="text-purple-600" />
              </div>
              <span className="text-center font-medium text-[#1D2D5C]">See service providers near you</span>
            </button>
          </div>
          
          {/* Share Location Box */}
          <div className="bg-[#FFE9B3] rounded-lg p-4 shadow-sm">
            <div className="flex items-start mb-2">
              <div className="w-10 h-10 bg-[#FFD980] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <Share size={20} className="text-[#B36E00]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1D2D5C]">Share my current location</h3>
                <p className="text-sm text-gray-700">
                  This information is fully confidential to Father Joe's Villages and will not be used in any way except to assist you. You may stop sharing at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Area */}
        <div className="hidden md:block flex-1 relative">
          {/* Map Placeholder - In a real app, this would be a Google Maps component */}
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            {/* This would be replaced with an actual Google Map */}
            <div className="relative w-full h-full overflow-hidden">
              <img 
                src="/api/placeholder/800/600" 
                alt="Map" 
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
              
              {/* Map Controls */}
              <div className="absolute top-4 left-4 right-4 flex justify-between">
                <div className="bg-white rounded-md shadow p-2 flex items-center">
                  <button className="px-2 py-1 bg-gray-100 rounded-md text-sm flex items-center mr-2">
                    <span>Rating</span>
                    <ChevronLeft size={16} className="transform rotate-270 ml-1" />
                  </button>
                  
                  <button className="px-2 py-1 bg-gray-100 rounded-md text-sm flex items-center mr-2">
                    <span>Hours</span>
                    <ChevronLeft size={16} className="transform rotate-270 ml-1" />
                  </button>
                  
                  <button className="px-2 py-1 bg-gray-100 rounded-md text-sm flex items-center">
                    <span>All filters</span>
                  </button>
                </div>
                
                <div className="bg-white rounded-md shadow p-2">
                  <div className="flex items-center">
                    <Search size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-500">Search this area</span>
                  </div>
                </div>
              </div>
              
              {/* Map Pins */}
              <div className="absolute top-1/4 left-1/3">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center animate-pulse">
                  <MapPin size={20} className="text-white" />
                </div>
              </div>
              
              <div className="absolute top-1/3 left-1/2">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <MapPin size={20} className="text-white" />
                </div>
              </div>
              
              <div className="absolute top-2/3 left-1/4">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                  <MapPin size={20} className="text-white" />
                </div>
              </div>
              
              <div className="absolute top-1/2 left-3/4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <MapPin size={20} className="text-white" />
                </div>
              </div>
              
              <div className="absolute top-1/2 left-1/2">
                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <MapPin size={24} className="text-white" />
                </div>
              </div>
              
              <div className="absolute bottom-1/4 right-1/4">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <MapPin size={20} className="text-white" />
                </div>
              </div>
              
              {/* Map Attribution */}
              <div className="absolute bottom-2 left-2 text-xs text-gray-600 bg-white bg-opacity-70 px-1 rounded">
                Map data ©2023 Google
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// We would need to include the rest of your components here:
// MobileNav, HomeScreen, MessagesScreen, etc.
// But for brevity, I've omitted them since they're unchanged

export default CommuniCare;
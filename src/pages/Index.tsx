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
  Zap
} from 'lucide-react';

const CommuniCare = () => {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userView, setUserView] = useState('client'); // 'client' or 'staff'
  
  // Render appropriate screen based on login state and active screen
  const renderContent = () => {
    if (!isLoggedIn) {
      return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
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
  
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {isLoggedIn && (
        <MainHeader 
          onHomeClick={() => setActiveScreen('home')} 
          userView={userView}
          onLogout={() => setIsLoggedIn(false)}
        />
      )}
      
      <div className="container mx-auto px-4 md:px-6">
        {renderContent()}
      </div>
      
      {isLoggedIn && (
        <MobileNav 
          activeScreen={activeScreen} 
          setActiveScreen={setActiveScreen} 
        />
      )}
    </div>
  );
};

// Main Header Component
const MainHeader = ({ onHomeClick, userView, onLogout }) => {
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
        
        <button className="flex items-center text-white px-3 py-2">
          <MapPin size={20} className="mr-2" />
          <span>Map</span>
        </button>
        
        <button className="flex items-center text-white px-3 py-2">
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

// Bottom Mobile Navigation
const MobileNav = ({ activeScreen, setActiveScreen }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-2">
      <button 
        className="flex flex-col items-center p-2" 
        onClick={() => setActiveScreen('home')}
      >
        <Home size={24} className={activeScreen === 'home' ? "text-[#FF7F50]" : "text-gray-500"} />
        <span className="text-xs mt-1">Home</span>
      </button>
      
      <button 
        className="flex flex-col items-center p-2"
        onClick={() => setActiveScreen('myCode')}
      >
        <QrCode size={24} className={activeScreen === 'myCode' ? "text-[#FF7F50]" : "text-gray-500"} />
        <span className="text-xs mt-1">My ID</span>
      </button>
      
      <button 
        className="flex flex-col items-center p-2"
        onClick={() => setActiveScreen('checkIn')}
      >
        <CheckCircle size={24} className={activeScreen === 'checkIn' ? "text-[#FF7F50]" : "text-gray-500"} />
        <span className="text-xs mt-1">Check In</span>
      </button>
      
      <button 
        className="flex flex-col items-center p-2"
        onClick={() => setActiveScreen('shareLocation')}
      >
        <MapPin size={24} className={activeScreen === 'shareLocation' ? "text-[#FF7F50]" : "text-gray-500"} />
        <span className="text-xs mt-1">Location</span>
      </button>
      
      <button 
        className="flex flex-col items-center p-2"
        onClick={() => setActiveScreen('messages')}
      >
        <MessageCircle size={24} className={activeScreen === 'messages' ? "text-[#FF7F50]" : "text-gray-500"} />
        <span className="text-xs mt-1">Chat</span>
      </button>
    </div>
  );
};

// Login Screen
const LoginScreen = ({ onLogin }) => {
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

// Home Screen
const HomeScreen = ({ userView, toggleUserView, navigateTo, onLogout }) => {
  return (
    <div className="py-8 md:py-12 mb-16 md:mb-0">
      <div className="max-w-4xl mx-auto">
        {userView === 'client' ? (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Zap size={28} className="text-[#FF7F50] mr-3" />
                Quick Actions
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <button 
                  className="h-32 bg-gradient-to-b from-[#1D2D5C] to-[#152348] text-white rounded-xl shadow-lg flex flex-col items-center justify-center border border-[#2A407C]/30"
                  onClick={() => navigateTo('checkIn')}
                >
                  <div className="w-16 h-16 rounded-full bg-[#2A407C] flex items-center justify-center mb-3">
                    <CheckCircle size={36} className="text-white" />
                  </div>
                  <span className="font-medium">Check In Now</span>
                </button>
                
                <button 
                  className="h-32 bg-gradient-to-b from-[#FF7F50] to-[#E5563C] text-white rounded-xl shadow-lg flex flex-col items-center justify-center border border-[#FF9B76]/30"
                  onClick={() => navigateTo('messages')}
                >
                  <div className="w-16 h-16 rounded-full bg-[#FF9B76] flex items-center justify-center mb-3">
                    <MessageCircle size={36} className="text-white" />
                  </div>
                  <span className="font-medium">Messages</span>
                </button>
                
                <button 
                  className="h-32 bg-gradient-to-b from-[#3671B9] to-[#2A5D99] text-white rounded-xl shadow-lg flex flex-col items-center justify-center border border-[#5894D9]/30"
                  onClick={() => navigateTo('shareLocation')}
                >
                  <div className="w-16 h-16 rounded-full bg-[#5894D9] flex items-center justify-center mb-3">
                    <MapPin size={36} className="text-white" />
                  </div>
                  <span className="font-medium">Share Location</span>
                </button>
                
                <button 
                  className="h-32 bg-gradient-to-b from-[#F0AD4E] to-[#DF9B3A] text-white rounded-xl shadow-lg flex flex-col items-center justify-center border border-[#F5C47F]/30"
                  onClick={() => navigateTo('mapTracker')}
                >
                  <div className="w-16 h-16 rounded-full bg-[#F5C47F] flex items-center justify-center mb-3">
                    <Navigation size={36} className="text-white" />
                  </div>
                  <span className="font-medium">Find Services</span>
                </button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Today's Updates</h2>
                  <span className="text-sm text-gray-500">April 28</span>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start">
                    <Bell size={24} className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Mobile Clinic Today</div>
                      <div className="text-sm">Downtown from 10am-2pm</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start">
                    <Bell size={24} className="text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Weather Alert</div>
                      <div className="text-sm">Rain tonight. Extra shelter beds available.</div>
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-4 py-3 text-center text-[#FF7F50] font-medium">
                  See All Updates
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Your Appointments</h2>
                
                <div className="p-4 border rounded-lg mb-4 flex items-start">
                  <Calendar size={28} className="text-[#FF7F50] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Case Manager Meeting</div>
                    <div className="text-sm">Tomorrow at 2:00 PM</div>
                    <div className="text-sm text-gray-500">Main Center</div>
                  </div>
                </div>
                
                <button className="flex items-center justify-center w-full py-3 text-[#FF7F50] font-medium">
                  <Plus size={20} className="mr-2" />
                  Add Appointment Reminder
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-6">Staff Dashboard</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <button 
                  className="bg-[#1D2D5C] text-white p-6 rounded-lg flex flex-col items-center"
                  onClick={() => navigateTo('messages')}
                >
                  <MessageCircle size={40} className="mb-3" />
                  <span>Client Messages</span>
                </button>
                
                <button 
                  className="bg-[#FF7F50] text-white p-6 rounded-lg flex flex-col items-center"
                  onClick={() => navigateTo('checkIn')}
                >
                  <CheckCircle size={40} className="mb-3" />
                  <span>View Check-ins</span>
                </button>
                
                <button 
                  className="bg-[#3671B9] text-white p-6 rounded-lg flex flex-col items-center"
                  onClick={() => navigateTo('shareLocation')}
                >
                  <MapPin size={40} className="mb-3" />
                  <span>Client Locations</span>
                </button>
                
                <button 
                  className="bg-[#F0AD4E] text-white p-6 rounded-lg flex flex-col items-center"
                  onClick={() => navigateTo('mapTracker')}
                >
                  <Navigation size={40} className="mb-3" />
                  <span>Mobile Services</span>
                </button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Recent Check-ins</h2>
                
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg flex items-start">
                    <div className="bg-[#1D2D5C] rounded-full p-2 mr-3 flex-shrink-0">
                      <User size={24} className="text-white" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <span className="font-medium">Alex T.</span>
                        <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">30m ago</span>
                      </div>
                      <div className="text-sm flex items-center text-gray-500 mt-1">
                        <MapPin size={16} className="mr-1" />
                        Main Center
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg flex items-start">
                    <div className="bg-[#FF7F50] rounded-full p-2 mr-3 flex-shrink-0">
                      <User size={24} className="text-white" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <span className="font-medium">Jamie R.</span>
                        <span className="text-sm bg-amber-100 text-amber-700 px-3 py-1 rounded-full">2h ago</span>
                      </div>
                      <div className="text-sm flex items-center text-gray-500 mt-1">
                        <MapPin size={16} className="mr-1" />
                        Mobile Outreach - Downtown
                      </div>
                    </div>
                  </div>
                </div>
                
                <button 
                  className="w-full mt-4 py-3 text-center text-[#FF7F50] font-medium"
                  onClick={() => navigateTo('checkIn')}
                >
                  View All Check-ins
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Clients Needing Response</h2>
                
                <div className="space-y-4">
                  <div className="p-4 border border-red-200 bg-red-50 rounded-lg flex items-start">
                    <MessageCircle size={24} className="text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">3 Unread Messages</div>
                      <button 
                        className="mt-2 text-sm text-red-600 font-medium"
                        onClick={() => navigateTo('messages')}
                      >
                        View Messages
                      </button>
                    </div>
                  </div>
                </div>
                
                <button 
                  className="flex items-center justify-center w-full mt-4 py-3 text-[#FF7F50] font-medium"
                  onClick={() => navigateTo('myCode')}
                >
                  <QrCode size={20} className="mr-2" />
                  Scan Client Code
                </button>
              </div>
            </div>
          </>
        )}
        
        {/* For demo - toggle between client and staff views */}
        <button 
          onClick={toggleUserView}
          className="mt-6 text-center w-full p-3 border border-[#1D2D5C] text-[#1D2D5C] rounded-lg font-medium"
        >
          Switch to {userView === 'client' ? 'Staff' : 'Client'} View
        </button>
      </div>
    </div>
  );
};

// Messages Screen matching the screenshot
const MessagesScreen = ({ goBack, userView }) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  
  // Mock data
  const contacts = [
    { id: 1, name: 'Street Health', role: 'staff', subtitle: 'Hey! How can we assist you today?', unread: 0 },
    { id: 2, name: 'Day Center', role: 'staff', subtitle: 'Food, shower, and laundry will be available tomorrow', unread: 0 }
  ];
  
  // Mock messages for Street Health
  const mockMessages = [
    { id: 1, sender: 'them', text: 'Hi James! I wanted to check in and remind you that your next appointment is this Friday, 5/22. Still available to meet?', time: 'May 19, 2023' },
    { id: 2, sender: 'me', text: 'That sounds great! See you then!', time: '10:45 AM' }
  ];
  
  const [messages, setMessages] = useState(mockMessages);
  
  const handleDeleteMessage = (messageId) => {
    setMessages(messages.filter(msg => msg.id !== messageId));
  };
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: 'me',
          text: newMessage,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }
      ]);
      setNewMessage('');
    }
  };
  
  return (
    <div className="py-8 md:mb-0 mb-16">
      <div className="mx-auto max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex h-[calc(70vh)]">
            <div className="w-1/3 border-r">
              <div className="p-4 border-b">
                <h2 className="font-bold text-lg">Chats</h2>
                <div className="relative mt-3">
                  <input
                    type="text"
                    placeholder="Search chats"
                    className="w-full py-2 px-3 bg-gray-100 rounded-md text-sm pl-8"
                  />
                  <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                </div>
              </div>
              
              <div className="overflow-y-auto h-[calc(70vh-5rem)]">
                {contacts.map(contact => (
                  <div 
                    key={contact.id}
                    className="border-b p-3 flex items-center cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <User size={18} className="text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{contact.name}</div>
                      <div className="text-sm text-gray-500 truncate">{contact.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b flex items-center">
                <div className="w-10 h-10 bg-[#FF7F50] rounded-full flex items-center justify-center mr-3">
                  <User size={18} className="text-white" />
                </div>
                <div className="font-bold text-lg">Street Health</div>
                <div className="ml-auto flex">
                  <Phone className="h-5 w-5 text-gray-500" />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} relative group`}
                  >
                    {message.sender === 'them' && (
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-2 flex-shrink-0 self-end">
                          <User size={18} className="text-gray-600" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">{message.time}</div>
                          <div className="bg-white p-3 rounded-lg shadow-sm max-w-xs relative">
                            {message.text}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {message.sender === 'me' && (
                      <div className="flex items-start">
                        <div>
                          <div className="text-xs text-gray-500 mb-1 text-right">{message.time}</div>
                          <div className="bg-[#FFE2C9] p-3 rounded-lg shadow-sm max-w-xs relative">
                            {message.text}
                            {/* Delete button */}
                            <button 
                              onClick={() => handleDeleteMessage(message.id)}
                              className="absolute right-0 top-0 -mt-2 -mr-2 bg-red-500 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                        <div className="w-10 h-10 bg-[#FF7F50] rounded-full flex items-center justify-center ml-2 flex-shrink-0 self-end">
                          <div className="text-white font-bold text-sm">T</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="p-3 border-t flex items-center">
                <button className="p-2 text-gray-500">
                  <DarkMode size={20} />
                </button>
                <div className="flex-1 flex mx-2 bg-gray-100 rounded-md">
                  <button className="p-2 text-gray-500">
                    <Image size={20} />
                  </button>
                  <button className="p-2 text-gray-500">
                    <MapPin size={20} />
                  </button>
                  <button className="p-2 text-gray-500">
                    <Microphone size={20} />
                  </button>
                  <input
                    type="text"
                    className="flex-1 bg-transparent py-2 px-3 outline-none"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                </div>
                <button 
                  onClick={handleSendMessage}
                  className="p-2 text-[#FF7F50]"
                  disabled={!newMessage.trim()}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Location Sharing Screen
const ShareLocationScreen = ({ goBack, userView }) => {
  return (
    <div className="py-8 md:mb-0 mb-16">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Share Your Location</h2>
          
          <div className="space-y-5">
            <button className="w-full py-4 px-6 rounded-lg bg-[#1D2D5C] text-white font-medium flex items-center justify-center gap-3">
              <Locate size={24} />
              <span>Share My Current Location</span>
            </button>
            
            <button className="w-full py-4 px-6 rounded-lg bg-[#FF7F50] text-white font-medium flex items-center justify-center gap-3">
              <MapPin size={24} />
              <span>Drop a Pin on Map</span>
            </button>
            
            <button className="w-full py-4 px-6 rounded-lg bg-[#3671B9] text-white font-medium flex items-center justify-center gap-3">
              <Clock size={24} />
              <span>Share Where I'll Be Later</span>
            </button>
          </div>
          
          <div className="bg-gray-100 mt-6 rounded-lg p-4 text-center">
            <p className="text-gray-600">
              Your location is only shared with your assigned case manager and support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile Clinic Tracker
const MobileClinicTracker = ({ goBack, userView }) => {
  return (
    <div className="py-8 md:mb-0 mb-16">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Mobile Services Tracker</h2>
          
          <div className="space-y-4">
            <div className="p-5 border rounded-lg border-blue-200 bg-blue-50 relative">
              <div className="flex justify-between items-start mb-3">
                <div className="text-xl font-bold">Mobile Health Clinic</div>
                <div className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full flex items-center">
                  <Clock size={16} className="mr-2" />
                  Active Now
                </div>
              </div>
              <div className="flex items-center text-gray-700 mb-2">
                <MapPin size={20} className="mr-2 text-blue-600" />
                <span>Downtown (10am - 2pm)</span>
              </div>
              <div className="flex items-center text-gray-700 mb-4">
                <ArrowRight size={20} className="mr-2 text-blue-600" />
                <span>Next: East Village (3pm - 6pm)</span>
              </div>
              <div className="flex gap-3">
                <button className="bg-[#1D2D5C] text-white px-4 py-2 rounded-lg flex items-center">
                  <Navigation size={18} className="mr-2" />
                  Directions
                </button>
                <button className="bg-[#FF7F50] text-white px-4 py-2 rounded-lg flex items-center">
                  <MessageCircle size={18} className="mr-2" />
                  Services
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map tracking view */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Live Tracking Map</h2>
          
          <div className="bg-gray-200 rounded-lg h-80 mb-4 flex items-center justify-center relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="absolute top-1/4 left-1/3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-600">
                  <div className="h-4 w-4 rounded-full bg-blue-600 animate-ping"></div>
                </div>
              </div>
              <div className="absolute bottom-1/3 right-1/3">
                <MapPin size={32} className="text-[#FF7F50]" />
              </div>
              
              {/* Driving path visualization */}
              <div className="absolute top-1/4 left-1/3 w-32 h-32 border-b-2 border-l-2 border-blue-400 rounded-bl-full opacity-50" />
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <Navigation size={24} className="text-blue-600 mr-3" />
              <div>
                <div className="font-medium text-lg">Mobile Health Clinic ETA</div>
                <div>15 minutes to East Village location</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// QR Code screen
const MyCodeScreen = ({ goBack }) => {
  return (
    <div className="py-8 md:mb-0 mb-16">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Your CommuniCare ID</h2>
          
          {/* QR Code Placeholder */}
          <div className="bg-gray-100 h-64 w-64 mx-auto mb-6 flex items-center justify-center border-2 border-gray-300 p-4">
            <QrCode size={180} className="text-[#1D2D5C]" />
          </div>
          
          <div className="text-2xl font-mono font-bold tracking-wider text-[#1D2D5C] mb-2">
            TSR-1245-A8T
          </div>
          <div className="text-sm text-gray-500 mb-6">
            Your Personal ID Code
          </div>
          
          <button className="w-full bg-[#FF7F50] text-white py-3 rounded-lg font-bold flex items-center justify-center">
            <Printer size={24} className="mr-2" />
            Print ID Card
          </button>
        </div>
      </div>
    </div>
  );
};

// Check-in Screen
const CheckInScreen = ({ goBack, userView }) => {
  return (
    <div className="py-8 md:mb-0 mb-16">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-5">Quick Check-in</h2>
          
          <div className="space-y-4">
            <button className="w-full py-4 px-6 rounded-lg bg-[#1D2D5C] text-white font-medium flex items-center justify-between">
              <div className="flex items-center">
                <Locate size={28} className="mr-4" />
                <span>Check in at my current location</span>
              </div>
              <ChevronRight size={24} />
            </button>
            
            <button className="w-full py-4 px-6 rounded-lg bg-[#FF7F50] text-white font-medium flex items-center justify-between">
              <div className="flex items-center">
                <QrCode size={28} className="mr-4" />
                <span>Scan a location QR code</span>
              </div>
              <ChevronRight size={24} />
            </button>
          </div>
          
          <div className="mt-6 bg-gray-100 rounded-lg p-4">
            <p className="text-gray-700 text-center">
              Let your case manager know where you are by checking in.
              Your location is only shared with your support team.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-5">Common Locations</h2>
          
          <div className="space-y-4">
            <button className="w-full py-4 px-6 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <MapPin size={24} className="text-[#FF7F50] mr-3" />
                <div className="text-left">
                  <div className="font-medium">Main Center</div>
                  <div className="text-sm text-gray-500">1501 Imperial Ave</div>
                </div>
              </div>
              <ChevronRight size={24} className="text-[#FF7F50]" />
            </button>
            
            <button className="w-full py-4 px-6 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <MapPin size={24} className="text-[#FF7F50] mr-3" />
                <div className="text-left">
                  <div className="font-medium">Downtown Library</div>
                  <div className="text-sm text-gray-500">330 Park Blvd</div>
                </div>
              </div>
              <ChevronRight size={24} className="text-[#FF7F50]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom Icons
const SearchIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
  </svg>
);

const Bell = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
  </svg>
);

const Phone = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const DarkMode = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </svg>
);

const Image = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
    <circle cx="9" cy="9" r="2"/>
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
  </svg>
);

const Microphone = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" x2="12" y1="19" y2="22"/>
  </svg>
);

export default CommuniCare;
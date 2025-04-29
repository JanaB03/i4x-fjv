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
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Plus,
  MapPinOff,
  UserPlus,
  Bell
} from 'lucide-react';

const BridgeGapApp = () => {
  const [activeScreen, setActiveScreen] = useState('home');
  const [userView, setUserView] = useState('client'); // 'client' or 'staff'
  
  // Render appropriate screen based on state
  const renderScreen = () => {
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
          />
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-blue-50">
      {renderScreen()}
      
      {/* Bottom Navigation - Always visible */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-2">
        <button 
          className="flex flex-col items-center p-2" 
          onClick={() => setActiveScreen('home')}
        >
          <Home size={24} className={activeScreen === 'home' ? "text-purple-600" : "text-gray-500"} />
          <span className="text-xs mt-1">Home</span>
        </button>
        
        <button 
          className="flex flex-col items-center p-2"
          onClick={() => setActiveScreen('myCode')}
        >
          <QrCode size={24} className={activeScreen === 'myCode' ? "text-purple-600" : "text-gray-500"} />
          <span className="text-xs mt-1">My Code</span>
        </button>
        
        <button 
          className="flex flex-col items-center p-2"
          onClick={() => setActiveScreen('checkIn')}
        >
          <CheckCircle size={24} className={activeScreen === 'checkIn' ? "text-purple-600" : "text-gray-500"} />
          <span className="text-xs mt-1">Check In</span>
        </button>
        
        <button 
          className="flex flex-col items-center p-2"
          onClick={() => setActiveScreen('shareLocation')}
        >
          <MapPin size={24} className={activeScreen === 'shareLocation' ? "text-purple-600" : "text-gray-500"} />
          <span className="text-xs mt-1">Location</span>
        </button>
        
        <button 
          className="flex flex-col items-center p-2"
          onClick={() => setActiveScreen('messages')}
        >
          <MessageCircle size={24} className={activeScreen === 'messages' ? "text-purple-600" : "text-gray-500"} />
          <span className="text-xs mt-1">Messages</span>
        </button>
      </div>
    </div>
  );
};

// Home Screen
const HomeScreen = ({ userView, toggleUserView, navigateTo }) => {
  return (
    <div className="pb-16">
      {/* Header */}
      <header className="bg-purple-600 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">BridgeGap Connect</h1>
        <button 
          className="mt-2 px-4 py-1 bg-purple-800 rounded-full text-sm"
          onClick={toggleUserView}
        >
          Switch to {userView === 'client' ? 'Staff' : 'Client'} View
        </button>
      </header>

      <div className="p-4 max-w-md mx-auto">
        {userView === 'client' ? (
          <>
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  className="bg-blue-500 text-white p-4 rounded-lg flex flex-col items-center"
                  onClick={() => navigateTo('checkIn')}
                >
                  <CheckCircle size={32} className="mb-2" />
                  <span>Check In Now</span>
                </button>
                
                <button 
                  className="bg-green-500 text-white p-4 rounded-lg flex flex-col items-center"
                  onClick={() => navigateTo('messages')}
                >
                  <MessageCircle size={32} className="mb-2" />
                  <span>Messages</span>
                </button>
                
                <button 
                  className="bg-purple-500 text-white p-4 rounded-lg flex flex-col items-center"
                  onClick={() => navigateTo('shareLocation')}
                >
                  <MapPin size={32} className="mb-2" />
                  <span>Share Location</span>
                </button>
                
                <button 
                  className="bg-amber-500 text-white p-4 rounded-lg flex flex-col items-center"
                  onClick={() => navigateTo('mapTracker')}
                >
                  <Navigation size={32} className="mb-2" />
                  <span>Find Services</span>
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold">Today's Updates</h2>
                <span className="text-sm text-gray-500">April 28</span>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start">
                  <Bell size={20} className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Mobile Clinic Today</div>
                    <div className="text-sm">Downtown from 10am-2pm</div>
                  </div>
                </div>
                
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start">
                  <Bell size={20} className="text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Weather Alert</div>
                    <div className="text-sm">Rain tonight. Extra shelter beds available.</div>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-3 py-2 text-center text-purple-600 font-medium">
                See All Updates
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold mb-3">Your Appointments</h2>
              
              <div className="p-3 border rounded-lg mb-3 flex items-start">
                <Calendar size={24} className="text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium">Case Manager Meeting</div>
                  <div className="text-sm">Tomorrow at 2:00 PM</div>
                  <div className="text-sm text-gray-500">Main Village Campus</div>
                </div>
              </div>
              
              <button className="flex items-center justify-center w-full py-2 text-purple-600 font-medium">
                <Plus size={16} className="mr-1" />
                Add Appointment Reminder
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <h2 className="text-xl font-bold mb-4">Staff Dashboard</h2>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  className="bg-blue-500 text-white p-4 rounded-lg flex flex-col items-center"
                  onClick={() => navigateTo('messages')}
                >
                  <MessageCircle size={32} className="mb-2" />
                  <span>Client Messages</span>
                </button>
                
                <button 
                  className="bg-green-500 text-white p-4 rounded-lg flex flex-col items-center"
                  onClick={() => navigateTo('checkIn')}
                >
                  <CheckCircle size={32} className="mb-2" />
                  <span>View Check-ins</span>
                </button>
                
                <button 
                  className="bg-purple-500 text-white p-4 rounded-lg flex flex-col items-center"
                  onClick={() => navigateTo('shareLocation')}
                >
                  <MapPin size={32} className="mb-2" />
                  <span>Client Locations</span>
                </button>
                
                <button 
                  className="bg-amber-500 text-white p-4 rounded-lg flex flex-col items-center"
                  onClick={() => navigateTo('mapTracker')}
                >
                  <Navigation size={32} className="mb-2" />
                  <span>Mobile Services</span>
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <h2 className="text-xl font-bold mb-3">Recent Check-ins</h2>
              
              <div className="space-y-3">
                <div className="p-3 border rounded-lg flex items-start">
                  <div className="bg-blue-100 rounded-full p-2 mr-2 flex-shrink-0">
                    <User size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <span className="font-medium">Alex T.</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">30m ago</span>
                    </div>
                    <div className="text-sm flex items-center text-gray-500">
                      <MapPin size={14} className="mr-1" />
                      Main Village Campus
                    </div>
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg flex items-start">
                  <div className="bg-purple-100 rounded-full p-2 mr-2 flex-shrink-0">
                    <User size={20} className="text-purple-600" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <span className="font-medium">Jamie R.</span>
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">2h ago</span>
                    </div>
                    <div className="text-sm flex items-center text-gray-500">
                      <MapPin size={14} className="mr-1" />
                      Mobile Outreach - Downtown
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                className="w-full mt-3 py-2 text-center text-purple-600 font-medium"
                onClick={() => navigateTo('checkIn')}
              >
                View All Check-ins
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold mb-3">Clients Needing Response</h2>
              
              <div className="space-y-3">
                <div className="p-3 border border-red-200 bg-red-50 rounded-lg flex items-start">
                  <MessageCircle size={20} className="text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">3 Unread Messages</div>
                    <button 
                      className="mt-1 text-sm text-red-600 font-medium"
                      onClick={() => navigateTo('messages')}
                    >
                      View Messages
                    </button>
                  </div>
                </div>
              </div>
              
              <button 
                className="flex items-center justify-center w-full mt-3 py-2 text-purple-600 font-medium"
                onClick={() => navigateTo('myCode')}
              >
                <QrCode size={16} className="mr-1" />
                Scan Client Code
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Messages Screen with privacy controls
const MessagesScreen = ({ goBack, userView }) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  
  // Mock data
  const contacts = [
    { id: 1, name: 'Case Manager Sarah', role: 'staff', unread: 2 },
    { id: 2, name: 'Housing Specialist Mike', role: 'staff', unread: 0 },
    { id: 3, name: 'Alex T.', role: 'client', unread: 1 },
    { id: 4, name: 'Jamie R.', role: 'client', unread: 0 }
  ];
  
  // Filter contacts based on user view
  const filteredContacts = userView === 'client' 
    ? contacts.filter(c => c.role === 'staff')
    : contacts.filter(c => c.role === 'client');
  
  // Mock messages
  const mockMessages = [
    { id: 1, sender: 'them', text: 'Hi there, just checking in. How are you doing today?', time: '10:30 AM' },
    { id: 2, sender: 'me', text: 'I\'m doing okay. Had breakfast at the center.', time: '10:45 AM' },
    { id: 3, sender: 'them', text: 'Great! I wanted to remind you about your housing appointment tomorrow at 2pm.', time: '10:47 AM' },
    { id: 4, sender: 'me', text: 'Thanks for the reminder. I\'ll be there.', time: '11:02 AM' }
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
    <div className="pb-16">
      <header className="bg-purple-600 text-white p-3 flex items-center">
        <button onClick={goBack} className="mr-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Messages</h1>
      </header>
      
      <div className="p-4">
        {!selectedContact ? (
          <div className="space-y-3">
            <div className="bg-white rounded-lg shadow-md p-2 mb-2">
              <h2 className="text-lg font-bold px-2 py-1">
                {userView === 'client' ? 'Your Support Team' : 'Your Clients'}
              </h2>
              
              {filteredContacts.map(contact => (
                <button
                  key={contact.id}
                  className="w-full text-left p-3 border-b last:border-0 flex items-center"
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className={`rounded-full p-2 mr-3 flex-shrink-0 
                    ${contact.role === 'staff' ? 'bg-blue-100' : 'bg-purple-100'}`}
                  >
                    <User size={24} className={contact.role === 'staff' ? 'text-blue-600' : 'text-purple-600'} />
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-sm text-gray-500">
                      {contact.role === 'staff' ? 'Support Staff' : 'Client'}
                    </div>
                  </div>
                  {contact.unread > 0 && (
                    <div className="bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
                      {contact.unread}
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            {/* Add new contact button for staff */}
            {userView === 'staff' && (
              <button className="w-full py-3 bg-purple-100 text-purple-600 rounded-lg font-medium flex items-center justify-center">
                <UserPlus size={20} className="mr-2" />
                Add New Client
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100vh-12rem)]">
            {/* Contact header */}
            <div className="bg-white rounded-t-lg shadow p-3 flex items-center">
              <button onClick={() => setSelectedContact(null)} className="mr-2">
                <ChevronLeft size={20} />
              </button>
              <div className={`rounded-full p-2 mr-2 flex-shrink-0 
                ${selectedContact.role === 'staff' ? 'bg-blue-100' : 'bg-purple-100'}`}
              >
                <User size={18} className={selectedContact.role === 'staff' ? 'text-blue-600' : 'text-purple-600'} />
              </div>
              <div>
                <div className="font-medium">{selectedContact.name}</div>
                <div className="text-xs text-gray-500">
                  {selectedContact.role === 'staff' ? 'Support Staff' : 'Client'}
                </div>
              </div>
            </div>
            
            {/* Messages container */}
            <div className="flex-grow bg-gray-50 p-3 overflow-y-auto flex flex-col-reverse space-y-reverse space-y-2">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} relative group`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg relative
                      ${message.sender === 'me' 
                        ? 'bg-purple-500 text-white rounded-br-none' 
                        : 'bg-white border rounded-bl-none'}`}
                  >
                    {message.text}
                    <div className={`text-xs mt-1 ${message.sender === 'me' ? 'text-purple-200' : 'text-gray-500'}`}>
                      {message.time}
                    </div>
                    
                    {/* Delete button - only for my messages for privacy */}
                    {message.sender === 'me' && (
                      <button 
                        onClick={() => handleDeleteMessage(message.id)}
                        className="absolute right-0 top-0 -mt-2 -mr-2 bg-red-500 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input area */}
            <div className="bg-white rounded-b-lg shadow p-2 flex items-center">
              <input
                type="text"
                className="flex-grow bg-gray-100 rounded-full px-4 py-2 outline-none"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                onClick={handleSendMessage}
                className="ml-2 bg-purple-600 text-white rounded-full p-2"
                disabled={!newMessage.trim()}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Share Location Screen
const ShareLocationScreen = ({ goBack, userView }) => {
  const [locationMethod, setLocationMethod] = useState('current');
  const [pinConfirmed, setPinConfirmed] = useState(false);
  
  return (
    <div className="pb-16">
      <header className="bg-purple-600 text-white p-3 flex items-center">
        <button onClick={goBack} className="mr-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">
          {userView === 'client' ? 'Share Your Location' : 'Client Locations'}
        </h1>
      </header>
      
      <div className="p-4">
        {userView === 'client' ? (
          !pinConfirmed ? (
            <>
              <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <h2 className="text-lg font-bold mb-3">How would you like to share?</h2>
                
                <div className="space-y-3">
                  <button 
                    className={`w-full py-3 px-4 rounded-lg flex items-center justify-between border-2
                      ${locationMethod === 'current' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
                    onClick={() => setLocationMethod('current')}
                  >
                    <div className="flex items-center">
                      <Locate size={24} className="text-purple-600 mr-3" />
                      <span className="font-medium">My Current Location</span>
                    </div>
                    {locationMethod === 'current' && (
                      <div className="h-4 w-4 rounded-full bg-purple-500"></div>
                    )}
                  </button>
                  
                  <button 
                    className={`w-full py-3 px-4 rounded-lg flex items-center justify-between border-2
                      ${locationMethod === 'pin' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
                    onClick={() => setLocationMethod('pin')}
                  >
                    <div className="flex items-center">
                      <MapPin size={24} className="text-purple-600 mr-3" />
                      <span className="font-medium">Drop a Pin on Map</span>
                    </div>
                    {locationMethod === 'pin' && (
                      <div className="h-4 w-4 rounded-full bg-purple-500"></div>
                    )}
                  </button>
                  
                  <button 
                    className={`w-full py-3 px-4 rounded-lg flex items-center justify-between border-2
                      ${locationMethod === 'future' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
                    onClick={() => setLocationMethod('future')}
                  >
                    <div className="flex items-center">
                      <Clock size={24} className="text-purple-600 mr-3" />
                      <span className="font-medium">Where I'll Be Later</span>
                    </div>
                    {locationMethod === 'future' && (
                      <div className="h-4 w-4 rounded-full bg-purple-500"></div>
                    )}
                  </button>
                </div>
              </div>
            
              {/* Map placeholder */}
              <div className="bg-gray-200 rounded-lg h-60 mb-4 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gray-100 opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {locationMethod === 'pin' ? (
                    <MapPin size={40} className="text-purple-600" />
                  ) : (
                    <div className="text-center p-4">
                      <Locate size={40} className="mx-auto mb-2 text-purple-600" />
                      <p className="text-sm text-gray-700">Tap the button below to share your location</p>
                    </div>
                  )}
                </div>
              </div>
              
              <button 
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold text-lg flex items-center justify-center"
                onClick={() => setPinConfirmed(true)}
              >
                {locationMethod === 'current' ? (
                  <>
                    <Locate size={24} className="mr-2" />
                    Share My Current Location
                  </>
                ) : locationMethod === 'pin' ? (
                  <>
                    <MapPin size={24} className="mr-2" />
                    Confirm Pin Location
                  </>
                ) : (
                  <>
                    <Clock size={24} className="mr-2" />
                    Set Future Location
                  </>
                )}
              </button>
            </>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-100 border border-green-300 rounded-lg p-4 text-center">
                <CheckCircle size={48} className="mx-auto mb-2 text-green-600" />
                <h2 className="text-xl font-bold text-green-800">Location Shared!</h2>
                <p className="mt-1">Your case manager has been notified</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-bold mb-2">Who can see this?</h3>
                <p className="text-sm text-gray-700 mb-3">Your location is only shared with your assigned case manager and support team.</p>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-2">
                      <User size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Case Manager Sarah</div>
                      <div className="text-xs text-gray-500">Main Support Contact</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                className="w-full py-3 bg-red-500 text-white rounded-lg font-bold text-lg flex items-center justify-center"
                onClick={() => setPinConfirmed(false)}
              >
                <MapPinOff size={24} className="mr-2" />
                Stop Sharing Location
              </button>
            </div>
          )
        ) : (
          // Staff view of client locations
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-bold mb-3">Active Client Locations</h2>
              
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold">Alex T.</div>
                    <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
                      <Clock size={12} className="mr-1" />
                      30 min ago
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 mb-1">
                    <MapPin size={16} className="mr-1 text-green-600" />
                    <span className="text-sm">Main Village Campus</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm flex items-center">
                      <MessageCircle size={14} className="mr-1" />
                      Message
                    </button>
                    <button className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm flex items-center">
                      <Navigation size={14} className="mr-1" />
                      Directions
                    </button>
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold">Jamie R.</div>
                    <div className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full flex items-center">
                      <Clock size={12} className="mr-1" />
                      2 hours ago
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 mb-1">
                    <MapPin size={16} className="mr-1 text-amber-600" />
                    <span className="text-sm">Downtown Library (Future Location)</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm flex items-center">
                      <MessageCircle size={14} className="mr-1" />
                      Message
                    </button>
                    <button className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm flex items-center">
                      <Navigation size={14} className="mr-1" />
                      Directions
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map view of all clients */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-bold mb-3">Map View</h2>
              
              <div className="bg-gray-200 rounded-lg h-60 mb-2 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gray-100 opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <MapPin size={32} className="text-purple-600 mb-2" />
                  <p className="text-sm text-gray-700">Map showing client locations</p>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 text-center">
                Privacy notice: Exact locations are only visible to assigned case managers
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Mobile Clinic Tracker with Uber-like interface
const MobileClinicTracker = ({ goBack, userView }) => {
  return (
    <div className="pb-16">
      <header className="bg-purple-600 text-white p-3 flex items-center">
        <button onClick={goBack} className="mr-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Mobile Services Tracker</h1>
      </header>
      
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-bold mb-3">Active Mobile Services</h2>
          
          <div className="space-y-3">
            <div className="p-3 border rounded-lg border-blue-200 bg-blue-50 relative">
              <div className="flex justify-between items-start mb-2">
                <div className="font-bold">Mobile Health Clinic</div>
                <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
                  <Clock size={12} className="mr-1" />
                  Active Now
                </div>
              </div>
              <div className="flex items-center text-gray-700 mb-1">
                <MapPin size={16} className="mr-1 text-blue-600" />
                <span className="text-sm">Downtown (10am - 2pm)</span>
              </div>
              <div className="flex items-center text-gray-700 mb-3">
                <ArrowRight size={16} className="mr-1 text-blue-600" />
                <span className="text-sm">Next: East Village (3pm - 6pm)</span>
              </div>
              <div className="flex gap-2">
                <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm flex items-center">
                  <Navigation size={14} className="mr-1" />
                  Directions
                </button>
                <button className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm flex items-center">
                  <MessageCircle size={14} className="mr-1" />
                  Services
                </button>
              </div>
              
              {/* Live tracking status */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 h-16 w-4 flex flex-col items-center">
                <div className="h-4 w-4 rounded-full bg-blue-600"></div>
                <div className="h-8 w-1 bg-blue-300"></div>
                <div className="h-4 w-4 rounded-full bg-gray-300"></div>
              </div>
            </div>
            
            <div className="p-3 border rounded-lg relative">
              <div className="flex justify-between items-start mb-2">
                <div className="font-bold">Food Distribution Van</div>
                <div className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full flex items-center">
                  <Clock size={12} className="mr-1" />
                  Later Today
                </div>
              </div>
              <div className="flex items-center text-gray-700 mb-1">
                <MapPin size={16} className="mr-1 text-amber-600" />
                <span className="text-sm">Balboa Park (12pm - 3pm)</span>
              </div>
              <div className="flex items-center text-gray-700 mb-3">
                <ArrowRight size={16} className="mr-1 text-amber-600" />
                <span className="text-sm">Next: Downtown (4pm - 6pm)</span>
              </div>
              <div className="flex gap-2">
                <button className="bg-amber-100 text-amber-700 px-3 py-1 rounded-lg text-sm flex items-center">
                  <Navigation size={14} className="mr-1" />
                  Directions
                </button>
                <button className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm flex items-center">
                  <MessageCircle size={14} className="mr-1" />
                  Services
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map tracking view */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-bold mb-3">Live Tracking Map</h2>
          
          <div className="bg-gray-200 rounded-lg h-60 mb-2 flex items-center justify-center relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="absolute top-1/4 left-1/3">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-600">
                  <div className="h-3 w-3 rounded-full bg-blue-600 animate-ping"></div>
                </div>
              </div>
              <div className="absolute bottom-1/3 right-1/3">
                <MapPin size={24} className="text-blue-600" />
              </div>
              
              {/* Driving path visualization */}
              <div className="absolute top-1/4 left-1/3 w-24 h-24 border-b-2 border-l-2 border-blue-400 rounded-bl-full opacity-50" />
            </div>
          </div>
          
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <Navigation size={20} className="text-blue-600 mr-2" />
              <div>
                <div className="font-medium">Mobile Health Clinic ETA</div>
                <div className="text-sm">15 minutes to East Village location</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Weekly schedule */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-bold mb-3">Weekly Schedule</h2>
          
          <div className="space-y-1">
            <div className="flex items-center p-2 bg-purple-50 border-l-4 border-purple-500">
              <div className="w-16 text-sm font-bold">Mon</div>
              <div>
                <div className="font-medium">Downtown (10am-2pm)</div>
                <div className="text-xs text-gray-500">East Village (3pm-6pm)</div>
              </div>
            </div>
            
            <div className="flex items-center p-2">
              <div className="w-16 text-sm font-bold">Tue</div>
              <div>
                <div className="font-medium">Balboa Park (9am-1pm)</div>
                <div className="text-xs text-gray-500">North Park (2pm-5pm)</div>
              </div>
            </div>
            
            <div className="flex items-center p-2">
              <div className="w-16 text-sm font-bold">Wed</div>
              <div>
                <div className="font-medium">Mission Valley (10am-2pm)</div>
                <div className="text-xs text-gray-500">Downtown (3pm-6pm)</div>
              </div>
            </div>
            
            <div className="flex items-center p-2">
              <div className="w-16 text-sm font-bold">Thu</div>
              <div>
                <div className="font-medium">East Village (9am-1pm)</div>
                <div className="text-xs text-gray-500">City Heights (2pm-5pm)</div>
              </div>
            </div>
            
            <div className="flex items-center p-2">
              <div className="w-16 text-sm font-bold">Fri</div>
              <div>
                <div className="font-medium">Downtown (10am-3pm)</div>
              </div>
            </div>
          </div>
          
          <button className="w-full mt-3 py-2 text-center text-purple-600 font-medium flex items-center justify-center">
            <bell size={16} className="mr-1" />
            Get Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

// QR Code display screen
const MyCodeScreen = ({ goBack }) => {
  return (
    <div className="pb-16">
      <header className="bg-purple-600 text-white p-3 flex items-center">
        <button onClick={goBack} className="mr-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">My BridgeGap ID</h1>
      </header>
      
      <div className="p-4 flex flex-col items-center">
        <div className="bg-white rounded-lg shadow-md p-6 text-center w-full max-w-xs mb-4">
          <h2 className="text-xl font-bold mb-4">Alex T.</h2>
          
          {/* QR Code Placeholder */}
          <div className="bg-gray-100 h-48 w-48 mx-auto mb-4 flex items-center justify-center border-2 border-gray-300">
            <QrCode size={80} className="text-gray-700" />
          </div>
          
          <div className="text-xl font-mono font-bold tracking-wider">
            FJ-1245-A8T
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Your Personal ID Code
          </div>
        </div>
        
        <div className="space-y-3 w-full max-w-xs">
          <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold flex items-center justify-center">
            <Printer size={20} className="mr-2" />
            Print ID Card
          </button>
          
          <div className="p-3 border rounded-lg bg-blue-50 border-blue-200 text-sm">
            <p className="font-medium">Show this code to:</p>
            <ul className="list-disc ml-5 mt-1 space-y-1">
              <li>Check in at service locations</li>
              <li>Access your account at any device</li>
              <li>Get help when you lose your phone</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Check-in Screen
const CheckInScreen = ({ goBack, userView }) => {
  const [checkInConfirmed, setCheckInConfirmed] = useState(false);
  
  const mockCheckIns = [
    { id: 1, name: 'Alex T.', location: 'Main Village Campus', time: '30 min ago' },
    { id: 2, name: 'Jamie R.', location: 'Mobile Outreach - Downtown', time: '2 hours ago' },
    { id: 3, name: 'Casey B.', location: 'East Village Center', time: '3 hours ago' },
    { id: 4, name: 'Jordan M.', location: 'Balboa Park', time: 'Yesterday, 4:30 PM' }
  ];
  
  return (
    <div className="pb-16">
      <header className="bg-purple-600 text-white p-3 flex items-center">
        <button onClick={goBack} className="mr-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">
          {userView === 'client' ? 'Check In' : 'Client Check-ins'}
        </h1>
      </header>
      
      <div className="p-4">
        {userView === 'client' ? (
          !checkInConfirmed ? (
            <>
              <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <h2 className="text-lg font-bold mb-3">Quick Check-in</h2>
                <p className="text-sm text-gray-700 mb-4">
                  Let your case manager know where you are by checking in. Your location is only shared with your support team.
                </p>
                
                <div className="space-y-3">
                  <button className="w-full py-3 px-4 rounded-lg bg-blue-100 text-blue-700 font-medium flex items-center justify-between border border-blue-300">
                    <div className="flex items-center">
                      <Locate size={24} className="mr-3" />
                      <span>Check in at my current location</span>
                    </div>
                    <ChevronRight size={20} />
                  </button>
                  
                  <button className="w-full py-3 px-4 rounded-lg bg-gray-100 text-gray-700 font-medium flex items-center justify-between border border-gray-300">
                    <div className="flex items-center">
                      <QrCode size={24} className="mr-3" />
                      <span>Scan a location QR code</span>
                    </div>
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <h2 className="text-lg font-bold mb-3">Common Locations</h2>
                
                <div className="space-y-2">
                  <button 
                    className="w-full py-3 px-4 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-between"
                    onClick={() => setCheckInConfirmed(true)}
                  >
                    <div className="flex items-center">
                      <MapPin size={20} className="text-purple-600 mr-2" />
                      <div className="text-left">
                        <div className="font-medium">Main Village Campus</div>
                        <div className="text-xs text-gray-500">1501 Imperial Ave</div>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-purple-600" />
                  </button>
                  
                  <button className="w-full py-3 px-4 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin size={20} className="text-purple-600 mr-2" />
                      <div className="text-left">
                        <div className="font-medium">East Village Center</div>
                        <div className="text-xs text-gray-500">1545 K Street</div>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-purple-600" />
                  </button>
                  
                  <button className="w-full py-3 px-4 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin size={20} className="text-purple-600 mr-2" />
                      <div className="text-left">
                        <div className="font-medium">Downtown Library</div>
                        <div className="text-xs text-gray-500">330 Park Blvd</div>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-purple-600" />
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-bold mb-3">Your Recent Check-ins</h2>
                
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between">
                      <div className="font-medium">Main Village Campus</div>
                      <div className="text-xs text-gray-500">Yesterday</div>
                    </div>
                    <div className="text-sm text-gray-500">10:30 AM</div>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between">
                      <div className="font-medium">Downtown Library</div>
                      <div className="text-xs text-gray-500">Apr 26</div>
                    </div>
                    <div className="text-sm text-gray-500">2:15 PM</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-100 border border-green-300 rounded-lg p-4 text-center">
                <CheckCircle size={48} className="mx-auto mb-2 text-green-600" />
                <h2 className="text-xl font-bold text-green-800">Checked In Successfully!</h2>
                <p className="mt-1">Your case manager has been notified</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-bold mb-3">Check-in Details</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between p-2 border-b">
                    <div className="text-gray-600">Location</div>
                    <div className="font-medium">Main Village Campus</div>
                  </div>
                  
                  <div className="flex justify-between p-2 border-b">
                    <div className="text-gray-600">Time</div>
                    <div className="font-medium">Apr 28, 10:30 AM</div>
                  </div>
                  
                  <div className="flex justify-between p-2">
                    <div className="text-gray-600">Status</div>
                    <div className="font-medium text-green-600">Confirmed</div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-purple-600 text-white rounded-lg font-medium">
                  Share Location
                </button>
                <button 
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium"
                  onClick={() => setCheckInConfirmed(false)}
                >
                  Done
                </button>
              </div>
            </div>
          )
        ) : (
          // Staff view of check-ins
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-bold mb-3">Today's Check-ins</h2>
              
              <div className="space-y-3">
                {mockCheckIns.map(checkIn => (
                  <div key={checkIn.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-bold">{checkIn.name}</div>
                      <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        {checkIn.time}
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin size={16} className="mr-1" />
                      <span className="text-sm">{checkIn.location}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm flex items-center">
                        <MessageCircle size={14} className="mr-1" />
                        Message
                      </button>
                      <button className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm flex items-center">
                        <Navigation size={14} className="mr-1" />
                        Directions
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Map view of all check-ins */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-bold mb-3">Check-in Map</h2>
              
              <div className="bg-gray-200 rounded-lg h-60 mb-2 flex items-center justify-center relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="absolute top-1/4 left-1/3">
                    <MapPin size={24} className="text-purple-600" />
                  </div>
                  <div className="absolute bottom-1/3 right-1/3">
                    <MapPin size={24} className="text-blue-600" />
                  </div>
                  <div className="absolute top-1/2 right-1/4">
                    <MapPin size={24} className="text-green-600" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-bold mb-3">Check-in Statistics</h2>
              
              <div className="space-y-2">
                <div className="flex justify-between p-2 border-b">
                  <div className="text-gray-600">Today</div>
                  <div className="font-medium">12 check-ins</div>
                </div>
                
                <div className="flex justify-between p-2 border-b">
                  <div className="text-gray-600">This Week</div>
                  <div className="font-medium">47 check-ins</div>
                </div>
                
                <div className="flex justify-between p-2">
                  <div className="text-gray-600">Most Popular</div>
                  <div className="font-medium">Main Village Campus</div>
                </div>
              </div>
              
              <button className="w-full mt-3 py-2 text-center text-purple-600 font-medium">
                View Detailed Reports
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const bell = ({ size = 24, className = "" }) => (
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

export default BridgeGapApp;
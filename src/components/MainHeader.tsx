import React from 'react';
import { Home, QrCode, CheckCircle, MapPin, MessageCircle } from 'lucide-react';

interface MobileNavProps {
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeScreen, setActiveScreen }) => {
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

export default MobileNav;
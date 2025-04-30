import React, { useState } from 'react';
import { Book, MapPin, MessageCircle, X, Search, ChevronLeft } from 'lucide-react';
import { ShareIcon } from './IconComponents';

interface MapPageProps {
  goBack: () => void;
}

const MapPage: React.FC<MapPageProps> = ({ goBack }) => {
  const [showOverview, setShowOverview] = useState(true);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  
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
                <ShareIcon size={20} className="text-[#B36E00]" />
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

export default MapPage;
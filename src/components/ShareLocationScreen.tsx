import React from 'react';
import { Locate, MapPin, Clock } from 'lucide-react';

interface ShareLocationScreenProps {
  goBack: () => void;
  userView: string;
}

const ShareLocationScreen: React.FC<ShareLocationScreenProps> = ({ goBack, userView }) => {
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

export default ShareLocationScreen;
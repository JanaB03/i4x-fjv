import React from 'react';
import { MapPin, ArrowRight, Navigation, MessageCircle, Clock } from 'lucide-react';

interface MobileClinicTrackerProps {
  goBack: () => void;
  userView: string;
}

const MobileClinicTracker: React.FC<MobileClinicTrackerProps> = ({ goBack, userView }) => {
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

export default MobileClinicTracker;
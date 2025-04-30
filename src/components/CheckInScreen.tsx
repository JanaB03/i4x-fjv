import React from 'react';
import { Locate, QrCode, MapPin, ChevronRight } from 'lucide-react';

interface CheckInScreenProps {
  goBack: () => void;
  userView: string;
}

const CheckInScreen: React.FC<CheckInScreenProps> = ({ goBack, userView }) => {
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

export default CheckInScreen;
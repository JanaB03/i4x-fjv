import React from 'react';
import { QrCode, Printer } from 'lucide-react';

interface MyCodeScreenProps {
  goBack: () => void;
}

const MyCodeScreen: React.FC<MyCodeScreenProps> = ({ goBack }) => {
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

export default MyCodeScreen;
import React from 'react';
import { 
  Zap, 
  CheckCircle, 
  MessageCircle, 
  MapPin, 
  Navigation, 
  Bell, 
  Calendar, 
  Plus, 
  User,
  QrCode
} from 'lucide-react';

interface HomeScreenProps {
  userView: string;
  toggleUserView: () => void;
  navigateTo: (screen: string) => void;
  onLogout: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ 
  userView, 
  toggleUserView, 
  navigateTo, 
  onLogout 
}) => {
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

export default HomeScreen;
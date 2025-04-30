import React, { useState } from 'react';

// Import all components
import MainHeader from '@/components/MainHeader';
import MobileNav from '@/components/MobileNav';
import LoginScreen from '@/components/LoginScreen';
import HomeScreen from '@/components/HomeScreen';
import MessagesScreen from '@/components/MessagesScreen';
import ShareLocationScreen from '@/components/ShareLocationScreen';
import MobileClinicTracker from '@/components/MobileClinicTracker';
import MyCodeScreen from '@/components/MyCodeScreen';
import CheckInScreen from '@/components/CheckInScreen';
import MapPage from '@/components/MapPage';

const Index: React.FC = () => {
  // Application state
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
      return <LoginScreen 
        onLogin={() => setIsLoggedIn(true)}
        navigateTo={setActiveScreen}
      />;
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
      
      <div className="container mx-auto px-4 md:px-6">
        {activeScreen !== 'mapPage' ? renderContent() : null}
      </div>
      
      {/* Full-width container for map page */}
      {activeScreen === 'mapPage' && renderContent()}
      
      {showMobileNav && (
        <MobileNav 
          activeScreen={activeScreen} 
          setActiveScreen={setActiveScreen} 
        />
      )}
    </div>
  );
};

export default Index;
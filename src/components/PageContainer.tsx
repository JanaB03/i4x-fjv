
import React from 'react';
import Header from './Header';
import MainNav from './MainNav';
import { useIsMobile } from '@/hooks/use-mobile';

interface PageContainerProps {
  children: React.ReactNode;
  withPadding?: boolean;
}

const PageContainer: React.FC<PageContainerProps> = ({ 
  children,
  withPadding = true 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 ${withPadding ? 'container mx-auto px-4 py-4 md:py-6' : ''} ${isMobile ? 'pb-20' : ''}`}>
        {children}
      </main>
      <MainNav />
    </div>
  );
};

export default PageContainer;

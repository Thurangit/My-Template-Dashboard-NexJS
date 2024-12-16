'use client';

import React, { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import Navbar from '../components/navBar';
import Sidebar from '../components/sideBar';
import FloatingAssistantButton from '../components/floatingAssistant';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Fermer la sidebar sur mobile par défaut
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <html lang="fr">
      <body className={`${inter.className} flex h-screen bg-gray-100 overflow-hidden`}>
        <div className="flex w-full">
          {!isMobile && (
            <Sidebar 
              isOpen={isSidebarOpen} 
              toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
            />
          )}
          
          <div className={`
            flex-1 
            flex 
            flex-col 
            ${!isMobile && isSidebarOpen ? 'md:ml-64' : 'ml-0'}
            transition-all 
            duration-300
            h-full
            overflow-hidden
          `}>
            <Navbar 
              toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              isMobile={isMobile}
            />
            
            {isMobile && isSidebarOpen && (
              <Sidebar 
                isOpen={isSidebarOpen} 
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
              />
            )}
            
            <main className="flex-1 p-4 overflow-y-auto">
              {children}
            </main>
          </div>
          
          <FloatingAssistantButton />
        </div>
      </body>
    </html>
  );
}
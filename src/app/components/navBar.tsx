'use client';
import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  Menu, 
  X, 
  User, 
  Settings, 
  LogOut, 
  ChevronUp,
  ChevronDown,
  Globe
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const LANGUAGES = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
];
// Language Option Type
interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

interface NavbarProps {
  toggleSidebar: () => void;
  isMobile?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isMobile = false }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
   const [isLanguageOpen, setIsLanguageOpen] = useState(false);
 
const [currentLanguage, setCurrentLanguage] = useState(LANGUAGES[0]);

  // Language Options
  const languageOptions: LanguageOption[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];
 
  const notifications = [
    { title: 'Nouvelle tâche assignée', date: '2024-02-15', time: '14:30' },
    { title: 'Réunion à venir', date: '2024-02-16', time: '10:00' },
    { title: 'Rapport terminé', date: '2024-02-14', time: '16:45' }
  ];

  // Composant de menu mobile et desktop
  const ProfileDropdownMenu = () => (
    <div className="absolute right-4 top-16 bg-white shadow-lg rounded-lg p-2 w-48">
      <ul className="space-y-2">
        <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100 flex items-center">
          <User className="w-5 h-5 mr-2" />
          <span>Profil</span>
        </Link>
        <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          <span>Paramètres</span>
        </Link>
        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
          <LogOut className="w-5 h-5 mr-2" />
          <span>Déconnexion</span>
        </button>
      </ul>
    </div>
  );

  // Composant de menu mobile
  const MobileMenu = () => (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween' }}
      className="fixed top-0 right-0 w-full h-full bg-white z-60 p-6 overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Menu</h2>
        <button onClick={() => setIsMobileMenuOpen(false)}>
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3 border-b pb-3">
          <Image 
            src="/avatar.jpg" 
            alt="Profile" 
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <h3 className="font-semibold">Nom Utilisateur</h3>
            <p className="text-sm text-gray-500">email@exemple.com</p>
          </div>
        </div>

         <div className="relative">
          <button  onClick={() => setIsLanguageOpen(!isLanguageOpen)} >
            <div className="relative">
              <Globe className="text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
               {currentLanguage.flag} 
              </span>
            </div>
          </button>
        </div>

        {/* Language Selector */}
        <div className="space-y-4">
        {/*   <button 
            onClick={() => setIsLanguageOpen(!isLanguageOpen)} 
            className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition"
          >
            <Globe className="text-gray-600" />
            <span className="hidden md:inline">{currentLanguage.flag} {currentLanguage.name}</span>
          < /button>*/}

          <AnimatePresence>
            {isLanguageOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg border w-56 z-50"
              >
                <ul className="py-1">
                  {LANGUAGES.map((language) => (
                    <li 
                      key={language.code}
                      onClick={() => handleLanguageChange(language)}
                      className={`
                        flex items-center space-x-3 px-4 py-2 
                        hover:bg-gray-100 cursor-pointer 
                        ${currentLanguage.code === language.code ? 'bg-blue-50' : ''}
                      `}
                    >
                      <span className="text-xl">{language.flag}</span>
                      <span>{language.name}</span>
                      {currentLanguage.code === language.code && (
                        <span className="ml-auto text-blue-500">✓</span>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <nav>
          <ul className="space-y-4">
            {[
              { icon: User, label: 'Profil', href: '/profile' },
              { icon: Settings, label: 'Paramètres', href: '/settings' },
              { icon: LogOut, label: 'Déconnexion', href: '/logout' }
            ].map(({ icon: Icon, label, href }, index) => (
              <li 
                key={index} 
                className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded"
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.div>
  );

  // Composant de notifications mobile
  const MobileNotifications = () => (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween' }}
      className="fixed top-0 right-0 w-full h-full bg-white z-60 p-6 overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Notifications</h2>
        <button onClick={() => setIsNotificationsOpen(false)}>
          <X className="w-6 h-6" />
        </button>
      </div>

      {notifications.map((notification, index) => (
        <div 
          key={index} 
          className="border-b py-4 hover:bg-gray-100"
        >
          <h3 className="font-semibold">{notification.title}</h3>
          <p className="text-sm text-gray-500">
            {notification.date} à {notification.time}
          </p>
        </div>
      ))}
    </motion.div>
  );

  // Navbar pour mobile
  if (isMobile) {
    return (
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <button onClick={toggleSidebar}>
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button onClick={() => setIsSearchOpen(true)}>
              <Search className="w-5 h-5" />
            </button>
          </div>

          <button onClick={() => setIsNotificationsOpen(true)} className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
              {notifications.length}
            </span>
          </button>

          <button onClick={() => setIsMobileMenuOpen(true)}>
            <Image 
              src="/avatar.jpg" 
              alt="Profile" 
              width={32}
              height={32}
              className="rounded-full"
            />
          </button>
        </div>

        {/* Modals pour mobile */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-0 left-0 w-full bg-white p-4 z-50 flex items-center"
            >
              <div 
                className="
                  flex items-center 
                  transition-all duration-300 
                  w-full
                  bg-gray-100 
                  rounded-full 
                  overflow-hidden
                "
              >
                <Search className="h-5 w-5 m-2 text-gray-600" />
                <input 
                  type="text" 
                  placeholder="Rechercher..." 
                  className="
                    w-full 
                    bg-transparent 
                    outline-none 
                    px-2 
                    py-1
                    text-gray-800
                  "
                />
                <button onClick={() => setIsSearchOpen(false)} className="mr-2">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
          
          {isMobileMenuOpen && <MobileMenu />}
          {isNotificationsOpen && <MobileNotifications />}
        </AnimatePresence>
      </nav>
    );
  }
    const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    setIsLanguageOpen(false);
  };

  // Navbar pour desktop
  return (
      <nav className="bg-white shadow-md p-4 flex justify-between items-center relative">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="mr-4">
          <span className="text-xl font-bold">☰</span>
        </button>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Recherche */}
        <div className="relative">
          {isSearchOpen ? (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="
                flex items-center 
                bg-gray-100 
                rounded-full 
                overflow-hidden
              "
            >
              <Search className="h-5 w-5 m-2 text-gray-600" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="
                  w-full 
                  bg-transparent 
                  outline-none 
                  px-2 
                  py-1
                  text-gray-800
                "
              />
              <button onClick={() => setIsSearchOpen(false)} className="mr-2">
                <X className="text-gray-600" />
              </button>
            </motion.div>
          ) : (
            <button onClick={() => setIsSearchOpen(true)}>
              <Search className="text-gray-600" />
            </button>
          )}
        </div>
        
        {/* Notifications */}
        <div className="relative">
          <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}>
            <div className="relative">
              <Bell className="text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                {notifications.length}
              </span>
            </div>
          </button>
        </div>
        <div className="relative">
          <button  onClick={() => setIsLanguageOpen(!isLanguageOpen)} >
            <div className="relative">
              <Globe className="text-gray-600" />
             
            </div>
          </button>
        </div>
        
        {/* Language Selector */}
        <div className="relative">
       

          <AnimatePresence>
            {isLanguageOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg border w-56 z-50"
              >
                <ul className="py-1">
                  {LANGUAGES.map((language) => (
                    <li 
                      key={language.code}
                      onClick={() => handleLanguageChange(language)}
                      className={`
                        flex items-center space-x-3 px-4 py-2 
                        hover:bg-gray-100 cursor-pointer 
                        ${currentLanguage.code === language.code ? 'bg-blue-50' : ''}
                      `}
                    >
                      <span className="text-xl">{language.flag}</span>
                      <span>{language.name}</span>
                      {currentLanguage.code === language.code && (
                        <span className="ml-auto text-blue-500">✓</span>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Profil */}
        <div className="flex items-center relative">
          <Image 
            src="/avatar.jpg" 
            alt="Profile" 
            width={40}
            height={40}
            className="rounded-full mr-2"
          />
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {isDropdownOpen && <ProfileDropdownMenu />}
        </div>
      </div>


      {/* Off-canvas Notifications */}
      <AnimatePresence>
        {isNotificationsOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Notifications</h2>
              <button onClick={() => setIsNotificationsOpen(false)}>
                <X className="text-gray-600" />
              </button>
            </div>
            {notifications.map((notification, index) => (
              <div 
                key={index} 
                className="border-b py-3 hover:bg-gray-100 transition"
              >
                <h3 className="font-semibold">{notification.title}</h3>
                <p className="text-sm text-gray-500">
                  {notification.date} à {notification.time}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
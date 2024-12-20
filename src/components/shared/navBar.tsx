'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  Globe,
  Lock,
  AlignJustify,
  PanelLeft, // Nouvel icône pour l'animation de sidebar
  PanelsTopLeft,
  ChevronLeftCircleIcon
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import logo from "@/utilities/images/logos/logo_AGL_rgb_Blue.png"
import logoSCP from "@/utilities/images/logos/logoScpao.jpg"
import { THEMES } from './themes';
import { useOrganizationStore } from './storeoftheme';
import { useRouter } from 'next/router';

const LANGUAGES = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  // { code: 'es', name: 'Español', flag: '🇪🇸' },
  // { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
];

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}



interface NavbarProps {
  toggleSidebar: () => void;
  isMobile?: boolean;
  isSidebarOpen?: boolean;
}

interface Organization {
  id: any;
  name: any;
  code: any;  // Explicitly define the allowed values
  logo?: any;
}

const Navbar: React.FC<NavbarProps> = ({
  toggleSidebar,
  isMobile = false,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(LANGUAGES[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { currentOrganization, getCurrentTheme } = useOrganizationStore();
  const theme = getCurrentTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { i18n } = useTranslation();
  const router = useRouter();

  // Synchroniser l'état local avec la langue active
  useEffect(() => {
    const activeLanguage = LANGUAGES.find(
      (language) => language.code === i18n.language
    );
    if (activeLanguage) {
      setCurrentLanguage(activeLanguage);
    }
  }, [i18n.language]);
 
  // const changeLanguage = (lng: string) => {
  //   i18n.changeLanguage(lng);
  //   const selectedLanguage = LANGUAGES.find((lang) => lang.code === lng);
  //   console.log('langage',selectedLanguage)
   
  //   if (selectedLanguage) {
  //     setCurrentLanguage(selectedLanguage);
  //   }
  // }
  const changeLanguage = (lng: string) => {
    const currentPath = router.asPath === '/' ? `/${i18n.language}` : router.asPath;
    const newPath = currentPath.replace(`/${i18n.language}`, `/${lng}`);
    i18n.changeLanguage(lng);
    router.push(newPath);
  };
  const toggleSidebarMotion = () => {
    setIsSidebarOpen(prevState => !prevState);
  };
  // Liste des organisations
  const organizations: Organization[] = [
    {
      id: '1',
      name: 'AGL Group',
      code: 'agl',  // Now must be one of the defined values
      logo: logo,
    },
    {
      id: '2',
      name: 'SCP',
      code: 'scp',  // Now must be one of the defined values
      logo: logoSCP
    }
  ];

  // Fermeture du dropdown si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const notifications = [
    { title: 'Nouvelle tâche assignée', date: '2024-02-15', time: '14:30', isOpen: false },
    { title: 'Réunion à venir', date: '2024-02-16', time: '10:00', isOpen: false },
    { title: 'Rapport terminé', date: '2024-02-14', time: '16:45', isOpen: false }
  ];



  const { setCurrentOrganization } = useOrganizationStore();

  const handleOrganizationSelect = (org: {
    id: string;
    name: string;
    code: keyof typeof THEMES;
    logo?: string;
  }) => {
    // Ensure the organization code is valid
    if (THEMES[org.code]) {
      setCurrentOrganization(org);
      // Additional logic like closing dropdown can be added here
    } else {
      console.error(`Invalid organization code: ${org.code}`);
    }
  };

  // Menu des organisations pour desktop
  const OrganizationDropdown = () => (
    <motion.div
      ref={dropdownRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`
      ${isMobile
          ? 'fixed top-0 right-0 w-full h-full bg-white z-[100] p-6 overflow-y-auto'
          : 'absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg border w-64 z-[100]'
        }
    `}
    >
      <div className="px-4 py-2 border-b">
        <h3 className="font-semibold text-gray-700">Organisations</h3>
      </div>

      <div className="py-2">
        {organizations.map((org) => (
          <div
            key={org.id}
            className="
              px-4 py-2 
              hover:bg-gray-100 
              cursor-pointer 
              flex items-center 
              space-x-3
            "
            onClick={() => handleOrganizationSelect(org)}
          >
            <Image
              src={org.logo || logo}
              alt={`Logo ${org.name}`}
              width={32}
              height={32}
              className="rounded"
            />
            <span>{org.name}</span>
          </div>
        ))}
      </div>

      <div className="border-t py-2">
        <div
          className="
            px-4 py-2 
            hover:bg-gray-100 
            cursor-pointer 
            flex items-center 
            space-x-3 
            text-orange-500
          "
        >
          <Lock className="w-5 h-5" />
          <span>Verrouiller</span>
        </div>
        <div
          className="
            px-4 py-2 
            hover:bg-gray-100 
            cursor-pointer 
            flex items-center 
            space-x-3 
            text-red-500
          "
        >
          <LogOut className="w-5 h-5" />
          <span>Déconnexion</span>
        </div>
      </div>
    </motion.div>
  );

  // Reste du code précédent (methods like handleLanguageChange, etc.) reste identique

  // Navbar pour mobile
  if (isMobile) {
    return (
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <button onClick={toggleSidebar}>
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex items-center space-x-4">
          {/* Recherche */}
          <button onClick={() => setIsSearchOpen(true)}>
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button onClick={() => setIsNotificationsOpen(true)} className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
              {notifications.length}
            </span>
          </button>

          {/* Bouton de menu (organisations) */}
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center">
            <Image
              src={logo}
              alt="Logo"
              width={32}
              height={32}
              className="rounded"
            />

          </button>
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
          </button>

        </div>

        <AnimatePresence>
          {isDropdownOpen && <OrganizationDropdown />}
        </AnimatePresence>

        {/* Modals pour mobile */}
        <AnimatePresence>
          {/* Modal de recherche */}
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-0 left-0 w-full bg-white p-4 z-50 flex items-center"
            >
              <div className="flex items-center w-full bg-gray-100 rounded-full overflow-hidden">
                <Search className="h-5 w-5 m-2 text-gray-600" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full bg-transparent outline-none px-2 py-1 text-gray-800"
                />
                <button onClick={() => setIsSearchOpen(false)} className="mr-2">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Modal des organisations */}
          {isDropdownOpen && <OrganizationDropdown />}

          {/* Modal des notifications */}
          {isNotificationsOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="fixed top-0 right-0 w-full h-full bg-white z-60 p-6 overflow-y-auto z-[100]"
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
          )}
        </AnimatePresence>
      </nav>
    );
  }

  // Navbar pour desktop
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center relative">
      <div className="flex items-center">
        <button
          onClick={() => {
            toggleSidebar(); // Votre méthode originale de toggle
            toggleSidebarMotion(); // Votre méthode d'animation
          }}
          className="mr-4 group transition-all duration-300 ease-in-out"
        >
          <AnimatePresence mode="wait">
            {!isSidebarOpen ? (
              <motion.div
                key="menu-icon"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronLeftCircleIcon
                  className="text-gray-600 
                    group-hover:text-blue-500 
                    transition-colors 
                    duration-300 
                    w-6 h-6"
                />
              </motion.div>
            ) : (
              <motion.div
                key="close-icon"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PanelsTopLeft
                  className="
                    text-gray-600 
                    group-hover:text-blue-500 
                    transition-colors 
                    duration-300 
                    w-6 h-6
                  "
                />
              </motion.div>
            )}
          </AnimatePresence>
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
           <button onClick={() => setIsLanguageOpen(!isLanguageOpen)}>
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
                    onClick={() => changeLanguage(language.code)}
                    className={`
                      flex items-center space-x-3 px-4 py-2 
                      hover:bg-gray-100 cursor-pointer 
                      ${
                        currentLanguage.code === language.code
                          ? 'bg-blue-50'
                          : ''
                      }
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
            src={theme.logo}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full mr-2"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
          </button>

          {isDropdownOpen && <OrganizationDropdown />}
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


'use client';
import React, { useState } from 'react';
import { 
  Home, 
  Settings, 
  Users, 
  ChartBar, 
  Briefcase, 
  ChevronRight, 
  ChevronDown 
} from 'lucide-react';
import { THEMESIDEBAR } from '../styles/themes';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  subItems?: { label: string; link?: string }[];
}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, label, subItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (subItems) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <div 
        onClick={handleToggle} 
        className="flex items-center justify-between hover:bg-blue-700 p-2 rounded cursor-pointer"
      >
        <div className="flex items-center space-x-3">
          <Icon className={`w-5 h-5 ${THEMESIDEBAR.sidebar.icon}`} />
          <span>{label}</span>
        </div>
        {subItems && (
          isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
        )}
      </div>
      
      {subItems && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: 1, 
                height: 'auto',
                transition: { 
                  duration: 0.3,
                  ease: "easeInOut"
                }
              }}
              exit={{ 
                opacity: 0, 
                height: 0,
                transition: { 
                  duration: 0.2,
                  ease: "easeInOut"
                }
              }}
              className="pl-10 space-y-2 mt-2"
            >
              {subItems.map((subItem, index) => (
                <div 
                  key={index} 
                  className="hover:bg-blue-600 p-2 rounded"
                >
                  {subItem.label}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

const Sidebar: React.FC<{
  isOpen: boolean;
  toggleSidebar: () => void;
}> = ({ isOpen = true, toggleSidebar }) => {
  const menuItems: MenuItemProps[] = [
    { 
      icon: Home, 
      label: 'Tableau de bord',
      subItems: [
        { label: 'Vue d\'ensemble' },
        { label: 'Statistiques' },
        { label: 'Rapports' }
      ]
    },
    { 
      icon: Users, 
      label: 'Utilisateurs',
      subItems: [
        { label: 'Liste des utilisateurs' },
        { label: 'Gestion des rôles' },
        { label: 'Permissions' }
      ]
    },
    { 
      icon: ChartBar, 
      label: 'Analytics',
      subItems: [
        { label: 'Performance' },
        { label: 'Tendances' },
        { label: 'Prévisions' }
      ]
    },
    { 
      icon: Briefcase, 
      label: 'Projets',
      subItems: [
        { label: 'Projets en cours' },
        { label: 'Historique' },
        { label: 'Nouveau projet' }
      ]
    },
    { 
      icon: Settings, 
      label: 'Paramètres',
      subItems: [
        { label: 'Compte' },
        { label: 'Préférences' },
        { label: 'Intégrations' }
      ]
    }
  ];

  return (
    <aside 
      className={`
        ${THEMESIDEBAR.sidebar.background} 
        ${THEMESIDEBAR.sidebar.text} 
        w-64 
        h-full 
        fixed 
        z-40 
        transition-transform 
        duration-300 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        overflow-y-auto
        pb-10
      `}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-10"
          />
          <button onClick={toggleSidebar} className="text-white">
            ☰
          </button>
        </div>
        
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <MenuItem {...item} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
// Sidebar.tsx
import React from 'react';
import {getMenuItems } from './menuData'; // Importer les données du menu
import MenuItem from './MenuItem';
import avatar from "@/utilities/images/avatars/avatar.jpg";
import Image from 'next/image';
import { THEMES } from './themes';
import { X } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { useOrganizationStore } from './storeoftheme';
import Link from 'next/link';
import slugify from './slugify';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}
const code_societe = "agl";
const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {

const { t } = useTranslation('common'); // 'common' est le namespace
const MENU_ITEMS = getMenuItems(t);

const { currentOrganization, getCurrentTheme } = useOrganizationStore();
const theme = getCurrentTheme();

  return (
    <aside
      className={`
        ${theme.sidebar.background}
        ${theme.sidebar.text}
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
        {/* Bouton pour fermer */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <button onClick={toggleSidebar} className="text-white">
            <X />
          </button>
        </div>

        {/* Avatar et infos utilisateur */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative w-24 h-24 mb-4">
            <Image
              src={avatar}
              alt={`Thuran Junior`}
              className="w-full h-full rounded-full object-cover"
            />
            <div className="absolute bottom-2 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="text-center w-full px-2">
            <div className="text-sm font-bold">{`Thuran Junior`}</div>
            <div className="text-xs text-gray-400 mt-0">{`E-Junior.Kono@aglgroup.com`}</div>
          </div>
        </div>

        {/* Menu dynamique */}
        <nav>
           <ul className="space-y-2">
            {MENU_ITEMS.map((item, index) => (
              <li key={index}>
                {/* Passe les props du menu à MenuItem */}
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

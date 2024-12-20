import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { THEMES } from './themes';
import Link from 'next/link';
import slugify from './slugify';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';


interface MenuItemProps {
  icon: React.ElementType; // Icône principale
  label: string; // Nom de l'élément
  subItems?: { label: string; link?: string }[]; // Sous-éléments
}
const code_societe = "agl";
const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, label, subItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (subItems) setIsOpen(!isOpen);
  };
  const { locale } = useRouter(); // Récupère la locale active depuis le routeur

  const { t } = useTranslation('common');
 
  console.log('locale',locale)
  return (
    <div>
      {/* Élément principal du menu */}
      <div
        onClick={handleToggle}
        className="flex items-center justify-between hover:bg-blue-700 p-2 rounded cursor-pointer"
      >
          {!subItems ? (
            <Link href={`/${t('locale')}/${slugify(label)}`}>
             <div className="flex items-center space-x-3">
             <Icon className={`w-5 h-5 ${THEMES[code_societe]?.sidebar?.icon  }`} />
                    <span>{label}</span>
            </div>
            </Link>) :
            <div className="flex items-center space-x-3">
                 <Icon className={`w-5 h-5 ${THEMES[code_societe]?.sidebar?.icon  }`} />
            <span>{label}</span>
            </div>
        }
        {/* Icône déroulante */}
        {subItems && (
          isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
        )}
      </div>
        
      {/* Sous-menus animés */}
      {subItems && subItems.length > 0 &&  (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: 'auto',
                transition: { duration: 0.3, ease: 'easeInOut' }
              }}
              exit={{
                opacity: 0,
                height: 0,
                transition: { duration: 0.2, ease: 'easeInOut' }
              }}
              className="pl-10 space-y-2 mt-2"
            >
              {subItems.map((subItem, index) => (
                <div
                  key={index}
                  className="hover:bg-blue-600 p-2 rounded cursor-pointer"
                >
                <Link href={`/${t('locale')}/${slugify(subItem.label)}`}>
                  {subItem.label}
                </Link>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>


  );
};

export default MenuItem;

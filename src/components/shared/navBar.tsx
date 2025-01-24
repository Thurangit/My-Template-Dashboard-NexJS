
import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Search,
  ChevronDown,
  ChevronUp,
  Settings,
  LogOut,
  Menu as MenuIcon,
  X,
  LayoutDashboard,
  Layers,
  FormInput,
  Star,
  PieChart,
  Table,
  File,
  User,
  Globe
} from 'lucide-react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import logo from "@/utilities/images/logos/logo_AGL_rgb_Blue.png"
import logoSCP from "@/utilities/images/logos/logoScpao.jpg"
import { THEMES } from './themes';
import { useOrganizationStore } from './storeoftheme';
import { useMsal } from "@azure/msal-react";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { FormControl } from '@mui/material';
import Link from 'next/link';

interface Organization {
  id: any;
  name: any;
  code: any;  // Explicitly define the allowed values
  logo?: any;
}

// Types
type NavItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
  subItems?: {
    label: string;
    icon: React.ReactNode;
    href: string;
    subItems?: {
      label: string;
      icon: React.ReactNode;
      href: string;
      subItems?: {
        label: string;
        icon: React.ReactNode;
        href: string;
      }[];
    }[];
  }[];
};




const navigationItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-4 h-4" />,
    href: '/Accueil',
  },
  {
    label: 'UI Elements',
    icon: <Layers className="w-4 h-4" />,
    href: '/ui-elements',
    subItems: [
      {
        label: 'Tables',
        icon: <Star className="w-4 h-4" />,
        href: '/ui-elements/buttons',
        subItems: [
          {
            label: 'Table Simple',
            icon: <Star className="w-4 h-4" />,
            href: '/ui-elements/buttons/primary',
          
          },
          {
            label: 'Table data',
            icon: <Star className="w-4 h-4" />,
            href: '/Components'
          }
        ]
      },
      {
        label: 'Cards',
        icon: <Star className="w-4 h-4" />,
        href: '/ui-elements/cards'
      },
    ],
  },
  {
    label: 'Forms',
    icon: <FormInput className="w-4 h-4" />,
    href: '/forms',
    subItems: [
      {
        label: 'Basic Forms',
        icon: <FormControl className="w-4 h-4" />,
        href: '/Components',
        subItems: [
          {
            label: 'Input Fields',
            icon: <Star className="w-4 h-4" />,
            href: '/forms/basic/inputs',
            subItems: [
              {
                label: 'Text Inputs',
                icon: <Star className="w-4 h-4" />,
                href: '/forms/basic/inputs/text'
              }
            ]
          },
          {
            label: 'Input Fields 2',
            icon: <Star className="w-4 h-4" />,
            href: '/forms/basic/inputs',

          },
          {
            label: 'Input Fields 3',
            icon: <Star className="w-4 h-4" />,
            href: '/forms/basic/inputs',

          },
          {
            label: 'Input Fields 4',
            icon: <Star className="w-4 h-4" />,
            href: '/forms/basic/inputs',

          },
        ],

      }

    ]
  },

];

const LANGUAGES = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

const Logo = () => (
  <div className="flex items-center gap-2">
    <UserProfile />
  </div>
);

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative flex-1 max-w-md">
      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Recherche..."
        className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { accounts, instance } = useMsal();

  const { currentOrganization, getCurrentTheme } = useOrganizationStore();
  const { setCurrentOrganization } = useOrganizationStore();

  const theme = getCurrentTheme();
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

  const userInfos = {
    name: `${accounts[0]?.name}`,
    avatar: '/logos/logo_AGL_rgb_Blue.png',
    email: `${accounts[0]?.username}`
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await instance.logoutRedirect(); // Déconnexion via MSAL avec redirection
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
      >
        <img
          src={theme.logo}
          alt="User"
          className="w-8 h-8 rounded-full"
        />
        <div className="hidden-md-block text-left">
          <div className="text-sm font-medium">{userInfos.name}</div>
          <div className="text-xs text-gray-500">{userInfos.email}</div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
          <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2">
            <User className="w-4 h-4" />
            Profil
          </button>
          {/* <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </button> */}
          <hr className="my-1" />
          <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-red-600"
            onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
};




const OrganizationSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { currentOrganization, getCurrentTheme } = useOrganizationStore();
  const { setCurrentOrganization } = useOrganizationStore();

  const organizations: Organization[] = [
    {
      id: '1',
      name: 'AGL Group',
      code: 'agl',  // Now must be one of the defined values
      logo: "https://th.bing.com/th?q=Logos+AGL&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=en-WW&cc=CM&setlang=fr&adlt=moderate&t=1&mw=247",
    },
    {
      id: '2',
      name: 'SOCOPAO',
      code: 'scp',  // Now must be one of the defined values
      logo: "https://cecomar.sn/wp-content/uploads/2022/12/socopao-300x175.jpg"
    }
  ];
  const theme = getCurrentTheme();
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
      >
        <img src={theme.logo} alt="Organization" className="w-6 h-6 rounded" />
        <span>{theme.cygle}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border py-1 z-50">
          {organizations.map((org) => (
            <button
              key={org.id}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
              onClick={() => handleOrganizationSelect(org)}
            >
              <img src={org.logo}
                alt={org.name} className="w-6 h-6 rounded" />
              <span>{org.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifications = [
    { title: 'Nouvelle validation', time: '2 min ' },
    { title: 'Rappel validateur', time: '1 heure ' },
    { title: 'Demande en attente', time: '2 heure ' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100"
      >
        <Bell className="w-5 h-5 text-gray-600" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
          3
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification, index) => (
              <div key={index} className="p-4 border-b hover:bg-gray-50">
                <div className="font-medium">{notification.title}</div>
                <div className="text-sm text-gray-500">{notification.time}</div>
              </div>
            ))}
          </div>
          <div className="p-4 text-center">
            <button className="text-blue-600 hover:text-blue-800">
              Voir toutes les notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(LANGUAGES[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
      >
        <Globe className="w-5 h-5" />
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.code.toUpperCase()}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
          {LANGUAGES.map((language) => (
            <button
              key={language.code}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
              onClick={() => {
                setCurrentLanguage(language);
                setIsOpen(false);
              }}
            >
              <span>{language.flag}</span>
              <span>{language.name}</span>
              {currentLanguage.code === language.code && (
                <span className="ml-auto text-blue-500">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


const MobileNav = ({
  isOpen,
  onClose,
  items,
}: {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
}) => {
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({}); // État pour les sous-menus

  const { currentOrganization, getCurrentTheme } = useOrganizationStore();
  const { setCurrentOrganization } = useOrganizationStore();
  const theme = getCurrentTheme();

  const handleSubMenuToggle = (key: string) => {
    setOpenSubMenus((prevState) => ({
      ...prevState,
      [key]: !prevState[key], // Inverser l'état d'ouverture du sous-menu
    }));
  };

  const renderSubItems = (
    subItems: NavItem['subItems'],
    parentKey: string
  ) => {
    if (!subItems) return null;

    return (
      <div className="ml-4">
        {subItems.map((subItem, index) => {
          const key = `${parentKey}-${subItem.label}`;
          return (
            <div key={key} className="mb-2">
              {subItem.subItems ? (
                <button
                  className="flex items-center gap-2 text-white p-2 rounded hover:bg-gray-100 w-full text-left"
                  onClick={() => handleSubMenuToggle(key)}
                >
                  {subItem.icon}
                  <span>{subItem.label}</span>
                  {openSubMenus[key] ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              ) : (
                <Link href={subItem.href} passHref>
                  <a className="flex items-center gap-2 text-white p-2 rounded hover:bg-gray-100 w-full text-left">
                    {subItem.icon}
                    <span>{subItem.label}</span>
                  </a>
                </Link>
              )}
              {subItem.subItems && openSubMenus[key] && (
                <div className="ml-4">
                  {renderSubItems(subItem.subItems, key)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div
        className={`fixed inset-y-0 left-0 w-64 ${theme.navbar.background} shadow-lg`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <Logo />
          <button onClick={onClose}>
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        <nav className="p-4">
          {items.map((item, index) => (
            <div key={index} className="mb-4">
              {/* Menu principal */}
              {item.subItems ? (
                <button
                  className="flex items-center gap-2 text-white p-2 rounded hover:bg-gray-100 w-full text-left"
                  onClick={() => handleSubMenuToggle(item.label)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {openSubMenus[item.label] ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              ) : (
                <Link href={item.href} passHref>
                  <a className="flex items-center gap-2 text-white p-2 rounded hover:bg-gray-100 w-full text-left">
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                </Link>
              )}
              {/* Sous-menus */}
              {item.subItems && openSubMenus[item.label] && (
                <div className="ml-4">
                  {renderSubItems(item.subItems, item.label)}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};


// Navigation Item Component


const NavItem = ({ item }: { item: NavItem }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Pour les menus principaux
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({}); // Gestion indépendante des sous-menus

  const { currentOrganization, getCurrentTheme } = useOrganizationStore();
  const { setCurrentOrganization } = useOrganizationStore();
  const theme = getCurrentTheme();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubMenuToggle = (label: string) => {
    setOpenSubMenus((prevState) => ({
      ...prevState,
      [label]: !prevState[label], // Inverser l'état d'ouverture du sous-menu
    }));
  };

  const renderSubItems = (subItems: NavItem['subItems'], parentKey: string) => {
    if (!subItems) return null;

    return (
      <List component="div" disablePadding>
        {subItems.map((subItem, index) => {
          const key = `${parentKey}-${subItem.label}`;
          return (
            <div key={key}>
              {subItem.subItems ? (
                <ListItemButton
                  sx={{ pl: 2 }}
                  onClick={() => handleSubMenuToggle(key)}
                >
                  <ListItemIcon>{subItem.icon}</ListItemIcon>
                  <ListItemText primary={subItem.label} />
                  {openSubMenus[key] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              ) : (
                <Link href={subItem.href} passHref>
                  <ListItemButton sx={{ pl: 2 }} component="a">
                    <ListItemIcon>{subItem.icon}</ListItemIcon>
                    <ListItemText primary={subItem.label} />
                  </ListItemButton>
                </Link>
              )}
              {subItem.subItems && (
                <Collapse in={openSubMenus[key]} timeout="auto" unmountOnExit>
                  {renderSubItems(subItem.subItems, key)}
                </Collapse>
              )}
            </div>
          );
        })}
      </List>
    );
  };

  return (
    <div className={`relative group ${theme.navbar.background}`}>
      {/* Bouton principal */}
      {item.subItems ? (
        <Button
          variant="text"
          onClick={handleMenuClick}
          className="flex items-center gap-2 text-white"
        >
          <span className="flex items-center text-white">{item.icon}</span>
          <span className="flex items-center text-white">{item.label}</span>
          <ChevronDown className="w-4 h-4 text-white flex items-center" />
        </Button>
      ) : (
        <Link href={item.href} passHref>
          <Button
            variant="text"
            className="flex items-center gap-2 text-white"
          >
            <span className="flex items-center text-white">{item.icon}</span>
            <span className="flex items-center text-white">{item.label}</span>
          </Button>
        </Link>
      )}

      {/* Menu principal */}
      {item.subItems && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
          >
            {item.subItems.map((subItem, index) => (
              <div key={index}>
                {subItem.subItems ? (
                  <ListItemButton
                    onClick={() => handleSubMenuToggle(subItem.label)}
                  >
                    <ListItemIcon>{subItem.icon}</ListItemIcon>
                    <ListItemText primary={subItem.label} />
                    {openSubMenus[subItem.label] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                ) : (
                  <Link href={subItem.href} passHref>
                    <ListItemButton component="a">
                      <ListItemIcon>{subItem.icon}</ListItemIcon>
                      <ListItemText primary={subItem.label} />
                    </ListItemButton>
                  </Link>
                )}
                {subItem.subItems && (
                  <Collapse
                    in={openSubMenus[subItem.label]}
                    timeout="auto"
                    unmountOnExit
                  >
                    {renderSubItems(subItem.subItems, subItem.label)}
                  </Collapse>
                )}
              </div>
            ))}
          </List>
        </Menu>
      )}
    </div>
  );
};



// Main Navigation Component
const Navigation = () => (
  <nav className="flex items-center gap-4">
    {navigationItems.map((item, index) => (
      <NavItem key={index} item={item} />
    ))}
  </nav>
);


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentOrganization, getCurrentTheme } = useOrganizationStore();
  const theme = getCurrentTheme();

  return (
    <header className="bg-white border-b">
      {/* Top Bar */}
      <div className="px-4 h-16 flex items-center justify-between border-b">
        <div className="flex items-center gap-4">
          <Logo />
          <div className="hidden-md-block">
            <SearchBar />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden-md-block flex items-center gap-2">
            <NotificationBell />
            <OrganizationSelector />
            <LanguageSelector />
          </div>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Navigation Bar */}

      <div className={`flex items-center justify-center h-14  ${theme.navbar.background} text-white hidden-md-block`}>
        <Navigation />
      </div>



      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        items={navigationItems}
      />
    </header>
  );
};

export default Navbar;
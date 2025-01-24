import { Briefcase, ChartBar, Gauge, Settings, Users } from "lucide-react";

export interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  subItems?: { label: string; link?: string }[];
}

export const MenuItems: MenuItemProps[] = [
  {
    icon: Gauge,
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

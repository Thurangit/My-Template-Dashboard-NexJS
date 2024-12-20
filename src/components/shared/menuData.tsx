// menuData.ts
import { Gauge, Users, ChartBar, Briefcase, Settings, Component } from 'lucide-react';



export const getMenuItems = (t: (key: string) => string) => [
  {
    icon: Gauge,
    label: t('menu1'),
    // subItems: [
    //   { label: t('menu1_submenu1') }, 
    //   { label: t('menu1_submenu2')},
    //   { label: t('menu1_submenu3')}
    // ]
  },
  {
    icon: Users,
    label:  t('menu2'),
    subItems: [
      { label:  t('menu2_submenu1') },
      { label: t('menu2_submenu2')},
      { label: t('menu2_submenu3') }
    ]
  },
  {
    icon: ChartBar,
    label: t('menu3'),
    subItems: [
      { label: t('menu3_submenu1') },
      { label: t('menu3_submenu2') },
      { label: t('menu3_submenu3') }
    ]
  },
  {
    icon: Briefcase,
    label: t('menu4'),
    subItems: [
      { label: t('menu4_submenu1') },
      { label: t('menu4_submenu2') },
      { label: t('menu4_submenu3') }
    ]
  },
  {
    icon: Settings,
    label: t('menu5'),
    subItems: [
      { label: t('menu5_submenu1') },
      { label: t('menu5_submenu2') },
      { label: t('menu5_submenu3') }
    ]
  },

  {
    icon: Component,
    label: t('menu6'),
    subItems: [
      { label: t('menu6_submenu1') },
      { label: t('menu6_submenu2') },
      { label: t('menu6_submenu3') }
    ]
  },

];

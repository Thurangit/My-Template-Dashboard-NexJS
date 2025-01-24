import * as React from 'react';

import { DynamicTimeline, TimelineItemProps } from '@/components/shared/timeLine';
import { DashboardCard } from '@/components/shared/dashboardCard';
import { GeoLocationMap } from '@/components/shared/map';
import { BarPie } from '@/components/shared/charts';
import {
    Users,
    Building2,
    LaptopMinimal,
    FileClockIcon
} from 'lucide-react';
import { useTranslation } from 'react-i18next';



// Interface pour les propriétés de la carte



// Composant de card
const CUSTOM_LOCATION = {
    latitude: 4.0465,
    longitude: 9.6966,
    address: "Rue du Port",
    quartier: "Bonanjo",
    city: "Douala",
    country: "Cameroun",
    ipAddress: "172.24.194.209"
};
// Composant principal du dashboard
const MainNextDashboard: React.FC = () => {
    const { t } = useTranslation('common');
    // Données des cartes - vous pouvez facilement les modifier
    const cardData = [
        {
            icon: Building2,
            label: t('card1'),
            value: "29",
            description: t('subcard1'),
            color: "bg-blue-50",
            bottomColor: "bg-blue-500"
        },

        {
            icon: LaptopMinimal,
            label: t('card2'),
            value: 8,
            description: t('subcard2'),
            color: "bg-purple-50",
            bottomColor: "bg-purple-500"
        },
        {
            icon: FileClockIcon,
            label: t('card3'),
            value: "15",
            description: t('subcard3'),
            color: "bg-orange-50",
            bottomColor: "bg-orange-500"
        },
        {
            icon: Users,
            label: t('card4'),
            value: 238,
            description: t('subcard4'),
            color: "bg-green-50",
            bottomColor: "bg-green-500"
        },
    ];

    const timelineData: TimelineItemProps[] = [
        {
            label: 'Demande en attente',
            color: 'primary',
            variant: 'filled',
            description: 'Description de l\'étape 1'
        },

        {
            label: 'Demande accepté',
            color: 'success',
            variant: 'filled',
            description: 'Description de l\'étape 3'
        },
        {
            label: 'Demande rejetée',
            color: 'error',
            variant: 'outlined',
            description: 'Description de l\'étape 4'
        },


        
        {
            label: 'Demande accepté',
            color: 'success',
            variant: 'filled',
            description: 'Description de l\'étape 3'
        },
        {
            label: 'Demande accepté',
            color: 'success',
            variant: 'filled',
            description: 'Description de l\'étape 3'
        },
    ];

    return (
        <div>
            <div className="p-4 w-full">
                <div className="overflow-x-auto scrollbar-hide">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {cardData.map((card, index) => (
                            <DashboardCard
                                key={index}
                                icon={card.icon}
                                label={card.label}
                                value={card.value}
                                description={card.description}
                                color={card.color}
                                bottomColor={card.bottomColor}
                            />
                        ))}
                    </div>
                </div>
            </div>



            <div className=" p-4 w-full grid grid-cols-1 md:grid-cols-12 ">
                <div className="md:col-span-7 bg-white rounded-2xl p-2 ">
                    <GeoLocationMap
                        defaultLocation={CUSTOM_LOCATION}
                        defaultIpAddress={CUSTOM_LOCATION.ipAddress}
                        title="Géolocalisation"
                    />
                </div>
                <div className="md:col-span-5  rounded-2xl pl-4 flex flex-col space-y-4">
                    <div className="bg-white rounded-2xl ">
                        <BarPie />
                    </div>
                    <div className="bg-white rounded-2xl ">
                        <DynamicTimeline items={timelineData} position="right" />
                    </div>
                </div>
            </div>

        </div>

    );
};

export default MainNextDashboard;
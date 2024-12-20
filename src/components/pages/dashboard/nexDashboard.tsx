import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import {
    Activity,
    Users,
    Briefcase,
    TrendingUp,
    Building2,
    LaptopMinimal,
    FileClock,
    FileClockIcon
} from 'lucide-react';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';


// Type definition for timeline item
interface TimelineItemProps {
    label: string;
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    variant?: 'filled' | 'outlined';
    description?: string;
}

// Type definition for timeline component props
interface DynamicTimelineProps {
    items: TimelineItemProps[];
    position?: 'left' | 'right';
    className?: string;
    dotClassName?: string;
    contentClassName?: string;
}

const DynamicTimeline: React.FC<DynamicTimelineProps> = ({
    items,
    position = 'right',
    className = '',
    dotClassName = '',
    contentClassName = ''
}) => {
    return (
        <div className="bg-white rounded-2xl p-4 w-full">
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">Dernières activités</h2>

            <Timeline
                className={`w-full ${className}`}
                sx={{
                    [`& .MuiTimelineItem-root:before`]: {
                        flex: 0,
                        padding: 0,
                    },
                }}
            >
                {items.map((item, index) => (
                    <TimelineItem
                        key={index}
                        className={`${position === 'left' ? 'flex-row-reverse' : ''}`}
                    >
                        <TimelineSeparator>
                            <TimelineDot
                                color={item.color || 'primary'}
                                variant={item.variant || 'filled'}
                                className={dotClassName}
                            />
                            {index < items.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent
                            className={`py-4 px-4 ${position === 'right' ? 'text-right' : 'text-right'} ${contentClassName}`}
                        >
                            <div className="flex justify-between">
                                <div className="font-bold text-lg">{item.label}</div>
                                <div className="text-gray-500 mt-2 text-sm">15H00</div>
                            </div>
                            {item.description && (
                                <div className="text-gray-600">{item.description}</div>
                            )}

                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </div>
    );
};

// Interface pour les propriétés de la carte
interface CardProps {
    icon: React.ElementType;
    label: string;
    value: string | number;
    color?: string;
    bottomColor?: string;
    description?: string;
}

import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useRef, useState } from 'react';

const BarPie: React.FC = ({ }) => {
    return (
        <div className="bg-white rounded-2xl p-4 w-full">
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">Répartition des Accès</h2>
            <div className="flex justify-center items-center w-full">
                <BarChart
                    xAxis={[{ scaleType: 'band', data: ['GEMOJ', 'TIMONI', 'KISSAIE', 'DOCKER', 'TOMCARD'] }]}
                    series={[{ data: [102, 35, 10, 5, 50] }]}
                    width={650}
                    height={300}
                />
            </div>
        </div>
    );
}

// Types pour les données de localisation
interface Location {
    latitude: number;
    longitude: number;
    address: string;
    quartier: string;
    city: string;
    country: string;
    ipAddress: string;
}

interface Location {
    latitude: number;
    longitude: number;
    address: string;
    quartier: string;
    city: string;
    country: string;
    ipAddress: string;
}

interface GeoLocationMapProps {
    defaultIpAddress?: string;
    defaultLocation?: Location;
    title?: string;
}

// Configuration par défaut pour Douala Bonanjo
const DEFAULT_LOCATION: Location = {
    latitude: 4.0428,
    longitude: 9.6957,
    address: "Boulevard de la Liberté",
    quartier: "Bonanjo",
    city: "Douala",
    country: "Cameroun",
    ipAddress: "154.72.168.1"
};

declare global {
    interface Window {
        atlas: any;
    }
}

const GeoLocationMap: React.FC<GeoLocationMapProps> = ({
    defaultIpAddress = DEFAULT_LOCATION.ipAddress,
    defaultLocation = DEFAULT_LOCATION,
    title = "Géolocalisation IP"
}) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);

    useEffect(() => {
        // Fonction pour charger le script Azure Maps
        const loadAzureMaps = () => {
            return new Promise<void>((resolve) => {
                const script = document.createElement('script');
                script.src = 'https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.js';
                script.async = true;
                script.defer = true;
                script.onload = () => resolve();
                document.head.appendChild(script);

                const link = document.createElement('link');
                link.href = 'https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.css';
                link.rel = 'stylesheet';
                document.head.appendChild(link);
            });
        };

        // Fonction pour initialiser la carte
        const initializeMap = async () => {
            if (!mapRef.current || mapInstance.current) return;

            const subscriptionKey = process.env.NEXT_PUBLIC_AZURE_MAPS_KEY;
            if (!subscriptionKey) {
                console.error('Clé Azure Maps manquante');
                return;
            }

            try {
                await loadAzureMaps();

                mapInstance.current = new window.atlas.Map(mapRef.current, {
                    center: [defaultLocation.longitude, defaultLocation.latitude],
                    zoom: 16,
                    language: 'fr-FR',
                    authOptions: {
                        authType: 'subscriptionKey',
                        subscriptionKey: subscriptionKey
                    },
                    style: 'road'
                });

                mapInstance.current.events.add('ready', () => {
                    // Ajouter un marqueur
                    const marker = new window.atlas.HtmlMarker({
                        position: [defaultLocation.longitude, defaultLocation.latitude]
                    });
                    mapInstance.current.markers.add(marker);

                    // Ajouter une popup
                    const popup = new window.atlas.Popup({
                        content: `<div style="padding:10px">${defaultLocation.address}, ${defaultLocation.quartier}</div>`,
                        position: [defaultLocation.longitude, defaultLocation.latitude],
                        pixelOffset: [0, -30]
                    });
                    mapInstance.current.popups.add(popup);
                });
            } catch (error) {
                console.error('Erreur lors de l\'initialisation de la carte:', error);
            }
        };

        initializeMap();

        return () => {
            if (mapInstance.current) {
                mapInstance.current.dispose();
                mapInstance.current = null;
            }
        };
    }, [defaultLocation]);

    return (
        <div className=" w-full p-4">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
            </div>

            <div className="space-y-4">
                
                <div
                    ref={mapRef}
                    style={{
                        width: '100%',
                        height: '400px',
                        borderRadius: '0.5rem'
                    }}
                    className="border border-gray-300"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="font-semibold text-gray-700">Adresse IP:</p>
                        <p className="text-gray-600">{defaultLocation.ipAddress}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="font-semibold text-gray-700">Quartier:</p>
                        <p className="text-gray-600">{defaultLocation.quartier}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="font-semibold text-gray-700">Adresse:</p>
                        <p className="text-gray-600">{defaultLocation.address}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="font-semibold text-gray-700">Ville:</p>
                        <p className="text-gray-600">{defaultLocation.city}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="font-semibold text-gray-700">Pays:</p>
                        <p className="text-gray-600">{defaultLocation.country}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="font-semibold text-gray-700">Coordonnées:</p>
                        <p className="text-gray-600">{defaultLocation.latitude}, {defaultLocation.longitude}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const CUSTOM_LOCATION = {
    latitude: 4.0465,
    longitude: 9.6966,
    address: "Rue du Port",
    quartier: "Bonanjo",
    city: "Douala",
    country: "Cameroun",
    ipAddress: "172.24.194.209"
};





const BasicPie: React.FC = ({ }) => {
    return (
        <PieChart
            series={[
                {
                    data: [
                        { id: 0, value: 10, label: 'series A' },
                        { id: 1, value: 15, label: 'series B' },
                        { id: 2, value: 20, label: 'series C' },
                    ],
                },
            ]}
            width={400}
            height={200}
        />
    );
}

// Composant de card
const DashboardCard: React.FC<CardProps> = ({
    icon: Icon,
    label,
    value,
    description = "",
    color = 'bg-blue-50',
    bottomColor = 'bg-blue-500'
}) => {
    return (

        <div className={`relative w-full bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl ${color}`}>
            <div className="p-6 h-full flex items-center justify-between">
                <div className="flex flex-col space-y-2">
                    <div className="text-3xl font-bold text-gray-800 tracking-tight">{value}</div>
                    <div className="text-sm text-gray-600 font-semibold uppercase tracking-wider">{label}</div>
                    {description && (
                        <div className="text-xs text-gray-500 mt-1">{description}</div>
                    )}
                </div>

                <div className="bg-blue-500 bg-opacity-20 rounded-full p-3 shadow-md">
                    <Icon className="w-10 h-10 text-blue-600" strokeWidth={2} />
                </div>
            </div>

            <div className={`absolute bottom-0 left-0 right-0 h-1 ${bottomColor}`}></div>
        </div>


    );
};

// Composant principal du dashboard
const MainNextDashboard: React.FC = () => {
    // Données des cartes - vous pouvez facilement les modifier
    const cardData = [
        {
            icon: Building2,
            label: "Sociétés",
            value: "29",
            description: "Sociétés concernées",
            color: "bg-blue-50",
            bottomColor: "bg-blue-500"
        },

        {
            icon: LaptopMinimal,
            label: "Applications",
            value: 8,
            description: "Applications concernées",
            color: "bg-purple-50",
            bottomColor: "bg-purple-500"
        },
        {
            icon: FileClockIcon,
            label: "En cours",
            value: "15",
            description: "Demandes en cours de traitement",
            color: "bg-orange-50",
            bottomColor: "bg-orange-500"
        },
        {
            icon: Users,
            label: "Accès créés",
            value: 238,
            description: "Demandes acceptées",
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
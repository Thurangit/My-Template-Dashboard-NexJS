import { useEffect, useRef } from 'react';
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

export const GeoLocationMap: React.FC<GeoLocationMapProps> = ({
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






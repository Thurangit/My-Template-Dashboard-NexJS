// import Dashboard from "@/components/pages/dashboard";
import RootLayout from '@/components/layouts/layout';
import PowerBIReport from '@/components/shared/ratioPowerBi';
import dynamic from 'next/dynamic';
// Importer ton composant sans SSR
const MultiGeoLocationMap = dynamic(() => import('@/components/shared/map'), { ssr: false });
const sampleLocations = [
    {
        userName: "Alice Kouam",
        latitude: 4.0428,
        longitude: 9.6957,
        address: "Boulevard de la Liberté",
        quartier: "Bonanjo",
        city: "Douala",
        country: "Cameroun",
        ipAddress: "172.24.194.209"
    },
    {
        userName: "Robert Tamo",
        latitude: 4.0518,
        longitude: 9.7068,
        address: "Rue de New Bell",
        quartier: "New Bell",
        city: "Douala",
        country: "Cameroun",
        ipAddress: "192.168.1.151"
    },
    {
        userName: "Marie Tchuente",
        latitude: 4.0551,
        longitude: 9.7449,
        address: "Avenue de la République",
        quartier: "Bonapriso",
        city: "Douala",
        country: "Cameroun",
        ipAddress: "172.24.194.209"
    },
    {
        userName: "Jean Fotso",
        latitude: 4.0229,
        longitude: 9.7050,
        address: "Rue des Écoles",
        quartier: "Akwa",
        city: "Douala",
        country: "Cameroun",
        ipAddress: "154.72.171.23"
    },
    {
        userName: "Sophie Ndom",
        latitude: 3.8666,
        longitude: 11.5174,
        address: "Avenue Kennedy",
        quartier: "Centre-ville",
        city: "Yaoundé",
        country: "Cameroun",
        ipAddress: "154.72.172.56"
    },
    {
        userName: "Claire Ngo",
        latitude: 4.1537,
        longitude: 9.2570,
        address: "Mount Cameroon Street",
        quartier: "Buea Town",
        city: "Buea",
        country: "Cameroun",
        ipAddress: "172.24.194.209"
    },
    {
        userName: "Michel Kamga",
        latitude: 5.9597,
        longitude: 10.1597,
        address: "Commercial Avenue",
        quartier: "Commercial Avenue",
        city: "Bamenda",
        country: "Cameroun",
        ipAddress: "154.72.175.34"
    }
];

export default function MapMultiGeolocalisation() {
    return (
        <>
        <RootLayout>
        <MultiGeoLocationMap
                        locations={sampleLocations} 
                        title="Carte des Utilisateurs connectés" 
                    />
            </RootLayout>
        </>
    );
}

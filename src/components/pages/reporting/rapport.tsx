// import Dashboard from "@/components/pages/dashboard";
import RootLayout from '@/components/layouts/layout';
import PowerBIReport from '@/components/shared/ratioPowerBi';
import dynamic from 'next/dynamic';
// Importer ton composant sans SSR
const Dashboard = dynamic(() => import('@/components/pages/dashboard'), { ssr: false });

export default function Reporting() {
    return (
        <>
        <RootLayout>
            <PowerBIReport
                reportUrl="https://app.powerbi.com/groups/me/reports/b877fd22-e685-4aab-94ac-d8eb1353b154/4d5355fc03c4611c3045?ctid=088e9b00-ffd0-458e-bfa1-acf4c596d3cb&experience=power-bi"
                filterPaneEnabled={true}
                navContentPaneEnabled={false}
                backgroundColor="#f5f5f5"
            />
            </RootLayout>
        </>
    );
}

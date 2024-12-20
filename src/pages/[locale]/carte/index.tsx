// import Dashboard from "@/components/pages/dashboard";
import dynamic from 'next/dynamic';
// Importer ton composant sans SSR
const Dashboard = dynamic(() => import('@/components/pages/dashboard'), { ssr: false });

export default function Dashboarde() {
  return (
      <>
      <Dashboard/>
      </>
  );
}

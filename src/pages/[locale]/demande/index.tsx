// import Dashboard from "@/components/pages/dashboard";
import dynamic from 'next/dynamic';
// Importer ton composant sans SSR
const AccessRequestForm = dynamic(() => import('@/components/pages/requests/confirmation'), { ssr: false });

export default function Dashboarde() {
  return (
      <>
      <AccessRequestForm/>
      </>
  );
}

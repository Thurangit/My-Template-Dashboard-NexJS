// import Dashboard from "@/components/pages/dashboard";

import dynamic from 'next/dynamic';
// Importer ton composant sans SSR
const Reporting = dynamic(() => import('@/components/pages/reporting/rapport'), { ssr: false });

export default function Dashboarde() {
  return (
      <>
      <Reporting/>
      </>
  );
}

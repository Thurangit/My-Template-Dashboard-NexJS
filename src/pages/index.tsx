import Loader from "@/components/shared/loader";
import { useEffect, useState } from "react";

import dynamic from 'next/dynamic';
import Breadcrumbs from "@/components/shared/breadcrumbs";

// Importer ton composant sans SSR
const Dashboard = dynamic(() => import('@/components/pages/dashboard'), { ssr: false });

export default function Home() {


  const [isLoading, setIsLoading] = useState(true);

  // Simule un chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Loader isLoading={isLoading} />
      <Dashboard />
    </>

  );
}

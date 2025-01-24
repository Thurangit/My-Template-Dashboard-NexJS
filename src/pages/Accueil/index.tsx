import Loader from "@/components/shared/loader";
import { useEffect, useState } from "react";
import Dashboard from '@/components/pages/dashboard';

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

import Loader from "@/components/shared/loader";
import { useEffect, useState } from "react";
import GetAllForm from "@/components/pages/components/forms/getAll";

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
      
      <GetAllForm />
    </>

  );
}

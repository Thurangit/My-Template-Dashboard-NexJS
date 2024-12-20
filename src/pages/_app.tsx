import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from 'next-i18next';
import '../../i18n'; // Import l'initialisation ici
import { useOrganizationStore } from "@/components/shared/storeoftheme";
import { useEffect } from "react";

 function App({ Component, pageProps }: AppProps) {
  const { setCurrentOrganization } = useOrganizationStore()

  // Set an initial organization when the app loads
  useEffect(() => {
    setCurrentOrganization({
      id: '1',
      name: 'AGL Group',
      code: 'agl',
      logo:""
    })
  }, [setCurrentOrganization])

  return <Component {...pageProps} />;
}

export default appWithTranslation(App);
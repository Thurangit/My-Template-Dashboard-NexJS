import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import '../../i18n';
import { useOrganizationStore } from "@/components/shared/storeoftheme";
import { useEffect } from "react";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@/createEmotionCache";
import { CssBaseline } from "@mui/material";
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { msalInstance } from "@/utils/msalConfig";
import Head from "next/head";
import AuthProvider from "@/utils/protectedRoute";

const clientSideEmotionCache = createEmotionCache();

interface NextAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function App({ Component, pageProps, emotionCache = clientSideEmotionCache }: NextAppProps) {
  const { setCurrentOrganization } = useOrganizationStore();

  useEffect(() => {
    setCurrentOrganization({
      id: '1',
      name: 'AGL Group',
      code: 'agl',
      logo: ""
    });
  }, [setCurrentOrganization]);

  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <Head>
          <title>AZR_TEMPLATE_VUE</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
        </Head>
        <MsalProvider instance={msalInstance}>
          <AuthProvider>
            <AuthenticatedTemplate>
              <Component {...pageProps} />
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
              <div className="loading-container">
                <h5 className="loading-text">
                  Veuillez vous connecter<span className="loading-dots"></span>
                </h5>
              </div>
            </UnauthenticatedTemplate>
          </AuthProvider>
        </MsalProvider>
      </Provider>
    </CacheProvider>
  );
}

export default appWithTranslation(App);
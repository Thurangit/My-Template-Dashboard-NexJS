import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../../next-i18next.config';
import slugify from '@/components/shared/slugify';
import { getMenuItems } from '@/components/shared/menuData';
import path from 'path';
import fs from 'fs';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import RootLayout from '@/components/layouts/layout';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import dynamic from 'next/dynamic';

// Désactiver le SSR
const PageContent = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { slug } = router.query;
  
   
    const menuItems = getMenuItems(t);
  
    const currentPage = menuItems.find(
      (item: any) =>
        slug === slugify(item.label) ||
        (item.subItems && item.subItems.some((sub: any) => slug === slugify(sub.label)))
    );
    console.log('slugify',currentPage)
    if (!currentPage) return <div>{t('page_not_found')}</div>;
  
    return (
      <RootLayout>
        <Breadcrumbs />
        <h1>{currentPage.label}</h1>
      </RootLayout>
    );
  };
  
export async function getStaticPaths() {
    const locales = ['en', 'fr']; // Toutes vos locales
    const slugs: { [locale: string]: string[] } = {};
  
    for (const locale of locales) {
      // Charger les traductions depuis les fichiers `common.json`
      const translationsPath = path.join(process.cwd(), `public/locales/${locale}/common.json`);
      const translations = JSON.parse(fs.readFileSync(translationsPath, 'utf-8'));
  
      // La fonction de traduction
      const t = (key: string) => translations[key] || key;
  
      // Générer les slugs pour chaque locale
      const menuItems = getMenuItems(t);
      const extractSlugs = (items: any[]) => {
        const result: string[] = [];
        for (const item of items) {
          result.push(slugify(item.label)); // Utiliser le label traduit
          if (item.subItems) {
            result.push(...item.subItems.map((subItem: any) => slugify(subItem.label)));
          }
        }
        return result;
      };
  
      slugs[locale] = extractSlugs(menuItems);

    }
  
    // Générer les chemins pour toutes les locales
    const paths = locales.flatMap((locale) =>
      slugs[locale].map((slug) => ({
        params: { locale, slug },
      }))
    );
  
    console.log('Generated paths:', paths); // Inspectez les chemins générés
  
    return {
      paths,
      fallback: false, // ou true/false selon votre logique
    };
  }
  


export async function getStaticProps({ params }: { params: { locale: string } }) {
  const { locale } = params;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}
// Rendre dynamique et désactiver le SSR
const Page = dynamic(() => Promise.resolve(PageContent), { ssr: false });

export default Page;

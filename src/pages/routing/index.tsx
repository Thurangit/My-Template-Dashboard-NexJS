// import Dashboard from "@/components/pages/dashboard";
import dynamic from 'next/dynamic';
// Importer ton composant sans SSR
const Menu = dynamic(() => import('@/components/pages/routing/menu/menu'), { ssr: false });

const Page: React.FC = () => {
    return (
    
        <Menu />
    );
  };
  
  export default Page;

// import { Box,styled } from '@mui/material';
// import type { ReactElement } from 'react';
// import BaseLayout from 'src/components/widgets/layouts/BaseLayout';
// import Head from 'next/head';
// import ConnectForm from '@/components/pages/Authentification/Connect';

// const OverviewWrapper = styled(Box)(
//   ({ theme }) => `
//     overflow: auto;
//     background: ${theme.palette.common.white};
//     flex: 1;
//     overflow-x: hidden;
// `
// );

// function Overview() {
//   return (
//     <OverviewWrapper>
//       <Head>
//         <title>Connect-Page - GEMOJ </title>
//       </Head>
//       <ConnectForm/>
//       {/* <Footer /> */}
//     </OverviewWrapper>
//   );
// }

// export default Overview;

// Overview.getLayout = function getLayout(page: ReactElement) {
//   return <BaseLayout>{page}</BaseLayout>;
// };

// import React from 'react';
// import Head from 'next/head';
// import SidebarLayout from '@/components/widgets/layouts/SidebarLayout';
// import { Container, Grid, Button } from '@mui/material';
// import Footer from '@/components/shared/Footer';
// import Breadcrumbs from '@/components/shared/BreadCrumbs';
// import GetAllservice from '@/components/pages/Services/getAll';
// // import Link from 'next/link';
// import { useRouter } from 'next/router';


// function Service() {

//   const tabs = [
//     { value: 'organisation/services', label: 'Services' },
//     { value: 'organisation/services/sections', label: 'Sections' },
//   ];

//   const router = useRouter()

//   console.log('route depart', router)

//   return (
//     <>
//       <Head>
//         <title>Services - EndPoints - GEMOJ </title>
//       </Head>
//       <Breadcrumbs />
//       <Container maxWidth='lg'>
//         <Grid item xs={12}>
//           {tabs.map((tab) => (
//             <Link
//               href={`${tab.value}`}>
//               <Button
//                 sx={{ margin: 1 }}
//                 key={tab.value}
//                 variant={tab.value === "organisation/services" ? 'contained' : 'text'}
//               >
//                 {tab.label}
//               </Button>
//             </Link>
//           ))}
//         </Grid>
//         <GetAllservice />
//       </Container>
//       <Footer />
//     </>
//   )
// }

// Service.getLayout = (page: JSX.Element) => <SidebarLayout>{page}</SidebarLayout>;

// export default Service;

// import React from 'react';
// import Head from 'next/head';
// import SidebarLayout from '@/components/widgets/layouts/SidebarLayout';
// import { Container, Grid } from '@mui/material';
// import Footer from '@/components/shared/Footer';
// import Breadcrumbs from '@/components/shared/BreadCrumbs';
// import GetAllTypeServices from "@/components/pages/Types/TypesServices/getAll";
// import PageTitleWrapper from '@/components/shared/PageTitleWrapper';
// import PageTitle from '@/components/shared/PageTitle';


// function Organisation() {
 

//   return (
//     <>
//       <Head>
//         <title>Types de services - GEMOJ </title>
//       </Head>
//       <Grid item xs={12}>
//       <PageTitleWrapper>
//         <PageTitle
//           heading="Gestion des types de services"
//         />
//       </PageTitleWrapper>
//         </Grid>
//       <Breadcrumbs />
//       {/* <PageTitleWrapper>
//         <PageTitle
//           heading='Gestion des Sections'
//         />
//       </PageTitleWrapper> */}
//       <Container maxWidth='lg'>
        
//         <GetAllTypeServices />
//       </Container>
//       <Footer />
//     </>
//   )
// }

// Organisation.getLayout = (page: JSX.Element) => <SidebarLayout>{page}</SidebarLayout>;

// export default Organisation;



import type { ReactElement } from 'react';
import LoginForm from './Authentification/LoginForm';
import { useRouter } from 'next/router';


function Overview() {

  const router = useRouter()

  setTimeout(() =>{
    router.push('/Accueil');
  },15)
  
  return (
  <>
      <LoginForm/>

  </>
  );
}

export default Overview;

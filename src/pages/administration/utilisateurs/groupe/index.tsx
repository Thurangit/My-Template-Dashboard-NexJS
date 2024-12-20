import React, { useState } from 'react';
import Head from 'next/head';
import SidebarLayout from '@/components/widgets/layouts/SidebarLayout';
import { Container } from '@mui/material';
import Footer from '@/components/shared/Footer';
import Breadcrumbs from '@/components/shared/BreadCrumbs';
import PageTitleWrapper from '@/components/shared/PageTitleWrapper';
import PageTitle from '@/components/shared/PageTitle';
import GetAllMSGraphUser from '@/components/pages/Administration/Utilisateurs/MSGraph/getAll';
import { generatePrivileges } from '@/components/lib/shared/privilege';
import { useAuthe } from '@/utils/protectedRoute';
import { LoadingPage } from '@/components/lib/shared/loading';
import FormAttention from '@/components/lib/shared/attention';
import TimerLoad from '@/components/lib/shared/timer';


function Utilisateur() {

    const { getAllPrivileges } = useAuthe();

    const privileges = generatePrivileges(getAllPrivileges);
    const [openAlert, setOpenAlert] = useState(false);
    TimerLoad(setOpenAlert,getAllPrivileges)

    return (
        getAllPrivileges.length > 0 && privileges.utilisateurs ? 
        <>
            <Head>
                <title>Utilisateurs - TIMONI</title>
            </Head>
            <Breadcrumbs />
            <PageTitleWrapper>
                <PageTitle
                    heading='Utilisateurs MSGraph'
                />
            </PageTitleWrapper>
            <Container maxWidth='lg'>
                <GetAllMSGraphUser />
            </Container>
            <Footer />
        </>
        :
        <>
        <LoadingPage />
        <FormAttention
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}/>
        </>
    )
}

Utilisateur.getLayout = (page: JSX.Element) => <SidebarLayout>{page}</SidebarLayout>;

export default Utilisateur;

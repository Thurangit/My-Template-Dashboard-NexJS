import React, { useState } from 'react';
import Head from 'next/head';
import SidebarLayout from '@/components/widgets/layouts/SidebarLayout';
import { Container } from '@mui/material';
import Footer from '@/components/shared/Footer';
import Breadcrumbs from '@/components/shared/BreadCrumbs';
import PageTitleWrapper from '@/components/shared/PageTitleWrapper';
import PageTitle from '@/components/shared/PageTitle';
import GetAllRole from '@/components/pages/Administration/Role/getAll';
import { useAuthe } from '@/utils/protectedRoute';
import { generatePrivileges } from '@/components/lib/shared/privilege';
import { LoadingPage } from '@/components/lib/shared/loading';
import FormAttention from '@/components/lib/shared/attention';
import TimerLoad from '@/components/lib/shared/timer';

function Role() {

    const { getAllPrivileges } = useAuthe();

    const privileges = generatePrivileges(getAllPrivileges);
    const [openAlert, setOpenAlert] = useState(false);
    TimerLoad(setOpenAlert,getAllPrivileges)

    return (
        getAllPrivileges.length > 0 && privileges.role ?
        <>
            <Head>
                <title>Role - TIMONI</title>
            </Head>
            <Breadcrumbs />
            <PageTitleWrapper>
                <PageTitle
                    heading='Rôles'
                />
            </PageTitleWrapper>
            <Container maxWidth='lg'>
                <GetAllRole />
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

Role.getLayout = (page: JSX.Element) => <SidebarLayout>{page}</SidebarLayout>;

export default Role;

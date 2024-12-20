import React, { useEffect, useState } from 'react'
import SidebarLayout from '@/components/widgets/layouts/SidebarLayout';
import { Box, Button, Container, Skeleton, Stack } from '@mui/material';
import Footer from '@/components/shared/Footer';
import Breadcrumbs from '@/components/shared/BreadCrumbs';
import { useRouter } from 'next/router';
import API from '@/redux/API';
import settings from '@/redux/config';
import { URL_API } from "@/utils/environment";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useDispatch } from 'react-redux';
import SuccessAlert, { WarningAlert } from '@/components/lib/shared/notification';
import DetailUser from '@/components/pages/Administration/Utilisateurs/Timoni/detailsAll';
import { sleep } from '@/components/lib/shared/const&style';
import Head from 'next/head';
import { deasactiveUser, restoreUser, updateUser } from '@/redux/actions/administration/user.action';
import FormUpdateUserTIMONI from '@/components/pages/Administration/Utilisateurs/Timoni/update';
import FormDelUserTIMONI from '@/components/pages/Administration/Utilisateurs/Timoni/deleteDetail';
import FormResUserTIMONI from '@/components/pages/Administration/Utilisateurs/Timoni/restoreDetail';
import { useAuthe } from '@/utils/protectedRoute';
import { generatePrivileges } from '@/components/lib/shared/privilege';
import TimerLoad from '@/components/lib/shared/timer';
import { LoadingPage } from '@/components/lib/shared/loading';
import FormAttention from '@/components/lib/shared/attention';

export default function Details() {


  const [data, setData] = useState<any>([]);
  const router = useRouter()
  const [colorAlert, setColorAlert] = useState(false);
  const [messageError, setMessageError] = useState('');
  const dispatch: any = useDispatch();
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const formRef = React.useRef(null);
  const [openDel, setOpenDel] = useState<boolean>(false);
  const [openRestore, setOpenRestore] = useState<boolean>(false);
  const [societe, setSociete] = useState([])
  const [loadings, setLoading] = useState(false);
  const [openSociete, setOpenSociete] = useState(false);
  const { getAllPrivileges } = useAuthe();
  const privileges = generatePrivileges(getAllPrivileges);
  const [openAlert, setOpenAlert] = useState(false);
  TimerLoad(setOpenAlert,getAllPrivileges)

  const { user } = useAuthe();
  const handleUpdateOne = (values: any) => {
    dispatch(updateUser(values.id, values))
      .then((res: any) => {
        setVisible(true);
        setData((user: any) =>
          values.id ?
            {
              ...user, ...values, companyName: res.companyName,
              companyCode: res.companyCode
            } : user
        );
      })
      .catch((error: any) => {
        console.log(error);
        if (error && error.response?.status === 409) {
          setColorAlert(true);
          setMessageError(error.response?.data)
        }
      });
  };

  const handleDelete = (idUser: number) => {
    console.log("Donnees section à supprimer : ", data.id);
    idUser = data.id;
    dispatch(deasactiveUser(idUser))
      .then((res: any) => {
        console.log(res);
        setOpenDel(false);
        setVisible(true);
        setData((user: any) =>
          idUser
            ? { ...user, isActive: !user.isActive }
            : user
        );
        // Rediriger vers la page précédente
        //router.back();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleRestore = (idUser: any) => {
    idUser = data.id;
    dispatch(restoreUser(idUser)).then((res: any) => {
      console.log(res);
      setOpenRestore(false);
      setVisible(true);
      setData((user: any) =>
        idUser ?
          { ...user, isActive: !user.isActive }
          : user
      );
    })
      .catch((error: any) => {
        console.log(error);
      });

  }

  // récupération des societe dans l'autocomplete
  const getSociete = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await API.get(`${URL_API}/Users/Companies/Search/${searchTerm}`);
      console.log('societes', response);
      const filteredSocieteOptions = response.data.filter(
        (opt) => opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSociete(filteredSocieteOptions);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // récupération des Users dans l'autocomplete


  useEffect(() => {
    let active = true;

    if (!loadings) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setSociete([...societe]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadings]);

  useEffect(() => {
    if (!openSociete) {
      setSociete([]);
    }
  }, []);

  const pushFunction = () => {
    router.back();
  }
  const userId = router.query.slug;

  // récupération de la données utilisateur associé à userId
  useEffect(() => {
    API.get(`${settings.ACCESS_URL}/users/${userId}`)
      .then((res: any) => {
        console.log('donneee de utilisateur ', res);
        setData(res.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [userId]);

  // récupérer les rôles assocés à l'utilisateurs
  useEffect(() => {
    API.get(`${settings.SECTION_URL}/Services`)
      .then((res: any) => {
        const filteredSection = res.data.filter(opt => opt.societeId === data.id)
        console.log('Section total', filteredSection);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [router.query.slug]);

  console.log('data', data);
  console.log("Michelle : 1 ", user);
  return (
    <>
      <Breadcrumbs />
      {/* <PageTitleWrapper>
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography variant="h3" component="h3" gutterBottom>
                            {data.label}{data.code && bull}{data.code}{data.code && bull}
                        </Typography>
                    </Grid>
                </Grid>
            </PageTitleWrapper> */}
      <Head>
        <title>Profil - Utilisateur ({router.query.slug})</title>
      </Head>
      <Container maxWidth='lg'>
        <Button onClick={pushFunction}>
          <Stack direction="row" spacing={1}>
            <KeyboardBackspaceIcon />
            <p>Retour</p>
          </Stack>
        </Button>
        {getAllPrivileges.length > 0 && privileges.utilisateurs ? 
          router.query.slug
            ?
            <>
              {
                visible && <SuccessAlert visible={visible} setVisible={setVisible} />
              }
              {
                colorAlert && <WarningAlert colorAlert={colorAlert} setColorAlert={setColorAlert} messageError={messageError} />
              }
              <FormUpdateUserTIMONI
                openUpdate={openUpdate}
                setOpenUpdate={setOpenUpdate}
                userToUpdate={data}
                formRef={formRef}
                handleUpdateOne={handleUpdateOne}
                societe={societe}
                loadings={loadings}
                getSociete={getSociete}
                openSociete={openSociete}
                setOpenSociete={setOpenSociete}
                setSociete={setSociete}
              />

              <FormDelUserTIMONI
                openDel={openDel}
                setOpenDel={setOpenDel}
                userToDelete={data}
                handleDelete={() => handleDelete(data.id)}
              />
              <FormResUserTIMONI
                openRestore={openRestore}
                setOpenRestore={setOpenRestore}
                userToRestore={data}
                handleRestore={() => handleRestore(data.id)}
              />
              <DetailUser
                data={data}
                setOpenUpdate={setOpenUpdate}
                setOpenDel={setOpenDel}
                setOpenRestore={setOpenRestore}
                setData={setData}
                connectdUser={user}
              />
            </> :
            <Box>
              <Skeleton height={350} animation="wave" />
            </Box>
             :
             <>
             <LoadingPage/>
             <FormAttention
             openAlert={openAlert}
             setOpenAlert={setOpenAlert}/>
             </>
        }

      </Container>
      <Footer />
    </>
  )
}

Details.getLayout = (page: JSX.Element) => <SidebarLayout>{page}</SidebarLayout>;
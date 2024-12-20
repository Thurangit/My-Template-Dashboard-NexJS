import React, { useEffect, useState } from 'react'
import SidebarLayout from '@/components/widgets/layouts/SidebarLayout';
import { Box, Button, Container, Grid, Skeleton, Stack, Typography } from '@mui/material';
import Footer from '@/components/shared/Footer';
import Breadcrumbs from '@/components/shared/BreadCrumbs';
import { useRouter } from 'next/router';
import API from '@/redux/API';
import settings from '@/redux/config';
// import Detailsservice, { bull } from '@/components/pages/Services/service/details';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useDispatch } from 'react-redux';
import SuccessAlert, { WarningAlert } from '@/components/lib/shared/notification';
// import FormResDetail from '@/components/pages/Services/Roles/restoreDetail';
import Head from 'next/head';
import { deleteRole, getRoleById, updateRole } from '@/redux/actions/administration/role.action';
import FormUpdateDetail from '@/components/pages/Administration/Role/updateDetail';
import FormDelDetail from '@/components/pages/Administration/Role/deleteDetail';
import DetailRole from '@/components/pages/Administration/Role/details';
import { addRolePrivilege, updateRolePrivilege } from '@/redux/actions/administration/rolePrivilege.action';
import PageTitleWrapper from '@/components/shared/PageTitleWrapper';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import NotInterestedIcon from '@mui/icons-material/DeleteOutlined';
import UserDetail from '@/components/pages/Administration/Role/detailUser';
import { addUserRole, getAllUserRoles} from '@/redux/actions/administration/userRole.action';
import { deasactiveUserRole, getAllUsers } from '@/redux/actions/administration/user.action';
import { PrivilegeActionButton } from '@/utils/privilege';
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
  // const [openRestore, setOpenRestore] = useState<boolean>(false);
  const [privilege, setPrivilege] = useState([]);
  const [load, setLoad] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [userToView, setUserToView] = useState<any[]>([]);
  const [openClose, setOpenClose] = useState<boolean>(false);
  const [filteredRoleUser, setFilteredRoleUser] = React.useState<any[]>([]);
  const [valeur, setValeur] = useState([])
  const { getAllPrivileges } = useAuthe();
  const privileges = generatePrivileges(getAllPrivileges);
  const [openAlert, setOpenAlert] = useState(false);
  TimerLoad(setOpenAlert,getAllPrivileges)


  const RoleId = router.query.slug;

  const handleSubmitPrivilege = (values: any) => {
    const { roleId, privilegeId } = values;
    setLoad(true)
    // Create an array of promises, one for each privilegeId
    const requests = privilegeId.map((id: number) => {
      return dispatch(addRolePrivilege({ roleId, privilegeId: id }));
    });
    console.log('le nombre de valeur', requests)
    // Use Promise.all to handle all promises
    Promise.all(requests)
      .then((responses: any) => {
        console.log('Responses:', responses);
        setVisible(true);
      })
      .catch((error: any) => {
        console.log('Error:', error);
        if (error && error.response?.status === 409) {
          setColorAlert(true);
          setMessageError(error.response?.data);
        }
      })
      .finally(() => {
        console.log('Valeurs', values);
        //resetForm();
        setLoad(false)
        setValeur(values);
      });

  };

  const handleUpdatePrivilege = (values: any) => {
    const { roleId, privilegeId, id } = values;

    // Déclarez un état pour le loader
    setLoad(true)
    // Créez un tableau de promesses, une pour chaque privilegeId
    const requests = id.map((privilegeRoleId: number, index: number) => {
      console.log(`Updating privilegeRoleId: ${privilegeRoleId} with roleId: ${roleId} and privilegeId: ${privilegeId[index]}`);
      return dispatch(updateRolePrivilege(privilegeRoleId, { id: privilegeRoleId, roleId, privilegeId: privilegeId[index] }));
    });
    // Utilisez Promise.all pour gérer toutes les promesses
    Promise.all(requests)
      .then((responses: any) => {
        console.log('Responses:', responses);
        setVisible(true);
      })
      .catch((error: any) => {
        console.log('Error:', error);
        if (error && error.response?.status === 409) {
          setColorAlert(true);
          setMessageError(error.response?.data);
        }
      })
      .finally(() => {
        console.log('Valeurs', values);
        setLoad(false)
        setValeur(values);
      });
  };

  const handleUpdateOne = (values: any) => {
    dispatch(updateRole(values.id, values))
      .then((res: any) => {
        console.log("Update Detail Service", res);
        setVisible(true);
        setData((role: any) =>
          values.id ?
            {
              ...role, ...values,
            } : role
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

  const handleDelete = () => {
    dispatch(deleteRole(RoleId))
      .then((res: any) => {
        console.log(res);
        setOpenDel(false);
        setVisible(true);
        setData((role: any) =>
          RoleId
            ? { ...role }
            : role
        );
        router.back();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  

  const FilteredRoleUserRightExistant = filteredRoleUser
  .filter(opt => opt.roleId === data?.id && opt.isActive)
  .map(item => item.userId);

  const handleSubmitUsersRole = (values) => {
    const { roleId, userId } = values; // userId corresponds to the users on the right side after modification
    setLoad(true);

    // Users to add: In the new list but not in the initial list
    const usersToAdd = userId.filter(id => !FilteredRoleUserRightExistant.includes(id));

    // Users to remove: In the initial list but not in the new list
    const usersToRemove = FilteredRoleUserRightExistant.filter(id => !userId.includes(id));

    const idsToRemove = filteredRoleUser
    .filter(user => usersToRemove.includes(user.userId)  && user.roleId === roleId)
    .map(user => user.id);

    // Create promises for adding users
    const addRequests = usersToAdd.map((id) => {
      return dispatch(addUserRole({ roleId, userId: id }));
    });

    // Create promises for removing users
    const removeRequests = idsToRemove.map((id) => {
      return dispatch(deasactiveUserRole(id)); // Assuming deleteUserRole takes only the userRoleId
    });

    // Combine all promises
    const allRequests = [...addRequests, ...removeRequests];

    // Use Promise.all to handle all promises
    Promise.all(allRequests)
      .then((responses) => {
        console.log('Responses:', responses);
        setVisible(true);
      })
      .catch((error) => {
        console.log('Error:', error);
        if (error && error.response?.status === 409) {
          setColorAlert(true);
          setMessageError(error.response?.data);
        } else {
          console.log('An unexpected error occurred:', error);
        }
      })
      .finally(() => {
        console.log('Valeurs', values);
        setValeur(values);
        // resetForm(); // Reset form if necessary
        setLoad(false);
        setOpenClose(false);
      });
  };


  // const handleRestore = (idRole: any) => {
  //   dispatch(updateRole(idRole, { ...data, isActive: true }))
  //     .then((res: any) => {
  //       console.log(res);
  //       setOpenRestore(false);
  //       setVisible(true);
  //       setData((Role: any) =>
  //         idRole ?
  //           { ...Role, isActive: !Role.isActive }
  //           : Role
  //       );
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });

  // }

  const handleOpenModalDetail = () => {
    setOpenDetail(true);
  };

  const pushFunction = () => {
    router.back();
  }

  

  useEffect(() => {
    dispatch(getRoleById(RoleId))
    .then((res: any) => {
      console.log('donneee DE LA Role', res);
      setData(res);
    })
    .catch((error: any) => {
      console.log(error);
    });
    API.get(`${settings.ACCESS_URL}/privileges`)
    .then((res: any) => {
      console.log('Privilège', res.data);
      setPrivilege(res.data);
    })
    .catch((error: any) => {
      console.log(error);
    });
  
  }, [RoleId]);

  
  useEffect(() => {
    dispatch(getAllUsers())
    .then((res: any) => {
      console.log('Utilisateurs', res);
      setUserToView(res);
    })
    .catch((error: any) => {
      console.log(error);
    });
    dispatch(getAllUserRoles())
      .then((res) => {
        setFilteredRoleUser(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [RoleId,valeur]);


  return (
    <>
      <Breadcrumbs />
      <Head>
        <title>Details - Role ({router.query.slug})</title>
      </Head>
      <Container maxWidth='lg'>
        <Button onClick={pushFunction}>
          <Stack direction="row" spacing={1}>
            <KeyboardBackspaceIcon />
            <p>Retour</p>
          </Stack>
        </Button>
        {getAllPrivileges.length > 0 && privileges.role ? 
          router.query.slug
            ?
            <>
              {
                visible && <SuccessAlert visible={visible} setVisible={setVisible} />
              }
              {
                colorAlert && <WarningAlert colorAlert={colorAlert} setColorAlert={setColorAlert} messageError={messageError} />
              }
              <PageTitleWrapper>
                <Box
                  p={3}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack direction={'row'} spacing={1}>
                    <Box>
                      <Typography variant="h3">
                        {data && data?.label}
                        {' ('}
                        <span style={{ fontWeight: 'italic' }}>{data && data?.description}</span>
                        {')'}
                      </Typography>
                      <Typography variant="subtitle2">
                        Paramétrer ce rôle
                      </Typography>
                    </Box>
                  </Stack>
                  {data?.isActive === true ? (
                    <Stack direction="row" spacing={1}>
                       <PrivilegeActionButton lecture="administration.role.lecture"
                        ecriture="administration.role.ecriture"
                        modification=""
                        suppression="">
                      <Button
                        variant="text"
                        onClick={() => setOpenUpdate(true)}
                        startIcon={<EditTwoToneIcon />}
                      >
                        Modifier
                      </Button>
                      </PrivilegeActionButton>
                      <PrivilegeActionButton lecture="administration.role.lecture"
                        ecriture="administration.role.ecriture"
                        modification="administration.role.modification"
                        suppression="">
                      <Button
                        variant="text"
                        color="error"
                        onClick={() => setOpenDel(true)}
                        startIcon={<NotInterestedIcon />}
                      >
                        Supprimer
                      </Button>
                      </PrivilegeActionButton>
                    </Stack>
                  ) : (
                    <></>
                    // <Button
                    //   variant="text"
                    //   color="secondary"
                    //   onClick={() => setOpenRestore(true)}
                    //   startIcon={<RestoreIcon />}
                    // >
                    //   Restaurer
                    // </Button>
                  )}
                </Box>
              </PageTitleWrapper>
              <FormUpdateDetail
                openUpdate={openUpdate}
                setOpenUpdate={setOpenUpdate}
                data={data}
                formRef={formRef}
                handleUpdateOne={handleUpdateOne}
              />

              <FormDelDetail
                openDel={openDel}
                setOpenDel={setOpenDel}
                data={data}
                handleDelete={handleDelete}
              />
              {/* <FormResDetail
                openRestore={openRestore}
                setOpenRestore={setOpenRestore}
                data={data}
                handleRestore={() => handleRestore(data.id)}
              /> */}
              <Grid
                item
                container
                xs={12}
                display="flex"
                justifyContent="start"
                alignItems="center"
              >
                <Button sx={{ mb: 2, backgroundColor: '#c98e00' }}
                  variant="contained"
                  color="warning"
                  onClick={handleOpenModalDetail}>
                  Utilisateurs du rôle
                </Button>
              </Grid>
              <DetailRole
                data={data}
                privilege={privilege}
                formRef={formRef}
                handleSubmitValue={handleSubmitPrivilege}
                load={load}
                handleUpdate={handleUpdatePrivilege}
              // setOpenRestore={setOpenRestore}
              />
              <UserDetail
                data={data}
                userToView={userToView}
                open={openDetail}
                setOpen={setOpenDetail}
                formRef={formRef}
                load={load}
                handleSubmitValue={handleSubmitUsersRole}
                openClose={openClose}
                filteredRoleUser={filteredRoleUser}
                FilteredRoleUserRightExistant={FilteredRoleUserRightExistant}
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


import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Tableau from './dataGrid';
import FormAdd from './add';
import * as Yup from 'yup';
// import { URL_API } from '@/redux/config';
import FormDel from './delete';
import FormUpdate from './update';
//import FormRes from './restore'; import ActionButton from '@/components/lib/actions/donneesdebases/paiement/actionButtonTypeJustificatifs';
import debounce from 'debounce';
import settings, { headers } from '@/redux/config';

import SuccessAlert, { WarningAlert } from '@/components/shared/notification';
// import { sleep } from '@/components/lib/shared/const&style';
import DetailTypeJustificatif from './details';
import API from '@/redux/API';
import { addMenu, getMenuPagine } from '@/redux/actions/routing/menu.action';
import ActionButton from './actionButton';
import FormAddSubmenu from './addSubmenu';
import { addSubmenu } from '@/redux/actions/routing/submenu.action';


export interface TypeJustificatif {
  page: number;
  pageSize: number;
  sortBy1: string;
  sortOrder1: string;
  sortBy2: string | null;
  sortOrder2: string | null;
  searchTerm: string | null;
  isActive: boolean;
  label: string;
  description: string;
}

interface GetAllProps { }
//Règles de validation d'un formulaire

export const validationSchema: Yup.AnyObjectSchema = Yup.object().shape({
  label: Yup.string().required('Ce champ est obligatoire'),
  icon: Yup.string().required('Ce champ est obligatoire'),
  items: Yup.array().of(
      Yup.string()
        .required('Ce champ est requis')
        .min(2, 'Minimum 2 caractères')
    ).min(1, 'Au moins un élément est requis'),
})

export const validationSchemaSubmenu: Yup.AnyObjectSchema = Yup.object().shape({
  label: Yup.string().required('Ce champ est obligatoire'),
})
const GetAllMenu: React.FC<GetAllProps> = () => {

  const dispatch: any = useDispatch();
  const [load, setLoad] = useState<boolean>(true);
  const [openDel, setOpenDel] = useState<boolean>(false);
  const [openRestore, setOpenRestore] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openAddSubmenu, setOpenAddSubmenu] = useState<boolean>(false);
  const [_openUploadFile, setOpenUploadFile] = useState<boolean>(false);
  const [_file, _setFile] = useState(null);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  // const [loadings, setLoading] = useState(false);
  const [data, setData] = useState<TypeJustificatif[]>([]);
  const [paginate, setPaginate] = useState<any>({});
  const [rowSelectionModel, setRowSelectionModel] = useState<string[]>([]);
  const [typeJustificatifToUpdate, setTypeJustificatifToUpdate] = useState<TypeJustificatif | null>(null);
  const [menuToAdd, setMenuToAdd] = useState<any | null>(null);
  const [typeJustificatifToDelete, setTypeJustificatifToDelete] = useState<TypeJustificatif | null>(null);
  const [typeJustificatifToRestore, setTypeJustificatifToRestore] = useState<TypeJustificatif | null>(null);
  const [natureJustificatifUpdate, _setNatureJustificatifUpdate] = useState([]);
  const [selectedNatureJustificatifId, setSelectedNatureJustificatifId] = useState('');
  // const [openNatureJustificatif, setOpenNatureJustificatif] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [proofDocumentNatureToView, setProofDocumentNatureToView] = useState<TypeJustificatif | null>(null);
  const [natureJustificatif, setNatureJustificatif] = useState([]);
  const formRef = React.useRef(null);
  const [takeId, setTakeId] = useState(0)
  const [checked, setChecked] = React.useState([0]);
  const [colorAlert, setColorAlert] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [params, setParams] = useState<any>({
    page: 1,
    pageSize: 10,
    sortBy1: null,
    sortOrder1: null,
    sortBy2: null,
    sortOrder2: null,
    searchTerm: null,
    isActive: true,
    label: null,
  });
  // Ajoutez ce code à l'intérieur de votre composant GetAllTypeJustificatifs
  useEffect(() => {
    console.log('rowSelectionModel:', rowSelectionModel);
  }, [rowSelectionModel]);

  // const { loading }: any = useSelector((state: any) => state.PaysReducer);
  const { loading }: any = useSelector((state: any) => state.menuReducer || {});

  //Ajout des données
  const handleSubmitValue = (values: any, { resetForm }: any) => {
    console.log("le nouveau Pays 1 : ", values);
    dispatch(addMenu(values))
      .then((res: any) => {
        console.log('donneee', res);
        setVisible(true);
        const newMenu: any = {
          ...values, id: res.data.id
        };
        setData((prevData) => [...prevData, newMenu]);
        console.log("le nouveau Pays : ", newMenu);
        setPaginate((prevPaginate:any) => ({
          ...prevPaginate,
          totalCount: prevPaginate.totalCount + 1,
          totalActif: prevPaginate.totalActif + 1,
        }));
      })
      .catch((error: any) => {
        console.log(error);
        if (error && error.response?.status === 409) {
          setColorAlert(true);
          setMessageError(error.response?.data)
        }
      });
    console.log('Valeurs', values)

    resetForm();
  };

  //Ajout des données
  const handleSubmitSubmenu = (values: any, { resetForm }: any) => {
    console.log("submenu: ", values);
    const {label,menuId} = values
    dispatch(addSubmenu({label,menuId}))
      .then((res: any) => {
        console.log('donneee', res);
        setVisible(true);
        const newsubmenu: any = {
          ...values, id: res.data.id,
        };
        // setData((prevData) => [...prevData, newsubmenu]);
        console.log("submenus : ", newsubmenu);
        // setPaginate((prevPaginate:any) => ({
        //   ...prevPaginate,
        //   totalCount: prevPaginate.totalCount + 1,
        // }));
      })
      .catch((error: any) => {
        console.log(error);
        if (error && error.response?.status === 409) {
          setColorAlert(true);
          setMessageError(error.response?.data)
        }
      });
    console.log('Valeurs', values)

    resetForm();
  };


  // //Mise à jour des données
  // const handleUpdate = (values: any) => {
  //   rowSelectionModel.map((proofDocumentNatureIdId) => {
  //     dispatch(updateTypeJustificatif(proofDocumentNatureIdId, values))
  //       .then((res: any) => {
  //         console.log(res);
  //         setVisible(true);
  //         setData((prevData) =>
  //           prevData.map((proofDocumentNatureId: any) =>
  //             proofDocumentNatureId.id === proofDocumentNatureIdId ?
  //               { ...proofDocumentNatureId, ...values, proofDocumentNature: res.proofDocumentNature } : proofDocumentNatureId
  //           ));

  //       })
  //       .catch((error: any) => {
  //         console.log(error);
  //         if (error && error?.response.status === 409) {
  //           setColorAlert(true);
  //           setMessageError(error?.response.data)
  //         }
  //       });
  //   });
  // };
  // const handleUpdateOne = (values: any) => {
  //   console.log("donnéés de mise à jour : ", values);
  //   dispatch(updateTypeJustificatif(typeJustificatifToUpdate.id, values))
  //     .then((res: any) => {
  //       console.log(res);
  //       setVisible(true);
  //       setData((prevData) =>
  //         prevData.map((typeJustificatif: any) =>
  //           typeJustificatif.id === typeJustificatifToUpdate.id ?
  //             { ...typeJustificatif, ...values, proofDocumentNature: res.proofDocumentNature } : typeJustificatif
  //         ));
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //       if (error && error?.response.status === 409) {
  //         setColorAlert(true);
  //         setMessageError(error?.response.data)
  //       }
  //     });
  // };

  const handleOpenModalUpdate = useCallback((value:any) => {
    if (value !== null) {
      setTypeJustificatifToUpdate(value.row);
      setOpenUpdate(true);
    }
  }, []);
  const handleOpenModalAdd = useCallback((value:any) => {
    if (value !== null) {
      setMenuToAdd(value.row);
      setOpenAddSubmenu(true);
    }
  }, []);
  const typeJustificatifSelected = rowSelectionModel.map((typeJustificatifId) => {
    return data.find((typeJustificatif: any) => typeJustificatif.id === typeJustificatifId);
  });

  //suppression des données

  // const handleConfirmDelete = () => {
  //   if (checked.length > 1) {
  //     const typeJustificatifNotToDelete: any = typeJustificatifSelected.filter((typeJustificatif:any) => !checked.includes(typeJustificatif.id));
  //     handleDeleteOne(typeJustificatifNotToDelete);
  //     console.log('voir', typeJustificatifNotToDelete)
  //   } else {
  //     handleDeleteOne(takeId);
  //   }
  // };

  useEffect(() => {
    // cocher par défaut la liste des enregistrement selectionnées dans le modals
    const defaultCheckedTypeJustificatif = typeJustificatifSelected.map((typeJustificatif:any) => typeJustificatif?.id);
    setChecked(defaultCheckedTypeJustificatif);
  }, [rowSelectionModel]);

  const handleToggle = (value:any) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

  };
  // const handleDelete = () => {
  //   rowSelectionModel.forEach((TypeJustificatifId: any) => {
  //     // Vérifier si le TypeJustificatif est coché
  //     const isTypeJustificatifChecked = checked.includes(TypeJustificatifId);

  //     // Si le TypeJustificatif n'est pas coché, procéder à la suppression
  //     if (isTypeJustificatifChecked) {
  //       dispatch(deleteTypeJustificatif(TypeJustificatifId))
  //         .then((res: any) => {
  //           console.log(res);
  //           setOpenDel(false);
  //           setVisible(true);
  //           setData((prevData) =>
  //             prevData.filter((typeJustificatif: any) =>
  //               typeJustificatif.id !== TypeJustificatifId
  //             )
  //           );
  //           setPaginate((prevPaginate:any) => ({
  //             ...prevPaginate,
  //             totalActif: prevPaginate.totalActif - 1,
  //           }));
  //         })
  //         .catch((error: any) => {
  //           console.log(error);
  //         });
  //     }
  //   });
  // };


  console.log('Type de justificatif sélectionnées:', typeJustificatifSelected);

  const handleOpenModalDelete = useCallback((value:any) => {
    setOpenDel(true);
    setTakeId(value.row.id)
    setTypeJustificatifToDelete(value.row);
  }, []);

  if (typeJustificatifToDelete) {
    console.log('Type de justificatif à supprimer:', typeJustificatifToDelete);
  }

  // const handleDeleteOne = (typeJustificatifId: number) => {
  //   console.log("Le type de justificatif qu'on souhaite supprimer :");
  //   dispatch(deleteTypeJustificatif(typeJustificatifId))
  //     .then((res: any) => {
  //       console.log(res);
  //       setOpenDel(false);
  //       setVisible(true);
  //       setData((prevData) =>
  //         prevData.filter((typeJustificatif: any) =>
  //           typeJustificatif.id !== typeJustificatifId
  //         )
  //       );
  //       setPaginate((prevPaginate:any) => ({
  //         ...prevPaginate,
  //         totalActif: prevPaginate.totalActif - 1,
  //       }));
  //     })
  //     .catch((error:any) => {
  //       console.log(error);
  //     });
  // }
  //Restauration des données


  useEffect(() => {
    console.log("Hello, je suis là");
    API.get(`${settings.DOCUMENT_NATURE_URL}`, { headers })
      .then((res: any) => {
        console.log('Natures Justificatifs : ', res.data)
        setNatureJustificatif(res.data || [])
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [])


  const handleOpenModalDetail = useCallback((value:any) => {
    setOpenDetail(true);
    setProofDocumentNatureToView(value.row);
  }, []);

  // Mettre à jour les données du dataGrid lors du paginate
  const updatePage = (paginationModel: {
    page: number;
    pageSize: number;
  }) => {
    const newParams = {
      ...params,
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
    };
    setParams(newParams);
  };

  //Trie du tableau par colonne desc ou asc
  const handleSortChange = (sortModel:any) => {
    const newParams = {
      ...params,
      sortBy1: sortModel[0]?.field || null,
      sortOrder1: sortModel[0]?.sort || null,
    };
    setParams(newParams);
  };

  //Rendre la recherche moins lourde
  const debouncedUpdateParam = (field:any) => {
    return debounce((value:any) => {
      const newParams = {
        ...params,
        [field]: value,
      };
      setParams(newParams);
    }, 500);
  };
  const debouncedSearch = debouncedUpdateParam('searchTerm');
  const debouncedSearchLabel = debouncedUpdateParam('label');
  const debouncedSearchDescription = debouncedUpdateParam('description');
  const debouncedSearchProofDocumentNature = debouncedUpdateParam('documentNature');

  //Filtrer les données du tableau
  const handleFilterChange = (filterModel:any) => {
    const searchTerm = filterModel.items[0]?.value || null;
    const isActive = filterModel.items[1]?.value || null;
    const label = filterModel.items[2]?.value || null;
    const description = filterModel.items[3]?.value || null;
    const documentNature = filterModel.items[4]?.value || null;
    debouncedSearch(searchTerm);
    debouncedSearchLabel(label);
    debouncedSearchDescription(description);
    debouncedSearchProofDocumentNature(documentNature)
    const newParams = {
      ...params,
      isActive,
      label,
    };
    setParams(newParams);
  };
  //recherche multicritères
  // Rendre la recherche multicritère moins lourde

  const initialParams: any = {
    page: 1,
    pageSize: 10,
    sortBy1: null,
    sortOrder1: null,
    sortBy2: null,
    sortOrder2: null,
    searchTerm: null,
    isActive: false,
    label: null,
    icon: null,
  };
  const resetSearch = () => {
    setParams(initialParams);
  };
  const handleCleardebounce = () => {
    resetSearch();
  };
  useEffect(() => {
    API.get(`${settings.API_URL}/Pays`, { headers })
      .then((res: any) => {
        console.log('typeJustificatif', res.data)
        // setTypeJustificatif(res.data || [])
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [])

  useEffect(() => {
    dispatch(getMenuPagine(params))
      .then((res: any) => {
        console.log('Types Justificatifs', res);
        setData(res.data.items || []);
        setPaginate(res.paginationData)
        setLoad(false);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [params]);
  

  const sortedData = data;
  console.log('Data of Country', data);
  console.log('paginate', paginate);
  console.log('Params', params)

  return (
    <>
      {/* Alerte de notification */}
      {
        visible && <SuccessAlert visible={visible} setVisible={setVisible} />
      }
      {
        colorAlert && <WarningAlert colorAlert={colorAlert} setColorAlert={setColorAlert} messageError={messageError} />
      }

      {/* Action button */}
      <ActionButton
        rowSelectionModel={rowSelectionModel}
        setOpenDel={setOpenDel}
        data={data}
        setTypeJustificatifToUpdate={setTypeJustificatifToUpdate}
        setOpenUpdate={setOpenUpdate}
        setOpenAdd={setOpenAdd}
        setOpenUploadFile={setOpenUploadFile}
        setOpenRestore={setOpenRestore}
        debouncedSearch={debouncedSearch}
        debouncedSearchLabel={debouncedSearchLabel}
        debouncedSearchProofDocumentNature={debouncedSearchProofDocumentNature}
        debouncedSearchDescription={debouncedSearchDescription}
        handleCleardebounce={handleCleardebounce}
      />
      {/* Data grid */}
      <Tableau
        load={load}
        sortedData={sortedData}
        setRowSelectionModel={setRowSelectionModel}
        rowSelectionModel={rowSelectionModel}
        paginate={paginate}
        updatePage={updatePage}
        params={params}
        handleSortChange={handleSortChange}
        handleFilterChange={handleFilterChange}
        loading={loading}
        handleOpenModalDelete={handleOpenModalDelete}
        handleOpenModalUpdate={handleOpenModalUpdate}
        handleOpenModalDetail={handleOpenModalDetail}
        handleOpenModalAdd={handleOpenModalAdd}
      />

      {/*Dialog Add */}
      <FormAdd
        openAdd={openAdd}
        validationSchema={validationSchema}
        formRef={formRef}
        handleSubmitValue={handleSubmitValue}
        setOpenAdd={setOpenAdd}
      />
       <FormAddSubmenu
        openAdd={openAddSubmenu}
        validationSchema={validationSchemaSubmenu}
        formRef={formRef}
        handleSubmitValue={handleSubmitSubmenu}
        setOpenAdd={setOpenAddSubmenu}
        menuToAdd={menuToAdd}
      />

      {/* <FormAdd
        openAdd={openAdd}
        validationSchema={validationSchema}
        formRef={formRef}
        handleSubmitValue={handleSubmitValue}
        setOpenAdd={setOpenAdd}
        natureJustificatif={natureJustificatif}
        setNatureJustificatif={setNatureJustificatif}
        loadings={loadings}
        openNatureJustificatif={openNatureJustificatif}
        setOpenNatureJustificatif={setOpenNatureJustificatif}
        getNatureJustificatif={getNatureJustificatif}
      /> */}


      {/*Dialog delete */}
      {/* <FormDel
        openDel={openDel}
        setOpenDel={setOpenDel}
        handleDelete={handleDelete}
        rowSelectionModel={rowSelectionModel}
        typeJustificatifToDelete={typeJustificatifToDelete}
        typeJustificatifSelected={typeJustificatifSelected}
        handleToggle={handleToggle}
        checked={checked}
        handleConfirmDelete={handleConfirmDelete}
      /> */}

      {/* Dialog Update */}
      {/* <FormUpdate
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        typeJustificatifToUpdate={typeJustificatifToUpdate}
        validationSchema={validationSchema}
        formRef={formRef}
        natureJustificatif={natureJustificatif}
        setSelectdNatureJustificatifId={setSelectedNatureJustificatifId}
        selectedNatureJustificatifId={selectedNatureJustificatifId}
        handleUpdate={handleUpdate}
        handleUpdateOne={handleUpdateOne}
        rowSelectionModel={rowSelectionModel}
        natureJustificatifUpdate={natureJustificatifUpdate}
      /> */}
      {/* <FormRes
        openRestore={openRestore}
        setOpenRestore={setOpenRestore}
        handleRestore={handleRestore}
        rowSelectionModel={rowSelectionModel}
        typeJustificatifToRestore={typeJustificatifToRestore}
        handleToggle={handleToggle}
        checked={checked}
        handleConfirmRestore={handleConfirmRestore}
        typeJustificatifSelected={typeJustificatifSelected}
      /> */}
      <DetailTypeJustificatif
        open={openDetail}
        setOpen={setOpenDetail}
        proofDocumentNatureToView={proofDocumentNatureToView}
      />

    </>
  )
}

export default GetAllMenu;
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Tableau from './dataGrid';
import FormAdd from './add';
import * as Yup from 'yup';
// import { URL_API } from '@/redux/config';
import FormDel from './delete';
import FormUpdate from './update';
import FormRes from './restore'; import ActionButton from '@/components/lib/actions/donneesdebases/paiement/actionButtonTypeJustificatifs';
import debounce from 'lodash/debounce';
import { addTypeJustificatif, deleteTypeJustificatif, updateTypeJustificatif, restoreTypeJustificatif, uploadFile } from '@/redux/actions/donneesdebases/paiement/typeJustificatifAction';
import { TypeJustificatif, Params } from '@/components/lib/types/donneesdebases/paiement/typeJustificatif';
import settings, { headers } from '@/redux/config';
import API from '@/redux/API';
import SuccessAlert, { WarningAlert } from '@/components/lib/shared/notification';
import { getTypeJustificatifPagines } from '@/redux/actions/donneesdebases/paiement/typeJustificatifAction';
// import { sleep } from '@/components/lib/shared/const&style';
import DetailTypeJustificatif from './details';


interface GetAllProps { }
//Règles de validation d'un formulaire

export const validationSchema: Yup.AnyObjectSchema = Yup.object().shape({
  label: Yup.string().required('Ce champ est obligatoire'),
  proofDocumentNatureId: Yup.string().required('Ce champ est obligatoire')
})
const GetAllTypeJustificatif: React.FC<GetAllProps> = () => {

  const dispatch: any = useDispatch();
  const [load, setLoad] = useState<boolean>(true);
  const [openDel, setOpenDel] = useState<boolean>(false);
  const [openRestore, setOpenRestore] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [_openUploadFile, setOpenUploadFile] = useState<boolean>(false);
  const [_file, _setFile] = useState(null);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  // const [loadings, setLoading] = useState(false);
  const [data, setData] = useState<TypeJustificatif[]>([]);
  const [paginate, setPaginate] = useState<any>({});
  const [rowSelectionModel, setRowSelectionModel] = useState<string[]>([]);
  const [typeJustificatifToUpdate, setTypeJustificatifToUpdate] = useState<TypeJustificatif | null>(null);
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
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    sortBy1: null,
    sortOrder1: null,
    sortBy2: null,
    sortOrder2: null,
    searchTerm: null,
    isActive: false,
    label: null,
    description: null,
    documentNature: null,
  });
  // Ajoutez ce code à l'intérieur de votre composant GetAllTypeJustificatifs
  useEffect(() => {
    console.log('rowSelectionModel:', rowSelectionModel);
  }, [rowSelectionModel]);

  // const { loading }: any = useSelector((state: any) => state.PaysReducer);
  const { loading }: any = useSelector((state: any) => state.typeJustificatifReducer || {});

  //Ajout des données
  const handleSubmitValue = (values: any, { resetForm }: any) => {
    console.log("le nouveau Pays 1 : ", values);
    dispatch(addTypeJustificatif(values))
      .then((res: any) => {
        console.log('donneee', res);
        setVisible(true);
        const newTypeJustificatif: TypeJustificatif = {
          ...values, id: res.data.id, proofDocumentNature: res.data.proofDocumentNature
        };
        setData((prevData) => [...prevData, newTypeJustificatif]);
        console.log("le nouveau Pays : ", newTypeJustificatif);
        setPaginate((prevPaginate) => ({
          ...prevPaginate,
          totalCount: prevPaginate.totalCount + 1,
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
  const handleSubmitFile = (values: any) => {
    console.log("les nouveaux Pays 1 : ", values);
    dispatch(uploadFile(values))
      .then((res: any) => {
        console.log('donneee', res);
        setVisible(true);
        const newTypeJustificatif: TypeJustificatif = {
          ...values, id: res.data.id,
        };
        setData((prevData) => [...prevData, newTypeJustificatif]);
        console.log("Les type de justificatif  sont: ", newTypeJustificatif);
        setPaginate((prevPaginate) => ({
          ...prevPaginate,
          totalCount: prevPaginate.totalCount + 1,
        }));
      })
      .catch((error: any) => {
        console.log(error);
        if (error && error.response?.status === 409) {
          setColorAlert(true);
          setMessageError(error.response?.data)
        }
      });
    console.log('Valeurs', values);
  };

  // const handleSubmitFile1 = () => {

  //   // console.log("les nouveaux Pays 1 : ", values);
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   dispatch(uploadFile(formData))
  //     .then((res: any) => {
  //       console.log('donneee', res);
  //       setVisible(true);
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //       if (error && error.response?.status === 409) {
  //         setColorAlert(true);
  //         setMessageError(error.response?.data)
  //       }
  //     });
  //   // console.log('Valeurs', values);
  // };

  console.log('valeures', data)
  //Mise à jour des données
  const handleUpdate = (values: any) => {
    rowSelectionModel.map((proofDocumentNatureIdId) => {
      dispatch(updateTypeJustificatif(proofDocumentNatureIdId, values))
        .then((res: any) => {
          console.log(res);
          setVisible(true);
          setData((prevData) =>
            prevData.map((proofDocumentNatureId: any) =>
              proofDocumentNatureId.id === proofDocumentNatureIdId ?
                { ...proofDocumentNatureId, ...values, proofDocumentNature: res.proofDocumentNature } : proofDocumentNatureId
            ));

        })
        .catch((error: any) => {
          console.log(error);
          if (error && error?.response.status === 409) {
            setColorAlert(true);
            setMessageError(error?.response.data)
          }
        });
    });
  };
  const handleUpdateOne = (values: any) => {
    console.log("donnéés de mise à jour : ", values);
    dispatch(updateTypeJustificatif(typeJustificatifToUpdate.id, values))
      .then((res: any) => {
        console.log(res);
        setVisible(true);
        setData((prevData) =>
          prevData.map((typeJustificatif: any) =>
            typeJustificatif.id === typeJustificatifToUpdate.id ?
              { ...typeJustificatif, ...values, proofDocumentNature: res.proofDocumentNature } : typeJustificatif
          ));
      })
      .catch((error: any) => {
        console.log(error);
        if (error && error?.response.status === 409) {
          setColorAlert(true);
          setMessageError(error?.response.data)
        }
      });
  };

  const handleOpenModalUpdate = useCallback((value) => {
    if (value !== null) {
      setTypeJustificatifToUpdate(value.row);
      setOpenUpdate(true);
    }
  }, []);

  const typeJustificatifSelected = rowSelectionModel.map((typeJustificatifId) => {
    return data.find((typeJustificatif: any) => typeJustificatif.id === typeJustificatifId);
  });

  //suppression des données

  const handleConfirmDelete = () => {
    if (checked.length > 1) {
      const typeJustificatifNotToDelete: any = typeJustificatifSelected.filter(typeJustificatif => !checked.includes(typeJustificatif.id));
      handleDeleteOne(typeJustificatifNotToDelete);
      console.log('voir', typeJustificatifNotToDelete)
    } else {
      handleDeleteOne(takeId);
    }
  };

  useEffect(() => {
    // cocher par défaut la liste des enregistrement selectionnées dans le modals
    const defaultCheckedTypeJustificatif = typeJustificatifSelected.map((typeJustificatif) => typeJustificatif?.id);
    setChecked(defaultCheckedTypeJustificatif);
  }, [rowSelectionModel]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

  };
  const handleDelete = () => {
    rowSelectionModel.forEach((TypeJustificatifId: any) => {
      // Vérifier si le TypeJustificatif est coché
      const isTypeJustificatifChecked = checked.includes(TypeJustificatifId);

      // Si le TypeJustificatif n'est pas coché, procéder à la suppression
      if (isTypeJustificatifChecked) {
        dispatch(deleteTypeJustificatif(TypeJustificatifId))
          .then((res: any) => {
            console.log(res);
            setOpenDel(false);
            setVisible(true);
            setData((prevData) =>
              prevData.filter((typeJustificatif: any) =>
                typeJustificatif.id !== TypeJustificatifId
              )
            );
            setPaginate((prevPaginate) => ({
              ...prevPaginate,
              totalActif: prevPaginate.totalActif - 1,
            }));
          })
          .catch((error: any) => {
            console.log(error);
          });
      }
    });
  };


  console.log('Type de justificatif sélectionnées:', typeJustificatifSelected);

  const handleOpenModalDelete = useCallback((value) => {
    setOpenDel(true);
    setTakeId(value.row.id)
    setTypeJustificatifToDelete(value.row);
  }, []);

  if (typeJustificatifToDelete) {
    console.log('Type de justificatif à supprimer:', typeJustificatifToDelete);
  }

  const handleDeleteOne = (typeJustificatifId: number) => {
    console.log("Le type de justificatif qu'on souhaite supprimer :");
    dispatch(deleteTypeJustificatif(typeJustificatifId))
      .then((res: any) => {
        console.log(res);
        setOpenDel(false);
        setVisible(true);
        setData((prevData) =>
          prevData.filter((typeJustificatif: any) =>
            typeJustificatif.id !== typeJustificatifId
          )
        );
        setPaginate((prevPaginate) => ({
          ...prevPaginate,
          totalActif: prevPaginate.totalActif - 1,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //Restauration des données

  const handleConfirmRestore = () => {
    if (checked.length > 1) {
      const typeJustificatifNotToDelete: any = typeJustificatifSelected.filter(typeJustificatif => !checked.includes(typeJustificatif.id));
      console.log('Type de justificatif à resataurer :', typeJustificatifNotToDelete)
      handleRestoreOne(typeJustificatifNotToDelete);

    } else {
      handleRestoreOne(takeId);
    }
  };

  const handleRestore = () => {
    rowSelectionModel.forEach((typeJustificatifId: any) => {
      const isTypeJustificatifChecked = checked.includes(typeJustificatifId);
      const selectedTypeJustificatif = data.find((row) => row.id === typeJustificatifId);
      console.log('Rows', selectedTypeJustificatif)
      if (selectedTypeJustificatif && isTypeJustificatifChecked) {
        dispatch(restoreTypeJustificatif(typeJustificatifId, { ...selectedTypeJustificatif, isActive: true }))
          .then((res: any) => {
            console.log(res);
            setOpenRestore(false);
            setVisible(true);
            setData((prevData) =>
              prevData.map((typeJustificatif: any) =>
                typeJustificatif.id === typeJustificatifId ?
                  { ...typeJustificatif, ...selectedTypeJustificatif, isActive: !typeJustificatif.isActive }
                  : typeJustificatif
              ));
            setPaginate((prevPaginate) => ({
              ...prevPaginate,
              totalActif: prevPaginate.totalActif + 1,
            }));
          })
          .catch((error: any) => {
            console.log(error);
          });
      }
    });
  };

  const handleOpenMOdalRestore = useCallback((value) =>  {
    setOpenRestore(true);
    setTakeId(value.row.id)
    setTypeJustificatifToRestore(value.row);
    console.log('donnee à restaurer', typeJustificatifToRestore)
  }, []);

  const handleRestoreOne = (typeJustificatifId: any) => {
    const selectedTypeJustificatif = data.find((row) => row.id === typeJustificatifId);
    console.log('Type de justificatif à restaurer : ', selectedTypeJustificatif);
    if (selectedTypeJustificatif) {
      dispatch(restoreTypeJustificatif(typeJustificatifId, { ...selectedTypeJustificatif, isActive: true }))
        .then((res: any) => {
          console.log(res);
          setOpenRestore(false);
          setVisible(true);
          setData((prevData) =>
            prevData.map((typeJustificatif: any) =>
              typeJustificatif.id === typeJustificatifId ?
                { ...typeJustificatif, ...selectedTypeJustificatif, isActive: !typeJustificatif.isActive }
                : typeJustificatif
            ));
          setPaginate((prevPaginate) => ({
            ...prevPaginate,
            totalActif: prevPaginate.totalActif + 1,
          }));
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }

  // const getNatureJustificatif = async () => {
  //   try {
  //     const response = await API.get(`${URL_API}/payment/ProofDocumentsNatures`);
  //     console.log("URL pour nature document :", `${URL_API}/payment/ProofDocumentsNatures`)
  //     console.log('Nature Justificatif 11', response)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
  // const getNatureJustificatif = async (searchTerm, isUpdate) => {

  //   setLoading(true);
  //   try {
  //     const response = await API.get(`${URL_API}/payment/ProofDocumentsNatures`);
  //     console.log('Nature Justificatif', response);
  //     const filteredSocieteOptions = response.data.filter(
  //       (opt) => opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  //     );

  //     if (isUpdate) {
  //       setNatureJustificatifUpdate(filteredSocieteOptions);
  //     } else {
  //       setNatureJustificatif(filteredSocieteOptions);
  //     }

  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  // useEffect(() => {
  //   let active = true;

  //   if (!loadings) {
  //     return undefined;
  //   }

  //   (async () => {
  //     await sleep(1e3); // For demo purposes.

  //     if (active) {
  //       setNatureJustificatif([...natureJustificatif]);
  //       setNatureJustificatifUpdate([...natureJustificatifUpdate])
  //     }
  //   })();

  //   return () => {
  //     active = false;
  //   };
  // }, [loadings]);

  // useEffect(() => {
  //   if (!openNatureJustificatif) {
  //     setNatureJustificatif([]);
  //     setNatureJustificatifUpdate([]);
  //   }
  // }, []);


  const handleOpenModalDetail = useCallback((value) => {
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
  const handleSortChange = (sortModel) => {
    const newParams = {
      ...params,
      sortBy1: sortModel[0]?.field || null,
      sortOrder1: sortModel[0]?.sort || null,
    };
    setParams(newParams);
  };

  //Rendre la recherche moins lourde
  const debouncedUpdateParam = (field) => {
    return debounce((value) => {
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
  const handleFilterChange = (filterModel) => {
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
      description,
      documentNature,
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
    description: null,
    documentNature: null,
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
    dispatch(getTypeJustificatifPagines(params))
      .then((res: any) => {
        console.log('Types Justificatifs', res);
        setData(res.data.item1 || []);
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
        handleSubmitFile={handleSubmitFile}
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
        handleOpenMOdalRestore={handleOpenMOdalRestore}
        handleOpenModalUpdate={handleOpenModalUpdate}
        handleOpenModalDetail={handleOpenModalDetail}
      />

      {/*Dialog Add */}
      <FormAdd
        openAdd={openAdd}
        validationSchema={validationSchema}
        formRef={formRef}
        handleSubmitValue={handleSubmitValue}
        setOpenAdd={setOpenAdd}
        natureJustificatif={natureJustificatif}
        setSelectdNatureJustificatifId={setSelectedNatureJustificatifId}
        selectedNatureJustificatifId={selectedNatureJustificatifId}
      // setNatureJustificatif={setNatureJustificatif}
      // loadings={loadings}
      // openNatureJustificatif={openNatureJustificatif}
      // setOpenNatureJustificatif={setOpenNatureJustificatif}
      // getNatureJustificatif={getNatureJustificatif}
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
      <FormDel
        openDel={openDel}
        setOpenDel={setOpenDel}
        handleDelete={handleDelete}
        rowSelectionModel={rowSelectionModel}
        typeJustificatifToDelete={typeJustificatifToDelete}
        typeJustificatifSelected={typeJustificatifSelected}
        handleToggle={handleToggle}
        checked={checked}
        handleConfirmDelete={handleConfirmDelete}
      />

      {/* Dialog Update */}
      <FormUpdate
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
      />
      <FormRes
        openRestore={openRestore}
        setOpenRestore={setOpenRestore}
        handleRestore={handleRestore}
        rowSelectionModel={rowSelectionModel}
        typeJustificatifToRestore={typeJustificatifToRestore}
        handleToggle={handleToggle}
        checked={checked}
        handleConfirmRestore={handleConfirmRestore}
        typeJustificatifSelected={typeJustificatifSelected}
      />
      <DetailTypeJustificatif
        open={openDetail}
        setOpen={setOpenDetail}
        proofDocumentNatureToView={proofDocumentNatureToView}
      />

    </>
  )
}

export default GetAllTypeJustificatif;
import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
  TextField,
  Autocomplete
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Form, Formik } from 'formik';
import { FormUpdateProps } from '@/components/lib/types/donneesdebases/paiement/typeJustificatif';

export const styleModalTitle = {
  mb: 2,
  p: 2,
  backgroundColor: '#1b365f',
  color: '#ffffff'
};

export const styleDiv = {
  color: '#FF1943',
  fontSize: 13,
  marginLeft: 7,
  fontWeight: "bold",
  paddingTop: 5
};

const FormUpdate: React.FC<FormUpdateProps> = ({
  openUpdate,
  setOpenUpdate,
  typeJustificatifToUpdate,
  validationSchema,
  formRef,
  natureJustificatif,
  setSelectdNatureJustificatifId,
  handleUpdate,
  handleUpdateOne,
  rowSelectionModel
}) => {
  const [showUnchangedMessage, setShowUnchangedMessage] = useState(false);
  console.log("valeurs initiales pour la modification : ", typeJustificatifToUpdate, natureJustificatif);
  return (
    <>
      <Dialog
        open={openUpdate}
        onClose={() => setOpenUpdate(false)}
      >
        <DialogTitle sx={styleModalTitle} id="customized-dialog-title">
          Modifier le type de justificatif
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpenUpdate(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>
        <Formik
          initialValues={{
            id: typeJustificatifToUpdate?.id,
            label: typeJustificatifToUpdate?.label,
            code: typeJustificatifToUpdate?.code,
            description: typeJustificatifToUpdate?.description,
            proofDocumentNatureId: typeJustificatifToUpdate?.proofDocumentNatureId,
            proofDocumentNatureLabel: typeJustificatifToUpdate?.proofDocumentNature?.label,
            isActive: typeJustificatifToUpdate?.isActive
          }}
          validationSchema={validationSchema}
          innerRef={formRef}
          // onSubmit={rowSelectionModel.length !== 0 ? handleUpdate : handleUpdateOne}
          onSubmit={(values, actions) => {
            // Vérifier si les valeurs des champs sont inchangées
            const isUnchanged =
              values.label === formRef.current.initialValues.label &&
              values.description === formRef.current.initialValues.description || '' &&
              values.proofDocumentNatureId === formRef.current.initialValues.proofDocumentNatureId || '' &&
              values.isActive === formRef.current.initialValues.isActive;
            if (isUnchanged) {
              setShowUnchangedMessage(true); // Afficher un message à l'utilisateur
              actions.setSubmitting(false); // Empêcher la soumission du formulaire
            } else {
              // Les valeurs ont été modifiées, procéder à la soumission normalement
              setShowUnchangedMessage(false);
              rowSelectionModel.length !== 0 && values?.label !== '' && values.proofDocumentNatureId !== '' ?
                handleUpdate(values) :
                values?.label !== '' && handleUpdateOne(values);
              actions.setSubmitting(false); // Empêcher la soumission du formulaire
              setOpenUpdate(values?.label !== '' && values.proofDocumentNatureId !== '' ? false : true)
            }
          }}
        >
          {(formik) => (
            <Form>
              <DialogContent>

                <Autocomplete
                  id="proofDocumentNatureId"
                  options={natureJustificatif}
                  value={natureJustificatif?.find((opt) => opt.id === formik.values.proofDocumentNatureId) || null}
                  onChange={(e, value) => {
                    formik.handleChange(e);
                    formik.setFieldValue('proofDocumentNatureId', value?.id || '');
                    setSelectdNatureJustificatifId(value?.id || '');
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Nature Justificatif*"
                      size="small"
                      name="proofDocumentNatureId"
                      error={formik.touched.proofDocumentNatureId && Boolean(formik.errors.proofDocumentNatureId)}
                      onBlur={formik.handleBlur}
                    />
                  )}
                />
                {formik.errors.proofDocumentNatureId && formik.touched.proofDocumentNatureId && <p style={styleDiv}>{formik.errors.proofDocumentNatureId}</p>}
                <br />
                <Grid container spacing={2} direction='row' style={{ width: 'auto' }} >
                  <Grid item xs={12}>
                    <TextField
                      label="Type justificatif*"
                      id="label"
                      name="label"
                      size="small"
                      onChange={formik.handleChange('label')}
                      value={formik.values?.label}
                      error={formik.touched.label && Boolean(formik.errors.label)}
                      helperText={formik.touched.label && formik.errors.label}
                      onBlur={formik.handleBlur}
                      fullWidth

                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      name="description"
                      id="description"
                      size="small"
                      onChange={formik.handleChange('description')}
                      value={formik.values?.description}
                      fullWidth
                    />
                  </Grid>

                  {showUnchangedMessage && <p style={styleDiv}>Veuillez modifier au moins un champ.</p>}
                </Grid>
              </DialogContent>
              <DialogActions style={{ marginRight: '15px', marginTop: '-15px' }}>
                <Button
                  variant="outlined"
                  // color="error"
                  onClick={() => setOpenUpdate(false)}>Annuler</Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    if (JSON.stringify(formik.values) === JSON.stringify(formik.initialValues)) {
                      setShowUnchangedMessage(true);
                    } else {
                      setShowUnchangedMessage(false);
                      rowSelectionModel.length !== 0 && formik.values?.label !== '' && formik.values?.proofDocumentNatureId !== '' ?
                        handleUpdate(formik.values) :
                        formik.values?.label !== '' && handleUpdateOne(formik.values);
                      setOpenUpdate(formik.values?.label !== '' && formik.values?.proofDocumentNatureId !== '' ? false : true);
                    }
                  }}
                  type="button" // Utilisez type="button" pour éviter la soumission automatique du formulaire
                >
                  Modifier
                </Button>

              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default FormUpdate;

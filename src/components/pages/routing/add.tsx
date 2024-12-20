import React from 'react';
import {
  Button,
  TextField,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  DialogActions,
  Autocomplete,
} from '@mui/material';
import { Form, Formik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { FormAddProps } from '@/components/lib/types/donneesdebases/paiement/typeJustificatif';

export const styleDiv = {
  color: '#FF1943',
  fontSize: 13,
  marginLeft: 7,
  fontWeight: "bold",
  paddingTop: 5
};

const FormAdd: React.FC<FormAddProps> = ({
  openAdd,
  validationSchema,
  formRef,
  handleSubmitValue,
  natureJustificatif,
  setSelectdNatureJustificatifId,
  setOpenAdd
}) => {

  console.log("nature justificatif :", natureJustificatif);
  const handleClose = () => {
    setOpenAdd(false);
  };

  // let isInputEmpty = false;

  return (
    <React.Fragment>
      <Dialog open={openAdd} onClose={handleClose}>
        <DialogTitle sx={{ mb: 2, p: 2, backgroundColor: '#1b365f', color: '#ffffff' }} id="customized-dialog-title">
          Ajouter un type de justificatif
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}>
          <CloseIcon />
        </IconButton>
        <Formik
          initialValues={{ label: "", description: "", proofDocumentNatureId: '', isActive: true }}
          validationSchema={validationSchema}
          innerRef={formRef}
          onSubmit={handleSubmitValue}
        >
          {(formik) => (
            <Form>
              <DialogContent>

                <Grid item xs={12}>
                  <Autocomplete
                    id="proofDocumentNatureId"
                    isOptionEqualToValue={(option, value) => option.label === value?.label}
                    options={natureJustificatif}
                    value={natureJustificatif?.find((opt) => opt.id === formik.values.proofDocumentNatureId) || null}
                    onChange={(e, value) => {
                      formik.handleChange(e);
                      formik.setFieldValue('proofDocumentNatureId', value?.id || '');
                      setSelectdNatureJustificatifId(value?.id || '');
                      console.log('mes donnee', formik.values.proofDocumentNatureId)
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
                  {/* <InputLabel>Nature Justificatif</InputLabel> */}
                  {/* <Select
                      size="small"
                      label="Nature Justificatif*"
                      value={formik.values.proofDocumentNatureId}
                      onChange={(e) => {
                        formik.handleChange(e);
                        formik.setFieldValue('proofDocumentNatureId', e.target.value);
                      }}
                      error={formik.touched.proofDocumentNatureId && Boolean(formik.errors.proofDocumentNatureId)}
                      onBlur={formik.handleBlur}
                      fullWidth
                    >
                      <MenuItem value=""> Selectionner une nature de justificatif</MenuItem>
                      {natureJustificatif.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select> */}
                  {formik.errors.proofDocumentNatureId && formik.touched.proofDocumentNatureId && <p style={styleDiv}>{formik.errors.proofDocumentNatureId}</p>}
                  <br />
                </Grid>
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
                </Grid>
              </DialogContent>
              <DialogActions style={{ marginRight: '15px', marginTop: '-15px' }}>
                <Button
                  type="button"
                  variant="outlined"
                  // color="error"
                  style={{ marginTop: '20px', marginLeft: "15px" }}
                  onClick={handleClose}>Annuler</Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '20px' }}
                  onClick={() => setOpenAdd(formik.values?.label !== '' && formik.values?.proofDocumentNatureId !== '' ?
                    false : true)}>Ajouter</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </React.Fragment >
  );
};

export default FormAdd;

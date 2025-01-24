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
import * as MaterialIcons from '@mui/icons-material';

export const styleDiv = {
  color: '#FF1943',
  fontSize: 13,
  marginLeft: 7,
  fontWeight: "bold",
  paddingTop: 5
};
export const styleIcon = {
  color: '#1b365f',
  fontSize: 13,
  marginLeft: 7,
  fontWeight: "bold",
  paddingTop: 5
};



type IconType = keyof typeof MaterialIcons; // Type des noms d'icônes

const iconsList: { label: IconType; Component: React.ElementType }[] = Object.keys(MaterialIcons).map((icon) => ({
  label: icon as IconType,
  Component: MaterialIcons[icon as IconType],
}));
const FormAdd: React.FC<any> = ({
  openAdd,
  validationSchema,
  formRef,
  handleSubmitValue,
  natureJustificatif,
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
          Ajouter un menu dynamique
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}>
          <CloseIcon />
        </IconButton>
        <Formik
          initialValues={{ label: "", icon: "", isActive: true }}
          validationSchema={validationSchema}
          innerRef={formRef}
          onSubmit={handleSubmitValue}
        >
          {(formik) => (
            <Form>
              <DialogContent>

                {/* <Grid item xs={12}> */}
                  {/* <Autocomplete
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
                  /> */} 
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
                  {/* {formik.errors.proofDocumentNatureId && formik.touched.proofDocumentNatureId && <p style={styleDiv}>{formik.errors.proofDocumentNatureId}</p>}
                  <br /> */}
                {/* </Grid> */}
                <Grid container spacing={2} direction='row' style={{ width: 'auto' }} >
                  <Grid item xs={12}>
                    <TextField
                      label="Ajouter un menu*"
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
                  <Autocomplete
                    options={iconsList}
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => (
                      <li {...props} style={{ display: 'flex', alignItems: 'center' }}>
                        <option.Component style={{ marginRight: 8 }} />
                        {option.label}
                      </li>
                    )}
                    onChange={(event, value) => {
                      formik.setFieldValue('icon', value?.label || '');
                    }}
                    //error={formik.touched.icon && Boolean(formik.errors.icon)}
                    onBlur={formik.handleBlur}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Sélectionnez une icône"
                        size="small"
                        fullWidth
                      />
                    )}
                  />
                  {formik.errors.icon && formik.touched.icon && <p style={styleDiv}>{formik.errors.icon}</p>}
               
                {formik.values.icon && MaterialIcons[formik.values.icon as IconType] ? (
                    React.createElement(MaterialIcons[formik.values.icon as IconType], { style: { marginRight: 8 } })
                  ) : (
                    <p style={styleIcon}>Icône absente</p>
                  )}
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
                  onClick={() => setOpenAdd(formik.values?.label !== '' ?
                    false : true)}
                    >Ajouter</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </React.Fragment >
  );
};

export default FormAdd;

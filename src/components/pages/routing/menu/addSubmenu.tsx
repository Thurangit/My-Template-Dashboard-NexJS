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
import { Form, Formik, } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { disabledBtnStyle } from '@/components/shared/const&style';

export const styleDiv = {
  color: '#FF1943',
  fontSize: 13,
  marginLeft: 7,
  fontWeight: "bold",
  paddingTop: 5
};

const FormAddSubmenu: React.FC<any> = ({
  openAdd,
  validationSchema,
  formRef,
  handleSubmitValue,
  setOpenAdd,
  menuToAdd
}) => {

  const handleClose = () => {
    setOpenAdd(false);
  };


  return (
    <React.Fragment>
      <Dialog open={openAdd} onClose={handleClose}>
        <DialogTitle sx={{ mb: 2, p: 2, backgroundColor: '#1b365f', color: '#ffffff' }} id="customized-dialog-title">
          Ajouter un sous-menu au menu <b>{menuToAdd?.label}</b>
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}>
          <CloseIcon />
        </IconButton>
        <Formik
          initialValues={{ label: '', menuId: menuToAdd?.id, menu: menuToAdd?.label, isActive: true }}
          validationSchema={validationSchema}
          innerRef={formRef}
          onSubmit={handleSubmitValue}
        >
          {(formik) => (
            <Form>
              <DialogContent>
                <Grid container spacing={2} direction='row' style={{ width: 'auto' }} >
                  <Grid item xs={12}>
                    <TextField
                      label="Menu"
                      id="menu"
                      name="menu"
                      size="small"
                      onChange={formik.handleChange('menu')}
                      sx={disabledBtnStyle}
                      value={formik.values?.menu}
                      disabled
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Ajouter un sous-menu*"
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
                //   onClick={() => setOpenAdd(formik.values?.label !== '' ?
                //     false : true)}
                    >Ajouter</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </React.Fragment >
  );
};

export default FormAddSubmenu;

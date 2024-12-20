

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    Grid,
    Typography,
  }
    from '@mui/material';
  import * as React from 'react';
  import CloseIcon from '@mui/icons-material/Close';
  import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

  
  interface FormAttentionProps {
    openAlert: boolean;
    setOpenAlert: (value: boolean) => void;
  }
  
  // Typage du composant
  const FormAttention: React.FC<FormAttentionProps> = ({
    openAlert,
    setOpenAlert,
  }) => {
  

    const handleCloseModal = () => {
      setOpenAlert(false);
    }
    return (
      <React.Fragment>
        <Dialog
          open={openAlert}
          onClose={handleCloseModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
                <IconButton
                    aria-label="close"
                    onClick={handleCloseModal}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
                
                <DialogContent>
                    <Grid style={{padding:'30px',}}>
                    <Grid container justifyContent="center">
                        <ErrorOutlineIcon sx={{fontSize: 70 }}/>
                    </Grid>
                        {/* <Typography
                                variant="h4"
                                fontWeight="bold"
                                color="text.primary"
                                align='center'
                                gutterBottom
                                noWrap id="alert-dialog-title"
                                style={{paddingTop:'10px'}}
                        >
                                {"Retablir la pièce"}
                        </Typography> */}
                        <Typography  
                                variant="body2"
                                color="text.secondary" 
                                align='center'
                                id="alert-dialog-description"
                                >
                                Vous n'avez pas les accès requis pour accéder à cette page veuillez contacter l'administrateur
                        </Typography>   
                </Grid>
                </DialogContent>
                <DialogActions>
                <Grid container justifyContent="center" style={{padding:'5px'}}>
                            <Button 
                            variant="outlined"
                            onClick={handleCloseModal} sx={{ margin: 1 }}
                            >
                                Fermer
                            </Button>
                        </Grid>
                </DialogActions>
        </Dialog>

      </React.Fragment>
    );
  }
  
  export default FormAttention;
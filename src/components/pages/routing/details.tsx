import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { format } from 'date-fns';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function DetailTypeJustificatif({ open, setOpen, proofDocumentNatureToView }) {

  const handleClose = () => {
    setOpen(false);
  };

  console.log('type justificatifs à afficher', proofDocumentNatureToView)
  return (
    <React.Fragment>
      {
        proofDocumentNatureToView &&
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ mb: 2, p: 2, backgroundColor: '#1b365f', color: '#ffffff' }} id="customized-dialog-title">
            Détails du type justificatif
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <Card variant='outlined'>
              <Box sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  Type justificatif:
                  <Typography gutterBottom variant="h4" component="div">
                    {proofDocumentNatureToView?.label}
                  </Typography>

                </Stack>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  Nature justificative:
                  <span style={{ fontWeight: 'bold' }}>
                    {proofDocumentNatureToView?.proofDocumentNature?.label}
                  </span>
                </Stack>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  Description:
                  <span style={{ fontWeight: 'bold' }}>
                    {proofDocumentNatureToView?.description}
                  </span>
                </Stack>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <p>
                      Créé le : <span style={{ fontWeight: 'bold' }}>{' '}
                        {proofDocumentNatureToView.insertionDate &&
                          format(new Date(proofDocumentNatureToView?.insertionDate), 'dd/MM/yyyy à HH:mm')}</span>
                    </p>
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <p style={{ textAlign: 'left' }}>
                      Modifié le : <span style={{ fontWeight: 'bold' }}> {' '}
                        {proofDocumentNatureToView.updateDate &&
                          format(new Date(proofDocumentNatureToView?.updateDate), 'dd/MM/yyyy à HH:mm')}</span>
                    </p>
                  </Box>
                </Stack>
              </Box>
            </Card>
          </DialogContent>
        </BootstrapDialog>
      }

    </React.Fragment>
  );
}

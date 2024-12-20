import {
  DialogContentText,
  DialogTitle,
  Button,
  Dialog,
  IconButton,
  DialogActions,
  DialogContent
}
  from '@mui/material';
import * as React from 'react';
import { styleModalTitle } from './update';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import { FormDelProps } from '@/components/lib/types/donneesdebases/paiement/typeJustificatif';


const FormDel: React.FC<FormDelProps> = ({
  openDel,
  setOpenDel,
  typeJustificatifToDelete,
  handleDelete,
  rowSelectionModel,
  typeJustificatifSelected,
  handleToggle,
  checked,
  handleConfirmDelete
}) => {
  // console.log('pays', paysSelected)
  const handleClose = () => {
    setOpenDel(false);
  }
  return (
    <React.Fragment>
      <Dialog
        open={openDel}
        onClose={() => setOpenDel(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={styleModalTitle} id="customized-dialog-title">
          Suppression
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}>
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span style={{ textAlign: 'center' }}> Vous êtes sur le point de Supprimer
              {rowSelectionModel.length > 1 ? ' les pays ' : ' le pays '}
              suivant du système: </span>
            <br />
            {typeJustificatifSelected.length === 0 ?
              <p>
                <span style={{ color: '#223354', fontWeight: 'bold', textAlign: 'center' }}>
                  {typeJustificatifToDelete?.label}
                </span>
              </p>
              :
              <List>
                {typeJustificatifSelected?.map((typeJustificatif: any, index) => {
                  const labelId = `checkbox-list-label-${typeJustificatif?.id}`;
                  return (

                    <ListItem
                      key={index}
                      disablePadding
                    >
                      <ListItemButton role={undefined} onClick={handleToggle(typeJustificatif?.id)} dense>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.indexOf(typeJustificatif?.id) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText style={{ color: '#223354', fontWeight: 'bold' }} id={labelId} primary={`${typeJustificatif?.label}`} />
                      </ListItemButton>
                    </ListItem>
                  )
                })
                }
              </List>
            }

            {
              typeJustificatifSelected.length === 0 ? '' :
                'Décochez les éléments que vous souhaitez retirer de la liste?'
            }

          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ marginRight: '15px', marginTop: '-15px' }}>
          <Button
            variant="outlined"
            // color="error"
            onClick={() => setOpenDel(false)}>
            Annuler
          </Button>
          <Button
            variant="contained"
            onClick={rowSelectionModel.length !== 0 ? handleDelete : handleConfirmDelete} autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  );
}

export default FormDel;
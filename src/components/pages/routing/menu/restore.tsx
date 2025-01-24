import {
  DialogContentText,
  DialogTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  List, IconButton,
  ListItem,
  ListItemButton,
  Checkbox,
  ListItemText,
  ListItemIcon
}
  from '@mui/material';
import * as React from 'react';
import { styleModalTitle } from './update';
import CloseIcon from '@mui/icons-material/Close';
import { FormRestoreProps } from '@/components/lib/types/donneesdebases/paiement/typeJustificatif';

const FormRes: React.FC<FormRestoreProps> = ({
  openRestore,
  setOpenRestore,
  typeJustificatifToRestore,
  handleRestore,
  rowSelectionModel,
  handleToggle,
  checked,
  handleConfirmRestore,
  typeJustificatifSelected
}) => {

  // console.log("pays selectionnés pour la restauration :", paysToRestore)

  return (
    <React.Fragment>
      <Dialog
        open={openRestore}
        onClose={() => setOpenRestore(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={styleModalTitle} id="customized-dialog-title">
          Restauration
        </DialogTitle>
        <IconButton aria-label="close" onClick={() => setOpenRestore(false)} sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}>
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span style={{ textAlign: 'center' }}> Vous êtes sur le point de restaurer
              {rowSelectionModel.length > 1 ? ' les pays ' : ' le pays '}
              suivant du système: </span>
            <br />
            {typeJustificatifSelected.length === 0 ?
              <p>
                <span style={{ color: '#223354', fontWeight: 'bold', textAlign: 'center' }}>
                  {typeJustificatifToRestore?.label}
                </span> {''}
                <span style={{ color: '#223354', fontWeight: 'italic', textAlign: 'center' }}>
                  {`(${typeJustificatifToRestore?.code})`}
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
                        <ListItemText style={{ color: '#223354', fontWeight: 'bold' }} id={labelId} primary={`${typeJustificatif?.label}(${typeJustificatif?.code})`} />
                      </ListItemButton>
                    </ListItem>
                  )
                })}
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
            onClick={() => setOpenRestore(false)}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            onClick={rowSelectionModel.length !== 0 ? handleRestore : handleConfirmRestore}
            autoFocus
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default FormRes;
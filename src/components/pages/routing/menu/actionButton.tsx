import { Button, CardContent, Grid } from '@mui/material';
import React from 'react';

// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import RestoreIcon from '@mui/icons-material/Restore';
import { PrivilegeActionButton } from '@/utils/privilege';
import SearchMulti from './search/searchMulti';
import Search from '@/components/shared/search';


// import Backdrop from '@mui/material/Backdrop';

const ActionButton: React.FC<any> = ({
  rowSelectionModel,
  setOpenDel,
  data,
  setRoleToUpdate,
  setOpenUpdate,
  setOpenAdd,
  // setOpenRestore,
  debouncedSearch,
  debouncedSearchLabel,
  debouncedSearchDescription,
  handleCleardebounce,

}) => {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // const isRestaurerButtonDisabled =
  //   rowSelectionModel.length === 0 ||
  //   rowSelectionModel.some(
  //     (selectedRow) =>
  //       !data.find((row) => row.id === selectedRow)?.isActive === false
  //   );
  const isDeleteButtonDisabled =
    rowSelectionModel.length === 0 ||
    rowSelectionModel.some(
      (selectedRow:any) => !data.find((row:any) => row.id === selectedRow)?.isActive
    );
  const isModifierButtonDisabled =
    rowSelectionModel.length !== 1 ||
    !data.find((row:any) => row.id === rowSelectionModel[0])?.isActive;

  // const actions = [
  //   {
  //     icon: <AddIcon sx={{ color: '#57CA22' }} />,
  //     name: 'Ajouter',
  //     action: () => setOpenAdd(true)
  //   },
  //   {
  //     icon: <EditIcon sx={{ color: '#1b365f' }} />,
  //     name: 'Modifier',
  //     action: () => {
  //       if (rowSelectionModel.length === 1) {
  //         const selectedsection = data.find(
  //           (section) => section.id === rowSelectionModel[0]
  //         );
  //         setRoleToUpdate(selectedsection);
  //         setOpenUpdate(true);
  //       }
  //     }
  //   },
  //   {
  //     icon: <DeleteIcon sx={{ color: '#FF1943' }} />,
  //     name: 'Supprimer',
  //     action: () => setOpenDel(true)
  //   },
  //   {
  //     icon: <RestoreIcon sx={{ color: '#9c27b0' }} />,
  //     name: 'Restaurer',
  //     action: () => setOpenRestore(true)
  //   }
  // ];

  return (
    <Grid
      item
      container
      xs={12}
      justifyContent="space-between"
      alignItems="center"
    >
      {/* Composant de recherche à gauche */}
      <Grid item style={{ display: 'flex', marginLeft: '20px' }}>
        <Search debouncedSearch={debouncedSearch} handleCleardebounce={handleCleardebounce} />
        {/* <SearchMulti
          debouncedSearchLabel={debouncedSearchLabel}
          debouncedSearchDescription={debouncedSearchDescription}
          handleCleardebounce={handleCleardebounce}
        /> */}
      </Grid>
      {/* Boutons à droite */}
      <Grid item>
        <CardContent>
          {/* <Button
            sx={{ margin: 1 }}
            variant="contained"
            color="secondary"
            style={{ borderColor: 'transparent' }}
            disabled={isRestaurerButtonDisabled}
            onClick={() => setOpenRestore(true)}
          >
            Restaurer
          </Button> */}
          {/* <PrivilegeActionButton lecture="administration.role.lecture"
              ecriture="administration.role.ecriture"
              modification="administration.role.modification"
              suppression="">
          <Button
            sx={{ margin: 1 }}
            variant="contained"
            color="error"
            disabled={isDeleteButtonDisabled}
            onClick={() => setOpenDel(true)}
          >
            Supprimer
          </Button>
          </PrivilegeActionButton>
          <PrivilegeActionButton lecture="administration.role.lecture"
              ecriture="administration.role.ecriture"
              modification=""
              suppression="">
          <Button
            sx={{ margin: 1 }}
            variant="contained"
            disabled={isModifierButtonDisabled}
            onClick={() => {
              if (rowSelectionModel.length === 1) {
                const selectedsection = data.find(
                  (section) => section.id === rowSelectionModel[0]
                );
                setRoleToUpdate(selectedsection);
                setOpenUpdate(true);
              }
            }}
          >
            Modifier
          </Button> */}
          {/* </PrivilegeActionButton> */}
          {/* <PrivilegeActionButton lecture="administration.role.lecture"
              ecriture=""
              modification=""
              suppression=""> */}
          <Button
            sx={{ margin: 1, backgroundColor: '#57CA22' }}
            variant="contained"
            color="success"
            onClick={() => setOpenAdd(true)}
          >
            Ajouter
          </Button>
          {/* </PrivilegeActionButton> */}
        </CardContent>
      </Grid>

      {/* <Backdrop open={open} />
          <SpeedDial
            ariaLabel="SpeedDial controlled open example"
            sx={{ position: 'fixed', bottom: 40, left: 16 }}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            section={'right'}
          >
            {actions.map((action) => 
              (
                <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.action}
              />
              )
             
            )}
          </SpeedDial> */}
    </Grid>
  );
};
export default ActionButton;

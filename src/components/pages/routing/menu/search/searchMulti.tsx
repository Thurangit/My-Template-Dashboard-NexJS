import React, { useState } from 'react';
import {
  Button, TextField, IconButton,
  // FormControl, InputLabel, Select, MenuItem,
  Box,
  Grid
} from '@mui/material';
import Drawer from '@mui/material/Drawer';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { CloseOutlined, DeleteOutline } from '@mui/icons-material';

function SearchMulti({
  debouncedSearchLabel, debouncedSearchDescription, debouncedSearchProofDocumentNature, handleCleardebounce }) {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [documentNature, setDocumentNature] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [_searchData, setSearchData] = useState(null);

  const handleClearClick = () => {
    setLabel('');
    setDescription('');
    setDocumentNature('');
    setActiveFilters({});
    setSearchData(null);
    handleCleardebounce()
  };

  const updateSearchData = (label, description, documentNature) => {
    setSearchData({ label, description, documentNature });
    setActiveFilters({
      label: label !== '',
      description: description !== '',
      documentNature: documentNature !== ''
    });
  };
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // console.log('search Multi', label);
  const DrawerList = (
    <Box sx={{ width: 320 }} role="presentation">
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseOutlined />
          </IconButton>
        </div>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { mb: 1, mt: 1, width: '100%' },
          }}
          justifyContent='center'
          noValidate
          autoComplete="off"
        >
          <p style={{ fontWeight: 'bold' }}>Rechercher par:</p>
          <>

            <TextField
              label="Type jutificatif"
              variant="outlined"
              size='small'
              value={label}
              onChange={(e) => {
                const label = e.target.value;
                setLabel(label);
                debouncedSearchLabel(label);
                updateSearchData(label, description, documentNature)
              }}
              style={{ marginRight: '10px' }}
            />

            <TextField
              label="Description"
              variant="outlined"
              size='small'
              value={description}
              onChange={(e) => {
                const description = e.target.value;
                setDescription(description)
                debouncedSearchDescription(description)
                updateSearchData(label, description, documentNature)
              }}
              style={{ marginRight: '10px' }}
            />
            <TextField
              label="Nature justificatif"
              variant="outlined"
              size='small'
              value={documentNature}
              onChange={(e) => {
                const proofDocumentNature = e.target.value;
                setDocumentNature(proofDocumentNature)
                debouncedSearchProofDocumentNature(proofDocumentNature)
                updateSearchData(label, description, proofDocumentNature)
              }}
              style={{ marginRight: '10px' }}
            />
          </>
          <Button onClick={handleClearClick} variant="contained" startIcon={<DeleteOutline />}>
            Annuler la recherche
          </Button>
        </Box>
      </div>
    </Box>
  );
  return (
    <>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={4}>
          <Button onClick={toggleDrawer(true)} variant="text" startIcon={<FilterAltIcon />} sx={{ ml: 1 }}>
            Filtrer
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={2} alignItems="center">
            {Object.keys(activeFilters).map((filter) => {
              if (activeFilters[filter]) {
                return (
                  <Grid item key={filter}>
                    {(filter === 'label' || filter === 'description' || filter === 'documentNature') && (
                      <Grid container alignItems="center">
                        {filter === 'label' && label && (
                          <IconButton onClick={() => {
                            setLabel('');
                            debouncedSearchLabel('');
                          }}
                            color='warning'
                          >
                            <p style={{ fontSize: '12px' }}>Type jutificatif : {label}</p>
                            <CloseOutlined sx={{ width: 20, height: 20 }} />
                          </IconButton>
                        )}
                        {filter === 'description' && description && (
                          <IconButton onClick={() => {
                            setDescription('');
                            debouncedSearchDescription('');
                          }}
                            color='warning'
                          >
                            <p style={{ fontSize: '12px' }}> Description : {description}</p>
                            <CloseOutlined sx={{ width: 20, height: 20 }} />
                          </IconButton>
                        )}
                        {filter === 'documentNature' && documentNature && (
                          <IconButton onClick={() => {
                            setDocumentNature('');
                            debouncedSearchProofDocumentNature('');
                          }}
                            color='warning'
                          >
                            <p style={{ fontSize: '12px' }}> Nature justificatif : {documentNature}</p>
                            <CloseOutlined sx={{ width: 20, height: 20 }} />
                          </IconButton>
                        )}
                      </Grid>
                    )}
                  </Grid>
                );
              }
              return null;
            })}
          </Grid>
        </Grid>
      </Grid>
      <Drawer open={open} anchor={'right'} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}

export default SearchMulti;

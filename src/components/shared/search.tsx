import React, { useState } from 'react'
import { Grid, InputAdornment, TextField,IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

type SearchProps = {
  debouncedSearch: (value: string) => void; // Une fonction qui prend une chaîne et ne retourne rien
  handleCleardebounce: () => void; // Une fonction sans paramètres qui ne retourne rien
};

function Search({ debouncedSearch, handleCleardebounce }: SearchProps) {

    const [searchTerm, setSearchTerm] = useState('');
    const handleClearClick = () => {
        setSearchTerm('');
        debouncedSearch(''); // Déclenche immédiatement la réinitialisation
        handleCleardebounce()
      };
    console.log('search',searchTerm)
  return (
    <Grid item sx={{paddingBottom: 2 }}>
              <TextField
              variant="standard"
              placeholder='Rechercher...'
              value={searchTerm}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ width: 22 }} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment sx={{ marginLeft: '-20px' }} position="end">
                    <IconButton sx={{ padding: 0 }} onClick={handleClearClick}>
                      <CloseIcon sx={{ width: 20, height: 20 }} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              onChange={(event) => {
                const newSearchTerm = event.target.value;
                setSearchTerm(newSearchTerm);
                debouncedSearch(newSearchTerm);
              }}
            />
  </Grid>
  )
}

export default Search

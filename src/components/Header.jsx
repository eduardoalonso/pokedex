import React from 'react';
import { Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';

export const Header = (props) => {
    const {selectedTypes, handleFiltersOff, setOpenFilters, heightChange} = props;
  return (
    <Grid container>
    <Grid item xs={11} style={{ margin: 'auto' }}>
      <h1>Pokedex</h1>
    </Grid>
    <Grid item xs={1} style={{ margin: 'auto' }}>
      {
        selectedTypes.length > 0 || heightChange ?
          <IconButton onClick={() => { handleFiltersOff() }}>
            <CloseIcon />
          </IconButton>
          :
          <></>
      }
      <IconButton onClick={() => { setOpenFilters(true); }}>
        <FilterListIcon />
      </IconButton>
    </Grid>
  </Grid>
  )
}

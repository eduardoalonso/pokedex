import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

export const NoResultsCard = () => {
  return (
    <Paper elevation={10} style={{ padding: '50px', maxHeight: '40%', maxWidth: '400px', margin: '100px auto' }}>
      <Grid container>
        <Typography>
            Pokemons not found.
        </Typography>
      </Grid>
    </Paper>
  )
}

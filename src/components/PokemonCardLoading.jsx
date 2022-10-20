import React from 'react';
import { Grid, Paper, Skeleton } from '@mui/material';

export const PokemonCardLoading = () => {
  return (
    <Paper elevation={10} style={{ padding: '50px', maxHeight: '40%', maxWidth: '400px', margin: '100px auto' }}>
      <Grid container>
        <Grid item xs={12} style={{ margin: '0px 0px 20px 0px' }}>
          <Skeleton variant='rounded' />
        </Grid>
        <Grid item xs={6} style={{ margin: '0px 0px 20px 0px' }} >
          <Skeleton variant='rounded' width={400} height={100} />

        </Grid>
        <Grid item xs={12} style={{ marginBottom: '20px' }}>
          <Skeleton variant='rounded' />
        </Grid>
        <Grid item xs={12} style={{ margin: 'auto' }}>
          <Skeleton variant='rounded' width={400} height={50} />
        </Grid>
      </Grid>
    </Paper>
  )
}

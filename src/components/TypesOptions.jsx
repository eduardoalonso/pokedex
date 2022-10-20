import React from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid } from '@mui/material';
import { types } from '../constants';

export const TypesOptions = (props) => {
    const {getSelectedTypes, selectedTypes} = props;
    return (
        <Grid container direction='row' >
            <FormControl component='fieldset' variant='standard' >
                <FormLabel component="legend">Search by type</FormLabel>
                <FormGroup row>
                    {
                        types.results.map((type, index) => {
                            return (
                                <Grid item xs={4} key={index}>
                                    <FormControlLabel
                                        key={index}
                                        control={
                                            <Checkbox />
                                        }
                                        onChange={(e) => getSelectedTypes(e)}
                                        value={type.value}
                                        label={type.label}
                                        checked={selectedTypes.includes(type.value)}
                                    />
                                </Grid>
                            )
                        })
                    }
                </FormGroup>
            </FormControl>
        </Grid>
    )
}

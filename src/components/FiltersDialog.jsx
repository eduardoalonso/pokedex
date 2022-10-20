import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, Slider, Typography, Grid } from '@mui/material';
import { TypesOptions } from './TypesOptions';

export const FiltersDialog = (props) => {
    const { open, setOpen, setSelectedTypes, selectedTypes, setApply, apply, maxHeight, value, setValue, setHeightChange } = props;

    const marks = [
        {
            value: 1,
            label: '1',
        },
        {
            value: maxHeight,
            label: `${maxHeight}`,
        },
    ];

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setHeightChange(true);
    };

    const valuetext = (value) => {
        return `${value}°`;
    }

    const getSelectedTypes = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedTypes([...selectedTypes, value]);
        } else {
            setSelectedTypes(selectedTypes.filter((e) => e !== value));
        }
    };

    const handleApply = () => {
        setApply(!apply);
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={() => { setOpen(false) }} fullWidth={true}>
            <DialogTitle>Filters</DialogTitle>
            <DialogContent>
                <Grid container style={{ minHeight: '150px' }}>
                    <Grid style={{ margin: 'auto' }}>
                        <Typography>
                            Height
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{}}>
                        <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            marks={marks}
                        />
                    </Grid>
                </Grid>
                <TypesOptions
                    getSelectedTypes={getSelectedTypes}
                    selectedTypes={selectedTypes}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { setOpen(false) }} variant='contained' color='error'>Cancel</Button>
                <Button onClick={() => { handleApply() }} variant='contained' color='success'>Apply</Button>
            </DialogActions>
        </Dialog>
    )
}
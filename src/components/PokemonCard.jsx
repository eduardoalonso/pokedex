import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import { typeColors } from '../constants';
import { Typography, Skeleton, Paper, Grid } from '@mui/material';
import { pokemonDescription } from '../services/lib/information';


export const PokemonCard = (props) => {
    const { pokemon, reload } = props;
    const [description, setDescription] = useState();

    const getDescription = async () => {
        try {
            const { data } = await pokemonDescription(pokemon.id);
            for (let i = 0; i < data.flavor_text_entries.length; i++) {
                if(data.flavor_text_entries[i].language.name === 'en'){
                    setDescription(data.flavor_text_entries[i].flavor_text);
                    return;
                }
            }
            setDescription('No information available');
        } catch (err) {

        }
    };

    useEffect(() => {
        getDescription();
    }, []);

    useEffect(() => {
        getDescription();
    }, [reload]);

    return (
        <Paper elevation={10} style={{ padding: '50px', maxHeight: '40%', maxWidth: '400px', margin: '100px auto' }}>
            <Grid container>
                <Grid item xs={12}>
                <Typography variant='h5'>
                {`${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}`}
            </Typography>
                </Grid>
            <Grid item xs={12} style={{margin: '15px 10px 10px 5px'}}>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{ minWidth: '130px', minHeight: '130px' }} />
                <img src={pokemon.sprites.back_default} alt={pokemon.name} style={{ minWidth: '130px', minHeight: '130px' }} />
            </Grid>
            <Grid item xs={12} style={{marginBottom: '20px'}}>
                {
                    pokemon.types.map((type, index) => {
                        return (
                            <Chip key={index} label={type.type.name} variant='outlined' style={{ backgroundColor: typeColors[type.type.name], color: type.type.name === 'ice' ? 'black' : 'white', margin:'0px 5px 0px 5px' }} />
                        )
                    })
                }
            </Grid>
            <Grid item xs={12} style={{margin:'auto'}}>
                {
                    description ?
                    <Typography>
                        {description}
                    </Typography>
                    :
                    <Skeleton variant='rounded' width={400} height={50} />
                }
            </Grid>
            </Grid>
        </Paper>
    )
}
import React, { useState, useEffect } from 'react';
import './App.css';
import { getPokemons, getPokemonInfo } from './services/lib/information';
import { PokemonCard } from './components/PokemonCard';
import { FiltersDialog } from './components/FiltersDialog';
import { Grid } from '@mui/material';
import { PokemonCardLoading } from './components/PokemonCardLoading';
import { Header } from './components/Header';
import { NoResultsCard } from './components/NoResultsCard';
import { useSnackbar } from 'notistack';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [openFilters, setOpenFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [apply, setApply] = useState(false);
  const pokemonLimit = 500;
  const [reload, setReload] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const [value, setValue] = useState([1, 100]);
  const [heightChange, setHeightChange] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const gatherPokemons = async () => {
    try {
      let max = 0;
      const { data } = await getPokemons(pokemonLimit);
      const pokemonPromises = data.results.map(async pokemon => {
        const result = await getPokemonInfo(pokemon.name);
        max = max < result.data.height ? result.data.height : max;
        return result;
      })
      const response = await Promise.all(pokemonPromises);
      setMaxHeight(max);
      setPokemons(response);
      setAllPokemons(response);
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  useEffect(() => {
    gatherPokemons();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000)
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
      if (!selectedTypes.length && !heightChange) { //No se ha movido el range
        setPokemons(allPokemons);
        setReload(!reload);
        return;
      }
      const temp = allPokemons;
      if (selectedTypes.length === 0 && heightChange) {
        setPokemons(
          temp.filter((e) => {
            if (e.data.height > value[0] && e.data.height < value[1]) {
              return true;
            } else {
              return false;
            }
          })
        );
      } else {
        setPokemons(
          temp.filter((e) => {
            for (let i = 0; i < e.data.types.length; i++) {
              if (selectedTypes.includes(e.data.types[i].type.name) && (e.data.height > value[0] && e.data.height < value[1])) {
                return true;
              }
            }
            return false;
          })
        );
      }
      enqueueSnackbar('Filters applied', { variant: 'success' });
      setReload(!reload);
  }, [apply]);

  const handleFiltersOff = () => {
    setSelectedTypes([]);
    setPokemons(allPokemons);
    setReload(!reload);
    setValue([0,maxHeight]);
    setHeightChange(false);
  };

  return (
    <div className="App">
      <Grid container>
        <Header 
        selectedTypes={selectedTypes} 
        handleFiltersOff={handleFiltersOff} 
        setOpenFilters={setOpenFilters} 
        heightChange={heightChange}
        />
        <Grid item xs={12} >
          {
            loading ? (
              [...Array(pokemonLimit)].map((e, i) => (
                <PokemonCardLoading key={i} />
              ))
            )
              :
              pokemons.length === 0 ?
                <NoResultsCard />
                :
                (
                  pokemons.map((pokemon, index) => {
                    return (
                      <div key={index}>
                        <PokemonCard
                          pokemon={pokemon.data}
                          reload={reload}
                        />
                      </div>
                    )
                  })
                )
          }
        </Grid>
      </Grid>
      <FiltersDialog
        open={openFilters}
        setOpen={setOpenFilters}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        setApply={setApply}
        apply={apply}
        maxHeight={maxHeight}
        value={value}
        setValue={setValue}
        setHeightChange={setHeightChange}
      />
    </div>
  );
}

export default App;
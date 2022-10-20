import { axiosClient } from "../axiosClient";

export const getPokemons = (pokemonLimit) => {
    return axiosClient.get(`pokemon?limit=${pokemonLimit}&offset=0`);
};

export const getPokemonInfo = (pokemonName) => {
    return axiosClient.get(`pokemon/${pokemonName}`);
};

export const pokemonDescription = (pokemonId) => {
    return axiosClient.get(`pokemon-species/${pokemonId}`);
};
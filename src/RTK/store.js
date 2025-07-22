import { configureStore } from "@reduxjs/toolkit";
import { favoriteSlice, PokemonSlice } from "./slice";

export const store = configureStore({
    reducer: {
        pokemon: PokemonSlice.reducer,
        favorite: favoriteSlice.reducer
    }
})
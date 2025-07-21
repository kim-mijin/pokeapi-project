import { configureStore } from "@reduxjs/toolkit";
import { PokemonSlice } from "./slice";

export const store = configureStore({
    reducer: {
        pokemon: PokemonSlice.reducer
    }
})
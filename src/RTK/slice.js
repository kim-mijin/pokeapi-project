import { createSlice } from "@reduxjs/toolkit";
import { fetchMultiplePokemonById } from "./thunk";

export const PokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        data: [],
        loading: true,
    },
    reducers: {}, 
    //동기적 상태변경
    extraReducers: (builder) => { 
    //비동기적 상태변경
    builder
        .addCase(fetchMultiplePokemonById.pending, (state) => 
            {
                state.loading = true;
            })
        .addCase(fetchMultiplePokemonById.rejected, (state) =>
            {
                state.loading = false;
            }) 
            .addCase(fetchMultiplePokemonById.fulfilled, (state, action) => 
            {
                state.loading = false;
                state.data = action.payload
            }) 
    }
})
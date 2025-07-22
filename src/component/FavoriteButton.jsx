import { useDispatch, useSelector } from "react-redux"
import { favoriteSlice } from "../RTK/slice"
import { createSelector } from "@reduxjs/toolkit"

export default function FavoriteButton({pokemonId}) {
    const isFavorite = useSelector(state => state.favorite.some((item => item === pokemonId)))
    const dispatch = useDispatch()

    return (
        <button onClick={(e)=> {
            e.stopPropagation()
            dispatch(isFavorite ? favoriteSlice.actions.
            removeFromFavorite({pokemonId}) : favoriteSlice.
            actions.addToFavorite({pokemonId}))
        }} className={isFavorite ? "text-[red]" : '' }>
       {isFavorite ? '♥' : '♡' }
        </button>
    )
}

export const selectFavoritePokemons = createSelector(
    state => state.pokemon.data,
    state => state.favorite,
    (pokemon, favorite) => {
        return pokemon.filter(el => favorite.includes(el.id))
    }
)
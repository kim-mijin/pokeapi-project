import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMultiplePokemonById = createAsyncThunk(
    'pokemon/fetchMultiplePokemonById',
    async (maxPokemonId) => {
        const numberArray = Array.from({ length: 151 }, (_, i) =>  i + 1 )

        const fetchAPI = async (pokemonId) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
            const data = await response.json()
            

            const pokemonData = {
                id: pokemonId,
                name: data.names.find(el => el.language.name === "ko").name,
                description: data.flavor_text_entries.find(el => el.language.name === "ko").flavor_text,
                back: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonId}.png`,
                front: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
            }
                return pokemonData
            }
        
            return await Promise.all(numberArray.map((el) => fetchAPI(el)))
            //all 메서드 : 배열로 promise1, promise2, ... promise151 를 넣어주면 전부 결과값 받아옴
            //async함수 => promise리턴 & useEffect가 리턴하는함수 => 클린업 함수 

    }
)

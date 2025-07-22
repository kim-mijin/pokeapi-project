import { createAsyncThunk } from "@reduxjs/toolkit";

//try,catch 구문 추가시
export const fetchMultiplePokemonById = createAsyncThunk(
    'pokemon/fetchMultiplePokemonById',
    async (maxPokemonId, thunkAPI) => { // thunkAPI 파라미터 추가 (전체 에러 핸들링용)
        const numberArray = Array.from(
            { length: maxPokemonId },
            (_, i) => i + 1
        );

        // 각 포켓몬 개별 fetch + 에러 핸들링
        const fetchAPI = async (pokemonId) => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`);
                if (!response.ok) throw new Error('Network error');
                const data = await response.json();

                const pokemonData = {
                    id: pokemonId,
                    name: data.names.find(el => el.language.name === 'ko')?.name ?? '이름 없음',
                    description: data.flavor_text_entries.find(el => el.language.name === 'ko')?.flavor_text ?? '설명 없음',
                    front: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
                    back: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonId}.png`
                }
                return pokemonData;
            } catch (e) {
                console.error("해당 포켓몬 로딩 실패", e); 
                // 👇 에러난 경우, "에러" 표시 및 최소 정보 반환 (UI에서 안내)
                return {
                    id: pokemonId,
                    name: "에러",
                    description: "이 포켓몬 정보를 불러오지 못했습니다.",
                    front: "",
                    back: "",
                    error: true // ← UI에서 식별 가능
                };
            }
        };

        // 👇 Promise.all → allSettled로 바꿔도 되고, try/catch만으로도 전체 실패 방지 가능
        try {
            const result = await Promise.all(numberArray.map(el => fetchAPI(el)));
            return result;
        } catch (err) {
            console.error("전체 포켓몬 로딩 실패", err); 
            // 👇 전체 실패(예: 네트워크가 다 끊겼을 때)
            return thunkAPI.rejectWithValue("전체 포켓몬 데이터를 불러오는 데 실패했습니다.");
        }
    }
);
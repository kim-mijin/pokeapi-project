import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectPokemonById } from "../RTK/selector"
import FavoriteButton from "../component/FavoriteButton"
import FlipCard from "../component/FlipCard"

export default function Detail() {
    const { pokemonId } = useParams()
    const pokemon = useSelector(selectPokemonById(Number(pokemonId)))
    console.log("pokemonId:", pokemonId)
    console.log("pokemon:", pokemon)
    
 return (
        <div className="bg-white flex flex-col justify-center
        items-center border py-[30px] px-[60px] rounded-[10px]
        border-b-[5px] border-r-[8px] border-black">
            <div className="text-[28px] mb-[10px]">
            {pokemon.name}
            <FavoriteButton pokemonId={Number(pokemonId)} />
            </div>
        <div className="whitespace-pre-wrap text-center">{pokemon.description}</div>
        {/* <img className="w-[200px]"src={pokemon.front}/> */}
        <FlipCard front = {pokemon.front} back={pokemon.back} />
    </div>)
}

import { useSelector } from "react-redux"
import { Card } from "../component/Card"

export default function Main() {
  const pokemonData = useSelector(state => state.pokemon.data)
  const loading = useSelector(state => state.pokemon.loading)

  if (loading) return <p>로딩 중...</p>

  return (
    <>
      {pokemonData.map(el => (
        <Card key={el.id} pokemon={el} />
      ))}
    </>
  )
}

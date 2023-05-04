import { gql } from "@apollo/client"

export const GET_POKEMONS_III_GENERATION = gql`
    query getPokemonsIIIGeneration {
        pokemons: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {name: {_eq: "generation-iii"}}}, order_by: {id: asc}) {
            name
            id
            generation_id
            is_legendary
        }
    }
`

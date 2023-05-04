import { gql } from "@apollo/client";

export const GET_POKEMONS_ALL_GENERATIONS = gql`
    query getPokemonsAllGenerations {
        pokemons: pokemon_v2_pokemonspecies(order_by: {id: asc}) {
            name
            id
            generation_id
            is_legendary
        }
    }
`

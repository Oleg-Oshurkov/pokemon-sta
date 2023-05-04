import { gql } from "@apollo/client";

export const GET_POKEMONS_BY_REGEX = gql`
    query getPokemonInfoByRegex($name: String!) {
        pokemons: pokemon_v2_pokemonspecies(where: {name: {_regex: $name}}) {
            id
            generation_id
            name
            is_mythical
            is_legendary
        }
    }
`

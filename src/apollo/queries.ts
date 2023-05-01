import { DocumentNode, gql } from "@apollo/client";

export const queries: Record<string, DocumentNode> = {
    GET_POKEMONS_ALL_GENERATIONS: gql`
        query getPokemonsAllGenerations {
            pokemons: pokemon_v2_pokemonspecies(order_by: {id: asc}) {
                name
                id
                generation_id
                is_legendary
            }
        }
    `,
    GET_POKEMONS_III_GENERATION: gql`
        query getPokemonsIIIGeneration {
            pokemons: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {name: {_eq: "generation-iii"}}}, order_by: {id: asc}) {
                name
                id
                generation_id
                is_legendary
            }
        }
    `,
    GET_POKEMON_INFO_BY_NAME: gql`
        query getPokemonInfoByName($name: String!) {
            pokemon: pokemon_v2_pokemonspecies(where: {name: {_eq: $name}}) {
                base_happiness
                capture_rate
                id
                generation_id
                name
                is_mythical
                is_legendary
                is_baby
                pokemon_v2_pokemoncolor {
                    name
                }
                pokemon_v2_pokemons {
                    base_experience
                    height
                    weight
                }
                pokemon_v2_pokemonshape {
                    pokemon_v2_pokemonshapenames {
                        awesome_name
                        language_id
                    }
                }
                pokemon_v2_pokemonspeciesflavortexts {
                    language_id
                    flavor_text
                }
                pokemon_v2_pokemonspeciesnames {
                    genus
                    language_id
                }
            }
        }
    `,
    GET_POKEMONS_BY_REGEX: gql`
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
}

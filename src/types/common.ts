export type PokemonNameDetails = {
    generation_id: number
    id: number
    is_legendary: boolean
    is_mythical: boolean
    name: string
    __typename: string
}

export type PokemonAllDetails = {
    __typename: string
    base_happiness: number
    capture_rate: number
    id: number
    generation_id: number
    name: string
    is_mythical: boolean
    is_legendary: boolean
    is_baby: boolean
    pokemon_v2_pokemoncolor: {
        __typename: string
        name: string
    }
    pokemon_v2_pokemons: {
        __typename: string
        base_experience: number
        height: number
        weight: number
    }[]
    pokemon_v2_pokemonshape: {
        __typename: string
        pokemon_v2_pokemonshapenames: {
            __typename: string
            awesome_name: string
            language_id: number
        }[]
    }
    pokemon_v2_pokemonspeciesflavortexts: {
        __typename: string
        language_id: number
        flavor_text: string
    }[]
    pokemon_v2_pokemonspeciesnames: {
        __typename: string
        genus: string
        language_id: number
    }[]
}

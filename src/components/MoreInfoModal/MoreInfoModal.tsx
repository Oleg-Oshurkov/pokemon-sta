import React from 'react'
import {
    Badge,
    Box,
    Button,
    Grid,
    GridItem,
    Heading,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text
} from "@chakra-ui/react"
import { Fragment, useEffect, useState } from "react"
import { useSearchLazyQuery } from "../../apollo/hooks"
import { GET_POKEMON_INFO_BY_NAME } from "../../apollo/queries"
import { CONFIG } from "../../config/env"
import { PokemonAllDetails } from "../../types"
import { DetailsTable } from "../DetailsTable"
import { Loader } from "../Loader"
import { pokemon as mockedPokemon } from '../../helpers/mocks'
import { API_LANGUAGE_ID_EN } from "../../helpers/constants"
import { toCapitalized } from "../../helpers"

type MoreInfoModalProps = {
    isOpen: boolean
    pokemonName: string
    onClose: () => void
}

export const MoreInfoModal: React.FC<MoreInfoModalProps> = ({ isOpen, pokemonName, onClose }) => {
    const [pokemon, setPokemon] = useState<PokemonAllDetails | null>(null)
    const [getPokemonInfo, { loading: isLoading, data: infoData, error: infoError }] = useSearchLazyQuery({ query: GET_POKEMON_INFO_BY_NAME })
    const mockData = mockedPokemon.data.pokemon[0]

    useEffect(() => {
        if (pokemonName) {
            getPokemonInfo({
                variables: { name: pokemonName }
            })
        }
    }, [pokemonName])

    useEffect(() => {
        if (infoData?.pokemon?.[0]) {
            setPokemon(infoData.pokemon[0])
        }
    }, [infoData])

    useEffect(() => {
        if (CONFIG.IS_MOCK_API) {
            setPokemon(mockData)
        }
    }, [CONFIG.IS_MOCK_API])

    return (
        <Modal onClose={onClose} size="lg" isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{toCapitalized(pokemonName)}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {isLoading
                    ? <Box mt="8px" display="flex" alignItems="center" justifyContent="center" width="100%"><Loader /></Box>
                    : (
                    <Fragment>
                        {infoError ? <Text color="red.600">An error occurred: {infoError?.message}</Text> : null}
                        {pokemon
                        ? (
                            <Box>
                                <Grid
                                    templateColumns="repeat(4, 1fr)"
                                    gap={4}
                                >
                                    <GridItem colSpan={4} bg="green.50">
                                        <Box display="flex" alignItems="center" justifyContent="center">
                                            <Image src={`${CONFIG.IMAGE_SRC_URL.replace('{ID}', String(pokemon?.id))}`} alt={`image ${pokemon?.name}`} />
                                        </Box>
                                        <Box>
                                            <Text textAlign="center" pb="10px">
                                                {pokemon?.is_legendary ? <Badge colorScheme="yellow">Legendary</Badge> : null}
                                                {pokemon?.is_mythical ? <Badge colorScheme="cyan">Mythical</Badge> : null}
                                                {pokemon?.is_baby ? <Badge colorScheme="red">Baby</Badge> : null}
                                            </Text>
                                        </Box>
                                    </GridItem>
                                    <GridItem className="characteristics" colSpan={4} bg="green.50" p="5px">
                                        <DetailsTable title="Characteristics" data={[
                                            {parameter: 'height',value:pokemon?.pokemon_v2_pokemons?.[0]?.height},
                                            {parameter: 'weight',value:pokemon?.pokemon_v2_pokemons?.[0]?.weight},
                                            {parameter: 'base experience',value:pokemon?.pokemon_v2_pokemons?.[0]?.base_experience},
                                            {parameter: 'base happiness',value:pokemon?.base_happiness},
                                            {parameter: 'capture rate',value:pokemon?.capture_rate}
                                        ]} />
                                    </GridItem>
                                    <GridItem className="characteristics" colSpan={4} bg="green.50" p="5px">
                                        <DetailsTable title="Additional" data={[
                                            {parameter: 'color',value:pokemon?.pokemon_v2_pokemoncolor?.name},
                                            {parameter: 'awesome name',value:pokemon?.pokemon_v2_pokemonshape?.pokemon_v2_pokemonshapenames?.filter(({ language_id }) => language_id === API_LANGUAGE_ID_EN)?.[0]?.awesome_name},
                                            {parameter: 'genus',value:pokemon?.pokemon_v2_pokemonspeciesnames?.filter(({ language_id }) => language_id === API_LANGUAGE_ID_EN)?.[0]?.genus},
                                            {parameter: 'id',value:pokemon?.id},
                                            {parameter: 'generation id',value:pokemon?.generation_id},
                                        ]} />
                                    </GridItem>
                                    <GridItem colSpan={4} bg="green.50" p="5px">
                                        <Heading size="xs" textAlign="center" mt="8px" mb="8px">
                                            Legend
                                        </Heading>
                                        <Box pl="8px">
                                            {pokemon?.pokemon_v2_pokemonspeciesflavortexts?.filter(({ language_id }) => language_id === API_LANGUAGE_ID_EN)?.map(({ flavor_text }) => (
                                                <Text key={`${Math.random()}`.replace('.', '')}>{flavor_text.replaceAll(/[\n\f]/gim, ' ')}</Text>
                                            ))}
                                        </Box>
                                    </GridItem>
                                </Grid>
                            </Box>
                        )
                        : null}
                    </Fragment>
                    )
                }
            </ModalBody>
            <ModalFooter>
                <Button onClick={onClose}>Close</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

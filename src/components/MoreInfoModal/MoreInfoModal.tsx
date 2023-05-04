import { Badge, Box, Button, Grid, GridItem, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { Fragment, useEffect, useState } from "react"
import { useSearchLazyQuery } from "../../apollo/hooks"
import { GET_POKEMON_INFO_BY_NAME } from "../../apollo/queries"
import { CONFIG } from "../../config/env"
import { PokemonAllDetails } from "../../types"
import { DetailsTable } from "../DetailsTable"
import { Loader } from "../Loader"

type MoreInfoModalProps = {
    isOpen: boolean
    onClose: () => void
    pokemonName: string
}

export const MoreInfoModal = ({ isOpen, onClose, pokemonName }: MoreInfoModalProps) => {
    const [pokemon, setPokemon] = useState<PokemonAllDetails | null>(null)
    const [getPokemonInfo, { loading: isLoading, data: infoData, error: infoError }] = useSearchLazyQuery({ query: GET_POKEMON_INFO_BY_NAME })

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

    return (
        <Modal onClose={onClose} size="lg" isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{pokemonName}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {isLoading
                    ? <Box mt="8px" display="flex" alignItems="center" justifyContent="center" width="100%"><Loader /></Box>
                    : (
                    <Fragment>
                        {infoError ? <Text color="red.600">An error occurred: {infoError?.message}</Text> : null}
                        {infoData
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
                                        <DetailsTable title="Characteristics" pokemon={pokemon} />
                                    </GridItem>
                                    <GridItem className="characteristics" colSpan={4} bg="green.50" p="5px">
                                        <DetailsTable title="Additional" pokemon={pokemon} />
                                    </GridItem>
                                    <GridItem colSpan={4} bg="green.50" p="5px">
                                        <Heading size="xs" textAlign="center" mt="8px" mb="8px">
                                            Legend
                                        </Heading>
                                        <Box pl="8px">
                                            {pokemon?.pokemon_v2_pokemonspeciesflavortexts?.filter(({ language_id }) => language_id === 9)?.map(({ flavor_text }) => (
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

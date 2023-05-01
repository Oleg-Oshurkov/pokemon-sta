import { Badge, Box, Button, Grid, GridItem, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { Fragment, useEffect, useState } from "react"
import { useSearchLazyQuery } from "../../apollo/hooks"
import { CONFIG } from "../../config/env"
import { PokemonAllDetails } from "../../types"
import { Loader } from "../Loader"

type MoreInfoModalProps = {
    isOpen: boolean
    onClose: () => void
    pokemonName: string
}

export const MoreInfoModal = ({ isOpen, onClose, pokemonName }: MoreInfoModalProps) => {
    const queriesToGet = {
        getPokemonInfoByName: 'GET_POKEMON_INFO_BY_NAME'
    }
    const [pokemon, setPokemon] = useState<PokemonAllDetails | null>(null)
    const [getPokemonInfo, { loading: isLoading, data: infoData, error: infoError }] = useSearchLazyQuery({ query: queriesToGet.getPokemonInfoByName })

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
        <Modal onClose={onClose} size="full" isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader className="miltonian">{pokemonName}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {isLoading
                    ? <Loader />
                    : (
                    <Fragment>
                        {infoError ? <Text color="red.600">An error occurred: {infoError?.message}</Text> : null}
                        {infoData
                        ? (
                            <Box>
                                <Grid
                                    templateColumns="repeat(5, 1fr)"
                                    gap={4}
                                >
                                    <GridItem rowSpan={2} colSpan={1} bg="green.100">
                                        <Box display="flex" alignItems="center" justifyContent="center">
                                            <Image src={`${CONFIG.IMAGE_SRC_URL.replace('{ID}', String(pokemon?.id))}`} alt={`image ${pokemon?.name}`} />
                                        </Box>
                                        <Box>
                                            <Text textAlign="center">
                                                {pokemon?.is_legendary ? <Badge colorScheme="yellow">Legendary</Badge> : null}
                                                {pokemon?.is_mythical ? <Badge colorScheme="cyan">Mythical</Badge> : null}
                                                {pokemon?.is_baby ? <Badge colorScheme="red">Baby</Badge> : null}
                                            </Text>
                                        </Box>
                                    </GridItem>
                                    <GridItem className="characteristics" colSpan={2} bg="green.200" p="5px">
                                        <Heading size="xs" textAlign="center" mt="8px">
                                            <span className="miltonian">
                                                Characteristics
                                            </span>
                                        </Heading>
                                        <TableContainer>
                                            <Table variant='simple'>
                                                <Thead>
                                                    <Tr>
                                                        <Th>Parameter</Th>
                                                        <Th>Value</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    <Tr>
                                                        <Td>height</Td>
                                                        <Td>{pokemon?.pokemon_v2_pokemons?.[0]?.height}</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td>weight</Td>
                                                        <Td>{pokemon?.pokemon_v2_pokemons?.[0]?.weight}</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td>base experience</Td>
                                                        <Td>{pokemon?.pokemon_v2_pokemons?.[0]?.base_experience}</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td>base happiness</Td>
                                                        <Td>{pokemon?.base_happiness}</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td>capture rate</Td>
                                                        <Td>{pokemon?.capture_rate}</Td>
                                                    </Tr>
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    </GridItem>
                                    <GridItem className="characteristics" colSpan={2} bg="green.200" p="5px">
                                        <Heading size="xs" textAlign="center" mt="8px">
                                            <span className="miltonian">
                                                Additional
                                            </span>
                                        </Heading>
                                        <TableContainer>
                                            <Table variant='simple'>
                                                <Thead>
                                                    <Tr>
                                                        <Th>Parameter</Th>
                                                        <Th>Value</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    <Tr>
                                                        <Td>color</Td>
                                                        <Td>{pokemon?.pokemon_v2_pokemoncolor?.name}</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td>awesome name</Td>
                                                        <Td>{pokemon?.pokemon_v2_pokemonshape?.pokemon_v2_pokemonshapenames?.filter(({ language_id }) => language_id === 9)?.[0]?.awesome_name}</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td>genus</Td>
                                                        <Td>{pokemon?.pokemon_v2_pokemonspeciesnames?.filter(({ language_id }) => language_id === 9)?.[0]?.genus}</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td>id</Td>
                                                        <Td>{pokemon?.id}</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td>generation id</Td>
                                                        <Td>{pokemon?.generation_id}</Td>
                                                    </Tr>
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    </GridItem>
                                    <GridItem colSpan={4} bg="green.100" p="5px">
                                        <Heading size="xs" textAlign="center" mt="8px" mb="8px">
                                            <span className="miltonian">
                                                Legend
                                            </span>
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

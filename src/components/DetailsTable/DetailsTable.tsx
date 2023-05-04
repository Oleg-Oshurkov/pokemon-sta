import { Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { Fragment, ReactElement } from "react"
import { PokemonAllDetails } from "../../types"

type DetailsTableProps = {
    pokemon: PokemonAllDetails | null
    title: string
}

export const DetailsTable = ({ pokemon, title }: DetailsTableProps): ReactElement | null => {
    return (
        <Fragment>
            <Heading size="xs" textAlign="center" mt="8px">
                {title}
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
        </Fragment>
    )
}

import { Badge, Box, Image, ListItem, Text, UnorderedList, useDisclosure } from "@chakra-ui/react"
import { Fragment, useState } from "react"
import { CONFIG } from "../../config/env"
import { PokemonNameDetails } from "../../types"
import { MoreInfoModal } from "../MoreInfoModal/MoreInfoModal"
import styles from './SearchResults.module.css'

type SearchResultsProps = {
    data: PokemonNameDetails[]
    searchValue: string
}

export const SearchResults = ({ data, searchValue }: SearchResultsProps) => {
    const filteredPokemons = data.filter(({ name }) => name.includes(searchValue)) || []
    const [selectedPokemon, setSelectedPokemon] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleListItemClick = (name: string) => {
        setSelectedPokemon(name)
        onOpen()
    }

    return (
        <Fragment>
            {!filteredPokemons.length ? <Text marginTop="12px" color="orange.500">Nothing found</Text> : null}
            {filteredPokemons.length
            ? (
                <Box>
                    <Text color="green.500" fontSize="11px">Click on the Pokemon's name to see more details:</Text>
                    <UnorderedList listStyleType="none" marginTop="12px" marginLeft="0px" data-testid="list">
                        {filteredPokemons.map(({ name, is_legendary, is_mythical, id, generation_id }) => (
                            <ListItem
                                boxShadow="lg"
                                className={styles.listItem}
                                key={`${id}_${generation_id}_${name}`}
                                color={is_legendary ? 'yellow.500' : 'black.500'}
                                onClick={() => handleListItemClick(name)}
                                data-testid="listitem"
                            >
                                <Text>
                                    <span className="miltonian">{name}</span>
                                    {is_legendary ? <Badge fontSize="0.5em" marginLeft="8px" colorScheme="yellow">Legendary</Badge> : null}
                                    {is_mythical ? <Badge fontSize="0.5em" marginLeft="8px" colorScheme="cyan">Mythical</Badge> : null}
                                </Text>
                                
                                <Box display="flex" alignItems="center" justifyContent="center">
                                    <Image src={`${CONFIG.IMAGE_SRC_URL.replace('{ID}', String(id))}`} alt={`image ${name}`} />
                                </Box>
                            </ListItem>
                        ))}
                    </UnorderedList>
                </Box>
            )
            : null}
            <MoreInfoModal isOpen={isOpen} onClose={onClose} pokemonName={selectedPokemon} />
        </Fragment>
    )
}

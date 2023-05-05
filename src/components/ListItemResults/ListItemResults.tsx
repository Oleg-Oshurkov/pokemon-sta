import { Badge, Box, Image, ListItem, Text } from "@chakra-ui/react"
import { CONFIG } from "../../config/env"
import { toCapitalized } from "../../helpers"
import styles from './ListItemResults.module.css'

type ListItemResultsProps = {
    id: number
    is_legendary: boolean
    is_mythical: boolean
    name: string
    handleListItemClick: (name: string) => void
}

export const ListItemResults = ({ id, is_legendary, is_mythical, name, handleListItemClick }: ListItemResultsProps) => (
    <ListItem
        boxShadow="lg"
        className={styles.listItem}
        color={is_legendary ? 'yellow.500' : 'black.500'}
        onClick={() => handleListItemClick(name)}
        data-testid="listitem"
    >
        <Text>
            <span>{toCapitalized(name)}</span>
            {is_legendary ? <Badge fontSize="0.5em" marginLeft="8px" colorScheme="yellow">Legendary</Badge> : null}
            {is_mythical ? <Badge fontSize="0.5em" marginLeft="8px" colorScheme="cyan">Mythical</Badge> : null}
        </Text>
        
        <Box display="flex" alignItems="center" justifyContent="center">
            <Image src={`${CONFIG.IMAGE_SRC_URL.replace('{ID}', String(id))}`} alt={`image ${name}`} />
        </Box>
    </ListItem>
)

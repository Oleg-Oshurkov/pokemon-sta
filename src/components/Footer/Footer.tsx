import React from 'react'
import { Box, Text } from "@chakra-ui/react";

export const Footer: React.FC = () => (
    <Box width="96%" position="fixed" bottom="0px" pt="10px" pb="10px" bgColor="white" borderTop="2px" borderColor="gray.100">
        <Text fontSize="14px">©Pokémon. TM and ® are trademarks of Nintendo.</Text>
    </Box>
)

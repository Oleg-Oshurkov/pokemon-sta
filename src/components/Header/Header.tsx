import React from 'react'
import { Box } from "@chakra-ui/react";
import { Navigation } from "../Navigation";

export const Header: React.FC = () => (
    <Box borderBottom="2px" borderColor="gray.100" mb="10px">
        <Navigation />
    </Box>
)

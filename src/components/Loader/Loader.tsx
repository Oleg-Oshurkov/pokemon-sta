import React from 'react'
import { Spinner } from "@chakra-ui/react";

export const Loader: React.FC = () => (
    <Spinner
        thickness="4px"
        speed="0.5s"
        emptyColor="green.200"
        color="green.500"
        size="xl"
    />
)

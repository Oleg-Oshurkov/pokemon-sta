import { Box, Container, Heading, Text } from "@chakra-ui/react";

export const WelcomePage = () => (
    <Container>
      <Heading color="green.900" fontSize="24px">
        <span>Pokemon Search Them All</span>
      </Heading>
      <Text>Pokemon Search Engine</Text>
      <Box pt="20px">
        <Text textAlign="left">Welcome to the <strong>Pokemon Search Engine</strong>! This app allows you to search for Pokemon by typing a search string into the search field. When you click on a search result, a popup appears with more information about the Pokemon.</Text>
        <Text textAlign="left">Click on <strong>Search</strong> in menu above to navigate to the <strong>search field</strong>.</Text>
      </Box>
    </Container>
)

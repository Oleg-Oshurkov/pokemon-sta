import { Container, Heading, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export const Page404 = () => (
    <Container>
        <Heading size="sm">404 Page Not Found</Heading>
        <Text textDecoration="underline">
            <Link to="/">Navigate to main page</Link>
        </Text>
    </Container>
)

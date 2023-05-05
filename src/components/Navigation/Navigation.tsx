import React from 'react'
import { Box, Container, Tab, TabIndicator, TabList, Tabs } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Navigation: React.FC = () => (
    <Container width="100%" p="0px">
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Tabs size="md" variant="unstyled" position="relative" p="20px" pt="0px" >
          <TabList>
          <Link to="/">
            <Tab as={Box} _hover={{ borderColor: "transparent" }} _selected={{ color: 'green.400' }}>
              Welcome
            </Tab>
          </Link>
          <Link to="/search">
            <Tab as={Box} _hover={{ borderColor: "transparent" }} _selected={{ color: 'green.400' }}>
              Search
            </Tab>
          </Link>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="green.500"
            borderRadius="1px"
          />
        </Tabs>
      </nav>
    </Container>
)
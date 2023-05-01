import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { Box, Container, Heading, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { SearchField } from './components/SearchField'
import './App.css'
import { useSearchLazyQuery } from './apollo/hooks'
import { Loader } from './components/Loader/Loader'
import { SearchResults } from './components/SearchResults'
import { Filtering } from './types'

function App() {
  const queriesToGet = {
    getPokemonsAllGenerations: 'GET_POKEMONS_ALL_GENERATIONS',
    getSpecificPokemonsByRegex: 'GET_POKEMONS_BY_REGEX'
  }
  const [filtering, setFiltering] = useState(Filtering.FE)
  const [searchValue, setSearchValue] = useState('')
  const [searchPokemons, { loading: isLoading, data: searchData, error: searchError }] = useSearchLazyQuery({
    query: filtering === Filtering.FE ? queriesToGet.getPokemonsAllGenerations : queriesToGet.getSpecificPokemonsByRegex
  })

  const handleChangeRadio = (event: ChangeEvent<HTMLInputElement>) => {
    setFiltering(event.target.value as Filtering)
  }

  useEffect(() => {
    if (searchValue.length >= 3) {
      filtering === Filtering.FE ? searchPokemons() : searchPokemons({ variables: { name: searchValue } })
    }
  }, [searchValue, filtering])

  return (
    <>
      <Container>
        <Heading color="green.900" fontSize="24px" className="miltonian">
          <span className="miltonian">Pokemon Search Them All</span>
        </Heading>
        <Text>Pokemon Search Engine</Text>
        <RadioGroup defaultValue='FE' name="filtering">
          <Stack spacing={5} direction='row' display="flex" alignItems="center" justifyContent="center">
            <Radio colorScheme='red' value='FE' onChange={handleChangeRadio}>
            <Text fontSize="11px">FE Results Filtering</Text>
            </Radio>
            <Radio colorScheme='green' value='BE' onChange={handleChangeRadio}>
              <Text fontSize="11px">BE Results Filtering</Text>
            </Radio>
          </Stack>
        </RadioGroup>
      </Container>
      <Container marginTop="12px">
        <Text color="green.500" fontSize="11px">The search starts with 3 entered characters, e.g. "bul"</Text>
        <SearchField setSearchValue={setSearchValue} debounceDelay={1000} />
        
        <Box>
          {isLoading
            ? <Box mt="8px"><Loader /></Box>
            : (
              <Fragment>
                {searchError ? <Text color="red.600">An error occurred: {searchError?.message}</Text> : null}
                {searchData && !(searchValue.length < 3 && filtering === Filtering.BE) ? <SearchResults data={searchData?.pokemons} searchValue={searchValue} /> : null}
              </Fragment>
            )
          }
        </Box>
      </Container>
    </>
  )
}

export default App

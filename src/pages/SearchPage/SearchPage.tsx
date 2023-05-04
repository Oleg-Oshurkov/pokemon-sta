import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { Box, Container, Radio, RadioGroup, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { SearchField } from '../../components/SearchField'
import { useSearchLazyQuery } from '../../apollo/hooks'
import { Loader } from '../../components/Loader/Loader'
import { SearchResults } from '../../components/SearchResults'
import { Filtering } from '../../types'
import { GET_POKEMONS_ALL_GENERATIONS, GET_POKEMONS_BY_REGEX } from '../../apollo/queries'
import { MoreInfoModal } from '../../components/MoreInfoModal'

export const SearchPage = () => {
  const [focused, setFocused] = useState(false);
  const [filtering, setFiltering] = useState(Filtering.FE)
  const [searchValue, setSearchValue] = useState('')
  const [selectedPokemon, setSelectedPokemon] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [searchPokemons, { loading: isLoading, data: searchData, error: searchError }] = useSearchLazyQuery({
    query: filtering === Filtering.FE ? GET_POKEMONS_ALL_GENERATIONS : GET_POKEMONS_BY_REGEX
  })

  const handleListItemClick = (name: string) => {
    setSelectedPokemon(name)
    onOpen()
  }

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
          <SearchField onChange={setSearchValue} debounceDelay={1000} setFocused={setFocused} />
          {searchValue.length < 3 && focused ? <Text color="red.500" fontSize="11px" pb="5px">The search starts with 3 entered characters, e.g. "bul"</Text> : null}
          <Box>
            {isLoading
              ? <Box mt="8px" display="flex" alignItems="center" justifyContent="center" width="100%"><Loader /></Box>
              : (
                <Fragment>
                  {searchError ? <Text color="red.600">An error occurred: {searchError?.message}</Text> : null}
                  {searchData && !(searchValue.length < 3) ? <SearchResults data={searchData?.pokemons} searchValue={searchValue} handleClick={handleListItemClick} /> : null}
                </Fragment>
              )
            }
          </Box>
          <MoreInfoModal isOpen={isOpen} onClose={onClose} pokemonName={selectedPokemon} />
        </Container>
      </>
  )
}

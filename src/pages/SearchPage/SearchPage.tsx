import React from 'react'
import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { Box, Container, Radio, RadioGroup, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { SearchField } from '../../components/SearchField'
import { useSearchLazyQuery } from '../../apollo/hooks'
import { Loader } from '../../components/Loader/Loader'
import { SearchResults } from '../../components/SearchResults'
import { Filtering } from '../../types'
import { GET_POKEMONS_ALL_GENERATIONS, GET_POKEMONS_BY_REGEX } from '../../apollo/queries'
import { MoreInfoModal } from '../../components/MoreInfoModal'
import { CONFIG } from '../../config/env'
import { pokemons } from '../../helpers/mocks'
import { DEBOUNCE_DELAY, SEARCH_VALUE_MIN_LENGTH } from '../../helpers/constants'

export const SearchPage: React.FC = () => {
  const [focused, setFocused] = useState(false);
  const [filtering, setFiltering] = useState(Filtering.FE)
  const [searchValue, setSearchValue] = useState('')
  const [selectedPokemon, setSelectedPokemon] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isTyped, setIsTyped] = useState(false)
  const mockData = CONFIG.IS_MOCK_API ? pokemons.data.pokemon : []

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
    if (searchValue.length >= SEARCH_VALUE_MIN_LENGTH) {
        filtering === Filtering.FE ? searchPokemons() : searchPokemons({ variables: { name: searchValue } })
    }

    if (!isTyped && searchValue.length >= SEARCH_VALUE_MIN_LENGTH) {
      setIsTyped(true)
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
          <SearchField onChange={setSearchValue} debounceDelay={DEBOUNCE_DELAY} setFocused={setFocused} isTyped={isTyped} />
          {searchValue.length < SEARCH_VALUE_MIN_LENGTH && focused && isTyped ? <Text color="red.500" fontSize="11px" pb="5px">The search starts with {SEARCH_VALUE_MIN_LENGTH} entered characters, e.g. `bul`</Text> : null}
          <Box>
            {isLoading
              ? <Box mt="8px" display="flex" alignItems="center" justifyContent="center" width="100%"><Loader /></Box>
              : (
                <Fragment>
                  {searchError ? <Text color="red.600">An error occurred: {searchError?.message}</Text> : null}
                  {(searchData || mockData.length) && !(searchValue.length < SEARCH_VALUE_MIN_LENGTH) ? <SearchResults data={[ searchData?.pokemons, ...mockData ]} searchValue={searchValue} handleClick={handleListItemClick} /> : null}
                </Fragment>
              )
            }
          </Box>
          <MoreInfoModal isOpen={isOpen} onClose={onClose} pokemonName={selectedPokemon} />
        </Container>
      </>
  )
}


import { useLazyQuery } from '@apollo/client';
import { queries } from './queries';

const getSearchDocument = (query: string) => {
    const defaultQuery = queries.GET_POKEMONS_III_GENERATION
    const searchDocument = queries[query] || defaultQuery

    return searchDocument
}

export const useSearchLazyQuery = (options: { query: string }) => {
    const searchDocument = getSearchDocument(options.query)
    return useLazyQuery(searchDocument);
}

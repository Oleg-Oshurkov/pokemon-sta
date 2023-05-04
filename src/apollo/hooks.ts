
import { DocumentNode, useLazyQuery } from '@apollo/client';
import { GET_POKEMONS_III_GENERATION } from './queries';

const getSearchDocument = (query: DocumentNode) => {
    const defaultQuery = GET_POKEMONS_III_GENERATION
    const searchDocument = query || defaultQuery

    return searchDocument
}

export const useSearchLazyQuery = (options: { query: DocumentNode }) => {
    const searchDocument = getSearchDocument(options.query)
    return useLazyQuery(searchDocument);
}

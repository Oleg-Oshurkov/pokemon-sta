import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { CONFIG } from '../config/env'

const link = new HttpLink({
    uri: CONFIG.REACT_SERVER_URL
  })

export const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache()
})

import React from 'react'
import { render, screen } from '@testing-library/react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import App from './App'

import matchers from '@testing-library/jest-dom'
expect.extend(matchers)

const client = new ApolloClient({
    cache: new InMemoryCache()
})

it('shall render title', () => {
    render(
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    )

    const title = screen.queryByText(/pokemon search them all/gim)
    expect(title).toBeVisible()
})

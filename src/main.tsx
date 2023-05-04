import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './apollo'
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import 'focus-visible/dist/focus-visible'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={apolloClient}>
    <React.StrictMode>
      <BrowserRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </React.StrictMode>
  </ApolloProvider>,
)

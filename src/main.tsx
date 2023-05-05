import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './apollo'
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from './components/Fallback';
import 'focus-visible/dist/focus-visible'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={apolloClient}>
    <React.StrictMode>
      <ErrorBoundary fallback={<Fallback />}>
        <BrowserRouter>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  </ApolloProvider>
)

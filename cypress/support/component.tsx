// put CT-only commands here

import './commands'
import {mount} from 'cypress/react18'
import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ErrorBoundary} from 'react-error-boundary'
import ErrorComp from '../../src/components/ErrorComp'
import PageSpinner from '../../src/components/PageSpinner'
import {Suspense} from 'react'
import '../../src/styles.scss' // import styles here so you don't have to import everywhere

Cypress.Commands.add('mount', mount)

Cypress.Commands.add(
  'wrappedMount',
  (WrappedComponent: React.ReactNode, options = {}) => {
    const wrapped = (
      <QueryClientProvider client={new QueryClient()}>
        <ErrorBoundary fallback={<ErrorComp />}>
          <Suspense fallback={<PageSpinner />}>
            <BrowserRouter>{WrappedComponent}</BrowserRouter>
          </Suspense>
        </ErrorBoundary>
      </QueryClientProvider>
    )
    return cy.mount(wrapped, options)
  },
)

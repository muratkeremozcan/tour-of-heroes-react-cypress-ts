import type {FC} from 'react'
import React, {Suspense} from 'react'
import type {RenderOptions} from '@testing-library/react'
import {render} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ErrorBoundary} from 'react-error-boundary'
import ErrorComp from 'components/ErrorComp'
import PageSpinner from 'components/PageSpinner'

const AllTheProviders: FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ErrorBoundary fallback={<ErrorComp />}>
        <Suspense fallback={<PageSpinner />}>
          <BrowserRouter>{children}</BrowserRouter>
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  )
}

/** Renders the component wrapped by all the providers:
 * QueryClientProvider, ErrorBoundary, Suspense, BrowserRouter.
 */
const wrappedRender = (
  ui: React.ReactNode,
  options?: Omit<RenderOptions, 'wrapper'>,
  // @ts-expect-error - ok to ignore
) => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {wrappedRender}

import {lazy, Suspense} from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ErrorBoundary} from 'react-error-boundary'
import HeaderBar from 'components/HeaderBar'
import NavBar from 'components/NavBar'
import PageSpinner from 'components/PageSpinner'
import ErrorComp from 'components/ErrorComp'
import Villains from 'villains/Villains'
import Boys from 'boys/Boys'
import './styles.scss'
const Heroes = lazy(() => import('heroes/Heroes'))
const NotFound = lazy(() => import('components/NotFound'))
const About = lazy(() => import('About'))

const queryClient = new QueryClient()

export default function App() {
  return (
    <BrowserRouter>
      <HeaderBar />
      <div className="section columns">
        <NavBar />
        <main className="column">
          <QueryClientProvider client={queryClient}>
            <ErrorBoundary fallback={<ErrorComp />}>
              <Suspense fallback={<PageSpinner />}>
                <Routes>
                  <Route path="/" element={<Navigate replace to="/heroes" />} />
                  <Route path="/heroes/*" element={<Heroes />} />
                  <Route path="/villains/*" element={<Villains />} />
                  <Route path="/boys/*" element={<Boys />} />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </QueryClientProvider>
        </main>
      </div>
    </BrowserRouter>
  )
}

// why react-query? https://react-query.tanstack.com/
// to prevent duplicated data-fetching, we want to move all the data-fetching code into a central store
// and access that single source from the components that need it.
// With React Query, we don’t need to do any of the work involved in creating such a store.
// It lets us keep the data-fetching code in the components that need the data,
// but behind the scenes it manages a data cache, passing already-fetched data to components when they ask for them

// For components to access a shared React Query cache,
// we make the cache available by wrapping our app JSX in a provider component

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import About from 'About'
import HeaderBar from 'components/HeaderBar'
import NavBar from 'components/NavBar'
import NotFound from 'components/NotFound'
import Heroes from 'heroes/Heroes'
import './styles.scss'

const queryClient = new QueryClient()

// why react-query? https://react-query.tanstack.com/
// to prevent duplicated data-fetching, we want to move all the data-fetching code into a central store
// and access that single source from the components that need it.
// With React Query, we don’t need to do any of the work involved in creating such a store.
// It lets us keep the data-fetching code in the components that need the data,
// but behind the scenes it manages a data cache, passing already-fetched data to components when they ask for them

// [10.4.1] For components to access a shared React Query cache,
// we make the cache available by wrapping our app JSX in a provider component

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <HeaderBar />
        <div className="section columns">
          <NavBar />
          <main className="column">
            <Routes>
              <Route path="/" element={<Navigate replace to="/heroes" />} />
              <Route path="/heroes/*" element={<Heroes />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App

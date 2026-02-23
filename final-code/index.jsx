import { createRoot } from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import CountriesListShimmer from './components/CountriesListShimmer'

const Contact = lazy(() => import('./components/Contact'))
const Home = lazy(() => import('./components/Home'))
const Error = lazy(() => import('./components/Error'))
const CountryDetail = lazy(() => import('./components/CountryDetail'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: (
      <Suspense fallback={<div>Loading...</div>}>
        <Error />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<CountriesListShimmer />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/:country',
        element: (
          <Suspense fallback={<div>Loading Country Details...</div>}>
            <CountryDetail />
          </Suspense>
        ),
      },
      {
        path: '/contact',
        element: (
          <Suspense fallback={<div>Loading Contact...</div>}>
            <Contact />
          </Suspense>
        ),
      },
    ],
  },
])

const root = createRoot(document.querySelector('#root'))

root.render(<RouterProvider router={router} />)

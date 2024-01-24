import { useState, lazy, Suspense } from 'react';
import AdoptedPetContext from './AdoptedPetContext';
import { Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Details = lazy(() => import('./Details'))
const SearchParams = lazy(() => import('./SearchParams'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      suspense: true,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);
  return (
    <div className="container mx-auto h-screen overflow-auto" style={{ backgroundImage: "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)" }}>
      <AdoptedPetContext.Provider value={adoptedPet}>
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={
              <div className="mx-auto h-screen flex justify-center items-center p-4">
                <h2 className="animate-spin text-[100px]">🌀</h2>
              </div>
            }
          >
            <header className='flex justify-center align-center'>
              <Link to="/">
                <img className='mt-1' src="http://static.frontendmasters.com/resources/2019-05-02-complete-intro-react-v5/image-logo.png" alt="logo" width="200" />
              </Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </Suspense>
        </QueryClientProvider>
      </AdoptedPetContext.Provider>
    </div>
  );
};

export default App;

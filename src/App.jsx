import { useState } from 'react';
import AdoptedPetContext from './AdoptedPetContext';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Details from './Details';
import SearchParams from './SearchParams';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);
  return (
    <div className="p-0 m-0" style={{ background: "url(http://pets-images.dev-apis.com/pets/wallpaperB.jpg)", height: "100vh" }}>
      <BrowserRouter>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <QueryClientProvider client={queryClient}>
            <header className='flex justify-center align-center'>
              <Link to="/">
                <img className='mt-1' src="http://static.frontendmasters.com/resources/2019-05-02-complete-intro-react-v5/image-logo.png" alt="logo" width="200" />
              </Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </QueryClientProvider>
        </AdoptedPetContext.Provider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

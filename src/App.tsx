import { useState } from 'react';
import AdoptedPetContext from './context/AdoptedPetContext';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Details from "./components/Details";
import SearchParams from "./components/SearchParams";
import { Pet } from './api/APIResponseTypes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null as Pet | null);
  return (
    <div className="container w-full mx-auto h-screen overflow-auto">
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

export default App;

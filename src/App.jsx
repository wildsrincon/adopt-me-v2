import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Details from './Details';
import SearchParams from './SearchParams';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <header>
          <Link to="/">
            <h1>Adopt Me!</h1>
          </Link>
        </header>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/" element={<SearchParams />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

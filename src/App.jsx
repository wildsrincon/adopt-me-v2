import React from 'react';
import ReactDOM from 'react-dom';
import Pet from './Pet';

const App = () => {
  <div>
    <h1>Adopt Me!</h1>
    <Pet name="Luna" animal="dog" breed="havanese" />
    <Pet name="Pepper" animal="bird" breed="Cockatiel" />
    <Pet name="Doink" animal="cat" breed="havanese" />
  </div>;
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);

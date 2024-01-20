import { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import AdoptedPetContext from './AdoptedPetContext';
import fetchSearch from './fetchSearch';
import Results from './Results';
import useBreedList from './useBreedList';
const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [requestParams, setRequestParams] = useState({
    location: '',
    animal: '',
    breed: '',
  });
  const [animal, setAnimal] = useState('');
  const [breeds] = useBreedList(animal);

  const results = useQuery(['search', requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="container mx-auto mt-2 w-11/12 lg:flex gap-3 overflow-hidden">
      <form
        className='w-full lg:w-96 h-1/4 p-10 mb-10 rounded-lg bg-red-100 shadow-lg flex flex-col justify-center items-center'
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get('animal') ?? '',
            breed: formData.get('breed') ?? '',
            location: formData.get('location') ?? '',
          };
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img className='w-32 h-32 rounded-full inline-block m-4 cursor-pointer border-2 border-black' src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input className='search-input' name="location" id="location" placeholder="Location" />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            className='search-input'
            id="animal"
            name="animal"
            onChange={(e) => setAnimal(e.target.value)}
            onBlur={(e) => setAnimal(e.target.value)}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select className='search-input grayed-out-disabled' disabled={!breeds.length} name="breed" id="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button className='rounded px-6 py-2 text-white hover:opacity-50 border-none bg-orange-500' >Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;

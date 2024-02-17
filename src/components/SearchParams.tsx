import { useState, useContext, useDeferredValue, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Animal } from '../api/APIResponseTypes';
import AdoptedPetContext from '../context/AdoptedPetContext';
import fetchSearch from '../api/fetchSearch';
import Results from './Results';
import useBreedList from '../hooks/useBreedList';
const ANIMALS: Animal[] = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [requestParams, setRequestParams] = useState({
    location: '',
    animal: '',
    breed: '',
  });
  const [animal, setAnimal] = useState('' as Animal);
  const [breeds] = useBreedList(animal);
  const results = useQuery(['search', requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];
  const deferredPets = useDeferredValue(pets);
  const renderedPets = useMemo(
    () => <Results pets={deferredPets} />,
    [deferredPets]
  );

  return (
    <div className="container mx-auto mt-2 w-11/12 lg:flex gap-3 overflow-hidden">
      <form
        className='w-full lg:w-96 h-1/4 p-10 mb-10 rounded-lg bg-red-100 shadow-lg flex flex-col justify-center items-center'
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const obj = {
            animal: formData.get("animal")?.toString() ?? "",
            breed: formData.get("breed")?.toString() ?? "",
            location: formData.get("location")?.toString() ?? "",
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
            onChange={(e) => setAnimal(e.target.value as Animal)}
            onBlur={(e) => setAnimal(e.target.value as Animal)}
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
      {renderedPets}
    </div>
  );
};

export default SearchParams;

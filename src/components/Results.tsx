import {Pet as PetType} from '../api/APIResponseTypes';
import Pet from './Pet';

const Results = ({ pets }: {pets: PetType[] }) => {
  return (
    <div className="w-full lg:w-8/12 bg-red-100 rounded-md p-4 mb-8">
      {!pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((pet) => {
          return (
            <Pet
              animal={pet.animal}
              key={pet.id}
              name={pet.name}
              breed={pet.breed}
              images={pet.images}
              location={`${pet.city}, ${pet.state}`}
              id={pet.id}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;

import { useState, useContext, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PetAPIResponse } from './APIResponseTypes';
import ErrorBoundary from './ErrorBoundary';
import AdoptedPetContext from './AdoptedPetContext';
import Carousel from './Carousel';
import fetchPet from './fetchPet';

const Modal = lazy(() => import('./Modal'));

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const results = useQuery<PetAPIResponse>(['details', id], fetchPet);

  if (results.isLoading) {
    return (
      <div className="mx-auto h-screen flex justify-center items-center p-4">
        <h2 className="animate-spin text-[100px]">🌀</h2>
      </div>
    );
  }

  const pet = results?.data?.pets[0];
  const handleBack = () => navigate('/', { replace: true });

  if (!pet) {
    throw new Error('pet not found')
  }

  return (
    <div className="container mx-auto w-11/12 bg-red-100 rounded-md pt-1">
      <Carousel images={pet?.images} />
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-center text-black font-bold text-[60px] mt-2'>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button className='button' onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <button className='button' onClick={handleBack}>
          Go Home
        </button>
        <p className='pb-4 mx-5 text-justify'>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <div className='flex justify-center items-center w-full h-screen fixed bg-gray-800 bg-opacity-90 z-20'>
                <div className='w-full md:w-1/2 lg:w-1/3 bg-red-100 p-12 mx-6 sm:mx-12 md:mx-18 rounded'>
                  <h1 className='text-center text-black font-bold font-24'>Would you like to adopt {pet.name}?</h1>
                  <div className='flex justify-center items-center gap-5'>
                    <button
                      className='button'
                      onClick={() => {
                        setAdoptedPet(pet);
                        navigate('/');
                      }}
                    >
                      Yes
                    </button>
                    <button className='button' onClick={() => setShowModal(false)}>No</button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

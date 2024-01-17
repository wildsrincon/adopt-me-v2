import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ErrorBoundary from './ErrorBoundary';
import AdoptedPetContext from './AdoptedPetContext';
import Carousel from './Carousel';
import fetchPet from './fetchPet';
import Modal from './Modal';

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const [, setAdoptedPet] = useContext(AdoptedPetContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const results = useQuery(['details', id], fetchPet);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];
  const handleBack = () => navigate('/', { replace: true });

  return (
    <div className="my-0 mx-auto w-11/12 bg-red-100 rounded-md">
      <Carousel images={pet.images} />
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
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate('/');
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
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

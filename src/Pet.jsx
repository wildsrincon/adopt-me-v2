import { Link } from 'react-router-dom';

const Pet = (props) => {
  const { name, animal, breed, images, location, id } = props;

  let hero = 'http://pets-images.dev-apis.com/pets/none.jpg';
  if (images.length) {
    hero = images[0];
  }

  return (
    <Link to={`/details/${id}`} className="w-full h-32 flex justify-start items-center overflow-hidden border-b-2 border-gray-600">
      <div className="w-24 min-h-[100px] mr-5">
        <img className='rounded-full' src={hero} alt={name} />
      </div>
      <div>
        <h1 className='font-bold text-[30px]' >{name}</h1>
        <h2>{`${animal} — ${breed} — ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;

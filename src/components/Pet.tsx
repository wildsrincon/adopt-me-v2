import { Link } from 'react-router-dom';

type IProps = {
  name: string;
  animal: string;
  breed: string;
  images: string[];
  location: string;
  id: number;
}

const Pet = (props: IProps) => {
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
        <h1 className='font-bold text-black text-[30px]' >{name}</h1>
        <h2 className='font-light text-black'>{`${animal} — ${breed} — ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;

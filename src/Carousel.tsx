/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { SetStateAction, useState } from 'react';

interface Iprops {
  images: string[]
}

const Carousel = ({ images }: Iprops) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleThumbnailClick = (index: SetStateAction<number>) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 relative px-3">
      <div className="w-full h-96 overflow-hidden">
        <img className='w-full h-full object-cover' src={images[currentImageIndex]} alt={`carousel-${currentImageIndex}`} />
      </div>

      <div className="flex justify-center mt-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`w-24 h-24 mx-1 cursor-pointer  ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img src={image} alt={`thumbnail-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

import React, { useState } from 'react';

const Carousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
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

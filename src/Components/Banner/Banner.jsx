import React, { useState } from 'react';
import './Banner.css';
import banner_image1 from '../Assets/banner1.jpg';
import banner_image2 from '../Assets/banner2.jpg';
import banner_image3 from '../Assets/banner3.jpg';

const Banner = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [banner_image1, banner_image2, banner_image3];

  const changeImage = (direction) => {
    setCurrentImage((prevIndex) => {
      const nextIndex = prevIndex + direction;
      if (nextIndex < 0) return images.length - 1; // loop to the last image
      if (nextIndex >= images.length) return 0; // loop to the first image
      return nextIndex;
    });
  };

  return (
    <div className='banner'>
      <div className='banner-images'>
        <img src={images[currentImage]} alt='Banner' />
      </div>
      <button className='scroll-button prev' onClick={() => changeImage(-1)}>
        &#10094;
      </button>
      <button className='scroll-button next' onClick={() => changeImage(1)}>
        &#10095;
      </button>
    </div>
  );
};

export default Banner;

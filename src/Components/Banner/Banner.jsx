import React, { useEffect, useState } from 'react';
import './Banner.css';

const Banner = () => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    // Replace with your actual API endpoint
    fetch("https://ndruy9xx1a.execute-api.ca-central-1.amazonaws.com/devamp/banners")
      .then(res => res.json())
      .then(data => setImages(data.images || []))
      .catch(err => console.error("Error loading banners", err));
  }, []);

  const changeImage = (direction) => {
    setCurrentImage((prevIndex) => {
      const nextIndex = prevIndex + direction;
      if (nextIndex < 0) return images.length - 1;
      if (nextIndex >= images.length) return 0;
      return nextIndex;
    });
  };

  if (images.length === 0) return null;

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


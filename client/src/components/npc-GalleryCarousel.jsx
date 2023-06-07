import React, { useState, useEffect, useRef } from "react";
import '../styles/GalleryCarousel.css';

const imageSlides = [
  "https://i.imgur.com/OtIMZRv.jpg", //tropical  view
  "https://i.imgur.com/hRGpMOl.jpg", //view from interior
  "https://i.imgur.com/M86j72e.jpg", // yurt room with water view 
  "https://i.imgur.com/eposdaq.jpg", //kayakers
  "https://i.imgur.com/FRDBVHa.jpg", // half in half out 
];

const delay = 3000;

function GalleryCarousel() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex === imageSlides.length - 1 ? 0 : prevIndex + 1
      );
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div className="slideshowSlider">
        {imageSlides.map((backgroundImage, idx) => (
<div className="slide"
            key={idx}
            style={{
            //   backgroundImage: `url(${backgroundImage})`,
              transform: `translate3d(${-index * 100}%, 0, 0)`,
            }}>
                <img className="slideImage" src = {backgroundImage}/>
          {/* <div
            className="slide-img"
            key={idx}
            style={{
              backgroundImage: `url(${backgroundImage})`,
            //   transform: `translate3d(${-index * 100}%, 0, 0)`,
            }}
          /> */}
</div>
        ))}
      </div>
    
      <div className="slideshowDots">
        {imageSlides.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default GalleryCarousel;

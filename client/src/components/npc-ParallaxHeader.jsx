import React, { useEffect, useState } from 'react';
import '../styles/styled.css';

const ParallaxHeader = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  const parallaxHeight = () => {
    const scrollPosition = window.scrollY;
    const sampleSectionTop = document.querySelector('.sample-section').offsetTop;
    const headerSectionHeight = document.querySelector('.sample-header-section').offsetHeight;
    const newHeaderHeight = headerSectionHeight - scrollPosition;
    setHeaderHeight(newHeaderHeight);

    const sampleSection = document.querySelector('.sample-section');
    sampleSection.style.marginTop = `${headerSectionHeight}px`;
  };

  useEffect(() => {
    parallaxHeight();
    window.addEventListener('scroll', parallaxHeight);
    window.addEventListener('resize', parallaxHeight);
    return () => {
      window.removeEventListener('scroll', parallaxHeight);
      window.removeEventListener('resize', parallaxHeight);
    };
  }, []);

  return (
    <div className="sample-header" style={{ height: headerHeight }}>
      <div className="sample-header-section">
        <h1>Scroll down to see the parallax effect</h1>
        <h2>Background landscape scrolls with its own depth</h2>
      </div>
    </div>
  );
};

export default ParallaxHeader;

import React, { useEffect,useState,useCallback } from 'react';
import { data } from '../assets/data.js';
import './MapasPage.css';
  
  export const MapasPage = () => {
      const [currentIndex, setCurrentIndex] = useState(0);

      const scrollToImage = useCallback((direction) => {
        setCurrentIndex((prevIndex) => {
          if (direction === 'prev') {
            return prevIndex === 0 ? 0 : prevIndex - 1;
          } else {
            return prevIndex === data.length - 1 ? prevIndex : prevIndex + 1;
          }
        });
      }, []);
    
      const goToSlide = useCallback((slideIndex) => {
        setCurrentIndex(slideIndex); 
      }, []);

      useEffect (() =>{
        const handleKeyDown = (event) =>{
          if (event.key === 'ArrowLeft'){
            scrollToImage('prev');
          }else if (event.key === 'ArrowRight'){
            scrollToImage('next');
          }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
      },[scrollToImage]);

      return (
        <div className="main-container">
          <h2 className="title">Mapas de Monster Hunter</h2>
          <div className="slider-container">
            <button className="arrow left-arrow" onClick={() => scrollToImage('prev')} aria-label="Previous image">
              &lsaquo;
            </button>
            <button className="arrow right-arrow" onClick={() => scrollToImage('next')} aria-label="Next image">
              &rsaquo;
            </button>
            <div className="image-container">
              <img src={data[currentIndex].imgUrl} alt={data[currentIndex].name} className="slide-image" />
            </div>
            <h3 className="image-title">{data[currentIndex].name}</h3>
            <div className="dots-container">
              {data.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot ${idx === currentIndex ? "active" : ""}`}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      );
    };
  
export default MapasPage;




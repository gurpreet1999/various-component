import React, { useState } from 'react';

// Compound Component: Carousel
const Carousel = ({ children, autoPlay = true, interval = 3000 }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const totalSlides = React.Children.count(children);

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  const nextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  // Auto-play functionality
  if (autoPlay) {
    setTimeout(nextSlide, interval);
  }

  // Expose activeSlide, goToSlide, nextSlide, and prevSlide to children
  return children({
    activeSlide,
    goToSlide,
    nextSlide,
    prevSlide,
  });
};

// Subcomponent: CarouselSlide
const CarouselSlide = ({ index, children }) => {
  return (
    <div style={{ display: index === 0 ? 'block' : 'none' }}>
      {children}
    </div>
  );
};

// Subcomponent: CarouselControls
const CarouselControls = ({ activeSlide, goToSlide, nextSlide, prevSlide }) => {
  return (
    <div>
      {activeSlide > 0 && (
        <button onClick={prevSlide}>Previous</button>
      )}
      <button onClick={nextSlide}>Next</button>
      <div>
        {Array.from({ length: totalSlides }, (_, index) => (
          <button key={index} onClick={() => goToSlide(index)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

// Usage
const App = () => {
  return (
    <div>
      <h1>Customizable Carousel Component</h1>
      <Carousel>
        {({ activeSlide, goToSlide, nextSlide, prevSlide }) => (
          <div>
            {/* CarouselSlides */}
            <CarouselSlide index={0}>
              <img src="slide1.jpg" alt="Slide 1" />
            </CarouselSlide>
            <CarouselSlide index={1}>
              <img src="slide2.jpg" alt="Slide 2" />
            </CarouselSlide>
            <CarouselSlide index={2}>
              <img src="slide3.jpg" alt="Slide 3" />
            </CarouselSlide>

            {/* CarouselControls */}
            <CarouselControls
              activeSlide={activeSlide}
              goToSlide={goToSlide}
              nextSlide={nextSlide}
              prevSlide={prevSlide}
            />
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default App;
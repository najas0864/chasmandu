import { useEffect, useState } from "react";
import "./header.css";

const Header = () => {
  const images = [
    "/image0.jpg",
    "/image1.jpg",
    "/image2.jpg",
    "/image3.jpg",
  ];

  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);

  const slides = [
    images[images.length - 1],
    ...images,
    images[0],
  ];

  // auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // handle infinite loop WITHOUT glitch
  useEffect(() => {
    if (index === slides.length - 1) {
      setTimeout(() => {
        setTransition(false);
        setIndex(1);
      }, 600);
    }

    if (index === 0) {
      setTimeout(() => {
        setTransition(false);
        setIndex(slides.length - 2);
      }, 600);
    }
  }, [index]);

  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() => {
        setTransition(true);
      });
    }
  }, [transition]);

  return (
    <header className="header">
      <div
        className="slider"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: transition ? "transform 0.8s ease-in-out" : "none",
        }}
      >
        {slides.map((img, i) => (
          <div className="slide" key={i}>
            <img src={img} alt="" />
          </div>
        ))}
      </div>
      <div className="dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`dot ${index === i+1 ? "active" : ""}`}
          />
        ))}
      </div>
    </header>
  );
};

export default Header;
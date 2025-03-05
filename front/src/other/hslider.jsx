import React from "react";
import Slider from "react-slick";
import "./hslider";

const HeaderSlider = ({ images }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <header className="w-full bg-gray-800 header p-4">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="px-2">
            <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-40 object-cover rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </header>
  );
};

const images = [
  "/images.jpg",
  "/images.jpg",
  "/images.jpg",
  "/images.jpg",
];

function Hslider() {
  return (
    <div>
      <HeaderSlider images={images} />
    </div>
  );
}

export default Hslider;

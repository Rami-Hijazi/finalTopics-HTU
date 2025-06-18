import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/global.css'; 

const images = [
  '/assets/images/pexels-icsa-833425-1709003.jpg',
  '/assets/images/pexels-pixabay-433452.jpg',
  '/assets/images/pexels-pixabay-50675.jpg',
];

export default function HomePage() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=8125435851de4a4c92b24247251806&q=auto:ip`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.current) setWeather(data);
      })
      .catch((err) => console.error('Weather fetch error:', err));
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="home-page">
      <div className="home-header">
        <div className="home-intro">
          <h1>Welcome to Community Events</h1>
          <p>
            Discover, create, and join local events in your community. Stay
            connected and make a difference.
          </p>
        </div>

        {weather && (
          <div className="weather-widget">
            <h3>{weather.location.name}</h3>
            <img
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
            />
            <p className="temp">{weather.current.temp_c}°C</p>
            <p className="condition">{weather.current.condition.text}</p>
          </div>
        )}
      </div>

      <Slider {...sliderSettings}>
        {images.map((src, idx) => (
          <div key={idx}>
            <img
              src={process.env.PUBLIC_URL + src}
              alt={`Slide ${idx + 1}`}
              className="home-slider-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

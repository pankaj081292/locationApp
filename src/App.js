import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setLocation(newLocation);
            console.log(`Latitude: ${newLocation.latitude}, Longitude: ${newLocation.longitude}`);
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    // Initial location fetch
    getLocation();

    // Set interval to fetch location every 10 seconds
    const intervalId = setInterval(() => {
      getLocation();
    }, 10000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Kharagpur News</h1>
        <iframe
          src="https://www.jagran.com/west-bengal/khadagpur"
          width="100%"
          height="600px"
          title="Kharagpur News"
          style={{ border: 'none' }}
        ></iframe>
        {location && (
          <p>
            Your location: Latitude {location.latitude}, Longitude {location.longitude}
          </p>
        )}
      </header>
    </div>
  );
}

export default App;

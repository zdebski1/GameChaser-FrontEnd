// components/MyMap.tsx
import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '@env';

// Define the type for a stadium
type Stadium = {
  stadiumId: number;
  stadiumName: string;
  stadiumCity: string;
  stadiumState: string;
  stadiumLatitude: number | null;
  stadiumLongitude: number | null;
  stadiumAddress: string | null;
};

interface MyMapProps {
  stadiums: Stadium[];
}

const containerStyle = {
  width: '200vh',  // Full width
  height: '100vh',  // Full height of the viewport
};

const center = {
  lat: 37.7749, // Default center (San Francisco)
  lng: -122.4194,
};

const MyMap: React.FC<MyMapProps> = ({ stadiums }) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
});

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
      {stadiums.map((stadium) => {
        // Check if latitude and longitude are not null
        if (stadium.stadiumLatitude && stadium.stadiumLongitude) {
          const position = {
            lat: Number(stadium.stadiumLatitude),
            lng: Number(stadium.stadiumLongitude),
          };

          return (
            <Marker
              key={stadium.stadiumId}
              position={position}
              label={stadium.stadiumName}
            />
          );
        }
        // If no valid latitude/longitude, log a warning
        console.warn(`Invalid coordinates for stadium: ${stadium.stadiumName}`);
        return null;
      })}
    </GoogleMap>
  );
};

export default MyMap;

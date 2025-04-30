import React, { useEffect, useRef } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
} from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '@env';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: 37.7749,
  lng: -122.4194, // Default center (San Francisco)
};

type Stadium = {
  stadiumId: number;
  stadiumName: string;
  stadiumLatitude: number | null;
  stadiumLongitude: number | null;
};

interface MyMapProps {
  stadiums: Stadium[];
}

const libraries: ('places' | 'geometry' | 'drawing' | 'visualization')[] = ['places'];

const MyMap: React.FC<MyMapProps> = ({ stadiums }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
    version: 'weekly',
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    stadiums.forEach((stadium) => {
      if (
        stadium.stadiumLatitude !== null &&
        stadium.stadiumLongitude !== null
      ) {
        const lat = stadium.stadiumLatitude;
        const lng = stadium.stadiumLongitude;

        // Debugging logs
        console.log(`Adding marker for: ${stadium.stadiumName} at lat: ${lat}, lng: ${lng}`);
        // Create the marker with a custom red icon
        new google.maps.Marker({
          position: { lat, lng },
          map: mapRef.current,
          title: stadium.stadiumName,
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', // Red marker icon
            scaledSize: new google.maps.Size(40, 40), // Adjust size of the marker if needed
          },
        });
      }
    });
  }, [isLoaded, stadiums]);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      onLoad={(map) => {
        mapRef.current = map;
      }}
    />
  );
};

export default MyMap;

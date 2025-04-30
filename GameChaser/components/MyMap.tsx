import React, { useEffect, useRef, useState } from 'react';
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

const libraries: ('places' | 'geometry' | 'drawing' | 'visualization' | 'marker')[] = ['places', 'marker'];

const MyMap: React.FC<MyMapProps> = ({ stadiums }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
    version: 'weekly',
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedStadium, setSelectedStadium] = useState<Stadium | null>(null);

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

        // Create the marker
        const marker = new google.maps.Marker({
          position: { lat, lng },
          map: mapRef.current,
          title: stadium.stadiumName,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: 'red',
            fillOpacity: 1,
            strokeColor: 'red',
            strokeWeight: 2,
            scale: 10, // Adjust size
          },
        });

        // Add click event listener to marker
        marker.addListener('click', () => {
          setSelectedStadium(stadium);
        });
      }
    });
  }, [isLoaded, stadiums]);

  const handleCreateVisit = () => {
    if (selectedStadium) {
      // Here you can add logic to create a visit, e.g., open a modal or navigate to a form
      alert(`Creating a visit for ${selectedStadium.stadiumName} (ID: ${selectedStadium.stadiumId})`);
      // You can replace this with an actual form/modal to create a visit
    }
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      />
      {selectedStadium && (
        <div style={{ position: 'fixed', bottom: 20, left: 20, backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
          <h3>{selectedStadium.stadiumName}</h3>
          <p>Click below to create a visit:</p>
          <button onClick={handleCreateVisit}>Create Visit</button>
        </div>
      )}
    </div>
  );
};

export default MyMap;

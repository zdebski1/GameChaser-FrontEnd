// components/MyMap.tsx
import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 37.7749, // San Francisco
  lng: -122.4194,
};

export default function MyMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyANYpKEmi_M7rSe-E20xsKwareTKUeyuRc',
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      <Marker position={center} />
    </GoogleMap>
  );
}

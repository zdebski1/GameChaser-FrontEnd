// screens/MapScreen.tsx
import React from 'react';
import MyMap from '../components/MyMap';

export default function MapScreen() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Team Stadium Map</h1>
      <p className="mb-4 text-gray-700">Explore team stadium locations on the map below:</p>
      <MyMap />
    </div>
  );
}

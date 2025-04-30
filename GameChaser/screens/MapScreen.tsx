// screens/MapScreen.tsx
import React, { useEffect, useState } from 'react';
import MyMap from '../components/MyMap';

export default function MapScreen() {
  const [stadiums, setStadiums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        const response = await fetch('http://localhost:3000/stadiums');
        const data = await response.json();

        // Filter out stadiums without valid latitude and longitude
        const validStadiums = data.filter(
          (stadium: any) => stadium.stadiumLatitude && stadium.stadiumLongitude
        );

        setStadiums(validStadiums);
      } catch (error) {
        console.error('Error fetching stadiums:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStadiums();
  }, []);

  if (loading) {
    return <div>Loading stadiums...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Team Stadium Map</h1>
      <p className="mb-4 text-gray-700">Explore team stadium locations on the map below:</p>
      <MyMap stadiums={stadiums} />
    </div>
  );
}

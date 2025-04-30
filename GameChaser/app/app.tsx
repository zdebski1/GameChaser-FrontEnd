// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapScreen from '@/screens/MapScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/map" element={<MapScreen />} />
      </Routes>
    </Router>
  );
}

export default App;

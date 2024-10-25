import React from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/CanvasMap/Map';

import { data } from './data/data';

import { FeatureCollection } from 'geojson';
import Canvas from './components/CanvasMap/Canvas';

function App() {

  // const GeoData = JSON.parse(data)

  return (
    <div className='map-window'>
      <Canvas />

    </div>
  );
}

export default App;

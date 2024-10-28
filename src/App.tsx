import React from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/CanvasMap/Map';

import { data } from './data/data';

import { FeatureCollection } from 'geojson';
import Canvas from './components/CanvasMap/Canvas';
import Board from './components/Board/Board';
import BoardContextProvider from './contexts/boardContexts';

function App() {

  // const GeoData = JSON.parse(data)

  return (
    <BoardContextProvider>
      <div className='map-window'>
        <Board />

      </div>

    </BoardContextProvider>
  );
}

export default App;

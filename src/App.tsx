import React from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/CanvasMap/Map';

import { data } from './data/data';

import { FeatureCollection } from 'geojson';
import Canvas from './components/CanvasMap/Canvas';
import Board from './components/Board/Board';
import BoardContextProvider from './contexts/boardContexts';
import LegendContextProvider from './contexts/legendContexts';

function App() {

  // const GeoData = JSON.parse(data)

  return (
    <BoardContextProvider>
      <LegendContextProvider>
        <div className="overflow-hidden w-screen h-screen ">
          <Board />

        </div>

      </LegendContextProvider>

    </BoardContextProvider>
  );
}

export default App;

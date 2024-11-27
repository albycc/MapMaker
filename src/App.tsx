import './App.css';
import Board from './components/Board/Board';
import BoardContextProvider from './contexts/boardContexts';
import ToolbarContextProvider from './contexts/toolbarContexts';

function App() {

  // const GeoData = JSON.parse(data)

  return (
    <BoardContextProvider>
      <ToolbarContextProvider>
        <div className="overflow-hidden w-screen h-screen ">
          <Board />

        </div>


      </ToolbarContextProvider>

    </BoardContextProvider>
  );
}

export default App;

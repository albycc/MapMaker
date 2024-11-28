import './App.css';
import Board from './components/Board/Board';
import BoardContextProvider from './contexts/boardContexts';
import MenubarContextProvider from './contexts/menubarContexts';
import ToolbarContextProvider from './contexts/toolbarContexts';

function App() {

  // const GeoData = JSON.parse(data)

  return (
    <BoardContextProvider>
      <ToolbarContextProvider>
        <MenubarContextProvider>
          <Board />

        </MenubarContextProvider>
      </ToolbarContextProvider>
    </BoardContextProvider>
  );
}

export default App;

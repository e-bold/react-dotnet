import './App.css';
import { MultiDirectedGraphView } from './Sigma.tsx';
import {Events} from './Events.tsx'


function App() {
  return (
    <div id='GraphLayout'>
      <MultiDirectedGraphView />
      {/* <Events/> */}

    </div>
  );
}


export default App;

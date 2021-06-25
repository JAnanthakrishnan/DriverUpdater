import './App.css';
import ButtonAppBar from './Navbar.js';
import VerticalTabs from './Tabs';
import {Button} from '@material-ui/core'; //importing material ui component
import {TextField} from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <ButtonAppBar/>
      <VerticalTabs/>
      <br/><br/>
    </div>
  );
}

export default App;
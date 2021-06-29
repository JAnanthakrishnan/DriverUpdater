import "./App.css";
import ButtonAppBar from "./components/Navbar";
import VerticalTabs from "./components/Tabs";

function App() {
  return (
    <div className="App">
      <ButtonAppBar />
      {localStorage.getItem("tabIndex") ? (
        <VerticalTabs index={parseInt(localStorage.getItem("tabIndex"))} />
      ) : (
        <VerticalTabs index={0} />
      )}

      <br />
      <br />
    </div>
  );
}

export default App;

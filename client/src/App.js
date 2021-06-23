import React from "react";
import Tabs from "./components/Tabs";
import "./App.css";

function App() {
  return (
    <div>
      <Tabs title="Driver Updater">
        <div label="Node 1">
          <h1>
            Hello From <em>Node 1</em>
          </h1>
          See ya later, <em>:)</em>!
        </div>
        <div label="Node 2">
          After 'while, <em>Node 2</em>!
        </div>
        <div label="Node 3">
          Nothing to see here, this tab is <em>extinct</em>!
        </div>
      </Tabs>
    </div>
  );
}

export default App;

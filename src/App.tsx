import React from "react";
import "./App.css";
import PasteIcon from "./paste-icon.svg";

function App() {
  return (
    <div className="container">
      <div className="form">
        {/* <p>hello doinks</p> */}
        <label className="label">Address</label>
        <div className="inputBox">
          <input
            className="input"
            placeholder="0xdoink"
            id="address-input"
            type="text"
            style={{ flexGrow: 2 }}
          />
          <button>
            <img src={PasteIcon} aria-hidden="true" />
          </button>
        </div>
        <div>
          <button className="mint-button">MINT</button>
        </div>
      </div>
    </div>
  );
}

export default App;

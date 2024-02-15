import React, { useState } from "react";
import "./App.css";
import PasteIcon from "./paste-icon.svg";

function App() {
  const [address, setAddress] = useState<string>("");

  const filterInput = function (value: string): string {
    // Ensure first two chars are "0x".
    if (value.length > 0) {
      if (value[0] !== "0") {
        return "";
      }
      if (value.length > 1) {
        if (value[1] !== "x") {
          return "0";
        }

        // Iterate through chars after "0x" to validate they are all hex.
        const regEx = /[0-9a-fA-F]+/;
        const body = value.slice(2);
        let newValue = "0x";
        for (const char of body) {
          const isHex = regEx.exec(char);
          if (isHex) {
            newValue += char;
          }
        }
        return newValue;
      }
    }

    return value;
  };

  return (
    <div className="container">
      <div className="form">
        <label className="label">Address</label>
        <div className="inputBox">
          <input
            className="input"
            placeholder="0xdoink"
            id="address-input"
            type="text"
            value={address}
            style={{ flexGrow: 2 }}
            onChange={(e) => {
              setAddress(filterInput(e.target.value));
            }}
          />
          <button
            onClick={async () => {
              setAddress(await navigator.clipboard.readText());
            }}
          >
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

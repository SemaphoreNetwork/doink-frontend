import React, { useState } from "react";
import "./App.css";
import PasteIcon from "./paste-icon.svg";

function App() {
  const [mintEnabled, setMintEnabled] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [isMinting, setIsMinting] = useState<boolean>(false);

  const filterInput = function (value: string): string {
    let newValue = "";
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
        newValue = "0x";
        for (const char of body) {
          const isHex = regEx.exec(char);
          if (isHex) {
            newValue += char;
          }
        }

        // Trim over 42 chars.
        if (newValue.length > 42) {
          newValue = newValue.substring(
            0,
            newValue.length - (newValue.length - 42)
          );
        }
      }
    }
    // If 42 chars in length, we have a full address.
    if (newValue.length == 42) {
      setMintEnabled(true);
    } else {
      setMintEnabled(false);
    }

    return newValue;
  };

  const mint = async function () {
    // Sanity check.
    if (address.length !== 42) {
      return;
    }
    setIsMinting(true);

    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost/doink", true);
    request.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        const data = JSON.parse(this.response) as Response;
        console.log("success", data);
      } else {
        // We reached our target server, but it returned an error
        console.log("error", this.status, this.response);
      }
      setIsMinting(false);
    };

    request.onerror = function (error) {
      console.log("error", error);
      setIsMinting(false);
    };

    request.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );
    request.send(JSON.stringify({ address }));
  };

  return (
    <div className="container">
      <div className="form">
        <label className="label">Address</label>
        <div className="input-box">
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
              setAddress(filterInput(await navigator.clipboard.readText()));
            }}
          >
            <img src={PasteIcon} aria-hidden="true" />
          </button>
        </div>
        <div className="button-box">
          {isMinting ? (
            <div className={isMinting ? "loader" : ""}></div>
          ) : (
            <button
              className="mint-button"
              disabled={!mintEnabled}
              onClick={() => mint()}
            >
              MINT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

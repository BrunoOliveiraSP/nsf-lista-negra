import React from "react";
import { Link } from "react-router-dom";

import "./index.css";

export default function App() {
  return (
    <div className="App">
      <div>
        <h1 className="display-4">Fullstacker</h1>
      </div>

      <div className="list-group">
        <Link to="/ln" className="list-group-item list-group-item-action">
          Lista Negra
        </Link>

        <Link
          to="/lf"
          className="list-group-item list-group-item-action">
          Lista Fofa
        </Link>

        <Link
          to="/ml"
          className="list-group-item list-group-item-action">
          Memelation
        </Link>

      </div>
    </div>
  );
}

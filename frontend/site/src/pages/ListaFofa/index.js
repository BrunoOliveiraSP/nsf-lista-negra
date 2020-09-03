import React from "react";
import { Link } from "react-router-dom";

import { ArrowLeftShort as BacktoMenu } from "react-bootstrap-icons";
import "./index.css";



export default function Listafofa() {
  return (
    <div className="App">
      <div>
        <h1 className="display-4">Lista Fofa</h1>
      </div>

      <div className="list-group">
        <Link
          to="/lf/cadastrar"
          className="list-group-item list-group-item-action"
        >
          Cadastrar
        </Link>

        <Link
          to="/lf/consultar"
          className="list-group-item list-group-item-action"
        >
          Consultar
        </Link>

        <Link to="/" className="list-group-item list-group-item-action">
          <BacktoMenu size={16} /> Voltar
        </Link>
      </div>
    </div>
  );
}

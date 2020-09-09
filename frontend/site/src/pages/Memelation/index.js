import React from "react";
import { Link } from "react-router-dom";

import { ArrowLeftShort as BacktoMenu } from "react-bootstrap-icons";
import "./index.css";



export default function Memelation() {
  return (
    <div className="App">
      <div>
        <h1 className="display-4">Memelation</h1>
      </div>

      <div className="list-group">
        <Link
          to="/ml/cadastrar"
          className="list-group-item list-group-item-action"
        >
          Cadastrar
        </Link>

        <Link
          to="/ml/consultar"
          className="list-group-item list-group-item-action"
        >
          Consultar
        </Link>

        <Link
          to="/ml/consultar/carousel"
          className="list-group-item list-group-item-action"
        >
          Consultar com Carousel
        </Link>
        <Link
          to="/ml/consultar/carousel/categoria"
          className="list-group-item list-group-item-action"
        >
          Consultar Carousel por categoria
        </Link>

        <Link to="/" className="list-group-item list-group-item-action">
          <BacktoMenu size={16} /> Voltar
        </Link>
      </div>
    </div>
  );
}
import React from 'react';
import './index.css';

import { Link, useHistory } from "react-router-dom";
import ListaNegraAPI from '../../../services/ListaNegraApi';
const api = new ListaNegraAPI();

export default function LnExcluir (props) {

  const navegacao = useHistory();

  const excluir = async () => {
    const resp = await api.excluir(props.location.state.id);
    navegacao.goBack();
  };

  return (
    <div className="content_ex">
      <div className="card">
        <div className="desc">
          <h3>Hmm, parece que você quer excluir <i>{props.location.state.nome}</i> da Lista Negra</h3>
          <h4>Tem certeza?</h4>
        </div>
        <div className="opcoes">
          <Link className="btn btn-danger btn-lg" to="/ln/consultar"> 
              Não
          </Link>
          <button className="btn btn-success btn-lg" onClick={excluir}>
              Sim
          </button>
        </div>
      </div>
    </div>
  );
}
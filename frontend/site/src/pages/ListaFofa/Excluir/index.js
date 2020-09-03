import React from "react";
import { Link, useHistory } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ListaFofaApi from "../../../services/ListaFofaApi";
const api = new ListaFofaApi();



export default function Excluir(props) {
  const navegacao = useHistory();

  const excluir = async () => {
    try {
      await api.excluir(props.location.state.id);
      toast.dark("🚀 Excluído da lista fofa");
      window.setTimeout(() => navegacao.goBack(), 2000);
    } 
    catch (e) {
      if (e.response.data.erro)
        toast.info("🌧️ " + e.response.data.erro);
      else 
        toast.error("🌧️ Ocorreu um erro. Tente novamente.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <h1 className="display-4">Lista Fofa</h1>

      <div className="container-fluid m-2 p-4 bg-light shadow-sm rounded">
        <h4 className="form-group row">Excluir</h4>

        <h6>
          Tem certeza que deseja excluir da lista fofa o(a) 
          <i style={{fontSize: '20px', marginLeft: '5px'}}> 
            {props.location.state.nome}? 
          </i>
        </h6>

        <div className="btn-group">
          <Link className="btn btn-outline-secondary outlined" to="/lf/consultar">
            Não
          </Link>

          <button className="btn btn-danger" onClick={excluir}>
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}

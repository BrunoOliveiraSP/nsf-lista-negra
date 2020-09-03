import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ListaFofaApi from "../../../services/ListaFofaApi";
const api = new ListaFofaApi();


export default function Alterar(props) {
  const navegacao = useHistory();

  const [id, setId] = useState(props.location.state.id);
  const [nome, setNome] = useState(props.location.state.nome);
  const [porque, setPorque] = useState(props.location.state.porque);
  const [potinho, setPotinho] = useState(props.location.state.colocariaPotinho);
  const [niver, setNiver] = useState(new Date(props.location.state.niver).toISOString().substr(0, 10));

  const alterar = async () => {
    try {
      await api.alterar(id, {
        fofura: nome,
        porque: porque,
        colocariaPotinho: potinho,
        niver: niver
      });
      toast.dark("🚀 Alterado na lista fofa");
      window.setTimeout(() => navegacao.goBack(), 2000);
    }
    catch (e) {
      if (e.response.data.erro)
        toast.info("🌧️ " + e.response.data.erro);
      else 
        toast.error("🌧️ Ocorreu um erro. Tente novamente.");
    }
  };

  const atualizarEstado = (e) => {
    let novoValor = e.target.value;
    if (e.target.type === "number") novoValor = Number(novoValor);
    else if (e.target.type === "checkbox") novoValor = e.target.checked;

    switch (e.target.id) {
      case "nome":
        setNome(novoValor);
        break;
      case "porque":
        setPorque(novoValor);
        break;
      case "potinho":
        setPotinho(novoValor);
        break;
      case "niver":
        setNiver(novoValor);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <ToastContainer />
      <h1 className="display-4">Lista Fofa</h1>

      <div className="container-fluid m-2 p-4 bg-light shadow-sm rounded">
        <h4 className="form-group row">Alterar</h4>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label"> Nome </label>
          <div className="col-sm-8">
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={atualizarEstado}
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label"> Por que? </label>
          <div className="col-sm-8">
            <input
              id="porque"
              type="text"
              value={porque}
              onChange={atualizarEstado}
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label"> </label>
          <div className="col">
            <input
              id="potinho"
              type="checkbox"
              checked={potinho}
              onChange={atualizarEstado}
            />
            <span> Colocaria num potinho? </span>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label"> Níver </label>
          <div className="col-sm-8">
            <input
              id="niver"
              type="date"
              value={niver}
              onChange={atualizarEstado}
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label"> </label>
          <div className="col-sm-8">
            <button className="btn btn-primary col" onClick={alterar}>
              Alterar
            </button>
          </div>
        </div>
      </div>
      <Link className="ml-2" to="/lf/consultar">
        Voltar
      </Link>
    </div>
  );
}

import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Memelation from "../../../services/MemelationApi";

const api = new Memelation();

export default function Deletar(props) {
  const navegacao = useHistory();
  const id = useParams().id;
  const excluirClick = async () => {
    try {
      await api.excluir(id);
      toast.dark("Excluído com sucesso");
      window.setTimeout(() => navegacao.goBack(), 2000);
    } catch (e) {
      if (e.response.data.erro) toast.info("🌧️ " + e.response.data.erro);
      else toast.error("🌧️ Ocorreu um erro. Tente novamente.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <h1 className="display-4">Memelation</h1>

      <div className="container-fluid m-2 p-4 bg-light shadow-sm rounded">
        <h4 className="form-group row">Excluir</h4>

        <h6>
          Tem certeza que deseja excluir do Memelation
          <i style={{ fontSize: "20px", marginLeft: "5px" }}></i>
        </h6>

        <div className="btn-group">
          <Link
            className="btn btn-outline-secondary outlined"
            to="/ml/consultar"
          >
            Não
          </Link>

          <button className="btn btn-danger" onClick={excluirClick}>
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}

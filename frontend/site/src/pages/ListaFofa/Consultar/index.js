import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import LoadingBar from "react-top-loading-bar";
import { Search } from "react-bootstrap-icons";

import ListaFofaApi from '../../../services/ListaFofaApi.js';
const api = new ListaFofaApi();



export default function Consultar() {
  const loadingBar = useRef();
  const [lista, setLista] = useState([]);

  const consultar = async () => {
    loadingBar.current.continuousStart();
    const response = await api.consultar();
    setLista(response);
    loadingBar.current.complete();
  };

  useEffect(() => {
    consultar();
  }, []);

  return (
    <div>
      <LoadingBar height={4} color="#f11946" ref={loadingBar} />

      <h1 className="display-4">Lista Fofa</h1>

      <div className="container-fluid m-2 p-4 bg-light shadow-sm rounded">
        <h4>
          Consultar &nbsp;
          <Search size={16} onClick={consultar} style={{ cursor: "pointer" }} />
        </h4>

        <div>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Fofura</th>
                <th>Por que?</th>
                <th>Potinho</th>
                <th>Níver</th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {lista.map((item) => (
                <tr key={item.id}>
                  <th>#{item.id}</th>
                  <td>{item.nome}</td>
                  <td>{item.porque}</td>
                  <td>{item.colocariaPotinho ? "Sim" : "Não"}</td>
                  <td> {new Date(item.niver).toLocaleDateString()}</td>
                  <td>
                    <Link
                      to={{
                        pathname: "/lf/alterar",
                        state: item
                      }}
                    >
                      Alterar
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={{
                        pathname: "/lf/excluir",
                        state: item
                      }}
                    >
                      Excluir
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Link className="ml-2" to="/lf">
        Voltar ao menu
      </Link>
    </div>
  );
}

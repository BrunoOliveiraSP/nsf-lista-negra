import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Memelation from '../../services/MemelationApi.js';
import { useHistory, useParams, Link } from "react-router-dom";
const api = new Memelation();

export default function Alterar(props) {
  const navegacao = useHistory();
  const id = useParams().id;

  const [categoria, setCategoria] = useState(props.location.state.categoria);
  const [autor, setAutor] = useState(props.location.state.autor);
  const [hashtags, setHashtags] = useState(props.location.state.hashtags);
  const [maior, setMaior] = useState(props.location.state.maior);
  const [imagem, setImagem] = useState();

  const alterarClick = async () => {
    try {
      const request = {
        autor: autor,
        categoria: categoria,
        hashtags: hashtags,
        maior: maior,
        imagem: imagem
      };

      const resp = await api.alterar(id, request);

      toast.dark("Alterado com sucesso");
      navegacao.goBack();
    } catch (e) {
      toast.error(e.response.data.erro);
    }
  };

  return (
    <div>
      <h1 className="display-4">Memelation</h1>
      <div className="container-fluid m-2 p-4 bg-light shadow-sm rounded">
        <h4 className="form-group row">Alterar</h4>
        
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Autor:</label>
          <div className="col-sm-8">
            <input
              type="text"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        
        <div className="form-group row">
            <label className="col-sm-2 col-form-label">Categoria:</label>
            <div className="col-sm-8">
            <input
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group row">
            <label className="col-sm-2 col-form-label">Hashtags:</label>
            <div className="col-sm-8">
            <input
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
    
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Maior:</label>
          <div className="col">
            <input
              type="Checkbox"
              checked={maior}
              onChange={(e) => setMaior(e.target.checked)}
            />
          </div>
        </div>
    
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Imagem:</label>
          <div className="col-sm-8">
            <input type="file" onChange={(e) => setImagem(e.target.files[0])} />
          </div>
        </div>
    
        <div className="form-group row">
          <label className="col-sm-2 col-form-label"> </label>
          <div className="col-sm-8">
            <button className="btn btn-primary col" onClick={alterarClick}>
              Salvar
            </button>
          </div>
        </div>
    
        <ToastContainer />

        <Link to="/"> Voltar ao menu </Link>
      </div>
    </div>
  );
}

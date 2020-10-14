import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import React, { useState } from "react";
import Memelation from '../../services/MemelationApi.js';
import {Link} from 'react-router-dom';

const api = new Memelation();

export default function Cadastrar() {
  const [autor, setAutor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [hashtags, setHashtags] = useState('#');
  const [maior, setMaior] = useState(true);
  const [imagem, setImagem] = useState();
  

  const salvarClick= async () => {
      try {
        await api.cadastrar({
          autor,
          categoria,
          hashtags,
          maior,
          imagem
        });
        toast("Cadastrado com sucesso");
      } catch (e) {
          toast.error(e.response.data.erro);
      }
    };
  return (
    <div>
        <h1 className="display-4">Memelation</h1>
        <div className="container-fluid m-2 p-4 bg-light shadow-sm rounded">
        <h4 className="form-group row">Cadastrar</h4>
        <div className="form-group row">
            <label className="col-sm-2 col-form-label">Autor:</label>
            <div  className="col-sm-8">
              <input type="text" 
              value={autor}
              onChange={e => setAutor(e.target.value)}
              className="form-control"
             />
            </div>
        </div>
        
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Categoria:</label>
          <div className="col-sm-8">
            <input  value={categoria}
                 onChange={(e)=>setCategoria(e.target.value)}
                className="form-control"/>
          </div>
        </div>

        <div className="form-group row">
            <label className="col-sm-2 col-form-label">Hashtags:</label>
            <div className="col-sm-8">
            <input type="text" 
               value={hashtags}
               onChange={e => setHashtags(e.target.value)}
               className="form-control"
              />
        </div>
        </div>

        <div className="form-group row">
            <label className="col-sm-2 col-form-label">Maior:</label>
            <div className="col">
            <input type="Checkbox" 
               value={maior}
               onChange={e => setMaior(e.target.checked)}
               />
            </div>
        </div>

        <div  className="form-group row">
            <label className="col-sm-2 col-form-label">Imagem:</label>
            <div className="col-sm-8">
            <input type="file" 
            onChange={e => setImagem(e.target.files[0])}
              />
            </div>
        </div>
        
        <div className="form-group row">
          <label className="col-sm-2 col-form-label"> </label>
          <div className="col-sm-8">
            <button className="btn btn-primary col" onClick={salvarClick}>
              Salvar
            </button>
          </div>
        </div>
        <ToastContainer />

        <Link to="/ml"> Voltar ao menu </Link>
        </div>
    </div>
)
}
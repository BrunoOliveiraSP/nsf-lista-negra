import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './index.css';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import UploadPhoto from '../../../components/UploadPhoto';

import ListaNegraAPI from '../../../services/ListaNegraApi.js';
const api = new ListaNegraAPI();


export default function LnAlterar(props) {
  
  const navegacao = useHistory();
  const id = useParams().id;

  const [nome, setNome] = useState(props.location.state.nome);
  const [motivo, setMotivo] = useState(props.location.state.motivo);
  const [local, setLocal] = useState(props.location.state.local);
  const [inclusao, setInclusao] = useState(new Date(props.location.state.inclusao).toISOString().substr(0, 10));
  const [foto, setFoto] = useState();

  const alterarClick = async () => {
      
        const request = {
                nome: nome,
                motivo: motivo,
                local: local,
                inclusao: inclusao,
                foto: foto
            };

        const resp = await api.alterar(id, request);

        toast.dark("Alterado com sucessooo!");
        window.setTimeout(() => navegacao.goBack(), 2000);
  }
  
  return (
    <div className="alterar">

    <h1>Alterar na Lista Negra</h1>

    <div className="info_alterar">

        <div className="info">
            <h2>Qual o nome da pessoa?</h2>
            <input type="text" 
                  value={nome}
                  placeholder="Digite aqui"
                  onChange={e => setNome(e.target.value)} />
        </div>

        <div className="info">
            <h2>Por que quer cadastrar ela?</h2>
            <input type="text" 
                  value={motivo}
                  placeholder="Digite aqui"
                  onChange={e => setMotivo(e.target.value)} />
        </div>

        <div className="info">
            <h2>Onde a situação ocorreu?</h2>    

          <select value={local}
                  onChange={e => setLocal(e.target.value)} >
              <option value="Escola">Escola</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Curso">Curso</option>
              <option value="Outro">Outro</option>
              <option value="SemLugarEspecifico">Não há um lugar específico</option>
          </select>
        </div>

        <div className="info">
            <h2>Quando ocorreu?</h2>
            <input type="date" 
                  value={inclusao}
                  onChange={e => setInclusao(e.target.value)} />
        </div>

            
        <div className="info">
            <h2>Insira uma foto da pessoa</h2>
            <div onChange={e => setFoto(e.target.files[0])} >
              <UploadPhoto />
           </div>
        </div>
    </div>

      <button onClick={alterarClick} className="btn_alterar">Alterar</button> 

      <ToastContainer></ToastContainer>
    </div>
  );
}
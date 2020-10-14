import React from 'react';
import './index.css';

import { Link } from 'react-router-dom';

export default function ListaNegraHome() {
    return (
        <div className="main_box">
            <div className="titulo">
                <h1>Bem vindo(a) à Lista Negra Online!</h1>
                <h1>O que deseja fazer?</h1>
            </div>
            <div className="opcoes">
                <h2> <Link to="/ln/cadastrar" className="btn_ln"> Cadastrar </Link> </h2>
                <h2> <Link to="/ln/consultar" className="btn_ln"> Consultar </Link> </h2>
            </div>
        </div>
    );
}
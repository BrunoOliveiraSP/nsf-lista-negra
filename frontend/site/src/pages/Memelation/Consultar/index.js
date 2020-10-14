import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import LoadingBar from 'react-top-loading-bar';
import { ToastContainer, toast } from "react-toastify";

import { Search } from "react-bootstrap-icons";

import Memelation from '../../services/MemelationApi.js'



const api = new Memelation();


export default function Consultar() {
    const loadingBar = useRef(null);
    const [registros, setRegistros] = useState([])

    const consultarClick = async () => {
        loadingBar.current.continuousStart();
        try{
            const lns = await api.consultar();
            setRegistros([...lns]);
        } catch (e) {
            setRegistros([]);
            toast.error('ainda não tem nenhum Registro', {autoClose: 3000});
        }
        loadingBar.current.complete();
    }



    useEffect(() => {
        consultarClick();
    }, [])


    return (
        <div className="container-consultar" >
            <LoadingBar
                height={4}
                color='blue'
                ref={loadingBar}
                />
    
            <h1>Consultar no Memelation</h1>

            <h4>
              Consultar &nbsp;
             <Search size={16} onClick={consultarClick} style={{ cursor: "pointer" }} />
            </h4>

            <div className="container-fluid m-2 p-4 bg-light shadow-sm rounded">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>imagem</th>
                            <th>Autor</th>
                            <th>Categoria</th>
                            <th>Hashtags</th>
                            <th>Maior</th>
                            <th>inclusao</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>


                    <tbody>
                        {registros.map(item => 
                            <tr key={item.id}>
                                <td>#{item.id}</td>
                                <td>
                                <img src={api.buscarImagem(item.imagem)} alt="" height="40" />
                                </td>
                                <td>{item.autor}</td>
                                <td>{item.categoria}</td>
                                <td>{item.hashtags}</td>
                                <td>{item.maior?"Sim":"Não"}</td>
                           
                              
                                <td> {new Date(item.inclusao + 'Z').toLocaleDateString()}</td>
                                <td>
                                <Link to={{
                                        pathname:`/ml/deletar/${item.id}`,
                                        state:{id:item.id,
                                                nome:item.imagem}     
                                        }}>
                                            Deletar</Link>
                                </td>
                                <td>
                                    <Link to={{
                                        pathname:`/ml/alterar/${item.id}`,
                                        state:{autor:item.autor,
                                            categoria:item.categoria,
                                            hashtags:item.hashtags,
                                            maior:item.maior,
                                            imagem:item.imagem
                                        }
                                    }}
                                     >
                                         Alterar
                                    </Link>
                                </td>
                            </tr>    
                        )}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
            <Link className="ml-2" to="/ml">
                Voltar ao menu
            </Link>
        </div>
    )
}
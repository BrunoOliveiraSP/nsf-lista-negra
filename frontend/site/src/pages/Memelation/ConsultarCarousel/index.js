import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import './index.css';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import LoadingBar from 'react-top-loading-bar';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MemelationApi from '../../services/MemelationApi.js';
const api = new MemelationApi();


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};


export default function ConsultarCarousel () {
  const loadingBar = useRef(null);
  const [memes, setMemes] = useState([]);

  const mudarIsOldClick = (item) => {
     item.mostrar = true;
     setMemes([...memes]);
  }

  const deletarClick = async (id) => {
    await api.deletar(id)
    toast.dark("Excluido com sucesso!!!");
    voltarCards();
  }

  const voltarCards = async () => {
    loadingBar.current.continuousStart();
    const resp = await api.consultar();
    setMemes([...resp]);
    loadingBar.current.complete();
  };

  useEffect(() => {
    voltarCards();
  }, [])

   return (
     <div>
        <LoadingBar
                height={4}
                color='blue'
                ref={loadingBar}
                />

        <h1>Consultar Memelation</h1>

        <div>
          <button
          onClick={voltarCards}
          className="btn btn-warning">
            Consultar
          </button>
        </div>


        <div className = "container-fluid m-2 p-4 bg-light shadow-sm rounded">
            <Carousel responsive={responsive}>
              
              {memes.map(item =>
                  <div className="item" key={item.id}>
                
                      {item.maior === false  &&
                        <img className="imgMeme"
                          src={api.buscarImagem(item.imagem)}
                          alt="meme"
                          height="100"
                        ></img>
                      }


                      {item.maior === true && item.mostrar !== true &&
                          <div className="ifOld">
                           <h5> A imagem é para maiores </h5>
                            <button onClick={() => mudarIsOldClick(item) }
                                  className="btn btn-danger"> Sou +18 </button>
                          </div>
                      } 

                      {item.maior === true && item.mostrar === true &&
                        <img className="imgMeme"
                          src={api.buscarImagem(item.imagem)}
                          alt="meme"
                          height="100"></img>
                      }

              
                    <div className="dadosMeme">
                    <h5>Autor: {item.autor}</h5>
                    <p>Categoria: {item.categoria}</p>
                    <p>Hashtags: {item.hashtags}</p>
                    <p>Inclusão: {new Date(item.inclusao + "Z").toLocaleString()}</p>
                    <div className="acoes">
                          <button 
                          onClick={() => deletarClick(item.id)}
                          className="myBtn">Excluir</button>
                          
                          <Link
                            to={{
                              pathname: "/ml/alterar/" + item.id,
                              state: item
                            }}
                          >Alterar</Link>
                        </div>
                        
                    </div>
                  </div>
            )}
         
          </Carousel>
        
      </div>


      <ToastContainer/>
     </div>
     
   );
} 
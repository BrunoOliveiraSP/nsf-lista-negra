import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'

import ListaFofaHome      from './pages/ListaFofa'
import ListaFofaCadastrar from './pages/ListaFofa/Cadastrar'
import ListaFofaConsultar from './pages/ListaFofa/Consultar'
import ListaFofaAlterar   from './pages/ListaFofa/Alterar'
import ListaFofaExcluir   from './pages/ListaFofa/Excluir'

import Memelation from './pages/Memelation';
import Consultar from './pages/Memelation/Consultar';
import Cadastrar from './pages/Memelation/Cadastrar';
import Alterar from './pages/Memelation/Alterar';
import Deletar from './pages/Memelation/Excluir';
import ConsultarCarousel from './pages/Memelation/ConsultarCarousel'



import ListaNegraHome from './pages/ListaNegra';
import LnConsultar from './pages/ListaNegra/Consultar';
import LnExcluir from './pages/ListaNegra/Excluir';
import LnCadastrar from './pages/ListaNegra/Cadastrar';
import LnAlterar from './pages/ListaNegra/Alterar';



export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/"   exact={true} component={Home} />
        <Route path="/lf" exact={true} component={ListaFofaHome} />
        <Route path="/lf/cadastrar"     component={ListaFofaCadastrar} />
        <Route path="/lf/consultar"     component={ListaFofaConsultar} />
        <Route path="/lf/alterar"       component={ListaFofaAlterar} />
        <Route path="/lf/excluir"       component={ListaFofaExcluir} />
        
        <Route path="/ml" exact={true}                component={Memelation} />
        <Route path="/ml/consultar" exact            component={Consultar} />
        <Route path="/ml/cadastrar"                   component={Cadastrar} />
        <Route path="/ml/alterar/:id"                 component={Alterar} />
        <Route path="/ml/deletar/:id"                 component={Deletar} />
        <Route path="/ml/consultar/carousel" exact    component={ConsultarCarousel} />

       
        <Route path="/ln"  exact={true}            component={ListaNegraHome} />
        <Route path="/ln/consultar"                component={LnConsultar}    />
        <Route path="/ln/excluir"                  component={LnExcluir}      />
        <Route path="/ln/cadastrar"                component={LnCadastrar}    />
        <Route path="/ln/alterar"                  component={LnAlterar}      />
      </Switch>
    </BrowserRouter>
  )
}
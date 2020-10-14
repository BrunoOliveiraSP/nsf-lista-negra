import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:5000"
})


export default class ListaFofaApi {

  async cadastrar(lf) {
    const response = await api.post('/listafofa', lf);
    return response.data;
  }

  async alterar(id, lf) {
    const response = await api.put('/listafofa/' + id, lf);
    return response.data;
  }

  async excluir(id) {
    const response = await api.delete('/listafofa/' + id);
    return response.data;
  }

  async consultar() {
    const response = await api.get('/listafofa');
    return response.data;
  }

}
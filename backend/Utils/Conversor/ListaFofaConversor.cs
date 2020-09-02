using System;
using System.Collections.Generic;


namespace backend.Utils
{
    public class ListaFofaConversor
    {
        public Models.TbListaFofa ParaTabela(Models.Request.ListaFofaRequest request)
        {
            Models.TbListaFofa ln = new Models.TbListaFofa();
            ln.NmFofura = request.Fofura;
            ln.DsPorque = request.Porque;
            ln.DtNiver = request.Niver;
            ln.BtColocariaPotinho = request.ColocariaPotinho;

            return ln;
        }

        public Models.Response.ListaFofaResponse ParaResponse(Models.TbListaFofa ln)
        {
            Models.Response.ListaFofaResponse resp =new Models.Response.ListaFofaResponse();
            resp.Id = ln.IdListaFofa;
            resp.Nome = ln.NmFofura;
            resp.Porque = ln.DsPorque;
            resp.Niver = ln.DtNiver;
            resp.ColocariaPotinho = ln.BtColocariaPotinho;
            return resp;
        }

        public List<Models.Response.ListaFofaResponse> ParaResponse(List<Models.TbListaFofa> lns)
        {
            List<Models.Response.ListaFofaResponse> resp = new List<Models.Response.ListaFofaResponse>();
            foreach (Models.TbListaFofa item in lns)
            {
                resp.Add(
                    this.ParaResponse(item));
            }
            return resp;
        }
    }
}
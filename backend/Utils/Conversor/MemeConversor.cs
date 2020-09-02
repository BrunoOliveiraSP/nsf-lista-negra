using System;
using System.Collections.Generic;

namespace backend.Utils
{
    public class MemeConversor
    {
        public Models.TbMemelation ParaTabela (Models.Request.MemeRequest req)
        {
            Models.TbMemelation tb = new Models.TbMemelation();
            tb.NmAutor = req.Autor;
            tb.DsCategoria = req.Categoria;
            tb.DsHashtags = req.Hashtags;
            tb.BtMaior = req.Maior;
            tb.DtInclusao = DateTime.Now;

            return tb;
        }

        public Models.Response.MemeResponse ParaResponse (Models.TbMemelation tb)
        {
            Models.Response.MemeResponse resp = new Models.Response.MemeResponse();
            resp.ID = tb.IdMemelation;
            resp.Autor = tb.NmAutor;
            resp.Categoria = tb.DsCategoria;
            resp.Hashtags = tb.DsHashtags;
            resp.Maior = tb.BtMaior;
            resp.Imagem = tb.ImgMeme;
            resp.Inclusao = tb.DtInclusao;

            return resp;
        }

        public List<Models.Response.MemeResponse> ParaResponse (List<Models.TbMemelation> tbs)
        {
            List<Models.Response.MemeResponse> resp = new List<Models.Response.MemeResponse>();

            tbs.ForEach(x => 
                resp.Add(this.ParaResponse(x))
            );

            return resp;
        }
        
    }
}
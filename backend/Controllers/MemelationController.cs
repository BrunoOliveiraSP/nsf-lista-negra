using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MemelationController : ControllerBase
    {
        Business.MemeBusiness business = new Business.MemeBusiness();
        Utils.MemeConversor conversor = new Utils.MemeConversor();
        Business.GerenciadorFoto gerenciadorFoto = new Business.GerenciadorFoto();  

        [HttpPost]
        public ActionResult<Models.Response.MemeResponse> Salvar ([FromForm] Models.Request.MemeRequest req) 
        {
            try 
            {
                Models.TbMemelation tb = conversor.ParaTabela(req);
                tb.ImgMeme = gerenciadorFoto.GerarNovoNome(req.Imagem.FileName);

                business.Salvar(tb);
                gerenciadorFoto.SalvarFoto(tb.ImgMeme, req.Imagem);

                Models.Response.MemeResponse resp = conversor.ParaResponse(tb);

                return resp; 
            }
            catch (Exception ex)
            {
                return BadRequest(
                    new Models.Response.ErroResponse(400, ex.Message)
                );
            }
        }

        [HttpGet("foto/{nome}")]
        public ActionResult BuscarFoto(string nome)
        {
            try 
            {
                byte[] foto = gerenciadorFoto.LerFoto(nome);
                string contentType = gerenciadorFoto.GerarContentType(nome);
                return File(foto, contentType);
            }
            catch (System.Exception ex)
            {
                return BadRequest(
                    new Models.Response.ErroResponse(404, ex.Message)
                );
            }

        }

        [HttpGet]
        public ActionResult<List<Models.Response.MemeResponse>> Listar () 
        {
            try 
            {
                List<Models.TbMemelation> lista = business.Listar();

                if (lista.Count == 0)
                    return NotFound();

                return conversor.ParaResponse(lista);
            }
            catch (Exception ex)
            {
                return BadRequest(
                    new Models.Response.ErroResponse(400, ex.Message)
                );
            }
        }

        [HttpGet("categoria")]
        public ActionResult<List<List<Models.Response.MemeResponse>>> ConsultarPorCategoria()
        {
           try 
            {
                List<List<Models.TbMemelation>> lista = business.ConsultarPorCategoria();

                if (lista.Count == 0)
                   return NotFound();
                
                return conversor.ParaResponse(lista);

           }
            catch (Exception ex)
            {
                return BadRequest(
                    new Models.Response.ErroResponse(400, ex.Message)
                );
            }
        }      

        [HttpPut("{id}")]
        public ActionResult<Models.Response.MemeResponse> Alterar(int id, [FromForm] Models.Request.MemeRequest req) 
        {
            try 
            {
                Models.TbMemelation tb = conversor.ParaTabela(req);
                tb.ImgMeme = gerenciadorFoto.GerarNovoNome(req.Imagem.FileName);

                Models.TbMemelation novaTb = business.Alterar(id, tb);
                gerenciadorFoto.SalvarFoto(novaTb.ImgMeme, req.Imagem);
                
                return conversor.ParaResponse(novaTb);
            }
            catch (Exception ex)
            {
                return BadRequest(
                    new Models.Response.ErroResponse(400, ex.Message)
                );
            }
        } 

        [HttpDelete("{id}")]
        public ActionResult<Models.Response.MemeResponse> Deletar (int id) 
        {
            try 
            {
                return conversor.ParaResponse(
                    business.Deletar(id)
                );

            }
            catch (Exception ex)
            {
                return BadRequest(
                    new Models.Response.ErroResponse(400, ex.Message)
                );
            }
        }        
    }
}
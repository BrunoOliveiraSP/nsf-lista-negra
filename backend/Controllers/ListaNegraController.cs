using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ListaNegraController : ControllerBase
    {
        Business.ListaNegraBusiness business = new Business.ListaNegraBusiness();
        Utils.ListaNegraConversor conversor = new Utils.ListaNegraConversor();
        Business.GerenciadorFoto gerenciadorFoto = new Business.GerenciadorFoto();
        Business.TokenValidator tokenValidator = new Business.TokenValidator();

        [HttpPost]
        public ActionResult<Models.Response.ListaNegraResponse> Inserir([FromForm] Models.Request.ListaNegraRequest request)
        {
            try
            {
                Models.TbListaNegra ln = conversor.ParaTabela(request);
                ln.DsFoto = gerenciadorFoto.GerarNovoNome(request.Foto.FileName);

                business.Salvar(ln);
                gerenciadorFoto.SalvarFoto(ln.DsFoto, request.Foto);

                Models.Response.ListaNegraResponse resp = conversor.ParaResponse(ln);
                return resp;
            }
            catch (System.Exception ex)
            {
                return BadRequest(
                    new Models.Response.ErroResponse(404, ex.Message)
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


        [HttpDelete("{id}")]
        public ActionResult<Models.Response.ListaNegraResponse> Deletar(int id)
        {
            try
            {
                Models.TbListaNegra ln = business.Deletar(id);
                Models.Response.ListaNegraResponse resp = conversor.ParaResponse(ln);
                return resp;
            }
            catch (System.Exception ex)
            {
                return BadRequest(
                    new Models.Response.ErroResponse(404, ex.Message)
                );
            }
        }

        [HttpPut("{id}")]
        public ActionResult<Models.Response.ListaNegraResponse> Alterar(int id, Models.Request.ListaNegraRequest request)
        {
            try
            {
                Models.TbListaNegra ln = conversor.ParaTabela(request);
                business.Alterar(id, ln);

                Models.Response.ListaNegraResponse resp = conversor.ParaResponse(ln);
                return resp;
            }
            catch (System.Exception ex)
            {
                return BadRequest(
                    new Models.Response.ErroResponse(404, ex.Message)
                );
            }
        }


        [HttpGet]
        public ActionResult<List<Models.Response.ListaNegraResponse>> Listar() 
        {
            try
            {
                List<Models.TbListaNegra> lns = business.Listar();
                if (lns.Count == 0)
                    return NotFound();

                List<Models.Response.ListaNegraResponse> resp = conversor.ParaResponse(lns);
                return resp;
            }
            catch (Exception ex)
            {
                return BadRequest(
                    new Models.Response.ErroResponse(500, ex.Message)
                );
            }
        }



        
        [HttpGet("ping")]
        public string Ping() 
        {
            return "pong";
        }


        [HttpGet("ping/seguro")]
        public ActionResult<string> PingSeguro() 
        {
            try
            {
                tokenValidator.TokenValido(Request);
                return "pong";
            }
            catch (System.ArgumentException ex)
            {
                return BadRequest(
                    new Models.Response.ErroResponse(500, ex.Message)
                );
            }
        }

        
    }
}
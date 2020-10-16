using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ListaFofaController : ControllerBase
    {
        Business.ListaFofaBusiness business = new Business.ListaFofaBusiness();
        Utils.ListaFofaConversor conversor = new Utils.ListaFofaConversor();


        [HttpPost]
        public ActionResult<Models.Response.ListaFofaResponse> Inserir(Models.Request.ListaFofaRequest request)
        {
            try
            {
                Models.TbListaFofa ln = conversor.ParaTabela(request);
                business.Salvar(ln);

                Models.Response.ListaFofaResponse resp = conversor.ParaResponse(ln);
                return resp;
            }
            catch (System.Exception ex)
            {
                return BadRequest(
                    new Models.Response.ErroResponse(404, ex.Message)
                );
            }
        }

        [HttpDelete("{id}")]
        public ActionResult<Models.Response.ListaFofaResponse> Deletar(int id)
        {
            try
            {
                Models.TbListaFofa ln = business.Deletar(id);
                Models.Response.ListaFofaResponse resp = conversor.ParaResponse(ln);
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
        public ActionResult<Models.Response.ListaFofaResponse> Alterar(int id, Models.Request.ListaFofaRequest request)
        {
            try
            {
                Models.TbListaFofa ln = conversor.ParaTabela(request);
                business.Alterar(id, ln);

                Models.Response.ListaFofaResponse resp = conversor.ParaResponse(ln);
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
        public ActionResult<List<Models.Response.ListaFofaResponse>> Listar() 
        {
            try
            {
                List<Models.TbListaFofa> lns = business.Listar();
                if (lns.Count == 0)
                    return NotFound();

                List<Models.Response.ListaFofaResponse> resp = conversor.ParaResponse(lns);
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
    }
}
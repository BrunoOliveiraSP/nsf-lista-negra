using System;
using System.Collections.Generic;
using backend.Business;
using backend.Models.Request;
using backend.Models.Response;
using Microsoft.AspNetCore.Mvc;


namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        LoginBusiness loginBusiness = new LoginBusiness();


        [HttpPost]
        public ActionResult<LoginResponse> Login(LoginRequest request)
        {
            try
            {
                string token = loginBusiness.Login(request.Usuario, request.Senha);

                LoginResponse response = new LoginResponse();
                response.Token = token;

                return response;
            }
            catch (Exception ex)
            {
                return BadRequest(
                    new Models.Response.ErroResponse(500, ex.Message)
                );
            }
        }

        

    }
}
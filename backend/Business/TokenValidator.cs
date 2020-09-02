using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;

namespace backend.Business
{
    public class TokenValidator
    {
        TokenManager tokenManager = new TokenManager();

        public bool TokenValido(HttpRequest request)
        {
            try 
            {
                string token = LerToken(request);
                tokenManager.Descriptografar(token);
                return true;
            } 
            catch
            {
                throw new ArgumentException("Token inválido");
            }
        }


        private string LerToken(HttpRequest request)
        {
            StringValues sToken;
            request.Headers.TryGetValue("auth_token", out sToken);

            string token = sToken.ToString();
            if(string.IsNullOrEmpty(token))
            {
                throw new ArgumentException("Autenticação inválida");
            }
            return token;
        }
        
    }
}
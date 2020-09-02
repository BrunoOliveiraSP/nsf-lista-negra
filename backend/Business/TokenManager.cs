using System;
using backend.Utils.Criptografia;

namespace backend.Business
{
    public class TokenManager
    {
        const string KEY = "nsf@secret#2020!";

        AESCript cript = new AESCript();

        public string CriarToken(int id)
        {
            string tokenModel = $"{id}|{DateTime.Now.ToString()}";
            string token = cript.Criptografar(KEY, tokenModel);
            return token;
        }

        public string Descriptografar(string token)
        {
            string tokenInfo = cript.Descriptografar(KEY, token);
            return tokenInfo;
        }
    }
}
using System;
using backend.Models;
using backend.Utils.Criptografia;

namespace backend.Business
{
    public class LoginBusiness
    {
        Database.LoginDatabase db = new Database.LoginDatabase();
        TokenManager tokenManager = new TokenManager();

        public string Login(string login, string senha)
        {
            TbLogin usuario = db.Login(login, senha);
            if (usuario == null)
                throw new ArgumentException("Credenciais inválidas.");
            
            string token = tokenManager.CriarToken(usuario.IdLogin);
            return token;
        }

    }
}
using System;
using System.Linq;
using System.Collections.Generic;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Database
{
    public class LoginDatabase
    {
        Models.lndbContext db = new lndbContext();

        public TbLogin Login(string usuario, string senha)
        {
            return
            db.TbLogin.FirstOrDefault(x => x.DsLogin == usuario 
                                        && x.DsSenha == senha);
        }
    }
}
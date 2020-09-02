using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;


namespace backend.Database
{
    public class ListaFofaDatabase
    {
        Models.lndbContext db = new Models.lndbContext();
            

        public Models.TbListaFofa Salvar(Models.TbListaFofa ln)
        {
            db.Add(ln);
            db.SaveChanges();

            return ln;
        }

        public List<Models.TbListaFofa> Listar()
        {
             List<Models.TbListaFofa> lns = 
                db.TbListaFofa
                  .OrderBy(x=> x.IdListaFofa)
                  .ToList();

             return lns;
        }


        public Models.TbListaFofa Deletar(int id)
        {
             Models.TbListaFofa ln = 
                db.TbListaFofa.FirstOrDefault(x => x.IdListaFofa == id);

             if (ln != null)
             {
                 db.TbListaFofa.Remove(ln);
                 db.SaveChanges();
             }

             return ln;
        }

        public Models.TbListaFofa Alterar(int id, Models.TbListaFofa novo)
        {
             Models.TbListaFofa ln = 
                db.TbListaFofa.FirstOrDefault(x => x.IdListaFofa == id);

             if (ln != null)
             {
                 ln.NmFofura = novo.NmFofura;
                 ln.DsPorque = novo.DsPorque;
                 ln.BtColocariaPotinho = novo.BtColocariaPotinho;
                 ln.DtNiver = novo.DtNiver;
                 
                 db.SaveChanges();
             }

             return ln;
        }
    }
}
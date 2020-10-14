using System;
using System.Collections.Generic;

namespace backend.Business
{
    public class MemeBusiness
    {
        Database.MemeDatabase db = new Database.MemeDatabase();

        public Models.TbMemelation Salvar (Models.TbMemelation tb)
        {
            if (string.IsNullOrEmpty(tb.NmAutor))
                throw new Exception("Nome é obrigatório.");
            if (string.IsNullOrEmpty(tb.DsCategoria))
                throw new Exception("Categoria é obrigatório.");
            if (string.IsNullOrEmpty(tb.DsHashtags))
                throw new Exception("Hashtag é obrigatório.");
            
            return db.Salvar(tb);
        }

        public List<Models.TbMemelation> Listar ()
        {
            return db.Listar();
        }

        public List<List<Models.TbMemelation>> ConsultarPorCategoria()
        {
            return db.ConsultarPorCategoria();
        }

        public Models.TbMemelation Deletar (int id)
        {
            if (id <= 0)
                throw new Exception("ID inválido");

            return db.Deletar(id);
        }

        public Models.TbMemelation Alterar (int id, Models.TbMemelation novaTb)
        {
            if (id <= 0)
                throw new Exception("ID inválido");
            if (string.IsNullOrEmpty(novaTb.NmAutor))
                throw new Exception("Nome é obrigatório.");
            if (string.IsNullOrEmpty(novaTb.DsCategoria))
                throw new Exception("Categoria é obrigatório.");
            if (string.IsNullOrEmpty(novaTb.DsHashtags))
                throw new Exception("Hashtag é obrigatório.");

            return db.Alterar(id, novaTb);
        }
    }
}
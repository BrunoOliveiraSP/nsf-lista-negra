using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("tb_login")]
    public partial class TbLogin
    {
        [Key]
        [Column("id_login")]
        public int IdLogin { get; set; }
        [Column("ds_login", TypeName = "varchar(100)")]
        public string DsLogin { get; set; }
        [Column("ds_senha", TypeName = "varchar(200)")]
        public string DsSenha { get; set; }
        [Column("dt_inclusao", TypeName = "datetime")]
        public DateTime? DtInclusao { get; set; }
    }
}

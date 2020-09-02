using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("tb_lista_fofa")]
    public partial class TbListaFofa
    {
        [Key]
        [Column("id_lista_fofa")]
        public int IdListaFofa { get; set; }
        [Required]
        [Column("nm_fofura", TypeName = "varchar(100)")]
        public string NmFofura { get; set; }
        [Required]
        [Column("ds_porque", TypeName = "varchar(200)")]
        public string DsPorque { get; set; }
        [Column("bt_colocaria_potinho")]
        public bool? BtColocariaPotinho { get; set; }
        [Column("dt_niver", TypeName = "date")]
        public DateTime DtNiver { get; set; }
    }
}

﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Taller.Entities.Entities
{
    public partial class VW_tbDetallesventas
    {
        public int deve_ID { get; set; }
        public int vent_ID { get; set; }
        public int serv_ID { get; set; }
        public string serv_Descripcion { get; set; }
        public int resp_ID { get; set; }
        public string resp_Descripcion { get; set; }
        public int deve_Cantidad { get; set; }
        public decimal deve_Precioventa { get; set; }
        public decimal? deve_MontoTotal { get; set; }
        public int deve_UserCreacion { get; set; }
        public DateTime? deve_FechaCreacion { get; set; }
        public int? deve_UserModificacion { get; set; }
        public DateTime? deve_FechaModificacion { get; set; }
    }
}
﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Taller.Entities.Entities
{
    public partial class VW_tbCompras
    {
        public int comp_ID { get; set; }
        public int prov_ID { get; set; }
        public string prov_Nombre { get; set; }
        public DateTime comp_Fecha { get; set; }
        public decimal? comp_Descuento { get; set; }
        public decimal comp_MontoFinal { get; set; }
        public bool? comp_Estado { get; set; }
        public int comp_UserCreacion { get; set; }
        public string comp_UserCreacion_Nombre { get; set; }
        public DateTime? comp_FechaCreacion { get; set; }
        public int? comp_UserModificacion { get; set; }
        public string comp_UserModificacion_Nombre { get; set; }
        public DateTime? comp_FechaModificacion { get; set; }
    }
}
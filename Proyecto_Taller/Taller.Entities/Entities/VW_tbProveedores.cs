﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Taller.Entities.Entities
{
    public partial class VW_tbProveedores
    {
        public int prov_ID { get; set; }
        public string prov_Rut { get; set; }
        public string prov_Nombre { get; set; }
        public string prov_CorreoElectronico { get; set; }
        public string prov_Telefono { get; set; }
        public string prov_Dirrecion { get; set; }
        public int prov_UserCreacion { get; set; }
        public string prov_UserCreacion_Nombre { get; set; }
        public DateTime prov_FechaCreacion { get; set; }
        public int? prov_UserModificacion { get; set; }
        public string prov_UserModificacion_Nombre { get; set; }
        public DateTime? prov_FechaModificacion { get; set; }
        public bool prov_Estado { get; set; }
    }
}
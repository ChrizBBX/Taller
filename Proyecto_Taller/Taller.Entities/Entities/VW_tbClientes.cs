﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Taller.Entities.Entities
{
    public partial class VW_tbClientes
    {
        public int clie_ID { get; set; }
        public string clie_Nombres { get; set; }
        public string clie_Apellidos { get; set; }
        public string clie_Sexo { get; set; }
        public DateTime clie_FechaNacimiento { get; set; }
        public string clie_Telefono { get; set; }
        public string clie_CorreoElectronico { get; set; }
        public string muni_ID { get; set; }
        public string depa_ID { get; set; }
        public DateTime? clie_FechaCreacion { get; set; }
        public int? clie_UserCreacion { get; set; }
        public string clie_UserCreacion_Nombre { get; set; }
        public DateTime? clie_FechaModificacion { get; set; }
        public int? clie_UserModificacion { get; set; }
        public string clie_UserModificacion_Nombre { get; set; }
        public bool clie_Estado { get; set; }
    }
}
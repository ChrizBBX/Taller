﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Taller.Entities.Entities
{
    public partial class VW_tbEmpleados
    {
        public int empe_Id { get; set; }
        public string empe_Nombres { get; set; }
        public string empe_Apellidos { get; set; }
        public string empe_Identidad { get; set; }
        public DateTime empe_FechaNacimiento { get; set; }
        public string empe_Sexo { get; set; }
        public int estacivi_ID { get; set; }
        public string estacivi_Nombre { get; set; }
        public string muni_Id { get; set; }
        public string muni_Nombre { get; set; }
        public string empe_Direccion { get; set; }
        public string empe_Telefono { get; set; }
        public string empe_CorreoElectronico { get; set; }
        public int sucu_Id { get; set; }
        public string sucu_Descripcion { get; set; }
        public int empe_UsuCreacion { get; set; }
        public string empe_UserCreacion_Nombre { get; set; }
        public DateTime empe_FechaCreacion { get; set; }
        public int? empe_UsuModificacion { get; set; }
        public string empe_UserModificacion_Nombre { get; set; }
        public DateTime? empe_FechaModificacion { get; set; }
        public bool empe_Estado { get; set; }
    }
}
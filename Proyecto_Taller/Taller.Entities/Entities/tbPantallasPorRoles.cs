﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Taller.Entities.Entities
{
    public partial class tbPantallasPorRoles
    {
        public int pantrole_ID { get; set; }
        public int role_ID { get; set; }
        public int pant_ID { get; set; }
        public int pantrole_UserCreacion { get; set; }
        public DateTime pantrole_FechaCreacion { get; set; }
        public int? pantrole_UserModificacion { get; set; }
        public DateTime? pantrole_FechaModificacion { get; set; }
        public bool? pantrole_Estado { get; set; }

        public virtual tbPantallas pant { get; set; }
        public virtual tbUsuarios pantrole_UserCreacionNavigation { get; set; }
        public virtual tbUsuarios pantrole_UserModificacionNavigation { get; set; }
        public virtual tbRoles role { get; set; }
    }
}
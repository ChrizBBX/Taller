using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taller.API.Models
{
    public class RolesViewModel
    {
        public int role_ID { get; set; }
        public string role_Nombre { get; set; }
        public int role_UserCreacion { get; set; }
        public DateTime role_FechaCreacion { get; set; }
        public int? role_UserModificacion { get; set; }
        public DateTime? role_FechaModificacion { get; set; }
        public bool? role_Estado { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taller.API.Models
{
    public class UsuariosViewModel
    {
        public int user_ID { get; set; }
        public string user_NombreUsuario { get; set; }
        public string user_Contrasena { get; set; }
        public bool? user_EsAdmin { get; set; }
        public int? role_ID { get; set; }
        public int? empe_ID { get; set; }
        public int? user_UserCreacion { get; set; }
        public DateTime user_FechaCreacion { get; set; }
        public int? user_UserModificacion { get; set; }
        public DateTime? user_FechaModificacion { get; set; }
        public bool? user_Estado { get; set; }
    }
}

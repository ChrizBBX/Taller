using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taller.API.Models
{
    public class RolesPorPantallaViewModel
    {
        public int pantrole_ID { get; set; }
        public int role_ID { get; set; }
        public int pant_ID { get; set; }
        public int pantrole_UserCreacion { get; set; }
        public DateTime pantrole_FechaCreacion { get; set; }
        public int? pantrole_UserModificacion { get; set; }
        public DateTime? pantrole_FechaModificacion { get; set; }
        public bool? pantrole_Estado { get; set; }
    }
}

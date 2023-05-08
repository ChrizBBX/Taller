using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taller.API.Models
{
    public class SucursalesViewModel
    {
        public int sucu_ID { get; set; }
        public string sucu_Descripcion { get; set; }
        public string muni_ID { get; set; }
        public string sucu_DireccionExacta { get; set; }
        public DateTime sucu_FechaCreacion { get; set; }
        public int sucu_UserCreacion { get; set; }
        public DateTime? sucu_FechaModificacion { get; set; }
        public int? sucu_UserModificacion { get; set; }
        public bool? sucu_Estado { get; set; }
    }
}

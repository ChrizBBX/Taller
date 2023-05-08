using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taller.API.Models
{
    public class ProveedoresViewModel
    {
        public int prov_ID { get; set; }
        public string prov_Rut { get; set; }
        public string prov_Nombre { get; set; }
        public string prov_CorreoElectronico { get; set; }
        public string prov_Telefono { get; set; }
        public string prov_Dirrecion { get; set; }
        public int prov_UserCreacion { get; set; }
        public DateTime prov_FechaCreacion { get; set; }
        public int? prov_UserModificacion { get; set; }
        public DateTime? prov_FechaModificacion { get; set; }
        public bool? prov_Estado { get; set; }
    }
}

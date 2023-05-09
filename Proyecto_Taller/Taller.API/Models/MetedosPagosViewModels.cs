using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taller.API.Models
{
    public class MetedosPagosViewModels
    {
        public int meto_ID { get; set; }
        public string meto_Nombre { get; set; }
        public int meto_UserCreacion { get; set; }
        public DateTime meto_FechaCreacion { get; set; }
        public int? meto_UserModificacion { get; set; }
        public DateTime? meto_FechaModificacion { get; set; }
        public bool? meto_Estado { get; set; }
    }
}

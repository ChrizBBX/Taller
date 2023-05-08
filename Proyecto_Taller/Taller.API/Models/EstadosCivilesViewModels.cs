using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taller.API.Models
{
    public class EstadosCivilesViewModels
    {
        public int estacivi_ID { get; set; }
        public string estacivi_Nombre { get; set; }
        public int estacivi_UserCreacion { get; set; }
        public DateTime estacivi_FechaCreacion { get; set; }
        public int? estacivi_UserModificacion { get; set; }
        public DateTime? estacivi_FechaModificacion { get; set; }
        public bool? estacivi_Estado { get; set; }

    }
}

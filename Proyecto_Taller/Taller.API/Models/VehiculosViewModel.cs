using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taller.API.Models
{
    public class VehiculosViewModel
    {
        public int vehi_ID { get; set; }
        public int mode_ID { get; set; }
        public string vehi_Matricula { get; set; }
        public string vehi_anio { get; set; }
        public DateTime? vehi_FechaCreacion { get; set; }
        public int? vehi_UserCreacion { get; set; }
        public DateTime? vehi_FechaModificacion { get; set; }
        public int? vehi_UserModificacion { get; set; }
        public bool? vehi_Estado { get; set; }
    }
}

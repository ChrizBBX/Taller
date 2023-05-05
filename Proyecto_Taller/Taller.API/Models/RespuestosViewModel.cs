using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taller.API.Models
{
    public class RespuestosViewModel
    {
        public int resp_ID { get; set; }
        public string resp_Descripcion { get; set; }
        public decimal resp_Precio { get; set; }
        public int prov_ID { get; set; }
        public int marc_ID { get; set; }
        public string resp_Anio { get; set; }
        public DateTime? resp_FechaCreacion { get; set; }
        public int? resp_UserCreacion { get; set; }
        public DateTime? resp_FechaModificacion { get; set; }
        public int? resp_UserModificacion { get; set; }
        public bool? resp_Estado { get; set; }
    }
}

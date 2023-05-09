using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taller.API.Models
{
    public class ServiciosViewModel
    {
        public int serv_ID { get; set; }
        public string serv_Descripcion { get; set; }
        public decimal? serv_Precio { get; set; }
        public DateTime? serv_FechaCreacion { get; set; }
        public int? serv_UserCreacion { get; set; }
        public DateTime? serv_FechaModificacion { get; set; }
        public int? serv_UserModificacion { get; set; }
        public bool? serv_Estado { get; set; }
    }
}

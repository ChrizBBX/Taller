using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taller.API.Models
{
    public class VentasDetallesViewModel
    {
        public int deve_ID { get; set; }
        public int vent_ID { get; set; }
        public int? vehi_ID { get; set; }
        public int? serv_ID { get; set; }
        public int? resp_ID { get; set; }
        public int deve_Cantidad { get; set; }
        public decimal deve_Precioventa { get; set; }
        public int deve_UserCreacion { get; set; }
        public DateTime? deve_FechaCreacion { get; set; }
        public int? deve_UserModificacion { get; set; }
        public DateTime? deve_FechaModificacion { get; set; }
    }
}

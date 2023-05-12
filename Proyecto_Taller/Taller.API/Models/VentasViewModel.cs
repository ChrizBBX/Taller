using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taller.API.Models
{
    public class VentasViewModel
    {
        public int vent_Id { get; set; }
        public DateTime vent_Fecha { get; set; }
        public int clie_ID { get; set; }
        public decimal? vent_Descuento { get; set; }
        public decimal? vent_MontoFinal { get; set; }
        public int sucu_ID { get; set; }
        public int vent_UserCreacion { get; set; }
        public DateTime? vent_FechaCreacion { get; set; }
        public int? vent_UserModificacion { get; set; }
        public DateTime? vent_FechaModificacion { get; set; }
        public int? meto_ID { get; set; }
        public int? vehi_ID { get; set; }
    }
}

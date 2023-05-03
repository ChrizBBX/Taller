using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taller.API.Models
{
    public class MarcasViewModel
    {
        public int marc_ID { get; set; }
        public string marc_Nombre { get; set; }
        public DateTime? marc_FechaCreacion { get; set; }
        public int? marc_UserCreacion { get; set; }
        public DateTime? marc_FechaModificacion { get; set; }
        public int? marc_UserModificacion { get; set; }
        public bool? marc_Estado { get; set; }
    }
}

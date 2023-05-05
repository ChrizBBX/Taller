using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taller.API.Models
{
    public class ModelosViewModel
    {
        public int mode_ID { get; set; }
        public int marc_ID { get; set; }
        public string mode_Nombre { get; set; }
        public DateTime? mode_FechaCreacion { get; set; }
        public int? mode_UserCreacion { get; set; }
        public DateTime? mode_FechaModificacion { get; set; }
        public int? mode_UserModificacion { get; set; }
        public bool? mode_Estado { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taller.API.Models
{
    public class ClientesViewModel
    {
        public int clie_ID { get; set; }
        public string clie_Nombres { get; set; }
        public string clie_Apellidos { get; set; }
        public string clie_Sexo { get; set; }
        public DateTime clie_FechaNacimiento { get; set; }
        public string clie_Telefono { get; set; }
        public string clie_CorreoElectronico { get; set; }
        public string muni_ID { get; set; }
        public DateTime? clie_FechaCreacion { get; set; }
        public int? clie_UserCreacion { get; set; }
        public DateTime? clie_FechaModificacion { get; set; }
        public int? clie_UserModificacion { get; set; }
        public bool? clie_Estado { get; set; }
    }
}

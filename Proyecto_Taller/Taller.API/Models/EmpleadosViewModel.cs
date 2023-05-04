using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taller.API.Models
{
    public class EmpleadosViewModel
    {
        public string empe_Nombres { get; set; }
        public string empe_Apellidos { get; set; }
        public string empe_Identidad { get; set; }
        public DateTime empe_FechaNacimiento { get; set; }
        public string empe_Sexo { get; set; }
        public int estacivi_Id { get; set; }
        public string muni_Id { get; set; }
        public string empe_Direccion { get; set; }
        public string empe_Telefono { get; set; }
        public string empe_CorreoElectronico { get; set; }
        public int sucu_Id { get; set; }
    }
}

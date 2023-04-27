using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taller.DataAccess.Repositories
{
    public class ScriptsDataBase
    {
        public static string UDP_Usuarios_Select = "acce.UDP_tbUsuarios_VW";

        #region 
        public static string UDP_tbEstadosCiviles_VW = "gral.UDP_tbEstadosCiviles_VW";
        #endregion

        public static string UDP_tbMetodosPago_VW = "gral.UDP_tbMetodosPago_VW";


        public static string UDP_UDP_tbClientes_VW = "tllr.UDP_tbClientes_VW";


        public static string UDP_tbMarcas_VW = "tllr.UDP_tbModelos_VW";

    }
}

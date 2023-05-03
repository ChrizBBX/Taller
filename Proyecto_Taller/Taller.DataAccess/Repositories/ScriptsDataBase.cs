using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taller.DataAccess.Repositories
{
    public class ScriptsDataBase
    {

        #region Usuarios
        public static string UDP_Usuarios_Select = "acce.UDP_tbUsuarios_VW";
        #endregion

        #region Ventas
        public static string UDP_Ventas_Select = "tllr.UDP_tbVentas_VW";
        #endregion

        #region Vehiculos
        public static string UDP_Vehiculos_Select = "tllr.UDP_tbVehiculos_VW";
        #endregion

        #region Sucursales
        public static string UDP_Sucursales_Select = "tllr.UDP_tbSucursales_VW";
        #endregion

        #region Servicios
        public static string UDP_Servicios_Select = "tllr.UDP_tbServicios_VW";
        #endregion

        #region Repuestos
        public static string UDP_Repuestos_Select = "tllr.UDP_tbRepuestos_VW";
        #endregion

        #region Proveedores
        public static string UDP_Proveedores_Select = "tllr.UDP_tbProveedores_VW";
        #endregion

        #region Compras
        public static string UDP_tbCompras_Select = "tllr.UDP_tbCompras_VW";
        #endregion

        #region Empleados
        public static string UDP_tbEmpleados_Select = "tllr.UDP_tbEmpleados_VW";
        #endregion

        #region Modelos
        public static string UDP_Modelos_Select = "tllr.UDP_tbModelos_VW";
        #endregion

        #region Estados Civiles
        public static string UDP_tbEstadosCiviles_VW = "gral.UDP_tbEstadosCiviles_VW";
        #endregion

        #region MetodosPago
        public static string UDP_tbMetodosPago_VW = "gral.UDP_tbMetodosPago_VW";
        #endregion
   
        #region  Clientes
public static string UDP_UDP_tbClientes_VW = "tllr.UDP_tbClientes_VW";
#endregion
        
        #region  Marcas
        public static string UDP_tbMarcas_VW = "tllr.UDP_tbModelos_VW";
        #endregion

        #region Municipios
        public static string ListarMunicipiosPorDepto = "GRAL.UDP_tbMunicipios_LlenarMunicipiosPorDepto";
        #endregion

        #region Departamentos
        public static string LlenarDepartamentos = "GRAL.UDP_tbDepartamentos_LlenarDepartamentos";
        #endregion
    }
}

﻿using System;
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
        public static string UDP_Login = "UDP_Login";
        #endregion

        #region Ventas
        public static string UDP_Ventas_Select = "tllr.UDP_tbVentas_VW";
        public static string UDP_Ventas_Insert = "tllr.UDP_tbVentas_Insert";
        #endregion

        #region DetallesVentas
        public static string UDP_tbDetallesventas_Select = "tllr.UDP_tbDetallesventas_VW";
        #endregion

        #region Vehiculos
        public static string UDP_Vehiculos_Select = "tllr.UDP_tbVehiculos_VW";
        public static string UDP_Vehiculos_Insert = "tllr.UDP_tbVehiculos_Insert";
        public static string UDP_Vehiculos_Update = "tllr.UDP_tbVehiculos_Update";
        public static string UDP_Vehiculos_Delete = "tllr.UDP_tbVehiculos_Delete";
        #endregion

        #region Sucursales
        public static string UDP_Sucursales_Select = "tllr.UDP_tbSucursales_VW";
        public static string UDP_Sucursales_Insert = "tllr.UDP_tbSucursales_Insert";
        public static string UDP_Sucursales_Update = "tllr.UDP_tbSucursales_Update";
        public static string UDP_Sucursales_Delete = "tllr.UDP_tbSucursales_Delete";
        #endregion

        #region Servicios
        public static string UDP_Servicios_Select = "tllr.UDP_tbServicios_VW";
        public static string UDP_Servicios_Insert = "tllr.UDP_tbServicios_Insert";
        public static string UDP_Servicios_Update = "tllr.UDP_tbServicios_Update";
        public static string UDP_Servicios_Delete = "tllr.UDP_tbServicios_Delete";
        #endregion

        #region Repuestos
        public static string UDP_Repuestos_Select = "tllr.UDP_tbRepuestos_VW";
        public static string UDP_Repuestos_Insert = "tllr.UDP_tbRepuestos_Insert";
        public static string UDP_Repuestos_Update = "tllr.UDP_tbRespuestos_Udpate";
        public static string UDP_Repuestos_Delete = "tllr.UDP_tbRepuestos_Delete";
        #endregion

        #region Proveedores
        public static string UDP_Proveedores_Select = "tllr.UDP_tbProveedores_VW";
        public static string UDP_Proveedores_Insert = "tllr.UDP_tbProveedores_Insert";
        public static string UDP_Proveedores_Update = "tllr.UDP_tbProveedores_Update";
        public static string UDP_Proveedores_Delete = "tllr.UDP_tbProveedores_Delete";
        #endregion

        #region Compras
        public static string UDP_tbCompras_Select = "tllr.UDP_tbCompras_VW";
        #endregion

        #region Empleados
        public static string UDP_tbEmpleados_Select = "tllr.UDP_tbEmpleados_VW";
        public static string AgregarEmpleados = "tllr.UDP_tbEmpleado_InsertarEmpleados";
        public static string ListaEmpleados = "tllr.UDP_tbEmpleado_ListarEmpleados";
        #endregion

        #region Modelos
        public static string UDP_Modelos_Select = "tllr.UDP_tbModelos_VW";
        public static string UDP_Modelos_Insert = "tllr.UDP_tbModelos_Insert";
        public static string UDP_Modelos_Update = "tllr.UDP_tbModelos_Update";
        public static string UDP_Modelos_Delete = "tllr.UDP_tbModelos_Delete";
        #endregion

        #region Estados Civiles
        public static string UDP_tbEstadosCiviles_VW = "gral.UDP_tbEstadosCiviles_VW";
        public static string UDP_tbEstadosCiviles_Insert = "gral.UDP_tbEstadosCiviles_Insert";
        public static string UDP_tbEstadosCiviles_Update = "gral.UDP_tbEstadosCiviles_Update";
        public static string UDP_tbEstadosCiviles_Delete = "gral.UDP_tbEstadosCiviles_Delete";
        #endregion

        #region MetodosPago
        public static string UDP_tbMetodosPago_VW = "gral.UDP_tbMetodosPago_VW";
        public static string UDP_tbMetodosPago_Insert = "gral.UDP_tbMetodosdePago_Insert";
        public static string UDP_tbMetodosPago_Update = "gral.UDP_tbMetodosdePago_Update";
        public static string UDP_tbMetodosPago_Delete = "gral.UDP_tbMetodosPago_Delete";
        #endregion
   
        #region  Clientes
         public static string UDP_UDP_tbClientes_VW = "tllr.UDP_tbClientes_VW";
        #endregion
        
        #region  Marcas
        public static string UDP_tbMarcas_VW = "tllr.UDP_tbMarcas_VW";
        public static string UDP_tbMarcas_Insert = "tllr.UDP_tbMarcas_Insert";
        public static string UDP_tbMarcas_Update = "tllr.UDP_tbMarcas_Update";
        public static string UDP_tbMarcas_Delete = "tllr.UDP_tbMarcas_Delete";
        #endregion

        #region Municipios
        public static string ListarMunicipiosPorDepto = "GRAL.UDP_tbMunicipios_LlenarMunicipiosPorDepto";
        #endregion

        #region Departamentos
        public static string LlenarDepartamentos = "GRAL.UDP_tbDepartamentos_LlenarDepartamentos";
        #endregion

        #region Roles
        public static string ListarRoles = "tllr.UDP_tbRoles_ListarRoles";
        #endregion
    }
}

﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Taller.Entities.Entities
{
    public partial class tbUsuarios
    {
        public tbUsuarios()
        {
            Inverseuser_UserCreacionNavigation = new HashSet<tbUsuarios>();
            Inverseuser_UserModificacionNavigation = new HashSet<tbUsuarios>();
            tbClientePorVehiculoclvh_UserCreacionNavigation = new HashSet<tbClientePorVehiculo>();
            tbClientePorVehiculoclvh_UserModificacionNavigation = new HashSet<tbClientePorVehiculo>();
            tbClientesclie_UserCreacionNavigation = new HashSet<tbClientes>();
            tbClientesclie_UserModificacionNavigation = new HashSet<tbClientes>();
            tbComprascomp_UserCreacionNavigation = new HashSet<tbCompras>();
            tbComprascomp_UserModificacionNavigation = new HashSet<tbCompras>();
            tbDepartamentosdepa_UserCreacionNavigation = new HashSet<tbDepartamentos>();
            tbDepartamentosdepa_UserModificacionNavigation = new HashSet<tbDepartamentos>();
            tbDetallesComprasdeco_UserCreacionNavigation = new HashSet<tbDetallesCompras>();
            tbDetallesComprasdeco_UserModificacionNavigation = new HashSet<tbDetallesCompras>();
            tbDetallesventasdeve_UserCreacionNavigation = new HashSet<tbDetallesventas>();
            tbDetallesventasdeve_UserModificacionNavigation = new HashSet<tbDetallesventas>();
            tbEmpleadosempe_UsuCreacionNavigation = new HashSet<tbEmpleados>();
            tbEmpleadosempe_UsuModificacionNavigation = new HashSet<tbEmpleados>();
            tbEstadosCivilesestacivi_UserCreacionNavigation = new HashSet<tbEstadosCiviles>();
            tbEstadosCivilesestacivi_UserModificacionNavigation = new HashSet<tbEstadosCiviles>();
            tbMarcasmarc_UserCreacionNavigation = new HashSet<tbMarcas>();
            tbMarcasmarc_UserModificacionNavigation = new HashSet<tbMarcas>();
            tbMetodosPagometo_UserCreacionNavigation = new HashSet<tbMetodosPago>();
            tbMetodosPagometo_UserModificacionNavigation = new HashSet<tbMetodosPago>();
            tbModelosmode_UserCreacionNavigation = new HashSet<tbModelos>();
            tbModelosmode_UserModificacionNavigation = new HashSet<tbModelos>();
            tbMunicipiosmuni_UserCreacionNavigation = new HashSet<tbMunicipios>();
            tbMunicipiosmuni_UserModificacionNavigation = new HashSet<tbMunicipios>();
            tbPantallasPorRolespantrole_UserCreacionNavigation = new HashSet<tbPantallasPorRoles>();
            tbPantallasPorRolespantrole_UserModificacionNavigation = new HashSet<tbPantallasPorRoles>();
            tbProveedoresprov_UserCreacionNavigation = new HashSet<tbProveedores>();
            tbProveedoresprov_UserModificacionNavigation = new HashSet<tbProveedores>();
            tbRepuestosresp_UserCreacionNavigation = new HashSet<tbRepuestos>();
            tbRepuestosresp_UserModificacionNavigation = new HashSet<tbRepuestos>();
            tbRolesrole_UserCreacionNavigation = new HashSet<tbRoles>();
            tbRolesrole_UserModificacionNavigation = new HashSet<tbRoles>();
            tbServiciosserv_UserCreacionNavigation = new HashSet<tbServicios>();
            tbServiciosserv_UserModificacionNavigation = new HashSet<tbServicios>();
            tbSucursalessucu_UserCreacionNavigation = new HashSet<tbSucursales>();
            tbSucursalessucu_UserModificacionNavigation = new HashSet<tbSucursales>();
            tbVehiculosvehi_UserCreacionNavigation = new HashSet<tbVehiculos>();
            tbVehiculosvehi_UserModificacionNavigation = new HashSet<tbVehiculos>();
            tbVentasvent_UserCreacionNavigation = new HashSet<tbVentas>();
            tbVentasvent_UserModificacionNavigation = new HashSet<tbVentas>();
        }

        public int user_ID { get; set; }
        public string user_NombreUsuario { get; set; }
        public string user_Contrasena { get; set; }
        public bool? user_EsAdmin { get; set; }
        public int? role_ID { get; set; }
        public int? empe_ID { get; set; }
        public int? user_UserCreacion { get; set; }
        public DateTime user_FechaCreacion { get; set; }
        public int? user_UserModificacion { get; set; }
        public DateTime? user_FechaModificacion { get; set; }
        public bool? user_Estado { get; set; }

        public virtual tbEmpleados empe { get; set; }
        public virtual tbRoles role { get; set; }
        public virtual tbUsuarios user_UserCreacionNavigation { get; set; }
        public virtual tbUsuarios user_UserModificacionNavigation { get; set; }
        public virtual ICollection<tbUsuarios> Inverseuser_UserCreacionNavigation { get; set; }
        public virtual ICollection<tbUsuarios> Inverseuser_UserModificacionNavigation { get; set; }
        public virtual ICollection<tbClientePorVehiculo> tbClientePorVehiculoclvh_UserCreacionNavigation { get; set; }
        public virtual ICollection<tbClientePorVehiculo> tbClientePorVehiculoclvh_UserModificacionNavigation { get; set; }
        public virtual ICollection<tbClientes> tbClientesclie_UserCreacionNavigation { get; set; }
        public virtual ICollection<tbClientes> tbClientesclie_UserModificacionNavigation { get; set; }
        public virtual ICollection<tbCompras> tbComprascomp_UserCreacionNavigation { get; set; }
        public virtual ICollection<tbCompras> tbComprascomp_UserModificacionNavigation { get; set; }
        public virtual ICollection<tbDepartamentos> tbDepartamentosdepa_UserCreacionNavigation { get; set; }
        public virtual ICollection<tbDepartamentos> tbDepartamentosdepa_UserModificacionNavigation { get; set; }
        public virtual ICollection<tbDetallesCompras> tbDetallesComprasdeco_UserCreacionNavigation { get; set; }
        public virtual ICollection<tbDetallesCompras> tbDetallesComprasdeco_UserModificacionNavigation { get; set; }
        public virtual ICollection<tbDetallesventas> tbDetallesventasdeve_UserCreacionNavigation { get; set; }
        public virtual ICollection<tbDetallesventas> tbDetallesventasdeve_UserModificacionNavigation { get; set; }
        public virtual ICollection<tbEmpleados> tbEmpleadosempe_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbEmpleados> tbEmpleadosempe_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbEstadosCiviles> tbEstadosCivilesestacivi_UserCreacionNavigation { get; set; }
        public virtual ICollection<tbEstadosCiviles> tbEstadosCivilesestacivi_UserModificacionNavigation { get; set; }
        public virtual ICollection<tbMarcas> tbMarcasmarc_UserCreacionNavigation { get; set; }
        public virtual ICollection<tbMarcas> tbMarcasmarc_UserModificacionNavigation { get; set; }
        public virtual ICollection<tbMetodosPago> tbMetodosPagometo_UserCreacionNavigation { get; set; }
        public virtual ICollection<tbMetodosPago> tbMetodosPagometo_UserModificacionNavigation { get; set; }
        public virtual ICollection<tbModelos> tbModelosmode_UserCreacionNavigation { get; set; }
        public virtual ICollection<tbModelos> tbModelosmode_UserModificacionNavigation { get; set; }
        public virtual ICollection<tbMunicipios> tbMunicipiosmuni_UserCreacionNavigation { get; set; }
        public virtual ICollection<tbMunicipios> tbMunicipiosmuni_UserModificacionNavigation { get; set; }
        public virtual ICollection<tbPantallasPorRoles> tbPantallasPorRolespantrole_UserCreacionNavigation { get; set; }
        public virtual ICollection<tbPantallasPorRoles> tbPantallasPorRolespantrole_UserModificacionNavigation { get; set; }
        public virtual ICollection<tbProveedores> tbProveedoresprov_UserCreacionNavigation { get; set; }
        public virtual ICollection<tbProveedores> tbProveedoresprov_UserModificacionNavigation { get; set; }
        public virtual ICollection<tbRepuestos> tbRepuestosresp_UserCreacionNavigation { get; set; }
        public virtual ICollection<tbRepuestos> tbRepuestosresp_UserModificacionNavigation { get; set; }
        public virtual ICollection<tbRoles> tbRolesrole_UserCreacionNavigation { get; set; }
        public virtual ICollection<tbRoles> tbRolesrole_UserModificacionNavigation { get; set; }
        public virtual ICollection<tbServicios> tbServiciosserv_UserCreacionNavigation { get; set; }
        public virtual ICollection<tbServicios> tbServiciosserv_UserModificacionNavigation { get; set; }
        public virtual ICollection<tbSucursales> tbSucursalessucu_UserCreacionNavigation { get; set; }
        public virtual ICollection<tbSucursales> tbSucursalessucu_UserModificacionNavigation { get; set; }
        public virtual ICollection<tbVehiculos> tbVehiculosvehi_UserCreacionNavigation { get; set; }
        public virtual ICollection<tbVehiculos> tbVehiculosvehi_UserModificacionNavigation { get; set; }
        public virtual ICollection<tbVentas> tbVentasvent_UserCreacionNavigation { get; set; }
        public virtual ICollection<tbVentas> tbVentasvent_UserModificacionNavigation { get; set; }
    }
}
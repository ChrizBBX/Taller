using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.DataAccess.Repositories;
using Taller.Entities.Entities;

namespace Taller.BusinessLogic.Services
{
    public class TallerServices
    {
        private readonly VehiculosRepository _vehiculosrepository;
        private readonly SucursalesRepository _sucursalesrepository;
        private readonly ServiciosRepository _serviciosRepository;
        private readonly RepuestosRepository _repuestosrepository;
        private readonly ProveedoresRepository _proveedoresrepository;
        private readonly ModelosRepository _modelosrepository;
        private readonly ClientesRepository _clientesRepository;
        private readonly MarcasRepository _marcasRepository;
        private readonly EmpleadosRepository _empleadosRepository;
        private readonly ComprasRepository _comprasRepository;
        private readonly DetallesVentaRepository _detallesventarepository;
        private readonly VentasRepository _ventasrepository;


        public TallerServices(
            VehiculosRepository vehiculosrepository,
            SucursalesRepository sucursalesrepository,
            ServiciosRepository serviciosrepository,
            RepuestosRepository repuestosrepository,
            ProveedoresRepository proveedoresrepository,
            ModelosRepository modelosrepository,
            ClientesRepository clientesRepository, 
            MarcasRepository marcasRepository,
            EmpleadosRepository empleadosRepository,
            ComprasRepository comprasRepository,
            DetallesVentaRepository detallesventarepository,
            VentasRepository ventasrepository)
        {
            _vehiculosrepository = vehiculosrepository;
            _sucursalesrepository = sucursalesrepository;
            _serviciosRepository = serviciosrepository;
            _repuestosrepository = repuestosrepository;
            _proveedoresrepository = proveedoresrepository;
            _modelosrepository = modelosrepository;
            _clientesRepository = clientesRepository;
            _marcasRepository = marcasRepository;
            _empleadosRepository = empleadosRepository;
            _comprasRepository = comprasRepository;
            _ventasrepository = ventasrepository;
            _detallesventarepository = detallesventarepository;
        }

        #region Empleados
        public IEnumerable<VW_tbEmpleados> ListadoEmpleados()
        {
            try
            {
                return _empleadosRepository.List();
            }
            catch (Exception e)
            {

                return Enumerable.Empty<VW_tbEmpleados>();
            }
        }

        public IEnumerable<tbEmpleados> ListarEmpleados()
        {
            try
            {
                var list = _empleadosRepository.ListarEmpleados();
                return list;
            }
            catch (Exception ex)
            {

                return Enumerable.Empty<tbEmpleados>();
            }
        }

        public ServiceResult AgregarEmpleado(tbEmpleados item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _empleadosRepository.Insert(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else if (insertar.MessageStatus == "2")
                {
                    return result.Conflict(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public ServiceResult EditarEmpleados(tbEmpleados item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _empleadosRepository.Update(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else if (insertar.MessageStatus == "2")
                {
                    return result.Conflict(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public ServiceResult EliminarEmpleados(tbEmpleados item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _empleadosRepository.Delete(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }
        #endregion

        #region Clientes
        public IEnumerable<VW_tbClientes> ListadoClientes()
        {
            try
            {
                return _clientesRepository.List();
            }
            catch (Exception e)
            {

                return Enumerable.Empty<VW_tbClientes>();
            }
        }

        public ServiceResult InsertarClientes(tbClientes item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _clientesRepository.Insert(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public ServiceResult EditarClientes(tbClientes item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _clientesRepository.Update(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public ServiceResult EliminarClientes(tbClientes item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _clientesRepository.Delete(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }
        #endregion

        #region Marcas
        public IEnumerable<VW_tbMarcas> ListadoMarcas()
        {
            try
            {
                return _marcasRepository.List();
            }
            catch (Exception e)
            {

                return Enumerable.Empty<VW_tbMarcas>();
            }

        }

        public ServiceResult InsertarMarcas(tbMarcas item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _marcasRepository.Insert(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else if (insertar.MessageStatus == "2")
                {
                    return result.Conflict(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }

            }
            catch (Exception e)
            {

                throw;
            }
        }

        public ServiceResult EditarMarcas(tbMarcas item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _marcasRepository.Update(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else if (insertar.MessageStatus == "2")
                {
                    return result.Conflict(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }

            }
            catch (Exception e)
            {

                throw;
            }
        }

        public ServiceResult EliminarMarcas(tbMarcas item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _marcasRepository.Delete(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }else if (insertar.MessageStatus == "3")
                {
                    return result.Conflict(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }

            }
            catch (Exception e)
            {

                throw;
            }
        }

        #endregion

        #region DetallesVentas
        public IEnumerable<VW_tbDetallesventas> ListadoDetallesVentas()
        {
            try
            {
                return _detallesventarepository.List();
            }
            catch (Exception e)
            {
                return Enumerable.Empty<VW_tbDetallesventas>();
            }
        }

        public IEnumerable<VW_tbDetallesventas> ListadoDetallesVentasTemporal(int id)
        {
            try
            {
                return _detallesventarepository.ListTemp(id);
            }
            catch (Exception e)
            {
                return Enumerable.Empty<VW_tbDetallesventas>();
            }
        }

        public IEnumerable<VW_tbDetallesventas> ListadoDetallesPorID(int id)
        {
            try
            {
                return _detallesventarepository.ListById(id);
            }
            catch (Exception e)
            {
                return Enumerable.Empty<VW_tbDetallesventas>();
            }
        }

        public ServiceResult InsertarVentasDetalles(tbDetallesventas item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _detallesventarepository.Insert(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else if (insertar.MessageStatus == "2")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public ServiceResult EliminarVentasDetalles(VW_tbDetallesventas item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _detallesventarepository.Delete(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else if (insertar.MessageStatus == "2")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }
        #endregion

        #region Ventas
        public IEnumerable<VW_tbVentas> ListadoVentas()
        {
            try
            {
                return _ventasrepository.List();
            }
            catch (Exception e)
            {

                return Enumerable.Empty<VW_tbVentas>();
            }
        }

        public ServiceResult InsertarVentas(tbVentas item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _ventasrepository.Insert(item);
                if (Convert.ToInt32(insertar.CodeStatus) > 0 )
                {
                    return result.Ok(insertar.CodeStatus.ToString());
                }
                else
                {
                    return result.BadRequest(insertar.CodeStatus.ToString());
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }
        #endregion

        #region Vehiculos
        public IEnumerable<VW_tbVehiculos> ListadoVehiculos()
        {
            try
            {
                return _vehiculosrepository.List();
            }
            catch (Exception e)
            {

                return Enumerable.Empty<VW_tbVehiculos>();
            }
        }

        public IEnumerable<vwClientesConMasVehiculos> ClientesConMasVehiculos()
        {
            try
            {
                return _vehiculosrepository.ClientesConMasVehiculos();
            }
            catch (Exception e)
            {

                return Enumerable.Empty<vwClientesConMasVehiculos>();
            }
        }

        public ServiceResult InsertarVehiculos(tbVehiculos item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _vehiculosrepository.Insert(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else if (insertar.MessageStatus == "2")
                {
                    return result.Conflict(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public ServiceResult EditarVehiculos(tbVehiculos item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _vehiculosrepository.Update(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else if (insertar.MessageStatus == "2")
                {
                    return result.Conflict(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public ServiceResult EliminarVehiculos(tbVehiculos item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _vehiculosrepository.Delete(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else if (insertar.MessageStatus == "3")
                {
                    return result.Conflict(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }
        #endregion

        #region Suursales
        public IEnumerable<VW_tbSucursales> ListadoSucursales()
        {
            try
            {
                return _sucursalesrepository.List();
            }
            catch (Exception e)
            {

                return Enumerable.Empty<VW_tbSucursales>();
            }
        }

        public ServiceResult InsertarSucursales(tbSucursales item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _sucursalesrepository.Insert(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else if (insertar.MessageStatus == "2")
                {
                    return result.Conflict(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public ServiceResult EditarSucursales(tbSucursales item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _sucursalesrepository.Update(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else if (insertar.MessageStatus == "2")
                {
                    return result.Conflict(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public ServiceResult EliminarSucursales(tbSucursales item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _sucursalesrepository.Delete(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }
        #endregion

        #region Servicios
        public IEnumerable<VW_tbServicios> ListadoServicios()
        {
            try
            {
                return _serviciosRepository.List();
            }
            catch (Exception e)
            {

                return Enumerable.Empty<VW_tbServicios>();
            }
        }

        public IEnumerable<VW_ServiciosMasSolicitados> ServiciosMasSolicitados()
        {
            try
            {
                return _serviciosRepository.ServiciosMasSolicitados();
            }
            catch (Exception e)
            {

                return Enumerable.Empty<VW_ServiciosMasSolicitados>();
            }
        }

        public ServiceResult InsertarServicios(tbServicios item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _serviciosRepository.Insert(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else if (insertar.MessageStatus == "2")
                {
                    return result.Conflict(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public ServiceResult EditarServicios(tbServicios item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _serviciosRepository.Update(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else if (insertar.MessageStatus == "2")
                {
                    return result.Conflict(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public ServiceResult EliminarServicios(tbServicios item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _serviciosRepository.Delete(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }
        #endregion

        #region Repuestos
        public IEnumerable<VW_tbRepuestos> ListadoRepuestos()
        {
            try
            {
                return _repuestosrepository.List();
            }
            catch (Exception e)
            {

                return Enumerable.Empty<VW_tbRepuestos>();
            }
        }

        public ServiceResult InsertarRepuestos(tbRepuestos item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _repuestosrepository.Insert(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else if (insertar.MessageStatus == "2")
                {
                    return result.Conflict(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public ServiceResult EditarRepuestos(tbRepuestos item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _repuestosrepository.Update(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else if (insertar.MessageStatus == "2")
                {
                    return result.Conflict(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public ServiceResult EliminarRepuestos(tbRepuestos item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _repuestosrepository.Delete(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }
        #endregion

        #region Proveedores
        public IEnumerable<VW_tbProveedores> ListadoProveedores()
        {
            try
            {
                return _proveedoresrepository.List();
            }
            catch (Exception e)
            {

                return Enumerable.Empty<VW_tbProveedores>();
            }
        }

        public ServiceResult InsertarProveedores(tbProveedores item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _proveedoresrepository.Insert(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else if (insertar.MessageStatus == "2")
                {
                    return result.Conflict(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public ServiceResult EditarProveedores(tbProveedores item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _proveedoresrepository.Update(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else if (insertar.MessageStatus == "2")
                {
                    return result.Conflict(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public ServiceResult EliminarProveedores(tbProveedores item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _proveedoresrepository.Delete(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else if (insertar.MessageStatus == "3")
                {
                    return result.Conflict(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }
        #endregion

        #region Modelos
        public IEnumerable<VW_Modelos> ListadoModelos()
        {
            try
            {
                return _modelosrepository.List();
            }
            catch (Exception e)
            {

                return Enumerable.Empty<VW_Modelos>();
            }
        }

        public ServiceResult InsertarModelos(tbModelos item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _modelosrepository.Insert(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else if (insertar.MessageStatus == "2")
                {
                    return result.Conflict(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public ServiceResult EditarModelos(tbModelos item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _modelosrepository.Update(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else if (insertar.MessageStatus == "2")
                {
                    return result.Conflict(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public ServiceResult EliminarModelos(tbModelos item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _modelosrepository.Delete(item);
                if (insertar.MessageStatus == "1")
                {
                    return result.Ok(insertar.MessageStatus);
                }
                else
                {
                    return result.BadRequest(insertar.MessageStatus);
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }
        #endregion

        #region Compras
        public IEnumerable<VW_tbCompras> ListadoCompras()
        {
            try
            {
                return _comprasRepository.List();
            }
            catch (Exception e)
            {

                return Enumerable.Empty<VW_tbCompras>();
            }
        }
        #endregion
    }
}

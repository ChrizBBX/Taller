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
        private readonly VentasRepository _ventasrepository;
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

        public TallerServices(VentasRepository ventasrepository,
            VehiculosRepository vehiculosrepository,
            SucursalesRepository sucursalesrepository,
            ServiciosRepository serviciosrepository,
            RepuestosRepository repuestosrepository,
            ProveedoresRepository proveedoresrepository,
            ModelosRepository modelosrepository,
            ClientesRepository clientesRepository, 
            MarcasRepository marcasRepository,
            EmpleadosRepository empleadosRepository,
            ComprasRepository comprasRepository)
        {
            _ventasrepository = ventasrepository;
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

        public int AgregarEmpleado(tbEmpleados item)
        {
            var result = new ServiceResult();
            try
            {
                var Resultado = _empleadosRepository.AgregarEmpleado(item);
                if (Resultado != 0)
                {
                    return Resultado;
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception x)
            {
                return 0;
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

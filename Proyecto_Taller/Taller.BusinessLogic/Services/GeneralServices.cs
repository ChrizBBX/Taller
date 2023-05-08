using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.DataAccess.Repositories;
using Taller.Entities.Entities;

namespace Taller.BusinessLogic.Services
{
    public class GeneralServices
    {
        private readonly  EstadosCivilesRepository _estadosCivilesRepository;
        private readonly MetodosPagoRepository _metodosPagoRepository;
        private readonly MunicipiosRepositories _municipiosRepositories;
        private readonly DepartamentosRepositories _departamentosRepositories;


        public GeneralServices(EstadosCivilesRepository estadosCivilesRepository,
                               MetodosPagoRepository  metodosPagoRepository,
                               MunicipiosRepositories municipiosRepositories,
                               DepartamentosRepositories departamentosRepositories)
        {
            _estadosCivilesRepository = estadosCivilesRepository;
            _metodosPagoRepository = metodosPagoRepository;
            _municipiosRepositories = municipiosRepositories;
            _departamentosRepositories = departamentosRepositories;
        }

        #region Estados Civiles
        public IEnumerable<VW_tbEstadosCiviles> ListadoEstadosCiviles()
        {
            try
            {
                return _estadosCivilesRepository.List();
            }
            catch (Exception e)
            {

                return Enumerable.Empty<VW_tbEstadosCiviles>();
            }
        }

        public ServiceResult InsertarEstadosCiviles(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _estadosCivilesRepository.Insert(item);
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

        public ServiceResult EditarEstadosCiviles(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _estadosCivilesRepository.Update(item);
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

        public ServiceResult EliminarEstadosCiviles(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _estadosCivilesRepository.Delete(item);
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

        #region Metodos de Pago
        public IEnumerable<VW_tbMetodosPago> ListadoMetodosPagos()
        {
            try
            {
                return _metodosPagoRepository.List();
            }
            catch (Exception e)
            {

                return Enumerable.Empty<VW_tbMetodosPago>();
            }
        }
        #endregion

        #region Departamentos
        public IEnumerable<tbDepartamentos> ListarDepartamentos()
        {
            try
            {
                var list = _departamentosRepositories.ListarDepartamentos();
                return list;
            }
            catch (Exception ex)
            {

                return Enumerable.Empty<tbDepartamentos>();
            }
        }
        #endregion

        #region Municipios
        public IEnumerable<tbMunicipios> ListarMunicipiosPorDepto(string id)
        {
            try
            {
                var list = _municipiosRepositories.ListarMunicipiosPorDepto(id);
                return list;
            }
            catch (Exception ex)
            {

                return Enumerable.Empty<tbMunicipios>();
            }
        }
        #endregion

    }
}

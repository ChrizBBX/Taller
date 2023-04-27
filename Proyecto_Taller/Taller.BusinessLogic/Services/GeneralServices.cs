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

        public GeneralServices(EstadosCivilesRepository estadosCivilesRepository, MetodosPagoRepository  metodosPagoRepository)
        {
            _estadosCivilesRepository = estadosCivilesRepository;
            _metodosPagoRepository = metodosPagoRepository;
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
        #endregion


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

    }
}

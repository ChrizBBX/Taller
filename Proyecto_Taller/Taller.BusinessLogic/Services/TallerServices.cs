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
        private readonly ClientesRepository _clientesRepository;

        private readonly MarcasRepository _marcasRepository;


        public TallerServices(ClientesRepository clientesRepository, MarcasRepository marcasRepository)
        {
            _clientesRepository = clientesRepository;
            _marcasRepository = marcasRepository;
            
        }

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
    }
}

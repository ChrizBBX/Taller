using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.DataAccess.Repositories;
using Taller.Entities.Entities;

namespace Taller.BusinessLogic.Services
{
    public class AccesoServices
    {
        private readonly UsuariosRepository _usuariosrepository;
        public AccesoServices(UsuariosRepository usuariosrepository)
        {
            _usuariosrepository = usuariosrepository;
        }

        public IEnumerable<VW_tbUsuarios> ListadoUsuarios()
        {
            try
            {
                return _usuariosrepository.List();
            }
            catch (Exception e)
            {

                return Enumerable.Empty<VW_tbUsuarios>();
            }
        }
    }
}

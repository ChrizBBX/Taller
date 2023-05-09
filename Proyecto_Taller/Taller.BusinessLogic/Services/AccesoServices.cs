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
        private readonly RolesRepository _rolesRepository;
        public AccesoServices(UsuariosRepository usuariosrepository, RolesRepository rolesRepository)
        {
            _usuariosrepository = usuariosrepository;
            _rolesRepository = rolesRepository;
        }

        #region Usuarios
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
        #endregion

        #region Login
        public IEnumerable<VW_tbUsuarios> Login(VW_tbUsuarios item)
        {
            try
            {
                return _usuariosrepository.Login(item);
            }
            catch (Exception e)
            {
                return Enumerable.Empty<VW_tbUsuarios>();
            }
        }
        #endregion

        #region Roles
        public IEnumerable<tbRoles> ListarRoles()
        {
            try
            {
                var list = _rolesRepository.ListarRoles();
                return list;
            }
            catch (Exception ex)
            {

                return Enumerable.Empty<tbRoles>();
            }
        }
        #endregion
    }
}

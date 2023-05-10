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

        public ServiceResult InsertarUsuarios(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _usuariosrepository.Insert(item);
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

        public ServiceResult EditarUsuarios(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _usuariosrepository.Update(item);
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

        public ServiceResult EliminarUsuarios(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _usuariosrepository.Delete(item);
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

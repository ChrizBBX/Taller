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
        private readonly RolesRepository _rolesrepository;
        public AccesoServices(UsuariosRepository usuariosrepository,
            RolesRepository rolesrepository)
        {
            _usuariosrepository = usuariosrepository;
            _rolesrepository = rolesrepository;
        }

        #region Usuario 
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
        public IEnumerable<VW_tbRoles> ListadoRoles()
        {
            try
            {
                return _rolesrepository.List();
            }
            catch (Exception e)
            {
                return Enumerable.Empty<VW_tbRoles>();
            }
        }

        public ServiceResult InsertarRoles(tbRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _rolesrepository.Insert(item);
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

        public ServiceResult EditarRoles(tbRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _rolesrepository.Update(item);
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

        public ServiceResult EliminarRoles(tbRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _rolesrepository.Delete(item);
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
        #endregion
    }
}

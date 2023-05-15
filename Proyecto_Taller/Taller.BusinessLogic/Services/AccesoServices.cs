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
        private readonly RolesRepository _rolesrepository;
        private readonly PantallasRepository _pantallasrepository;
        private readonly RolesPorPantallaRepository _rolesporpantallarepository;
        private readonly UsuariosRepository _usuariosrepository;
        public AccesoServices(UsuariosRepository usuariosrepository,
            RolesRepository rolesrepository,
            PantallasRepository pantallasrepository,
            RolesPorPantallaRepository rolesporpantallarepository)
        {
            _usuariosrepository = usuariosrepository;
            _rolesrepository = rolesrepository;
            _pantallasrepository = pantallasrepository;
            _rolesporpantallarepository = rolesporpantallarepository;
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

        public ServiceResult RecoverUsuario(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _usuariosrepository.Recover(item);
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
        public IEnumerable<VW_tbRoles> ListarRoles()
        {
            try
            {
                var list = _rolesrepository.List();
                return list;
            }
            catch (Exception ex)
            {

                return Enumerable.Empty<VW_tbRoles>();
            }
        }
        #endregion
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

        #region Pantallas
        public IEnumerable<tbPantallas> ListadoPantallas()
        {
            try
            {
                return _pantallasrepository.List();
            }
            catch (Exception e)
            {
                return Enumerable.Empty<tbPantallas>();
            }
        }
        #endregion

        #region RolesXPantalla
        public ServiceResult InsertarRolesXPantalla(tbPantallasPorRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _rolesporpantallarepository.Insert(item);
                if (Convert.ToInt32(insertar.CodeStatus) > 0)
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

        public IEnumerable<VW_tbPantallasPorRoles> ListadoRolesPorPantallaByRoleID(int id)
        {
            try
            {
                return _rolesporpantallarepository.List(id);
            }
            catch (Exception e)
            {
                return Enumerable.Empty<VW_tbPantallasPorRoles>();
            }
        }


        public IEnumerable<VW_tbPantallasPorRoles> menu(int id, bool esadmin)
        {
            try
            {
                return _rolesporpantallarepository.Menu(id, esadmin);
            }
            catch (Exception e)
            {
                return Enumerable.Empty<VW_tbPantallasPorRoles>();
            }
        }

        public ServiceResult EliminarRolesXPantalla(tbPantallasPorRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var insertar = _rolesporpantallarepository.Delete(item);
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

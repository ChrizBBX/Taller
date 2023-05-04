using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.Entities.Entities;

namespace Taller.DataAccess.Repositories
{
    public class UsuariosRepository : IRepository<tbUsuarios, VW_tbUsuarios>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_tbUsuarios Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbUsuarios item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbUsuarios> List()
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbUsuarios>(ScriptsDataBase.UDP_Usuarios_Select, null, commandType: CommandType.StoredProcedure);
        }

        public IEnumerable<VW_tbUsuarios> Login(VW_tbUsuarios item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@user_Nombre", item.user_NombreUsuario, DbType.String, ParameterDirection.Input);
            parametros.Add("@user_Contrasena", item.user_Contrasena, DbType.String, ParameterDirection.Input);
            return db.Query<VW_tbUsuarios>(ScriptsDataBase.UDP_Login, parametros, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbUsuarios item)
        {
            throw new NotImplementedException();
        }
    }
}

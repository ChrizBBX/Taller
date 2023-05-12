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
    public class RolesPorPantallaRepository : IRepository<tbPantallasPorRoles, VW_tbPantallasPorRoles>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public tbPantallasPorRoles Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbPantallasPorRoles item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus(); 
            var parametros = new DynamicParameters();
            parametros.Add("@role_ID", item.role_ID, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@pant_ID", item.pant_ID, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@pantrole_UserCreacion", 1, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<int>(ScriptsDataBase.UDP_tbPantallaPorRoles_Insert, parametros, commandType: CommandType.StoredProcedure);

            result.CodeStatus = answer;
            return result;
        }


        public IEnumerable<VW_tbPantallasPorRoles> List(int id)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@role_ID", id, DbType.Int32, ParameterDirection.Input);
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            return db.Query<VW_tbPantallasPorRoles>(ScriptsDataBase.UDP_tbPantallaPorRoles_SelectByRoleID, parameters, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbPantallasPorRoles item)
        {
            throw new NotImplementedException();
        }

        VW_tbPantallasPorRoles IRepository<tbPantallasPorRoles, VW_tbPantallasPorRoles>.Find(int id)
        {
            throw new NotImplementedException();
        }

        IEnumerable<VW_tbPantallasPorRoles> IRepository<tbPantallasPorRoles, VW_tbPantallasPorRoles>.List()
        {
            throw new NotImplementedException();
        }
    }
}

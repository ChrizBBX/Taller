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
    public class RolesRepository : IRepository<tbRoles, VW_Modelos>
    {
        public IEnumerable<tbRoles> ListarRoles()
        {
            var parameters = new DynamicParameters();
            parameters.Add("@role_ID", null, DbType.String, ParameterDirection.Input);
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            return db.Query<tbRoles>(ScriptsDataBase.ListarRoles, parameters, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_Modelos Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbRoles item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_Modelos> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbRoles item)
        {
            throw new NotImplementedException();
        }
    }
}

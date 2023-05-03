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
    public class DepartamentosRepositories : IRepository<tbDepartamentos, VW_Modelos>
    {
        public IEnumerable<tbDepartamentos> ListarDepartamentos()
        {
            var parameters = new DynamicParameters();
            parameters.Add("@depa_ID", null, DbType.String, ParameterDirection.Input);
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            return db.Query<tbDepartamentos>(ScriptsDataBase.LlenarDepartamentos, parameters, commandType: CommandType.StoredProcedure);

        }
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_Modelos Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbDepartamentos item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_Modelos> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbDepartamentos item)
        {
            throw new NotImplementedException();
        }
    }
}

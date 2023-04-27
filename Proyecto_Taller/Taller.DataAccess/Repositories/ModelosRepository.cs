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
    public class ModelosRepository : IRepository<tbModelos, VW_Modelos>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_Modelos Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbModelos item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_Modelos> List()
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_Modelos>(ScriptsDataBase.UDP_Modelos_Select, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbModelos item)
        {
            throw new NotImplementedException();
        }
    }
}

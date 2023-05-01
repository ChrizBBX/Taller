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
    public class ComprasRepository : IRepository<tbCompras, VW_tbCompras>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_tbCompras Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbCompras item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbCompras> List()
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbCompras>(ScriptsDataBase.UDP_tbCompras_VW, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbCompras item)
        {
            throw new NotImplementedException();
        }
    }
}

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
    public class DetallesVentaRepository : IRepository<tbDetallesventas, VW_tbDetallesventas>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_tbDetallesventas Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbDetallesventas item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbDetallesventas> List()
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbDetallesventas>(ScriptsDataBase.UDP_tbDetallesventas_Select, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbDetallesventas item)
        {
            throw new NotImplementedException();
        }
    }
}

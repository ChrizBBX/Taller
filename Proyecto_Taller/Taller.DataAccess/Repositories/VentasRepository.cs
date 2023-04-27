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
    public class VentasRepository : IRepository<tbVentas, VW_tbVentas>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_tbVentas Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbVentas item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbVentas> List()
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbVentas>(ScriptsDataBase.UDP_Ventas_Select, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbVentas item)
        {
            throw new NotImplementedException();
        }
    }
}

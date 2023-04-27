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
    public class RepuestosRepository : IRepository<tbRepuestos, VW_tbRepuestos>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_tbRepuestos Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbRepuestos item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbRepuestos> List()
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbRepuestos>(ScriptsDataBase.UDP_Repuestos_Select, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbRepuestos item)
        {
            throw new NotImplementedException();
        }
    }
}

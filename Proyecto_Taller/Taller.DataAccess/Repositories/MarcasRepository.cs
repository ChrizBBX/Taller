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
    public class MarcasRepository : IRepository<tbMarcas, VW_tbMarcas>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_tbMarcas Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbMarcas item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbMarcas> List()
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbMarcas>(ScriptsDataBase.UDP_tbMarcas_VW, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbMarcas item)
        {
            throw new NotImplementedException();
        }
    }
}

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
    public class VehiculosRepository : IRepository<tbVehiculos, VW_tbVehiculos>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_tbVehiculos Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbVehiculos item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbVehiculos> List()
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbVehiculos>(ScriptsDataBase.UDP_Vehiculos_Select, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbVehiculos item)
        {
            throw new NotImplementedException();
        }
    }
}

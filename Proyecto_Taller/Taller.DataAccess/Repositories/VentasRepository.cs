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
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@clie_ID", item.clie_ID, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@meto_ID", item.meto_ID, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@sucu_ID", 1, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@vent_UserCreacion", 1, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<int>(ScriptsDataBase.UDP_Ventas_Insert, parametros, commandType: CommandType.StoredProcedure);

            result.CodeStatus = answer;
            return result;
        }

        TallerMecanicoContext con = new TallerMecanicoContext();
        public IEnumerable<VW_tbVentas> List()
        {
            return con.VW_tbVentas.AsList();
        }
      

        public RequestStatus Update(tbVentas item)
        {
            throw new NotImplementedException();
        }
    }
}

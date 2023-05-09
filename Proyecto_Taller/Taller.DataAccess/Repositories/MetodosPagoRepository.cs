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
    public class MetodosPagoRepository : IRepository<tbMetodosPago, VW_tbMetodosPago>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_tbMetodosPago Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbMetodosPago item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@meto_Nombre", item.meto_Nombre, DbType.String, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_tbMetodosPago_Insert, parametros, commandType: CommandType.StoredProcedure);

            result.MessageStatus = answer;
            return result;
        }

        public IEnumerable<VW_tbMetodosPago> List()
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbMetodosPago>(ScriptsDataBase.UDP_tbMetodosPago_VW, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbMetodosPago item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();

            parametros.Add("@meto_ID", item.meto_ID, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@meto_Nombre", item.meto_Nombre, DbType.String, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_tbMetodosPago_Update, parametros, commandType: CommandType.StoredProcedure);

            result.MessageStatus = answer;
            return result;
        }

        public RequestStatus Delete(tbMetodosPago item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();

            parametros.Add("@meto_ID", item.meto_ID, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_tbMetodosPago_Delete, parametros, commandType: CommandType.StoredProcedure);

            result.MessageStatus = answer;
            return result;
        }
    }
}

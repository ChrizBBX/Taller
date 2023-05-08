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
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@marc_ID", item.marc_ID, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@mode_Nombre", item.mode_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@mode_UserCreacion", 1, DbType.Int32, ParameterDirection.Input);
            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_Modelos_Insert, parametros, commandType: CommandType.StoredProcedure);

            result.MessageStatus = answer;
            return result;
        }

        public IEnumerable<VW_Modelos> List()
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_Modelos>(ScriptsDataBase.UDP_Modelos_Select, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbModelos item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@mode_ID", item.mode_ID, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@marc_ID", item.marc_ID, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@mode_Nombre", item.mode_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@mode_UserModificacion", 1, DbType.Int32, ParameterDirection.Input);
            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_Modelos_Update, parametros, commandType: CommandType.StoredProcedure);

            result.MessageStatus = answer;
            return result;
        }
        public RequestStatus Delete(tbModelos item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@mode_ID", item.mode_ID, DbType.Int32, ParameterDirection.Input);
            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_Modelos_Delete, parametros, commandType: CommandType.StoredProcedure);

            result.MessageStatus = answer;
            return result;
        }
    }
}

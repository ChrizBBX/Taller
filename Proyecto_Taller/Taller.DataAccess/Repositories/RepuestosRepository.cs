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
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@resp_Descripcion", item.resp_Descripcion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@resp_Precio", item.resp_Precio, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_ID", item.prov_ID, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@marc_ID", item.marc_ID, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@resp_Anio", item.resp_Anio, DbType.String, ParameterDirection.Input);
            parametros.Add("@resp_UserCreacion", item.resp_UserCreacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@resp_Stock", item.resp_Stock, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_Repuestos_Insert, parametros, commandType: CommandType.StoredProcedure);

            result.MessageStatus = answer;
            return result;
        }

        public IEnumerable<VW_tbRepuestos> List()
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbRepuestos>(ScriptsDataBase.UDP_Repuestos_Select, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbRepuestos item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@resp_ID", item.resp_Descripcion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@resp_Descripcion", item.resp_Descripcion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@resp_Precio", item.resp_Precio, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_ID", item.prov_ID, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@marc_ID", item.marc_ID, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@resp_Anio", item.resp_Anio, DbType.String, ParameterDirection.Input);
            parametros.Add("@resp_UserModificacion", item.resp_UserModificacion, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_Repuestos_Update, parametros, commandType: CommandType.StoredProcedure);

            result.MessageStatus = answer;
            return result;
        }

        public RequestStatus Delete(tbRepuestos item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@resp_ID", item.resp_ID, DbType.Int32, ParameterDirection.Input);
          
            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_Repuestos_Delete, parametros, commandType: CommandType.StoredProcedure);

            result.MessageStatus = answer;
            return result;
        }
    }
}

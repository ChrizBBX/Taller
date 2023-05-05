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
    public class SucursalesRepository : IRepository<tbSucursales, VW_tbSucursales>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_tbSucursales Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbSucursales item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@sucu_Descripcion", item.sucu_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_ID", item.muni_ID, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_DireccionExacta", item.sucu_DireccionExacta, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_UserCreacion", item.sucu_UserCreacion, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_Sucursales_Insert, parametros, commandType: CommandType.StoredProcedure);

            result.MessageStatus = answer;
            return result;
        }

        public IEnumerable<VW_tbSucursales> List()
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbSucursales>(ScriptsDataBase.UDP_Sucursales_Select, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbSucursales item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@sucu_ID", item.sucu_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_Descripcion", item.sucu_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_ID", item.muni_ID, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_DireccionExacta", item.sucu_DireccionExacta, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_UserModificacion", item.sucu_UserModificacion, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_Sucursales_Update,parametros, commandType: CommandType.StoredProcedure);

            result.MessageStatus = answer;
            return result;
        }

        public RequestStatus Delete(tbSucursales item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@sucu_ID", item.sucu_ID, DbType.String, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_Sucursales_Delete, parametros, commandType: CommandType.StoredProcedure);

            result.MessageStatus = answer;
            return result;
        }
    }
}

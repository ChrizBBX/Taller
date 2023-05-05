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
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@mode_ID", item.mode_ID, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@vehi_Matricula", item.vehi_Matricula, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@vehi_anio", item.vehi_anio, DbType.String, ParameterDirection.Input);
            parametros.Add("@vehi_UserCreacion", 1, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_Vehiculos_Insert, parametros, commandType: CommandType.StoredProcedure);

            result.MessageStatus = answer;
            return result;
        }

        public IEnumerable<VW_tbVehiculos> List()
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbVehiculos>(ScriptsDataBase.UDP_Vehiculos_Select, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbVehiculos item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@vehi_ID", item.vehi_ID, DbType.Int32, ParameterDirection.Input); 
            parametros.Add("@mode_ID", item.mode_ID, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@vehi_Matricula", item.vehi_Matricula, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@vehi_anio", item.vehi_anio, DbType.String, ParameterDirection.Input);
            parametros.Add("@vehi_UserCreacion", 1, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_Vehiculos_Update, parametros, commandType: CommandType.StoredProcedure);

            result.MessageStatus = answer;
            return result;
        }

        public RequestStatus Delete(tbVehiculos item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@vehi_ID", item.vehi_ID, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_Vehiculos_Delete, parametros, commandType: CommandType.StoredProcedure);

            result.MessageStatus = answer;
            return result;
        }
    }
}

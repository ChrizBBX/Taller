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
    public class ClientesRepository : IRepository<tbClientes, VW_tbClientes>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_tbClientes Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbClientes item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametro = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametro.Add("@clie_Nombres", item.clie_Nombres, DbType.String, ParameterDirection.Input);
            parametro.Add("@clie_Apellidos", item.clie_Apellidos, DbType.String, ParameterDirection.Input);
            parametro.Add("@clie_Sexo", item.clie_Sexo, DbType.String, ParameterDirection.Input);
            parametro.Add("@clie_FechaNacimiento", item.clie_FechaNacimiento, DbType.String, ParameterDirection.Input);
            parametro.Add("@clie_Telefono", item.clie_Telefono, DbType.String, ParameterDirection.Input);
            parametro.Add("@clie_CorreoElectronico", item.clie_CorreoElectronico, DbType.String, ParameterDirection.Input);
            parametro.Add("@muni_ID", item.muni_ID, DbType.String, ParameterDirection.Input);
            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_tbClientes_Insert, parametro, commandType: CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }

        public IEnumerable<VW_tbClientes> List()
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbClientes>(ScriptsDataBase.UDP_UDP_tbClientes_VW, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbClientes item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametro = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametro.Add("@clie_ID", item.clie_ID, DbType.String, ParameterDirection.Input);
            parametro.Add("@clie_Nombres", item.clie_Nombres, DbType.String, ParameterDirection.Input);
            parametro.Add("@clie_Apellidos", item.clie_Apellidos, DbType.String, ParameterDirection.Input);
            parametro.Add("@clie_Sexo", item.clie_Sexo, DbType.String, ParameterDirection.Input);
            parametro.Add("@clie_FechaNacimiento", item.clie_FechaNacimiento, DbType.String, ParameterDirection.Input);
            parametro.Add("@clie_Telefono", item.clie_Telefono, DbType.String, ParameterDirection.Input);
            parametro.Add("@clie_CorreoElectronico", item.clie_CorreoElectronico, DbType.String, ParameterDirection.Input);
            parametro.Add("@muni_ID", item.muni_ID, DbType.String, ParameterDirection.Input);
            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_tbClientes_Update, parametro, commandType: CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }

        public RequestStatus Delete(tbClientes item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@clie_ID", item.clie_ID, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_tbClientes_Delete, parametros, commandType: CommandType.StoredProcedure);

            result.MessageStatus = answer;
            return result;
        }
    }
}

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
    public class ProveedoresRepository : IRepository<tbProveedores, VW_tbProveedores>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_tbProveedores Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbProveedores item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@prov_Rut", item.prov_Rut, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_Nombre", item.prov_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_CorreoElectronico", item.prov_CorreoElectronico, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_Telefono", item.prov_Telefono, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_Direccion", item.prov_Dirrecion, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_UserCreacion",1, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_Proveedores_Insert, parametros, commandType: CommandType.StoredProcedure);

            result.MessageStatus = answer;
            return result;
        }

        public IEnumerable<VW_tbProveedores> List()
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbProveedores>(ScriptsDataBase.UDP_Proveedores_Select, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbProveedores item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@prov_ID", item.prov_ID, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@prov_Rut", item.prov_Rut, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_Nombre", item.prov_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_CorreoElectronico", item.prov_CorreoElectronico, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_Telefono", item.prov_Telefono, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_Direccion", item.prov_Dirrecion, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_UserModificacion", 1, DbType.String, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_Proveedores_Update, parametros, commandType: CommandType.StoredProcedure);

            result.MessageStatus = answer;
            return result;
        }

        public RequestStatus Delete(tbProveedores item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@prov_ID", item.prov_ID, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_Proveedores_Delete, parametros, commandType: CommandType.StoredProcedure);

            result.MessageStatus = answer;
            return result;
        }
    }
}

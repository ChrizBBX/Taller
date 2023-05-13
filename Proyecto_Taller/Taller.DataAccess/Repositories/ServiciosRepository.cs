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
    public class ServiciosRepository : IRepository<tbServicios, VW_tbServicios>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_tbServicios Find(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_ServiciosMasSolicitados> ServiciosMasSolicitados()
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_ServiciosMasSolicitados>(ScriptsDataBase.UDP_servicios_MasSolicitados, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbServicios item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@serv_Descripcion", item.serv_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@serv_Precio", item.serv_Precio, DbType.String, ParameterDirection.Input);
            parametros.Add("@serv_UserCreacion", 1, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_Servicios_Insert, parametros, commandType: CommandType.StoredProcedure);

            result.MessageStatus = answer;
            return result;
        }

        public IEnumerable<VW_tbServicios> List()
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbServicios>(ScriptsDataBase.UDP_Servicios_Select, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbServicios item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();

            parametros.Add("@serv_ID", item.serv_ID, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@serv_Descripcion", item.serv_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@serv_Precio", item.serv_Precio, DbType.String, ParameterDirection.Input);
            parametros.Add("@serv_UserModificacion", 1, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_Servicios_Update, parametros, commandType: CommandType.StoredProcedure);

            result.MessageStatus = answer;
            return result;
        }

        public RequestStatus Delete(tbServicios item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();

            parametros.Add("@serv_ID", item.serv_ID, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_Servicios_Delete, parametros, commandType: CommandType.StoredProcedure);

            result.MessageStatus = answer;
            return result;
        }
    }
}

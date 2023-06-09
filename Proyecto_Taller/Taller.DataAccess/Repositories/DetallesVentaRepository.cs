﻿using Dapper;
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
    public class DetallesVentaRepository : IRepository<tbDetallesventas, VW_tbDetallesventas>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_tbDetallesventas Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbDetallesventas item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();

            parametros.Add("@vent_ID", item.vent_ID, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@vehi_ID", item.vehi_ID, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@serv_ID", item.serv_ID, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@resp_ID", item.resp_ID, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@deve_Cantidad", item.deve_Cantidad, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@deve_UserCreacion", item.deve_UserCreacion, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_tbDetallesventas_Insert, parametros, commandType: CommandType.StoredProcedure);

            result.MessageStatus = answer;
            return result;
        }

        public RequestStatus Delete(VW_tbDetallesventas item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();

            parametros.Add("@deve_ID", item.deve_ID, DbType.Int32, ParameterDirection.Input);
 
            var answer = db.QueryFirst<string>(ScriptsDataBase.UDP_tbDetallesVentas_Delete, parametros, commandType: CommandType.StoredProcedure);

            result.MessageStatus = answer;
            return result;
        }

        public IEnumerable<VW_tbDetallesventas> List()
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbDetallesventas>(ScriptsDataBase.UDP_tbDetallesventas_Select, null, commandType: CommandType.StoredProcedure);
        }
        public IEnumerable<VW_tbDetallesventas> ListTemp(int id)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@vent_ID", id, DbType.Int32, ParameterDirection.Input);

            return db.Query<VW_tbDetallesventas>(ScriptsDataBase.UDP_tbDetallesventas_Temp, parametros, commandType: CommandType.StoredProcedure);
        }

        public IEnumerable<VW_tbDetallesventas> ListById(int id)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@vent_ID", id, DbType.Int32, ParameterDirection.Input);

            return db.Query<VW_tbDetallesventas>(ScriptsDataBase.UDP_tbDetallesVentas_ByID, parametros, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbDetallesventas item)
        {
            throw new NotImplementedException();
        }
    }
}

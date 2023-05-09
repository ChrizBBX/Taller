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

    public class EmpleadosRepository : IRepository<tbEmpleados, VW_tbEmpleados>
    {
        public IEnumerable<tbEmpleados> ListarEmpleados()
        {
            var parameters = new DynamicParameters();
            parameters.Add("@empe_Id", null, DbType.String, ParameterDirection.Input);
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            return db.Query<tbEmpleados>(ScriptsDataBase.ListaEmpleados, parameters, commandType: CommandType.StoredProcedure);

        }
        public int AgregarEmpleado(tbEmpleados item)
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametro = new DynamicParameters();
            parametro.Add("@empe_Nombres", item.empe_Nombres, DbType.String, ParameterDirection.Input);
            parametro.Add("@empe_Apellidos", item.empe_Apellidos, DbType.String, ParameterDirection.Input);
            parametro.Add("@empe_Identidad", item.empe_Identidad, DbType.String, ParameterDirection.Input);
            parametro.Add("@empe_FechaNacimiento", item.empe_FechaNacimiento, DbType.String, ParameterDirection.Input);
            parametro.Add("@empe_Sexo", item.empe_Sexo, DbType.String, ParameterDirection.Input);
            parametro.Add("@estacivi_Id", item.estacivi_Id, DbType.String, ParameterDirection.Input);
            parametro.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parametro.Add("@empe_Direccion", item.empe_Direccion, DbType.String, ParameterDirection.Input);
            parametro.Add("@empe_Telefono", item.empe_Telefono, DbType.String, ParameterDirection.Input);
            parametro.Add("@empe_CorreoElectronico", item.empe_CorreoElectronico, DbType.String, ParameterDirection.Input);
            parametro.Add("@sucu_Id", item.sucu_Id, DbType.String, ParameterDirection.Input);
            return db.QueryFirst<int>(ScriptsDataBase.AgregarEmpleados, parametro, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_tbEmpleados Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbEmpleados item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbEmpleados> List()
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbEmpleados>(ScriptsDataBase.UDP_tbEmpleados_Select, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbEmpleados item)
        {
            throw new NotImplementedException();
        }
    }
}

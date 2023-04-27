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

        public RequestStatus Insert(tbServicios item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbServicios> List()
        {
            using var db = new SqlConnection(TallerMecanicoContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbServicios>(ScriptsDataBase.UDP_Servicios_Select, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbServicios item)
        {
            throw new NotImplementedException();
        }
    }
}

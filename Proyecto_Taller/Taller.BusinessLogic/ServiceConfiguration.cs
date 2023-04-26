
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using Taller.DataAccess;
using Taller.DataAccess.Context;

namespace Taller.BusinessLogic
{
   public static class ServiceConfiguration
    {
        public static void DataAccess(this IServiceCollection services, string connection)
        {
          
            TallerMecanicoContext.BuildConnectionString(connection);

        }

        public static void BusinnesLogic(this IServiceCollection services)
        {
          
        }
    }
}

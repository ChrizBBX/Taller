﻿
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using Taller.BusinessLogic.Services;
using Taller.DataAccess;
using Taller.DataAccess.Context;
using Taller.DataAccess.Repositories;

namespace Taller.BusinessLogic
{
   public static class ServiceConfiguration
    {
        public static void DataAccess(this IServiceCollection services, string connection)
        {
            services.AddScoped<UsuariosRepository>();
            TallerMecanicoContext.BuildConnectionString(connection);

        }

        public static void BusinnesLogic(this IServiceCollection services)
        {
            services.AddScoped<AccesoServices>();
        }
    }
}


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
            services.AddScoped<EstadosCivilesRepository>();
            services.AddScoped<MetodosPagoRepository>();
            services.AddScoped<ClientesRepository>();
            services.AddScoped<MarcasRepository>();

            TallerMecanicoContext.BuildConnectionString(connection);

        }

        public static void BusinnesLogic(this IServiceCollection services)
        {
            services.AddScoped<AccesoServices>();
            services.AddScoped<GeneralServices>();
            services.AddScoped<TallerServices>();

        }
    }
}

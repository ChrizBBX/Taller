
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
            services.AddScoped<VentasRepository>();
            services.AddScoped<VehiculosRepository>();
            services.AddScoped<SucursalesRepository>();
            services.AddScoped<ServiciosRepository>();
            services.AddScoped<RepuestosRepository>();
            services.AddScoped<ProveedoresRepository>();
            services.AddScoped<ModelosRepository>();
            TallerMecanicoContext.BuildConnectionString(connection);

        }

        public static void BusinnesLogic(this IServiceCollection services)
        {
            services.AddScoped<AccesoServices>();
            services.AddScoped<TallerServices>();
        }
    }
}

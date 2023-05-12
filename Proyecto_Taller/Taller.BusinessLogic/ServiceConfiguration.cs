
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
            services.AddScoped<VehiculosRepository>();
            services.AddScoped<SucursalesRepository>();
            services.AddScoped<ServiciosRepository>();
            services.AddScoped<RepuestosRepository>();
            services.AddScoped<ProveedoresRepository>();
            services.AddScoped<ModelosRepository>();
            services.AddScoped<EstadosCivilesRepository>();
            services.AddScoped<MetodosPagoRepository>();
            services.AddScoped<ClientesRepository>();
            services.AddScoped<MarcasRepository>();
            services.AddScoped<EmpleadosRepository>();
            services.AddScoped<ComprasRepository>();
            services.AddScoped<MunicipiosRepositories>();
            services.AddScoped<DepartamentosRepositories>();
            services.AddScoped<RolesRepository>();
            services.AddScoped<DetallesVentaRepository>();
            services.AddScoped<RolesRepository>();
            services.AddScoped<PantallasRepository>();
            services.AddScoped<VentasRepository>();
            services.AddScoped<RolesPorPantallaRepository>();
            TallerMecanicoContext.BuildConnectionString(connection);
        }

        public static void BusinnesLogic(this IServiceCollection services)
        {
            services.AddScoped<AccesoServices>();
            services.AddScoped<TallerServices>();
            services.AddScoped<GeneralServices>();
        }
    }
}

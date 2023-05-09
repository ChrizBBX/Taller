using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Taller.API.Models;
using Taller.Entities.Entities;

namespace Taller.API.Extentions
{
    public class MappingProfileExtensions : Profile
    {
        public MappingProfileExtensions()
        {
            CreateMap<MunicipiosViewModel, tbMunicipios>().ReverseMap();
            CreateMap<EmpleadosViewModel, tbEmpleados>().ReverseMap();
            CreateMap<MarcasViewModel, tbMarcas>().ReverseMap();
            CreateMap<ModelosViewModel, tbModelos>().ReverseMap();
            CreateMap<ProveedoresViewModel, tbProveedores>().ReverseMap();
            CreateMap<RespuestosViewModel, tbRepuestos>().ReverseMap();
            CreateMap<ServiciosViewModel, tbServicios>().ReverseMap();
            CreateMap<SucursalesViewModel, tbSucursales>().ReverseMap();
            CreateMap<VehiculosViewModel, tbVehiculos>().ReverseMap();
            CreateMap<VentasViewModel, tbVentas>().ReverseMap();
            CreateMap<VentasDetallesViewModel,tbDetallesventas>().ReverseMap();
        }
    }
}

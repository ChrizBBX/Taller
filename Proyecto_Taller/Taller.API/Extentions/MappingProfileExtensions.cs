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

        }
    }
}

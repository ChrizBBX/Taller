using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Taller.API.Models;
using Taller.BusinessLogic.Services;
using Taller.Entities.Entities;

namespace Taller.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadosController : ControllerBase
    {
        private readonly TallerServices _tallerservices;
        private readonly IMapper _mapper;

        public EmpleadosController(TallerServices tallerservices, IMapper mapper)
        {
            _tallerservices = tallerservices;
            _mapper = mapper;
        }

        [HttpPost("AgregarEmpleado")]
        public IActionResult AgregarEmpleado(EmpleadosViewModel item)
        {
            var item2 = _mapper.Map<tbEmpleados>(item);
            var response = _tallerservices.AgregarEmpleado(item2);
            return Ok(response);
        }   

        [HttpGet]
        public IActionResult Empleados()
        {
            var listado = _tallerservices.ListadoEmpleados();
            return Ok(listado);
        }

          

    }
}

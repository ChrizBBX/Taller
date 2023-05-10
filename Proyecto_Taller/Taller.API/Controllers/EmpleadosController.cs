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

        [HttpPost("Insert")]
        public IActionResult AgregarEmpleado(EmpleadosViewModel item)
        {
            var item2 = _mapper.Map<tbEmpleados>(item);
            var response = _tallerservices.AgregarEmpleado(item2);
            return Ok(response);
        }

        [HttpPost("Update")]
        public IActionResult Update(EmpleadosViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbEmpleados>(item);
            var listado = _tallerservices.EditarEmpleados(listadoMapeado);
            return Ok(listado);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(EmpleadosViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbEmpleados>(item);
            var listado = _tallerservices.EliminarEmpleados(listadoMapeado);
            return Ok(listado);
        }

        [HttpGet("ListarEmpleados")]
        public IActionResult ListarEmpleados()
        {
            var list = _tallerservices.ListarEmpleados();
            return Ok(list);
        }

        [HttpGet]
        public IActionResult Empleados()
        {
            var listado = _tallerservices.ListadoEmpleados();
            return Ok(listado);
        }         
    }
}

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
    public class RepuestosController : ControllerBase
    {
        private readonly TallerServices _tallerservices;
        private readonly IMapper _mapper;

        public RepuestosController(TallerServices tallerservices, IMapper mapper)
        {
            _tallerservices = tallerservices;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Repuestos()
        {
            var listado = _tallerservices.ListadoRepuestos();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(RespuestosViewModel item)
        {
        var listadoMapeado = _mapper.Map<tbRepuestos>(item);
        var listado = _tallerservices.InsertarRepuestos(listadoMapeado);
        return Ok(listado);
        }

        [HttpPost("Update")]
        public IActionResult Update(RespuestosViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbRepuestos>(item);
            var listado = _tallerservices.EditarRepuestos(listadoMapeado);
            return Ok(listado);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(RespuestosViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbRepuestos>(item);
            var listado = _tallerservices.EliminarRepuestos(listadoMapeado);
            return Ok(listado);
        }
    }
}

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
    public class ServiciosController : ControllerBase
    {
        private readonly TallerServices _tallerservices;
        private readonly IMapper _mapper;

        public ServiciosController(TallerServices tallerservices, IMapper mapper)
        {
            _tallerservices = tallerservices;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Servicios()
        {
            var listado = _tallerservices.ListadoServicios();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(ServiciosViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbServicios>(item);
            var listado = _tallerservices.InsertarServicios(listadoMapeado);
            return Ok(listado);
        }

        [HttpPost("Update")]
        public IActionResult Update(ServiciosViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbServicios>(item);
            var listado = _tallerservices.EditarServicios(listadoMapeado);
            return Ok(listado);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(ServiciosViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbServicios>(item);
            var listado = _tallerservices.EliminarServicios(listadoMapeado);
            return Ok(listado);
        }
    }
}

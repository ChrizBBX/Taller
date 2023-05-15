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
    public class VehiculosController : ControllerBase
    {
        private readonly TallerServices _tallerservices;
        private readonly IMapper _mapper;

        public VehiculosController(TallerServices tallerservices, IMapper mapper)
        {
            _tallerservices = tallerservices;
            _mapper = mapper;
        }

        [HttpGet("ClientesConMasVehiculos")]
        public IActionResult ClientesConMasVehiculos()
        {
            var listado = _tallerservices.ClientesConMasVehiculos();
            return Ok(listado);
        }


        [HttpGet]
        public IActionResult Vehiculos()
        {
            var listado = _tallerservices.ListadoVehiculos();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(VehiculosViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbVehiculos>(item);
            var listado = _tallerservices.InsertarVehiculos(listadoMapeado);
            return Ok(listado);
        }

        [HttpPost("Update")]
        public IActionResult Update(VehiculosViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbVehiculos>(item);
            var listado = _tallerservices.EditarVehiculos(listadoMapeado);
            return Ok(listado);
        }


        [HttpPost("Delete")]
        public IActionResult Delete(VehiculosViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbVehiculos>(item);
            var listado = _tallerservices.EliminarVehiculos(listadoMapeado);
            return Ok(listado);
        }
    }
}

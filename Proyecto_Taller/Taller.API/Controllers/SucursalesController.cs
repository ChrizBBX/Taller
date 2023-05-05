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
    public class SucursalesController : ControllerBase
    {
        private readonly TallerServices _tallerservices;
        private readonly IMapper _mapper;

        public SucursalesController(TallerServices tallerservices, IMapper mapper)
        {
            _tallerservices = tallerservices;
            _mapper = mapper;
        }
        [HttpGet]
        public IActionResult Sucursales()
        {
            var listado = _tallerservices.ListadoSucursales();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(SucursalesViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbSucursales>(item);
            var listado = _tallerservices.InsertarSucursales(listadoMapeado);
            return Ok(listado);
        }

        [HttpPost("Update")]
        public IActionResult Update(SucursalesViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbSucursales>(item);
            var listado = _tallerservices.EditarSucursales(listadoMapeado);
            return Ok(listado);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(SucursalesViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbSucursales>(item);
            var listado = _tallerservices.EliminarSucursales(listadoMapeado);
            return Ok(listado);
        }
    }
}

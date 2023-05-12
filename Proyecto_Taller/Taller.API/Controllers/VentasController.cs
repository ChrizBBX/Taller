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
    public class VentasController : ControllerBase
    {
        private readonly TallerServices _tallerservices;
        private readonly IMapper _mapper;

        public VentasController(TallerServices tallerservices, IMapper mapper)
        {
            _tallerservices = tallerservices;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Ventas()
        {
            var listado = _tallerservices.ListadoVentas();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(VentasViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbVentas>(item);
            var listado = _tallerservices.InsertarVentas(listadoMapeado);
            return Ok(listado);
        }
    }
}

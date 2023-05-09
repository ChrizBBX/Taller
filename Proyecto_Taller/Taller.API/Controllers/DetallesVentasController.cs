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
    public class DetallesVentasController : ControllerBase
    {
        private readonly TallerServices _tallerServices;
        private readonly IMapper _mapper;

        public DetallesVentasController(TallerServices tallerServices, IMapper mapper)
        {
            _tallerServices = tallerServices;
            _mapper = mapper;
        }

        [HttpPost("Insert")]
        public IActionResult Insert(VentasDetallesViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbDetallesventas>(item);
            var listado = _tallerServices.InsertarVentasDetalles(listadoMapeado);
            return Ok(listado);
        }

        [HttpGet]
        public IActionResult List()
        {
            var listado = _tallerServices.ListadoDetallesVentas();
            return Ok(listado);
        }
    }
}

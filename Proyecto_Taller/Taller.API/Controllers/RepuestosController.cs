using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Taller.BusinessLogic.Services;

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
    }
}

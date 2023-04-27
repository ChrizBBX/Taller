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
    public class ComprasController : ControllerBase
    {
        private readonly TallerServices _tallerServices;
        private readonly IMapper _mapper;

        public ComprasController(TallerServices tallerServices, IMapper mapper)
        {
            _tallerServices = tallerServices;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Compras()
        {
            var listado = _tallerServices.ListadoCompras();
            return Ok(listado);
        }
    }
}

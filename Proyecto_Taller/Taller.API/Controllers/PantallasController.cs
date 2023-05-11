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
    public class PantallasController : ControllerBase
    {
        private readonly AccesoServices _accesoservice;
        private readonly IMapper _mapper;

        public PantallasController(AccesoServices accesoservice, IMapper mapper)
        {
            _accesoservice = accesoservice;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult List()
        {
            var listado = _accesoservice.ListadoPantallas();
            return Ok(listado);
        }
    }
}

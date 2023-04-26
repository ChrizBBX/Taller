using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Taller.BusinessLogic.Services;

namespace Taller.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly AccesoServices _accesoservice;
        private readonly IMapper _mapper;

        public UsuariosController(AccesoServices accesoservice, IMapper mapper)
        {
            _accesoservice = accesoservice;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Usuarios()
        {
            var listado = _accesoservice.ListadoUsuarios();
            return Ok(listado);
        }

    }
}

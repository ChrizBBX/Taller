using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Taller.API.Models;
using Taller.BusinessLogic.Services;
using Taller.DataAccess;
using Taller.Entities.Entities;

namespace Taller.API.Controllers
{
    [Route("api/[controller]")]
    [Consumes("application/json")]
    [ApiController]
    public class MunicipiosController : ControllerBase
    {
        private readonly GeneralServices _generalServices;
        private readonly IMapper _mapper;
        public TallerMecanicoContext db = new TallerMecanicoContext();

        public MunicipiosController(GeneralServices generalServices, IMapper mapper)
        {
            _generalServices = generalServices;
            _mapper = mapper;
        }

        [HttpGet("ListarMunicipiosPorDepto/{id}")]
        public IActionResult ListarMunicipiosPorDepto(string id)
        {
            var item2 = new tbMunicipios();
            item2.depa_ID = id;
            var list = _generalServices.ListarMunicipiosPorDepto(id);
            return Ok(list);
        }
    }
}

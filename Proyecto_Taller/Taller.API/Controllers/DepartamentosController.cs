using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Taller.BusinessLogic.Services;
using Taller.DataAccess;

namespace Taller.API.Controllers
{
    [Route("api/[controller]")]
    [Consumes("application/json")]
    [ApiController]
    public class DepartamentosController : ControllerBase
    {
        private readonly GeneralServices _generalServices;
        private readonly IMapper _mapper;
        public TallerMecanicoContext db = new TallerMecanicoContext();

        public DepartamentosController(GeneralServices generalServices, IMapper mapper)
        {
            _generalServices = generalServices;
            _mapper = mapper;
        }

        [HttpGet("ListarDepartamentos")]
        public IActionResult ListarDepartamentos()
        {
            var list = _generalServices.ListarDepartamentos();
            return Ok(list);
        }
    }
}

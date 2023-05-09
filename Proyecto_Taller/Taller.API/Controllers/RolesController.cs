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
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly AccesoServices _accesoServices;
        private readonly IMapper _mapper;
        public TallerMecanicoContext db = new TallerMecanicoContext();

        public RolesController(AccesoServices accesoServices, IMapper mapper)
        {
            _accesoServices = accesoServices;
            _mapper = mapper;
        }

        [HttpGet("ListarRoles")]
        public IActionResult ListarRoles()
        {
            var list = _accesoServices.ListarRoles();
            return Ok(list);
        }
    }
}

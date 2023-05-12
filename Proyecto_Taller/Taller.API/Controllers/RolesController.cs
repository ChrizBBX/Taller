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
    public class RolesController : ControllerBase
    {
        private readonly AccesoServices _accesoservices;
        private readonly IMapper _mapper;

        public RolesController(AccesoServices accesoservices, IMapper mapper)
        {
            _accesoservices = accesoservices;
            _mapper = mapper;
        }

        [HttpGet("ListarRoles")]
        public IActionResult ListarRoles()
        {
            var list = _accesoservices.ListarRoles();
            return Ok(list);
        }

        [HttpGet]
        public IActionResult List()
        {
            var listado = _accesoservices.ListadoRoles();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(tbRoles item)
        {
            var listado = _accesoservices.InsertarRoles(item);
            return Ok(listado);
        }

        [HttpPost("Update")]
        public IActionResult Update(tbRoles item)
        {
            var listado = _accesoservices.EditarRoles(item);
            return Ok(listado);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(RolesViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbRoles>(item);
            var listado = _accesoservices.EliminarRoles(listadoMapeado);
            return Ok(listado);
        }
    }

}


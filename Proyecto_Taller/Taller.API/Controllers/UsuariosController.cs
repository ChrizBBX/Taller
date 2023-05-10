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

        [HttpPost("Login")]
        public IActionResult Login(VW_tbUsuarios item)
        {
            var listado = _accesoservice.Login(item);
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(UsuariosViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbUsuarios>(item);
            var listado = _accesoservice.InsertarUsuarios(listadoMapeado);
            return Ok(listado);
        }

        [HttpPost("Update")]
        public IActionResult Update(UsuariosViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbUsuarios>(item);
            var listado = _accesoservice.EditarUsuarios(listadoMapeado);
            return Ok(listado);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(UsuariosViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbUsuarios>(item);
            var listado = _accesoservice.EliminarUsuarios(listadoMapeado);
            return Ok(listado);
        }
    }
}

﻿using AutoMapper;
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
    public class RolesPorPantallaController : ControllerBase
    {

        private readonly AccesoServices _accesoservice;
        private readonly IMapper _mapper;

        public RolesPorPantallaController(AccesoServices accesoservice, IMapper mapper)
        {
            _accesoservice = accesoservice;
            _mapper = mapper;
        }

        [HttpPost("Insert")]
        public IActionResult Insert(RolesPorPantallaViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbPantallasPorRoles>(item);
            var listado = _accesoservice.InsertarRolesXPantalla(listadoMapeado);
            return Ok(listado);
        }


        [HttpPost("Delete")]
        public IActionResult Delete(RolesPorPantallaViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbPantallasPorRoles>(item);
            var listado = _accesoservice.EliminarRolesXPantalla(listadoMapeado);
            return Ok(listado);
        }

        [HttpGet("RolesPorPantallaByRoleID/{id}")]
        public IActionResult ListadoRolesPorPantallaByRoleID(int id)
        {
            var list = _accesoservice.ListadoRolesPorPantallaByRoleID(id);
            return Ok(list);
        }

        [HttpGet("Menu/{id}/{esadmin}")]
        public IActionResult Menu(int id, bool esadmin)
        {
            var list = _accesoservice.menu(id, esadmin);
            return Ok(list);
        }
    }
}

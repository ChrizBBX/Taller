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
    public class ProveedoresController : ControllerBase
    {
        private readonly TallerServices _tallerservices;
        private readonly IMapper _mapper;

        public ProveedoresController(TallerServices tallerservices, IMapper mapper)
        {
            _tallerservices = tallerservices;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Proveedores()
        {
            var listado = _tallerservices.ListadoProveedores();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(ProveedoresViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbProveedores>(item);
            var listado = _tallerservices.InsertarProveedores(listadoMapeado);
            return Ok(listado);
        }

        [HttpPost("Update")]
        public IActionResult Update(ProveedoresViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbProveedores>(item);
            var listado = _tallerservices.EditarProveedores(listadoMapeado);
            return Ok(listado);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(ProveedoresViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbProveedores>(item);
            var listado = _tallerservices.EliminarProveedores(listadoMapeado);
            return Ok(listado);
        }
    }
}

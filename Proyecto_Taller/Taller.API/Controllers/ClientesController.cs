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
    public class ClientesController : ControllerBase
    {
        private readonly TallerServices _tallerServices;
        private readonly IMapper _mapper;

        public ClientesController(TallerServices tallerServices, IMapper mapper)
        {
            _tallerServices = tallerServices;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Clientes()
        {
            var listado = _tallerServices.ListadoClientes();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(ClientesViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbClientes>(item);
            var listado = _tallerServices.InsertarClientes(listadoMapeado);
            return Ok(listado);
        }

        [HttpPost("Update")]
        public IActionResult Update(ClientesViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbClientes>(item);
            var listado = _tallerServices.EditarClientes(listadoMapeado);
            return Ok(listado);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(ClientesViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbClientes>(item);
            var listado = _tallerServices.EliminarClientes(listadoMapeado);
            return Ok(listado);
        }
    }
}

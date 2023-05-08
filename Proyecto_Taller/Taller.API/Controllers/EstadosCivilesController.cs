using AutoMapper;
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
    public class EstadosCivilesController : Controller
    {
        private readonly GeneralServices _generalServices;
        private readonly IMapper _mapper;

        public EstadosCivilesController(GeneralServices generalServices, IMapper mapper)
        {
            _generalServices = generalServices;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult EstadosCiviles()
        {
            var listado = _generalServices.ListadoEstadosCiviles();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(EstadosCivilesViewModels item)
        {
            var listadoMapeado = _mapper.Map<tbEstadosCiviles>(item);
            var listado = _generalServices.InsertarEstadosCiviles(listadoMapeado);
            return Ok(listado);
        }

        [HttpPost("Update")]
        public IActionResult Update(EstadosCivilesViewModels item)
        {
            var listadoMapeado = _mapper.Map<tbEstadosCiviles>(item);
            var listado = _generalServices.EditarEstadosCiviles(listadoMapeado);
            return Ok(listado);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(EstadosCivilesViewModels item)
        {
            var listadoMapeado = _mapper.Map<tbEstadosCiviles>(item);
            var listado = _generalServices.EliminarEstadosCiviles(listadoMapeado);
            return Ok(listado);
        }
    }
}

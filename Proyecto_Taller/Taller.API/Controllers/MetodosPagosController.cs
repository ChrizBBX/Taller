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
    public class MetodosPagosController : ControllerBase
    {
        private readonly GeneralServices _generalServices;
        private readonly IMapper _mapper;

        public MetodosPagosController(GeneralServices generalServices, IMapper mapper)
        {
            _generalServices = generalServices;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult MetodosPagos()
        {
            var listado = _generalServices.ListadoMetodosPagos();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(MetedosPagosViewModels item)
        {
            var listadoMapeado = _mapper.Map<tbMetodosPago>(item);
            var listado = _generalServices.InsertarMetodosPago(listadoMapeado);
            return Ok(listado);
        }

        [HttpPost("Update")]
        public IActionResult Update(MetedosPagosViewModels item)
        {
            var listadoMapeado = _mapper.Map<tbMetodosPago>(item);
            var listado = _generalServices.EditarMetodosPago(listadoMapeado);
            return Ok(listado);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(MetedosPagosViewModels item)
        {
            var listadoMapeado = _mapper.Map<tbMetodosPago>(item);
            var listado = _generalServices.EliminarMetodosPago(listadoMapeado);
            return Ok(listado);
        }
    }
}

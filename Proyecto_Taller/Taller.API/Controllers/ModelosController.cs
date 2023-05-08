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
    public class ModelosController : ControllerBase
    {
        private readonly TallerServices _tallerservices;
        private readonly IMapper _mapper;

        public ModelosController(TallerServices tallerservices, IMapper mapper)
        {
            _tallerservices = tallerservices;
            _mapper = mapper;
        }
        [HttpGet]
        public IActionResult Modelos()
        {
            var listado = _tallerservices.ListadoModelos();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(ModelosViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbModelos>(item);
            var listado = _tallerservices.InsertarModelos(listadoMapeado);
            return Ok(listado);
        }

        [HttpPost("Update")]
        public IActionResult Update(ModelosViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbModelos>(item);
            var listado = _tallerservices.EditarModelos(listadoMapeado);
            return Ok(listado);
        }



        [HttpPost("Delete")]
        public IActionResult Delete(ModelosViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbModelos>(item);
            var listado = _tallerservices.EliminarModelos(listadoMapeado);
            return Ok(listado);
        }
    }
}

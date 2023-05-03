﻿using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Taller.BusinessLogic.Services;
using Taller.Entities.Entities;

namespace Taller.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarcasController : ControllerBase
    {
        private readonly TallerServices _tallerServices;
        private readonly IMapper _mapper;

        public MarcasController(TallerServices tallerServices, IMapper mapper)
        {
            _tallerServices = tallerServices;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Marcas()
        {
            var listado = _tallerServices.ListadoMarcas();
            return Ok(listado);
        }

        [HttpPost]
        public IActionResult Insert(tbMarcas item)
        {
            var listado = _tallerServices.InsertarMarcas(item);
            return Ok(listado);
        }
    }
}

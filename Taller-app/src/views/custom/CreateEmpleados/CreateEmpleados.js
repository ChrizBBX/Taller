import React, { useState, useEffect } from 'react';
import {
  CFormSelect,
  CFormCheck,
  CButton,
  CContainer,
  CRow,
  CCol,
  CFormInput
} from '@coreui/react'
import { CDatePicker } from '@coreui/react-pro'
import axios from 'axios';

const CreateEmpleado = () => {

  const [estadosCiviles, setEstadosCiviles] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState('');
  const [radioValue, setRadioValue] = useState(null);

  useEffect(() => {
    axios.get('https://localhost:44387/api/Sucursales')
      .then(response => {
        setSucursales(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
      });


    axios.get('https://localhost:44387/api/EstadosCiviles')
      .then(response => {
        setEstadosCiviles(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
      });

    axios.get('https://localhost:44387/api/Departamentos/ListarDepartamentos')
      .then(response => {
        setDepartamentos(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedDepartamento) {
      axios.get(`https://localhost:44387/api/Municipios/ListarMunicipiosPorDepto/${selectedDepartamento}`)
        .then(response => {
          setMunicipios(response.data);
        })  
        .catch(error => {
          console.error('Error fetching data from API:', error);
        });
    }
  }, [selectedDepartamento]);

  function handleDepartamentoChange(event) {
    setSelectedDepartamento(event.target.value);
    setMunicipios([]);
  }

  return (
    <div className="card">
      <h5>Nuevo Empleado</h5>
      <form className="mid-form grid-cols-2">
        <div className="grid p-fluid grid-cols-2">
          <div className="field mt-3">
            <label htmlFor="DNI">Identidad</label>
            <CFormInput id="inputnumber" className="p-valid" />
          </div>

          <div className="field mt-3">
            <label htmlFor="Nombre">Nombre</label>
            <CFormInput type="text" id="Nombre" className="p-valid" />
          </div>

          <div className="field mt-3">
            <label htmlFor="Apellido">Apellido</label>
            <CFormInput type="text" id="Apellido" className="p-valid" />
          </div>

          <div className="field mt-3">
            <label htmlFor="estadocivil">Estados Civiles</label>
            <CFormSelect id="estadocivil">
              <option value="">Seleccione un Estado Civil</option>
              {estadosCiviles.map(estadocivil => (
                <option key={estadocivil.estacivi_ID} value={estadocivil.estacivi_ID}>{estadocivil.estacivi_Nombre}</option>
              ))}
            </CFormSelect>
          </div>

          <div className="field mt-3">
            <label htmlFor="departamento">Departamentos</label>
            <CFormSelect id="departamento" value={selectedDepartamento} onChange={handleDepartamentoChange}>
              <option value="">Selecciona un departamento</option>
              {departamentos.map(departamento => (
                <option key={departamento.depa_ID} value={departamento.depa_ID}>{departamento.depa_Nombre}</option>
              ))}
            </CFormSelect>
          </div>

          <div className="field mt-3">
            <label htmlFor="municipio">Municipios</label>
            <CFormSelect id="municipio">
              {municipios.map(municipio => (
                <option key={municipio.muni_ID} value={municipio.muni_ID}>{municipio.muni_Nombre}</option>
              ))}
            </CFormSelect>
          </div>

          <div className="field mt-3">
            <label htmlFor="sucursal">Sucursales</label>
            <CFormSelect id="sucursal">
              <option value="">Seleccione una Sucursal</option>
              {sucursales.map(sucursal => (
                <option key={sucursal.sucu_ID} value={sucursal.sucu_ID}>{sucursal.sucu_Descripcion}</option>
              ))}
            </CFormSelect>
          </div>

          <div className="col-12 md:col-6">
            <div className="field mt-3">
              <label htmlFor="Sexo">Sexo</label>
              <div className="grid">
                <div className="col-12 md:col-4">
                  <div className="field-radiobutton">
                    <CFormCheck
                      type='radio'
                      name="sexo"
                      id="masculino"
                      value="M"
                      checked={radioValue === "M"}
                      onChange={(e) => setRadioValue(e.target.value)}
                    />
                    <label htmlFor="option1">Masculino</label>
                  </div>
                </div>
                <div className="col-12 md:col-4">
                  <div className="field-radiobutton">
                    <CFormCheck
                      type='radio'
                      name="sexo"
                      id="femenino"
                      value="F"
                      checked={radioValue === "F"}
                      onChange={(e) => setRadioValue(e.target.value)}
                    />
                    <label htmlFor="option2">Femenino</label>
                  </div>
                </div>
              </div>

              <div className="field mt-3">
                <label htmlFor="FechaNacimiento">Fecha de Nacimiento</label>
                <CDatePicker id="FechaNacimiento" className="p-valid" showIcon="true" dateFormat="dd/mm/yy" />
              </div>


              <div className="field mt-3">
                <label htmlFor="CorreoElectronico">Correo Electrónico</label>
                <CFormInput type="email" id="CorreoElectronico" className="p-valid" />
              </div>

              <div className="field mt-3">
                <label htmlFor="Telefono">Teléfono</label>
                <CFormInput type="text" id="Telefono" className="p-valid" keyfilter="num" />
              </div>
            </div>
          </div>

        </div>
      </form>
      <div className="field mt-3">

      </div>
      <div className="field button-field">
      <CButton color="primary" type='submit'>Guardar</CButton>
      </div>
    </div>
  );

};

export default CreateEmpleado;
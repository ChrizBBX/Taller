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
import axios from 'axios';
import { Select } from '@material-ui/core';

const CreateEmpleado = () => {

  const [estadosCiviles, setEstadosCiviles] = useState([]);
  const [estadoCivilSeleccionado, setEstadoCivilSeleccionado] = useState(null);

  const [sucursalOptions, setSucursalOptions] = useState([]);
  const [selectedSucursal, setSelectedSucursal] = useState(null);

  const [departamentos, setDepartamentos] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState(null);

  const [municipios, setMunicipios] = useState([]);
  const [selectedMunicipio, setSelectedMunicipio] = useState(null);

  const [radioValue, setRadioValue] = useState(null);

  useEffect(() => {
    fetch("https://localhost:44387/api/Sucursales")
      .then((response) => response.json())
      .then((data) =>
        setSucursalOptions(
          data.map((s) => ({ value: s.sucu_ID, label: s.sucu_Descripcion }))
        )
      )
      .catch((error) => console.error(error));

    fetch("https://localhost:44387/api/EstadosCiviles")
      .then((response) => response.json())
      .then((data) =>
        setEstadosCiviles(
          data.map((e) => ({
            value: e.estacivi_ID,
            label: e.estacivi_Nombre,
          }))
        )
      )
      .catch((error) => console.error(error));

  }, []);

  useEffect(() => {

      axios.get("https://localhost:44387/api/Departamentos/ListarDepartamentos")
      .then((response) => {
        const options = response.data.map((departamento) => ({
          value: departamento.depa_ID,
          label: departamento.depa_Nombre,
        }));
        setDepartamentos(options);
      })
      .catch((error) => console.error(error));
    
  }, []);
   
  useEffect(() => {
    if (selectedDepartamento != null) {
      var IdDepartamento = document.getElementById("ddldepto").value;
      console.log('hola'+selectedDepartamento.target.value);
      localStorage.setItem("id",1);
      axios.get(`https://localhost:44387/api/Municipios/ListarMunicipiosPorDepto/${selectedDepartamento.target}`)
        .then((response) => {
          const options = response.data.map((municipio) => ({
            value: municipio.muni_ID,
            label: municipio.muni_Nombre,
          }));
          setMunicipios(options);
        })
        .catch((error) => console.error(error));
    }
  }, []);

  return (
    <div className="card">
      <h5>Nuevo Empleado</h5>
      <form className="mid-form">
        <div className="grid p-fluid">
          <div className="col-12 md:col-6">
            <div className="field">
              <label htmlFor="DNI">Identidad</label>
              <CFormInput id="inputnumber" className="p-valid" />
            </div>

            <div className="field">
              <label htmlFor="Nombre">Nombre</label>
              <CFormInput type="text" id="Nombre" className="p-valid" />
            </div>

            <div className="field mt-3">
              <label htmlFor="Apellido">Apellido</label>
              <CFormInput type="text" id="Apellido" className="p-valid" />
            </div>

            <div className="field">
              <label htmlFor="estadoCivil">Estado Civil</label>
              <CFormSelect
                value={estadoCivilSeleccionado}
                onChange={(e) => setEstadoCivilSeleccionado(e)}
                options={estadosCiviles}
                placeholder="Seleccionar"
              />
            </div>

            <div className="field">
              <label htmlFor="departamento">Departamentos</label>
              <Select id="ddldepto" name = "ddldepto"
                value={selectedDepartamento}
                onChange={(e) => setSelectedDepartamento(e)}
                options={departamentos}
                placeholder="Seleccionar"
              />
            </div>
            <div className="field">
              <label htmlFor="municipio">Municipios</label>
              <CFormSelect
                value={selectedMunicipio}
                onChange={(e) => setSelectedMunicipio(e)}
                options={municipios}
                placeholder="Seleccionar"
              />
            </div>

            <div className="field">
              <label htmlFor="sucursal">Sucursal</label>
              <CFormSelect
                placeholder="Seleccionar"
                value={selectedSucursal}
                onChange={(e) => setSelectedSucursal(e)}
                options={sucursalOptions}
              />
            </div>
          </div>

          <div className="col-12 md:col-6">
            <div className="field mt-3">
              <label htmlFor="Sexo">Sexo</label>
              <div className="grid">
                <div className="col-12 md:col-4">
                  <div className="field-radiobutton">
                    <CFormCheck
                      inputId="option1"
                      name="option"
                      value="M"
                      checked={radioValue === "M"}
                      onChange={(e) => setRadioValue(e.value)}
                    />
                    <label htmlFor="option1">Masculino</label>
                  </div>
                </div>
                <div className="col-12 md:col-4">
                  <div className="field-radiobutton">
                    <CFormCheck
                      inputId="option2"
                      name="option"
                      value="Los F"
                      checked={radioValue === "F"}
                      onChange={(e) => setRadioValue(e.value)}
                    />
                    <label htmlFor="option2">Femenino</label>
                  </div>
                </div>
              </div>

              <div className="field mt-3">
                <label htmlFor="Correo">Correo Elctronico</label>
                <CFormInput type="text" id="Correo" className="p-valid" />
              </div>

              <div className="field mt-3">
                <label htmlFor="Telefono">Telefono</label>
                <CFormInput type="text" id="Telefono" className="p-valid" />
              </div>

            </div>
          </div>
        </div>

        <CButton label="Success" severity="success" />
      </form>
    </div>
  );
};

export default CreateEmpleado;
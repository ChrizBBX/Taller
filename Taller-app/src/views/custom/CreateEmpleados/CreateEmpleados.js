import React, { useState, useEffect } from 'react';
import {
  CFormSelect,
  CFormCheck,
  CButton,
  CFormInput,
  CForm
} from '@coreui/react'
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
 
const CreateEmpleado = () => {

  const [estadosCiviles, setEstadosCiviles] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState('');
  const [radioValue, setRadioValue] = useState(null);
  const [dni, setDni] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [sucursal, setSucursal] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDirreccion] = useState('');

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = {
      empe_Nombres: nombre,
      empe_Apellidos: apellido,
      empe_Identidad: dni,
      empe_FechaNacimiento: selectedDate,
      empe_Sexo: radioValue,
      estacivi_Id: estadoCivil,
      muni_Id: municipio,
      empe_Direccion: direccion,
      empe_Telefono: telefono,
      empe_CorreoElectronico: correoElectronico,
      sucu_Id: sucursal
    };
    console.log(formData);
    axios.post('https://localhost:44387/api/Empleados/AgregarEmpleado', formData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

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
      <CForm className="mid-form grid-cols-2" onSubmit={handleFormSubmit}>
        <div className="row">
          <div className="form-group col-6 mt-3">
            <label htmlFor="DNI">Identidad</label>
            <CFormInput id="inputnumber" className="p-valid" value={dni} onChange={(event) => setDni(event.target.value)} />
          </div>

          <div className="form-group col-6 mt-3">
            <label htmlFor="Nombre">Nombre</label>
            <CFormInput type="text" id="Nombre" className="p-valid" value={nombre} onChange={(event) => setNombre(event.target.value)} />
          </div>

          <div className="form-group col-6 mt-3">
            <label htmlFor="Apellido">Apellido</label>
            <CFormInput type="text" id="Apellido" className="p-valid" value={apellido} onChange={(event) => setApellido(event.target.value)} />
          </div>

          <div className="form-group col-6 mt-3">
            <label htmlFor="estadocivil">Estados Civiles</label>
            <CFormSelect id="estadocivil" value={estadoCivil} onChange={(event) => setEstadoCivil(event.target.value)}>
              <option value="">Seleccione un Estado Civil</option>
              {estadosCiviles.map(estadocivil => (
                <option key={estadocivil.estacivi_ID} value={estadocivil.estacivi_ID}>{estadocivil.estacivi_Nombre}</option>
              ))}
            </CFormSelect>
          </div>

          <div className="form-group col-6 mt-3">
            <label htmlFor="departamento">Departamentos</label>
            <CFormSelect id="departamento" value={selectedDepartamento} onChange={handleDepartamentoChange}>
              <option value="">Selecciona un departamento</option>
              {departamentos.map(departamento => (
                <option key={departamento.depa_ID} value={departamento.depa_ID}>{departamento.depa_Nombre}</option>
              ))}
            </CFormSelect>
          </div>

          <div className="form-group col-6 mt-3">
            <label htmlFor="municipio">Municipios</label>
            <CFormSelect id="municipio" value={municipio} onChange={(event) => setMunicipio(event.target.value)}>
              {municipios.map(municipio => (
                <option key={municipio.muni_ID} value={municipio.muni_ID}>{municipio.muni_Nombre}</option>
              ))}
            </CFormSelect>
          </div>

          <div className="form-group col-6 mt-3">
            <label htmlFor="sucursal">Sucursales</label>
            <CFormSelect id="sucursal" value={sucursal} onChange={(event) => setSucursal(event.target.value)}>
              <option value="">Seleccione una Sucursal</option>
              {sucursales.map(sucursal => (
                <option key={sucursal.sucu_ID} value={sucursal.sucu_ID}>{sucursal.sucu_Descripcion}</option>
              ))}
            </CFormSelect>
          </div>

          <div className="form-group col-6 mt-3">
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
              <div  className="form-group col-6 mt-3">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              </div > 
             
              <div className="form-group col-6 mt-3">
                <label htmlFor="Dirrecion">Dirrecion</label>
                <CFormInput type="text" id="Dirrecion" className="p-valid" value={direccion} onChange={(event) => setDirreccion(event.target.value)} />
              </div>


              <div className="form-group col-6 mt-3">
                <label htmlFor="CorreoElectronico">Correo Electrónico</label>
                <CFormInput type="email" id="CorreoElectronico" className="p-valid" value={correoElectronico} onChange={(event) => setCorreoElectronico(event.target.value)} />
              </div>

              <div className="form-group col-6 mt-3">
                <label htmlFor="Telefono">Teléfono</label>
                <CFormInput type="text" id="Telefono" className="p-valid" keyfilter="num" value={telefono} onChange={(event) => setTelefono(event.target.value)} />
              </div>
            </div>
          </div>

        </div>
        <div className="field mt-3">

        </div>
        <div className="field button-field">
          <CButton color="primary" type='submit'>Guardar</CButton>
        </div>
      </CForm>
    </div>
  );

};

export default CreateEmpleado;
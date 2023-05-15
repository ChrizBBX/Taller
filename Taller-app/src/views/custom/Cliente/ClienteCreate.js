import React, { useState, useEffect } from 'react';
import {
    CFormSelect,
    CButton,
    CFormInput,
    CForm,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CCol,
    CFormCheck,
    CInputGroup,
    CFormLabel,
    CInputGroupText,
    CRow,
  } from '@coreui/react'
  import axios from 'axios';
  import { toast, ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'

  const CreateClientes = () => {
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)
    const [visible3, setVisible3] = useState(false)
    const [departamentos, setDepartamentos] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [selectedDepartamento, setSelectedDepartamento] = useState('');
    const [Actualizar, setActualizar] = useState(false)
    const [validated, setValidated] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [radioValue, setRadioValue] = useState(null);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [telefono, setTelefono] = useState('');
    const [FechaNac, setFechaNac] = useState('');
  
    const CreateAction = (event) => {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      setValidated(true)
      event.preventDefault()
      if (nombre != '' && apellido != ''  && FechaNac != '' && radioValue != ''  && municipio != '' ) {
        let payload = {
          clie_Nombres: nombre,
          clie_Apellidos: apellido,
          clie_FechaNacimiento: FechaNac,
          clie_Sexo: radioValue,
          muni_ID: municipio,
          clie_Telefono: telefono,
          clie_CorreoElectronico: correoElectronico,
        }
        axios
          .post('Clientes/Insert', payload)
          .then((response) => {
            setIsSubmitting(false)
            console.log(response)
            if (response.data.message == '1') {
              toast.success('Registro agregado exitosamente');
              setVisible(false)
              setActualizar(!Actualizar)
              navigate('/Clientes')
            } 
          })
          .catch((error) => {
            setActualizar(!Actualizar)
            toast.error('ha ocurrido un error');
          })
      } else {
        toast.error('Rellene los campos');
      }
    }
  
  
    useEffect(() => {
      axios.get('https://localhost:44387/api/Departamentos/ListarDepartamentos')
        .then(response => {
          setDepartamentos(response.data);
        })
        .catch(error => {
          console.error('Error fetching data from API:', error);
        });
    }, [Actualizar]);
  
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
  
    return (
      <div className='card' style={{ backgroundColor: 'white' }}>
        <div className='card-header'><h1>Nuevo Cliente</h1></div>
        <div className='card-body'>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={CreateAction}
          >
            <CRow>             
            <div className='col-6 mt-3'>
            <h6>Nombre Cliente</h6>
              <CFormInput
                type="text"
                id="validationCustom01"
                required
                value={nombre}
                onChange={(e) => { setNombre(e.target.value) }}
              />
            </div>
        <div className='col-6 mt-3'>
        <h6>Apellido Cliente</h6>
              <CFormInput
                type="text"
                id="validationCustom01"
                required
                value={apellido}
                onChange={(e) => { setApellido(e.target.value) }}
              />
        </div>
        <div className='col-6 mt-3'>
        <h6>Departamento</h6>
              <CFormSelect value={selectedDepartamento} onChange={(event) => setSelectedDepartamento(event.target.value)} className='mb-2' required>
                <option value="" hidden>--Seleccione una opcion--</option>
                {departamentos.map((departamento) => (
                  <option key={departamento.depa_ID} value={departamento.depa_ID}>{departamento.depa_Nombre}</option>
                ))}
              </CFormSelect>
        </div>
              <div className='col-6 mt-3'>
              <h6>Municipio</h6>
              <CFormSelect value={municipio} onChange={(event) => setMunicipio(event.target.value)} required>
                <option value="" hidden>{selectedDepartamento != '' ? '--Seleccione un municipio--' : 'Seleccione un departamento'}</option>
                {municipios.map(municipio => (
                  <option key={municipio.muni_ID} value={municipio.muni_ID}>{municipio.muni_Nombre}</option>
                ))}
              </CFormSelect>
              </div>
              
              <div className='col-6 mt-3'>
              <label htmlFor="Sexo">Sexo</label>
              <div className="grid">
                <div className="col-12 md:col-4">
                  <div className="field-radiobutton">
                    <CFormCheck
                      type='radio'
                      name="sexo"
                      id="masculino"
                      value="M"
                      required
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
                      required
                      checked={radioValue === "F"}
                      onChange={(e) => setRadioValue(e.target.value)}
                    />
                    <label htmlFor="option2">Femenino</label>
                  </div>
                </div>
              </div>
              </div>

              <div className='col-6 mt-3'>
              <CFormInput
                type="date"
                value={FechaNac}
                onChange={(e) => setFechaNac(e.target.value)}
                id="validationCustom01"
                label="Fecha de Nacimiento"
                required
              />       </div>    
              
         <div className='col-6 mt-3'>
         <h6>Correo</h6>
              <CFormInput
                type="email"
                id="validationCustom01"
                required
                value={correoElectronico}
                onChange={(e) => { setCorreoElectronico(e.target.value) }}
              />
         </div>
             <div className='col-6 mt-3'>
             <h6>Telefono</h6>
              <CFormInput
                type="number"
                id="validationCustom01"
                required
                value={telefono}
                onChange={(e) => { setTelefono(e.target.value) }}
              />
             </div>
            </CRow>
            <CRow className='mt-3'>
                  <div style={{display: 'inline-block'}}>
                  <CButton color="primary" type="submit" style={{marginRight: 20}}>
                  Guardar
                </CButton>
                <CButton color="secondary" onClick={() => navigate('/Clientes')}>
                  Regresar
                </CButton>
                  </div>
            
            </CRow>
          </CForm>
        </div>
      </div>
    );
  };
  
  export default CreateClientes;
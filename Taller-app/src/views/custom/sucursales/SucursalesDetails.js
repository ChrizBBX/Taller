import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar,esES } from '@mui/x-data-grid';
import { 
  CButton, 
  CModal, 
  CModalHeader, 
  CModalTitle,
   CModalBody, 
   CModalFooter,
   CForm,CCol,
   CFormInput,
   CFormCheck,
   CFormFeedback,
   CFormSelect,
   CInputGroup,
   CFormLabel,
   CInputGroupText,
   CRow,
 } from '@coreui/react';
import {Button, IconButton} from '@material-ui/core';
import {Delete,Edit, Book,} from '@material-ui/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'

function SucursalesDetails(){
    const navigate = useNavigate()
    const [sucursales, setSucursales] = useState([]);
    const [sortModel, setSortModel] = useState([{ field: 'sucu_ID', sort: 'asc' }]);
    const [sucuID,setSucuID] = useState('')
    const [sucuDescripcion,setSucuDescripcion] = useState('')
    const [muniID,setMuniID] = useState('')
    const [sucuDireccionExacta,setSucuDireccionExacta] = useState('')
    const [departamentos, setDepartamentos] = useState([]);
    const [selectedDepartamento, setSelectedDepartamento] = useState(null);
    const [selectedMunicipio, setselectedMunicipio] = useState(null);
    const [municipios, setMunicipios] = useState([]);
    const [validated, setValidated] = useState(false) 
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [visible3, setVisible3] = useState(false)
    const [Actualizar, setActualizar] = useState(false)

    useEffect(() => {
        axios.get('/Departamentos/ListarDepartamentos')
        .then(response => {
          setDepartamentos(response.data);
        })
        .catch(error => {
          console.error('Error fetching data from API:', error);
        });
    }, []);
    
    useEffect(() => {
      if (selectedDepartamento) {
        axios.get(`/Municipios/ListarMunicipiosPorDepto/${selectedDepartamento}`)
          .then(response => {
            setMunicipios(response.data);
          })  
          .catch(error => {
            console.error('Error fetching data from API:', error);
          });
      }
    }, [selectedDepartamento]);

    const EditAction = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        setValidated(true)
        event.preventDefault()
        if(sucuDescripcion != '' && selectedMunicipio != '' && sucuDireccionExacta != ''){
            let payload = {
              sucu_ID: sucuID,
              sucu_Descripcion: sucuDescripcion,
              muni_ID: selectedMunicipio,
              sucu_DireccionExacta: sucuDireccionExacta
              }
              axios
                .post('Sucursales/Update', payload)
                .then((response) => {
                  setIsSubmitting(false)
                  console.log(response)
                  if (response.data.message == '1') {
                    toast.success('Registro editado exitosamente');
                    navigate('/sucursales')
                  }else if(response.data.message == '2'){
                    setActualizar(!Actualizar)
                    toast.warning('Ya existe esa sucursal');
                  }
                })
                .catch((error) => {
                  setActualizar(!Actualizar)
                    toast.error('ha ocurrido un error');
                })
        }else{
            toast.error('Rellene los campos'); 
        }
      }

    useEffect(() => {
        const SucursalSeleccionada = JSON.parse(localStorage.getItem('SucursalSeleccionada'));
        console.log(SucursalSeleccionada)
        if (SucursalSeleccionada) {
            setSucursales(SucursalSeleccionada)
            setSucuID(SucursalSeleccionada.sucu_ID)
            setSucuDescripcion(SucursalSeleccionada.sucu_Descripcion)
            setSelectedDepartamento(SucursalSeleccionada.depa_ID)
            setselectedMunicipio(SucursalSeleccionada.muni_ID)
            setSucuDireccionExacta(SucursalSeleccionada.sucu_DireccionExacta)
        }
      }, [Actualizar]);

    return(
      <>
        <div className='card'>
            <div className='card-header'><h1>Detalles</h1></div>
            <div className='card-body'>
                <div className='row'>
                    <div className='form-group col-6'>
                        <h4>ID</h4>
                        <label>{sucursales.sucu_ID}</label>
                    </div>
                    <div className='form-group col-6'>
                        <h4>Sucursal</h4>
                        <label>{sucursales.sucu_Descripcion}</label>
                    </div>
                    <div className='form-group col-6 mt-3'>
                        <h4>Departamento</h4>
                        <label>{sucursales.depa_Nombre}</label>
                    </div>
                    <div className='form-group col-6 mt-3'>
                        <h4>Municipio</h4>
                        <label>{sucursales.muni_Nombre}</label>
                    </div>
                    <div className='form-group col-6 mt-3'>
                        <h4>Direccion Exacta</h4>
                        <label>{sucursales.sucu_DireccionExacta}</label>
                    </div>
                </div>
                <div className="row">
     <div style={{height: 20}}></div>
          <div className="col-1">
          <CButton color="warning" onClick={() => setVisible2(!visible2)}>Editar</CButton>

          </div>
          <div className="col-3">
          <CButton color="info" onClick={() => {  navigate('/sucursales')}}>Regresar</CButton>
          </div>
          <div style={{height: 20}}></div>
     </div>
                
                <div className="card">
  <div className="card-header"><h2>Auditoria</h2></div>
  
  <table className="table table-striped">
          <thead>
          <tr>
                        <th>Accion</th>
                        <th>Usuario</th>
                        <th>Fecha</th>
          </tr>
          </thead>
          <tbody>
          <tr>
                            <td><label>Creacion</label></td>
                            <td>{sucursales.sucu_UserCreacion_Nombre}</td>
                            <td>{sucursales.sucu_FechaCreacion}</td>
                        </tr>
                        <tr>
                            <td>Modificacion</td>
                            <td>{sucursales.sucu_UserModificacion_Nombre}</td>
                            <td>{sucursales.sucu_FechaModificacion}</td>
                        </tr>
          </tbody>
         </table>
</div>
            </div>
        </div>
                   {/*Modal Edit*/}
    <CModal visible={visible2} onClose={() => setVisible2(false)}>
      <CModalHeader onClose={() => setVisible2(false)}>
        <CModalTitle>Editar Sucursal</CModalTitle>
      </CModalHeader>
      <CModalBody>
      <CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={EditAction}
  >
    <CCol>
          <h6>Nombre</h6>
    <CFormInput
        type="text"
        id="validationCustom01"
        required
        value={sucuDescripcion}
        onChange={(e) => setSucuDescripcion(e.target.value)}
      />
          <h6>Departamento</h6>
    <CFormSelect value={selectedDepartamento} onChange={(event) => setSelectedDepartamento(event.target.value)} className='mb-2' required>
        {departamentos.map((departamento) => (
          <option key={departamento.depa_ID} value={departamento.depa_ID}>{departamento.depa_Nombre}</option>
        ))}
      </CFormSelect>
      <h6>Municipio</h6>
      <CFormSelect value={selectedMunicipio} onChange={(event) => setselectedMunicipio(event.target.value)} required>
      <option value="" hidden>{selectedDepartamento != '' ? '--Seleccione un municipio--' : 'Seleccione un departamento'}</option>
              {municipios.map(municipio => (
                <option key={municipio.muni_ID} value={municipio.muni_ID}>{municipio.muni_Nombre}</option>
              ))}
            </CFormSelect>
            <h6>Direccion Exacta</h6>
    <CFormInput
        type="text"
        id="validationCustom01"
        required
        value={sucuDireccionExacta}
        onChange={(e) => setSucuDireccionExacta(e.target.value)}
      />
    </CCol>
    <CRow className='mt-3 offset-7'>
      <CCol className='col-2'>
    <CButton color="secondary" onClick={() => setVisible2(false)}>
          Cerrar
        </CButton>
        </CCol>
        <CCol>
        <CButton color="primary" type="submit">
        Guardar
      </CButton>
      </CCol>
    </CRow>
      </CForm>   
      </CModalBody>
    </CModal>
        {/*Fin Modal Edit*/}
      </>
    )
}

export default SucursalesDetails
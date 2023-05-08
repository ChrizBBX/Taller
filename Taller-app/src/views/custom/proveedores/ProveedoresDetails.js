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
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { red } from '@material-ui/core/colors';


function ProveedoresDetails (){
    const navigate = useNavigate()
    const [proveedores, setProveedores] = useState([]);
    const [proveedoresSeleccionado, setproveedoresSeleccionado] = useState([]);
    const [sortModel, setSortModel] = useState([{ field: 'prov_ID', sort: 'asc' }]);
    const [ProveedoresID, setProveedoresID] = useState('');
    const [ProveedoresRut, setProveedoresRut] = useState('');
    const [ProveedoresNombre, setProveedoresNombre] = useState('');
    const [ProveedoresCorreoElectronico, setProveedoresCorreoElectronico] = useState('');
    const [ProveedoresTelefono, setProveedoresTelefono] = useState('');
    const [ProveedoresDireccion, setProveedoresDireccion] = useState('');
    const [validated, setValidated] = useState(false) 
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [visible3, setVisible3] = useState(false)
    const [Actualizar, setActualizar] = useState(false)

    useEffect(() => {
        const ProveedorSeleccionado = JSON.parse(localStorage.getItem('ProveedorSeleccionado'));
        if (ProveedorSeleccionado) {
            setProveedores(ProveedorSeleccionado)
            setProveedoresID(ProveedorSeleccionado.prov_ID)
            setProveedoresRut(ProveedorSeleccionado.prov_Rut)
            setProveedoresNombre(ProveedorSeleccionado.prov_Nombre)
            setProveedoresCorreoElectronico(ProveedorSeleccionado.prov_CorreoElectronico)
            setProveedoresTelefono(ProveedorSeleccionado.prov_Telefono)
            setProveedoresDireccion(ProveedorSeleccionado.prov_Dirrecion)
        }
      }, []);

      const EditAction = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        setValidated(true)
        event.preventDefault()
        if(ProveedoresNombre != '' && ProveedoresRut != '' && ProveedoresCorreoElectronico != '' && ProveedoresTelefono != '' && ProveedoresDireccion != ''){
            let payload = {
                prov_ID : ProveedoresID,
                prov_Rut: ProveedoresRut,
                prov_Nombre: ProveedoresNombre,
                prov_CorreoElectronico: ProveedoresCorreoElectronico,
                prov_Telefono: ProveedoresTelefono,
                prov_Dirrecion: ProveedoresDireccion
              }
              axios
                .post('Proveedores/Update', payload)
                .then((response) => {
                  setIsSubmitting(false)
                  console.log(response)
                  if (response.data.message == '1') {
                    toast.success('Registro agregado exitosamente');
                    setVisible2(false)
                    setActualizar(!Actualizar)
                    navigate('/proveedores')
                  }else if(response.data.message == '2'){
                    setActualizar(!Actualizar)
                    toast.warning('Ya existe un proveedor con ese rut');
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

    return(
        <>
        <div className='card'>
            <div className='card-header'><h1>Detalles</h1></div>
            <div className='card-body'>
                <div className='row'>
                    <div className='form-group col-6'>
                        <h4>ID</h4>
                        <label>{ProveedoresID}</label>
                    </div>
                    <div className='form-group col-6'>
                        <h4>Rut</h4>
                        <label>{ProveedoresRut}</label>
                    </div>
                    <div className='form-group col-6 mt-3'>
                        <h4>Proveedor</h4>
                        <label>{ProveedoresNombre}</label>
                    </div>
                    <div className='form-group col-6 mt-3'>
                        <h4>Correo Electrónico</h4>
                        <label>{ProveedoresCorreoElectronico}</label>
                    </div>
                    <div className='form-group col-6 mt-3'>
                        <h4>Telefono</h4>
                        <label>{ProveedoresTelefono}</label>
                    </div>
                    <div className='form-group col-6 mt-3'>
                        <h4>Dirección</h4>
                        <label>{ProveedoresDireccion}</label>
                    </div>
                </div>
                <div className="row">
     <div style={{height: 20}}></div>
          <div className="col-1">
          <CButton color="warning" onClick={() => setVisible2(!visible2)}>Editar</CButton>

          </div>
          <div className="col-3">
          <CButton color="info" onClick={() => {  navigate('/proveedores')}}>Regresar</CButton>
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
                            <td>{proveedores.prov_UserCreacion_Nombre}</td>
                            <td>{proveedores.prov_FechaCreacion}</td>
                        </tr>
                        <tr>
                            <td>Modificacion</td>
                            <td>{proveedores.prov_UserModificacion_Nombre}</td>
                            <td>{proveedores.prov_FechaModificacion}</td>
                        </tr>
          </tbody>
         </table>
</div>
            </div>
        </div>
        {/*Modal Edit*/}
     <CModal visible={visible2} onClose={() => setVisible2(false)}>
      <CModalHeader onClose={() => setVisible2(false)}>
        <CModalTitle>Editar Proveedor</CModalTitle>
      </CModalHeader>
      <CModalBody>
      <CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={EditAction}
  >
    <CCol>
    <h6>Rut</h6>
    <CFormInput
        type="number"
        id="validationCustom01"
        required
        maxLength={13} // agregado maxLength
        value={ProveedoresRut}
        onChange={(e) => {
          if (e.target.value.length <= 13) { // validación de longitud máxima de 13 caracteres
            setProveedoresRut(e.target.value)
          }
        }}
      />
    <h6>Nombre</h6>
    <CFormInput
        type="text"
        id="validationCustom01"
        required
        value={ProveedoresNombre}
        onChange={(e) => setProveedoresNombre(e.target.value)}
      />
        <h6>Correo Electrónico</h6>
    <CFormInput
        type="email"
        id="validationCustom01"
        required
        value={ProveedoresCorreoElectronico}
        onChange={(e) => setProveedoresCorreoElectronico(e.target.value)}
      />
       <h6>Telefono</h6>
    <CFormInput
        type="text"
        id="validationCustom01"
        required
        value={ProveedoresTelefono}
        onChange={(e) => {
          if (e.target.value.length <= 15) { // validación de longitud máxima de 13 caracteres
            setProveedoresTelefono(e.target.value)
          }
        }}
      />
          <h6>Dirección</h6>
    <CFormInput
        type="text"
        id="validationCustom01"
        required
        value={ProveedoresDireccion}
        onChange={(e) => setProveedoresDireccion(e.target.value)}
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

export default ProveedoresDetails
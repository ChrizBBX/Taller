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
import { red } from '@material-ui/core/colors';


function EstadosDetails (){
    const navigate = useNavigate()
    const [MetodosPagos, setMetodosPagos] = useState([]);
    const [sortModel, setSortModel] = useState([{ field: 'meto_ID', sort: 'asc' }]);
    const [modalVisible, setModalVisible] = useState(false);
    const [metodoID,setmetodoID]  = useState('')
    const [metodoNombre,setmetodoNombre] = useState('')
    const [validated, setValidated] = useState(false) 
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [visible3, setVisible3] = useState(false)
    const [Actualizar, setActualizar] = useState(false)
    useEffect(() => {
        const MetodoSeleccionado = JSON.parse(localStorage.getItem('MetodoSeleccionado'));
        if (MetodoSeleccionado) {
            setMetodosPagos(MetodoSeleccionado)
            setmetodoID(MetodoSeleccionado.meto_ID)
            setmetodoNombre(MetodoSeleccionado.meto_Nombre)
        }
      }, [Actualizar]);

      const EditAction = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        setValidated(true)
        event.preventDefault()
        if(metodoNombre != ''){
            let payload = {
                meto_ID: metodoID,
                meto_Nombre: metodoNombre,
              }
              axios
                .post('MetodosPagos/Update', payload)
                .then((response) => {
                  setIsSubmitting(false)
                  console.log(response)
                  if (response.data.message == '1') {
                    toast.success('Registro editado exitosamente');
                    navigate('estados')
                  }else if(response.data.message == '2'){
                    setActualizar(!Actualizar)
                    toast.warning('Ya existe un Metodo de Pago con ese nombre');
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
                    <label>{MetodosPagos.meto_ID}</label>
                    </div>
                    <div className='form-group col-6'>
                    <h4>Servicio</h4>
                    <label>{MetodosPagos.meto_Nombre}</label>
                    </div>
               </div>
               <div className="row">
     <div style={{height: 20}}></div>
          <div className="col-1">
          <CButton color="warning" onClick={() => setVisible2(!visible2)}>Editar</CButton>

          </div>
          <div className="col-3">
          <CButton color="info" onClick={() => {  navigate('/MetodosPagos')}}>Regresar</CButton>
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
                            <td>{MetodosPagos.meto_UserCreacion_Nombre}</td>
                            <td>{MetodosPagos.meto_FechaCreacion}</td>
                        </tr>
                        <tr>
                            <td>Modificacion</td>
                            <td>{MetodosPagos.meto_UserModificacion_Nombre}</td>
                            <td>{MetodosPagos.meto_FechaModificacion}</td>
                        </tr>
          </tbody>
         </table>
</div>
            </div>
        </div>
                     {/*Modal Edit*/}
     <CModal visible={visible2} onClose={() => setVisible2(false)}>
      <CModalHeader onClose={() => setVisible2(false)}>
        <CModalTitle>Editar Meteodo de Pago</CModalTitle>
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
        value={metodoNombre}
        onChange={(e) => setmetodoNombre(e.target.value)}
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


export default EstadosDetails
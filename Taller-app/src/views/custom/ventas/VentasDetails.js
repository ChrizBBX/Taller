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
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate,useLocation } from 'react-router-dom'

function VentasDetails(){
    const navigate = useNavigate()
    const location = useLocation();
    const arregloRecibido = location.state?.ventas ?? "";
    const [facturaID, setFacturaID] = useState('0');
    const [ventID,setVentID] = useState(arregloRecibido.vent_Id)
    const [clieID,setClieID] = useState(arregloRecibido.clie_ID)
    const [metoID,setMetoID] = useState(arregloRecibido.meto_ID)
    const [vehiID,setVehiID] = useState(arregloRecibido.vehi_ID)
    const [respID,setRespID] = useState('')
    const [servID,setServID] = useState('')
    const [detalles,setDetalles] = useState([])
    const [detalles2,setDetalles2] = useState([])
    const [cantidad,setCantidad] = useState(1)
    const [clientes,setClientes] = useState([])
    const [metodosPago,setMetodosPago] = useState([]) 
    const [vehiculos,setVehiculos] = useState([])
    const [servicios, setServicios] = useState([])
    const [repuestos, setRepuestos] = useState([])
    const [Actualizar, setActualizar] = useState(false)
    const [paso1,setPaso1] = useState(true)
    const [validated, setValidated] = useState(false) 
    const [validated2, setValidated2] = useState(false) 
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [sortModel, setSortModel] = useState([{ field: 'vent_Id', sort: 'asc' }]);
    const [disableFields, setDisableFields] = useState(false); // nuevo estado para deshabilitar los campos de selección
    const [tipo, setTipo] = useState(false)


    console.log(arregloRecibido)
    return (
<>
<div className="card">
    <div className='card-header'><h1>Detalles</h1></div>
            <div className="card-body">
        <div className='row'>
        <div className='form-group col-6'>
                    <h3>ID</h3>
                    <label>{ventID}</label>
                </div>
                <div className='form-group col-6'>
                    <h3>Cliente</h3>
                    <label>{arregloRecibido.clie_Nombres}</label>
                </div>
                <div className='form-group col-6 mt-3'>
                    <h3>Metodos de pago</h3>
                    <label>{arregloRecibido.meto_Nombre}</label>
                </div>
                <div className='form-group col-6 mt-3'>
                    <h3>Sucursales</h3>
                    <label>{arregloRecibido.sucu_Descripcion}</label>
                </div>
                <div className="row">
     <div style={{height: 20}}></div>
          <div className="col-1">
          <CButton color="warning" onClick={() => navigate('/ventasEdit',{ state: { ventas: arregloRecibido } })}>Editar</CButton>

          </div>
          <div className="col-3">
          <CButton color="info" onClick={() => {navigate('/ventas')}}>Regresar</CButton>
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
                            <td>{arregloRecibido.vent_UserCreacion_Nombre}</td>
                            <td>{arregloRecibido.vent_FechaCreacion}</td>
                        </tr>
                        <tr>
                            <td>Modificacion</td>
                            <td>{arregloRecibido.vent_UserModificacion_Nombre}</td>
                            <td>{arregloRecibido.vent_FechaModificacion}</td>
                        </tr>
          </tbody>
         </table>
</div>
        </div>
            </div>
        </div>
</>
    )
}

export default VentasDetails
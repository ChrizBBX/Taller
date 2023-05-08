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
import Clientes from '../Cliente/Cliente';


function VentasCreate (){
const [clieID,setClieID] = useState('')
const [clientes,setClientes] = useState([])
const [Actualizar, setActualizar] = useState(false)

useEffect(() => {
    axios
      .get('/Clientes')
      .then((response) => {
        const insertarid = response.data.map((row) => ({
          ...row,
          id: row.clie_ID,
        }));
        setClientes(insertarid);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [Actualizar]);

return(
    <div className='card'>
        <div className='card-body'>
<div className='row'>

   <div className='col-6'>
   <div className='card'>
    <div className='card-header'><h3>Encabezado</h3></div>
            <div className='card-body'>
            <CCol>
                    <h5>Cliente</h5>
             <CFormSelect value={clieID} onChange={(event) => setClieID(event.target.value)} className='mb-2' required>
             <option value="" hidden>--Seleccione un cliente--</option>
        {clientes.map((cliente) => (
          <option key={cliente.clie_ID} value={cliente.clie_ID}>{cliente.clie_Nombres}</option>
        ))}
      </CFormSelect>
      </CCol>
            </div>
        </div>
   </div>

   <div className='col-6'>
   <div className='card'>
   <div className='card-header'><h3>Venta</h3></div>
            <div className='card-body'>
            <div className='form-group col-6'>
                    <h5>aaaa</h5>
                </div>
            </div>
        </div>
   </div>
            </div>


        </div>
    </div>
)
}

export default VentasCreate


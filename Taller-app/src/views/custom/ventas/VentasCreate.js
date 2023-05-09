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
const [metoID,setMetoID] = useState('')
const [vehiID,setVehiID] = useState('')
const [clientes,setClientes] = useState([])
const [metodosPago,setMetodosPago] = useState([]) 
const [vehiculos,setVehiculos] = useState([])
const [Actualizar, setActualizar] = useState(false)
const [validated, setValidated] = useState(false) 
const [isSubmitting, setIsSubmitting] = useState(false)

useEffect(() => {
    axios
      .get('/MetodosPagos')
      .then((response) => {
        const insertarid = response.data.map((row) => ({
          ...row,
          id: row.meto_ID,
        }));
        setMetodosPago(insertarid);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [Actualizar]);

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

  useEffect(() => {
    axios
      .get('/Vehiculos')
      .then((response) => {
        const insertarid = response.data.map((row) => ({
          ...row,
          id: row.vehi_ID,
        }));
        setVehiculos(insertarid);
        console.log(vehiculos)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [Actualizar]);

  const CreateAction = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    event.preventDefault()
    if(clieID != '' && metoID != '' && vehiID != ''){
    let payload = {
      clie_ID: clieID,
      meto_ID: metoID,
      sucu_ID: 1,
      vehi_ID: vehiID
    }
    axios
      .post('Ventas/Insert', payload)
      .then((response) => {
        setIsSubmitting(false)
        console.log(response)
        if (response.data.message == '1') {
            setActualizar(!Actualizar)
        }
      })
      .catch((error) => {
        console.log(error)
        setActualizar(!Actualizar)
          toast.error('ha ocurrido un error');
      })
    }else{
      toast.error('Rellene los campos');
    }
  }

return(
    <div className='card'>
        <div className='card-body'>
<div className='row'>

   <div className='col-6'>
   <div className='card'>
    <div className='card-header'><h3>Encabezado</h3></div>
            <div className='card-body'>
            <CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={CreateAction}
  >
    <CCol>
                    <h5>Cliente</h5>
             <CFormSelect value={clieID} onChange={(event) => setClieID(event.target.value)} className='mb-2' required>
             <option value="" hidden>--Seleccione un cliente--</option>
        {clientes.map((cliente) => (
          <option key={cliente.clie_ID} value={cliente.clie_ID}>{cliente.clie_Nombres}</option>
        ))}
      </CFormSelect>
      <h5>Metodo de Pago</h5>
             <CFormSelect value={metoID} onChange={(event) => setMetoID(event.target.value)} className='mb-2' required>
             <option value="" hidden>--Seleccione un metodo de pago--</option>
        {metodosPago.map((metodosPagos) => (
          <option key={metodosPagos.meto_ID} value={metodosPagos.meto_ID}>{metodosPagos.meto_Nombre}</option>
        ))}
      </CFormSelect>
      <h5>Vehiculo</h5>
             <CFormSelect value={vehiID} onChange={(event) => setVehiID(event.target.value)} className='mb-2' required>
             <option value="" hidden>--Seleccione el vehiculo--</option>
        {vehiculos.map((vehiculo) => (
          <option key={vehiculo.vehi_ID} value={vehiculo.vehi_ID}>{vehiculo.modelo_Matricula}</option>
        ))}
      </CFormSelect>
      <CCol>
        <CButton color="primary" type="submit">
        Continuar
      </CButton>
      </CCol>
      </CCol>
      </CForm>   
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


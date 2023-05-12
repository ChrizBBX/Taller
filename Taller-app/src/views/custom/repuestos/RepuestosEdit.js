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
import Marcas from '../marcas/Marcas';

function RepuestosEdit (){
    const navigate = useNavigate()
    const [proveedores, setProveedores] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [repuestos, setRepuestos] = useState([]);
    const [respID, setrespID] = useState('')
    const [respDescripcion, setrespDescripcion] = useState('')
    const [respPrecio, setrespPrecio] = useState('')
    const [provID, setprovID] = useState(null)
    const [marcID, setmarcID] = useState(null)
    const [respAnio, setrespAnio] = useState('')
    const [respStock, setrespStock] = useState('')
    const [sortModel, setSortModel] = useState([{ field: 'resp_ID', sort: 'asc' }]);
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [visible3, setVisible3] = useState(false) 
    const [Actualizar, setActualizar] = useState(false)
    const [validated, setValidated] = useState(false) 
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        const Repuesto = JSON.parse(localStorage.getItem('RepuestoSeleccionado'));
        console.log(Repuesto)
        if (Repuesto) {
            setrespID(Repuesto.resp_ID);
            setrespDescripcion(Repuesto.resp_Descripcion);
            setrespPrecio(Repuesto.resp_Precio);
            setprovID(Repuesto.prov_ID);
            setmarcID(Repuesto.marc_ID);
            setrespAnio(Repuesto.resp_Anio);
            setrespStock(Repuesto.resp_Stock)
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
        if(respDescripcion != '' && respPrecio != '' && provID != '' && marcID != '' && respAnio >= 1960 && respAnio <= 2023){
            let payload = {
                resp_ID: respID,
                resp_Descripcion: respDescripcion,
                resp_Precio: respPrecio,
                prov_ID: provID,
                marc_ID: marcID,
                resp_Anio: respAnio,
                resp_Stock: respStock
              }
              axios
                .post('Repuestos/Update', payload)
                .then((response) => {
                  setIsSubmitting(false)
                  console.log(response)
                  if (response.data.message == '1') {
                    toast.success('Registro agregado exitosamente');
                    setVisible(false)
                    setActualizar(!Actualizar)
                    navigate('/repuestos')
                  }else if(response.data.message == '2'){
                    setActualizar(!Actualizar)
                    toast.warning('Ya existe ese registro');
                  }
                })
                .catch((error) => {
                  setActualizar(!Actualizar)
                    toast.error('ha ocurrido un error');
                })
        }else{  
            if(respAnio >= 1960 && respAnio <= 2023){
                toast.error('Rellene los campos'); 
            }else
            toast.error('Año de repuesto invalido');     
        }
      }

    useEffect(() => {
        axios
        .get('/Proveedores')
        .then((response) => {
            const insertarid = response.data.map((row) => ({
              ...row,
              id: row.prov_ID,
            }));
            setProveedores(insertarid);
          })
        .catch((error) => {
        console.log(error);
        });
        }, [Actualizar]);

        useEffect(() => {
            axios
              .get('/Marcas')
              .then((response) => {
                const insertarid = response.data.map((row) => ({
                  ...row,
                  id: row.marc_ID,
                }));
                setMarcas(insertarid);
              })
              .catch((error) => {
                console.log(error);
              });
          }, [Actualizar]);
          
        
          const handleSortModelChange = (model) => {
            setSortModel(model);
          };

    return(
        <div className='card' style={{backgroundColor: 'white'}}>
            <div className='card-header'><h1>Editar Repuesto</h1></div>
            <div className='card-body'>
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
        value={respDescripcion}
        onChange={(e) => {setrespDescripcion(e.target.value)}}
      />
        <h6>Precio</h6>
    <CFormInput
        type="number"
        id="validationCustom01"
        required
        value={respPrecio}
        onChange={(e) => {setrespPrecio(e.target.value)}}
      />
             <h6>Proveedor</h6>
             <CFormSelect value={provID} onChange={(event) => setprovID(event.target.value)} className='mb-2' required>
             <option value="" hidden>--Seleccione una opcion--</option>
        {proveedores.map((proveedor) => (
          <option key={proveedor.prov_ID} value={proveedor.prov_ID}>{proveedor.prov_Nombre}</option>
        ))}
      </CFormSelect>
      <h6>Marca</h6>
             <CFormSelect value={marcID} onChange={(event) => setmarcID(event.target.value)} className='mb-2' required>
    <option value="" hidden>--Seleccione una opcion--</option>
        {marcas.map((marca) => (
          <option key={marca.marc_ID} value={marca.marc_ID}>{marca.marc_Nombre}</option>
        ))}
      </CFormSelect>
      <h6>Año</h6>
    <CFormInput
        type="number"
        id="validationCustom01"
        required
        value={respAnio}
        onChange={(e) => {setrespAnio(e.target.value)}}
      />
                 <h6>Stock Inicial</h6>
          <CFormInput
        type="number"
        id="validationCustom01"
        required
        value={respStock}
        onChange={(e) => {setrespStock(e.target.value)}}
      />
    </CCol>
    <CRow className='mt-3 mb-3'>
      <CCol className='col-2'>
    <CButton color="secondary" onClick={() => navigate('/repuestos')}>
          Regresar
        </CButton>
        </CCol>
     <CCol className='col-1'>
     <CButton color="primary" type="submit">
        Guardar
      </CButton>
     </CCol>
    </CRow>
      </CForm> 
      </div>
      </div>
    )
}

export default RepuestosEdit
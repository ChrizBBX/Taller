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
const [respID,setRespID] = useState(null)
const [servID,setServID] = useState(null)
const [precioVenta,setprecioVenta] = useState(0)
const [detalles,setDetalles] = useState([])
const [cantidad,setCantidad] = useState(1)
const [clientes,setClientes] = useState([])
const [metodosPago,setMetodosPago] = useState([]) 
const [vehiculos,setVehiculos] = useState([])
const [servicios, setServicios] = useState([])
const [repuestos, setRepuestos] = useState([])
const [Actualizar, setActualizar] = useState(false)
const [validated, setValidated] = useState(false) 
const [validated2, setValidated2] = useState(false) 
const [isSubmitting, setIsSubmitting] = useState(false)
const [sortModel, setSortModel] = useState([{ field: 'vent_Id', sort: 'asc' }]);
const [disableFields, setDisableFields] = useState(false); // nuevo estado para deshabilitar los campos de selección
const [tipo, setTipo] = useState(false)

const columns = [
  { field: 'serv_Descripcion', headerName: 'Servicio', flex:1 },
  { field: 'resp_Descripcion', headerName: 'Repuesto', flex:1 },
  { field: 'deve_Cantidad', headerName: 'Cantidad', flex: 1},
  { field: 'deve_PrecioVenta', headerName: 'Precio',flex:1 },
  {
    field: 'acciones',
    headerName: 'Acciones',
    width: 300,
    renderCell: (params) => (
      <div>
            <CButton color='danger' variant='outline' className='m-3'><Delete/></CButton>
      </div>
    ),
  },
];

useEffect(() => {
    axios
      .get('/MetodosPagos')
      .then((response) => {
        const insertarid = response.data.map((row) => ({
          ...row,
          id: row.meto_ID,
        }));
        setMetodosPago(insertarid);
        console.log(metodosPago)
      })
      .catch((error) => {
        console.log(error);
      });


      axios
      .get('/Servicios')
      .then((response) => {
        const insertarid = response.data.map((row) => ({
          ...row,
          id: row.serv_ID,
        }));
        setServicios(insertarid);
      })
      .catch((error) => {
        console.log(error);
      });

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

      axios
      .get('/Repuestos')
      .then((response) => {
        const insertarid = response.data.map((row) => ({
          ...row,
          id: row.resp_ID,
        }));
        setRepuestos(insertarid);
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get('DetallesVentas/temp')
      .then((response) => {
        const insertarid = response.data.map((row) => ({
          ...row,
          id: row.deve_ID,
        }));
        setDetalles(insertarid);
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get('/Vehiculos')
      .then((response) => {
        const insertarid = response.data.map((row) => ({
          ...row,
          id: row.vehi_ID,
        }));
        setVehiculos(insertarid);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [Actualizar]);


 


  const handleSortModelChange = (model) => {
    setSortModel(model);
  };

  const CreateAction = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    event.preventDefault()
    if(clieID !== '' && metoID !== '' && vehiID !== ''){
    let payload = {
      clie_ID: clieID,
      meto_ID: metoID,
      sucu_ID: 1,
    }
    axios
      .post('Ventas/Insert', payload)
      .then((response) => {
        setIsSubmitting(false)
        if (response.data.message === '1') {
          setDisableFields(true)
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

  const CreateAction2 = (event) => {
    if(tipo){
      if(respID != null){
        const form = event.currentTarget
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        setValidated2(true)
        event.preventDefault()
        let payload = {
          vehi_ID: vehiID,
          serv_ID: servID,
          resp_ID: respID,
          deve_Cantidad: cantidad,
          deve_UserCreacion: 1
        }
        axios
          .post('DetallesVentas/Insert', payload)
          .then((response) => {
            setIsSubmitting(false)
            console.log(response)
            if (response.data.message === '1') {
              toast.success('Agregado exitosamente')
                setActualizar(!Actualizar)
            }
          })
          .catch((error) => {
            console.log(error)
            setActualizar(!Actualizar)
              toast.error('ha ocurrido un error');
          })
      }else{
        toast.error('Ingrese un repuesto')
      }
    }else{
      if(servID != null){
        const form = event.currentTarget
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        setValidated2(true)
        event.preventDefault()
        let payload = {
          vehi_ID: vehiID,
          serv_ID: servID,
          resp_ID: respID,
          deve_Cantidad: cantidad,
          deve_UserCreacion: 1
        }
        axios
          .post('DetallesVentas/Insert', payload)
          .then((response) => {
            setIsSubmitting(false)
            console.log(response)
            if (response.data.message === '1') {
                setActualizar(!Actualizar)
                toast.success('Agregado exitosamente')
            }
          })
          .catch((error) => {
            console.log(error)
            setActualizar(!Actualizar)
              toast.error('ha ocurrido un error');
          })
      }else{
        toast.error('Ingrese un servicio')
      }
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
             <CFormSelect value={clieID} onChange={(event) => setClieID(event.target.value)} className='mb-2' required id='selectClieID' disabled={disableFields ? true : undefined} >
             <option value="" hidden>--Seleccione un cliente--</option>
        {clientes.map((cliente) => (
          <option key={cliente.clie_ID} value={cliente.clie_ID}>{cliente.clie_Nombres}</option>
        ))}
      </CFormSelect>
      <h5>Metodo de Pago</h5>
             <CFormSelect value={metoID} onChange={(event) => setMetoID(event.target.value)} className='mb-2' required id='selectMetoID' disabled={disableFields ? true : undefined} >
             <option value="" hidden>--Seleccione un metodo de pago--</option>
        {metodosPago.map((metodosPagos) => (
          <option key={metodosPagos.meto_ID} value={metodosPagos.meto_ID}>{metodosPagos.meto_Nombre}</option>
        ))}
      </CFormSelect>
      <h5>Vehiculo</h5>
             <CFormSelect value={vehiID} onChange={(event) => setVehiID(event.target.value)} className='mb-2' required id='selectVehiID' disabled={disableFields ? true : undefined} >
             <option value="" hidden>--Seleccione el vehiculo--</option>
        {vehiculos.map((vehiculo) => (
          <option key={vehiculo.vehi_ID} value={vehiculo.vehi_ID}>{vehiculo.modelo_Matricula}</option>
        ))}
      </CFormSelect>
      <CCol>
        <CButton color="primary" type="submit" disabled={disableFields ? true : undefined} >
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
            <CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated2}
    onSubmit={CreateAction2}
  >
    <CCol>
<div className='row'>
<div className='form-group col-6'>
<CButton color={tipo ? 'secondary' : 'info'} variant='outline' disabled={disableFields ? false : true} style={{width: '100%'}} onClick={() => {setTipo(false); setRespID(null); setServID(null)}}>Servicio</CButton>  
</div>
<div className='form-group col-6'>  
<CButton color={tipo ? 'info' : 'secondary'} variant='outline' disabled={disableFields ? false : true} style={{width: '100%'}} onClick={() => {setTipo(true); setServID(null); setRespID(null)}}>Repuesto</CButton>
</div>
</div>
                    <h5 hidden={tipo ? true : false}>Servicio</h5>
             <CFormSelect value={servID} onChange={(event) => setServID(event.target.value)} className='mb-2' required={tipo ? false :  true} id='selectClieID' disabled={disableFields ? false : true} hidden={tipo ? true : false}>
             <option value="" hidden>--Seleccione un servicio--</option>
        {servicios.map((servicio) => (
          <option key={servicio.serv_ID} value={servicio.serv_ID}>{servicio.serv_Descripcion}</option>
        ))}
      </CFormSelect>

      <h5 hidden={tipo ? false : true}>Repuesto</h5>
             <CFormSelect value={respID} onChange={(event) => setRespID(event.target.value)} className='mb-2' required={tipo ? true :  false} id='selectClieID' disabled={disableFields ? false : true} hidden={tipo ? false : true}>
             <option value="" hidden>--Seleccione un repuesto--</option>
        {repuestos.map((repuesto) => (
          <option key={repuesto.resp_ID} value={repuesto.resp_ID}>{repuesto.resp_Descripcion}</option>
        ))}
      </CFormSelect>

      <h6>Cantidad</h6>
    <CFormInput
        type="number"
        id="validationCustom01"
        required
        value={cantidad}
        onChange={(e) => {
          if (e.target.value > 0) { 
            setCantidad(e.target.value)
          }
        }}
        disabled={disableFields ? false : true}
      />
        <CButton color="primary" type="submit" disabled={disableFields ? false : true} className='mt-3'>
        Agregar
      </CButton>
      </CCol>
      
      </CForm>   
            </div>
        </div>
   </div>
            </div>
            <DataGrid
            rows={detalles}
            columns={columns}
            sortModel={sortModel}
            onSortModelChange={handleSortModelChange}
            components={{
              Toolbar: GridToolbar,
            }}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          />

        </div>
    </div>
)
}

export default VentasCreate


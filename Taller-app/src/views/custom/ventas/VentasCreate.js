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
import {Button, IconButton, colors} from '@material-ui/core';
import {Delete,Edit, Book,MonetizationOn,LocalAtm  } from '@material-ui/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Clientes from '../Cliente/Cliente';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { AiOutlinePercentage } from 'react-icons/ai';
import { BiTotal } from 'react-icons/bi';


function VentasCreate (){
const navigate = useNavigate()
const [facturaID, setFacturaID] = useState('0');
const [clieID,setClieID] = useState('')
const [metoID,setMetoID] = useState('')
const [vehiID,setVehiID] = useState('')
const [respID,setRespID] = useState(null)
const [servID,setServID] = useState(null)
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

const columns = [
  { field: 'descripcion', headerName: 'Servicio/Repuesto', flex:1 },
  { field: 'deve_Cantidad', headerName: 'Cantidad', flex: 1},
  { field: 'deve_Precioventa', headerName: 'Precio',flex:1 },
  {
    field: 'acciones',
    headerName: 'Acciones',
    width: 300,
    renderCell: (params) => (
      <div>
            <CButton color='danger' variant='outline' className='m-3' onClick={() => handleDeleteClick(params.row)}><Delete/></CButton>
      </div>
    ),
  },
];

const handleDeleteClick = (params) => {
  const fila = detalles.find((fila) => fila.vent_ID === params.vent_ID); // Busca la marca seleccionada
  let payload = {
    vent_ID: fila.vent_ID,
  }
  axios
    .post('/DetallesVentas/Delete', payload)
    .then((response) => {
      console.log(response)
      if (response.data.message == '1') {
        setActualizar(!Actualizar)
        toast.success('Registro Eliminado exitosamente');
      }
    })
    .catch((error) => {
        toast.error('ha ocurrido un error');
    })
};

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
      .get('/DetallesVentas/ByID?id=' + facturaID)
      .then((response) => {
        const insertarid = response.data.map((row) => ({
          ...row,
          id: row.meto_ID,
        }));
        setDetalles2(insertarid);
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
      .get(`DetallesVentas/Temp?id=${facturaID}`)
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

  const CreateAction = async (event) => {
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
    await axios
      .post('Ventas/Insert', payload)
      .then((response) => {
        setIsSubmitting(false)
        if (parseInt(response.data.message) > 0 ) {
          setDisableFields(true)
          setFacturaID(response.data.message)
          console.log("nyaaaaaaaaaaa",facturaID)
          setPaso1(false)
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
    setValidated(true)
    setValidated2(true)
    if(tipo){
      if(respID != null ){
       if(cantidad > 0){
        const form = event.currentTarget
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        setValidated2(true)
        event.preventDefault()
        let payload = {
          vent_ID: facturaID,
          vehi_ID: vehiID,
          serv_ID: servID,
          resp_ID: respID,
          deve_Cantidad: cantidad,
          deve_UserCreacion: 1
        }
        console.log(payload)
        axios
          .post('DetallesVentas/Insert', payload)
          .then((response) => {
            setIsSubmitting(false)
            console.log(response)
            if (response.data.message === '1') {
              toast.success('Agregado exitosamente')
                setActualizar(!Actualizar)
            }else if(response.data.message === "2"){
              toast.warning('Stock Insuficiente')
            }
          })
          .catch((error) => {
            console.log(error)
            setActualizar(!Actualizar)
              toast.error('ha ocurrido un error');
          })
       }else{
        toast.error('Ingrese una cantidad valida')
       }
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
          vent_ID: facturaID,
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
            console.log(servID)
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
<CButton color={tipo ? 'secondary' : 'info'} variant='outline' disabled={disableFields ? false : true} style={{width: '100%'}} onClick={() => {setTipo(false); setRespID(null); setServID(null); setCantidad(1); setValidated(false)}}>Servicio</CButton>  
</div>
<div className='form-group col-6'>  
<CButton color={tipo ? 'info' : 'secondary'} variant='outline' disabled={disableFields ? false : true} style={{width: '100%'}} onClick={() => {setTipo(true); setServID(null); setRespID(null); setCantidad(1); setValidated2(false)}}>Repuesto</CButton>
</div>
</div>
                    <h5 hidden={tipo ? true : false}>Servicio</h5>
             <CFormSelect value={servID != null ? servID : "" } onChange={(event) => setServID(event.target.value)} className='mb-2' required={tipo ? false :  true} id='selectClieID' disabled={disableFields ? false : true} hidden={tipo ? true : false}>
             <option value={''} hidden>--Seleccione un servicio--</option>
        {servicios.map((servicio) => (
          <option key={servicio.serv_ID} value={servicio.serv_ID}>{servicio.serv_Descripcion}</option>
        ))}
      </CFormSelect>

      <h5 hidden={tipo ? false : true}>Repuesto</h5>
             <CFormSelect value={respID != null ? respID : ""} onChange={(event) => setRespID(event.target.value)} className='mb-2' required={tipo ? true :  false} id='selectClieID' disabled={disableFields ? false : true} hidden={tipo ? false : true}>
             <option value={''} hidden>--Seleccione un repuesto--</option>
        {repuestos.map((repuesto) => (
          <option key={repuesto.resp_ID} value={repuesto.resp_ID}>{repuesto.resp_Descripcion}</option>
        ))}
      </CFormSelect>

      <h6 hidden={tipo ? false: true}>Cantidad</h6>
    <CFormInput
        type="number"
        id="validationCustom01"
        required
        value={cantidad >0 ? cantidad : ''}
        hidden={tipo ? false: true}
        onChange={(e) => {
          if (e.target.value > -1) { 
            setCantidad(e.target.value)
          }
        }}
        disabled={disableFields ? false : true}
      />
 <CRow>
<div className='form-group col-3'>       
<CButton color="primary" type="submit" disabled={disableFields ? false : true} className='mt-3'>
        Agregar
      </CButton>
 </div>
 <div className='form-group col-6'>
 <CButton color="danger" style={{color: 'white'}} disabled={disableFields ? false : true} onClick={() => {navigate('/ventas'); toast.success('Venta Finalizada con exito')}} className='mt-3'>Finalizar venta</CButton>
 </div>
 </CRow>
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
            loading={paso1}
            onSortModelChange={handleSortModelChange}
            components={{
              Toolbar: GridToolbar,
            }}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          />
<div className='card-footer'>
{detalles2.map((detalle) => (
<>
<CRow>
  <CCol><h5>Subtotal</h5></CCol>
  <CCol key={detalle.deve_ID}><label >{detalle.subtotal}</label></CCol>
  <CCol><LocalAtm /><h5>IVA</h5></CCol>
  <CCol key={detalle.deve_ID}><label >{detalle.iva}</label></CCol>
  <CCol><LocalAtm /><h5>Total</h5></CCol>
  <CCol key={detalle.deve_ID}><label >{detalle.total}</label></CCol>
</CRow>
</>
        ))}
</div>
        </div>
    </div>
)
}

export default VentasCreate


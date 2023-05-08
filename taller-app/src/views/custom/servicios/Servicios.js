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

function Servicios() {
  const navigate = useNavigate()
  const [servicios, setServicios] = useState([]);
  const [sortModel, setSortModel] = useState([{ field: 'serv_ID', sort: 'asc' }]);
  const [servID,setServID]  = useState('')
  const [servDescripcion,setServDescripcion] = useState('')
  const [validated, setValidated] = useState(false) 
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)
  const [Actualizar, setActualizar] = useState(false)

  useEffect(() => {
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
    if(servDescripcion != ''){
        let payload = {
            serv_Descripcion: servDescripcion,
          }
          axios
            .post('Servicios/Insert', payload)
            .then((response) => {
              setIsSubmitting(false)
              console.log(response)
              if (response.data.message == '1') {
                toast.success('Registro agregado exitosamente');
                setVisible(false)
                setActualizar(!Actualizar)
              }else if(response.data.message == '2'){
                setActualizar(!Actualizar)
                toast.warning('Ya existe un servicio con ese nombre');
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

  const EditAction = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    event.preventDefault()
    if(servDescripcion != ''){
        let payload = {
            serv_ID: servID,
            serv_Descripcion: servDescripcion,
          }
          axios
            .post('Servicios/Update', payload)
            .then((response) => {
              setIsSubmitting(false)
              console.log(response)
              if (response.data.message == '1') {
                toast.success('Registro editado exitosamente');
                setVisible2(false)
                setActualizar(!Actualizar)
              }else if(response.data.message == '2'){
                setActualizar(!Actualizar)
                toast.warning('Ya existe un servicio con ese nombre');
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

  const DeleteAction = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    event.preventDefault()
        let payload = {
            serv_ID: servID
          }
          axios
            .post('Servicios/Delete', payload)
            .then((response) => {
              setIsSubmitting(false)
              console.log(response)
              if (response.data.message == '1') {
                toast.success('Registro eliminado exitosamente');
                setVisible3(false)
                setActualizar(!Actualizar)
              }else if(response.data.message == '2'){
                setActualizar(!Actualizar)
                toast.warning('No se puede eliminar el registro');
              }
            })
            .catch((error) => {
              setActualizar(!Actualizar)
                toast.error('ha ocurrido un error');
            })
    }


  const handleEditClick = (params) => {
    const servicio = servicios.find((servicio) => servicio.serv_ID === params.serv_ID); // Busca la marca seleccionada
    setVisible2(true);
    setServID(servicio.serv_ID)
    setServDescripcion(servicio.serv_Descripcion)
  };

  const handleDeleteClick = (params) => {
    const servicio = servicios.find((servicio) => servicio.serv_ID === params.serv_ID); // Busca la marca seleccionada
    setVisible3(true);
    setServID(servicio.serv_ID)
  };

  const handleDetailsClick = (params) => {
    const servicio = servicios.find((servicio) => servicio.serv_ID === params.serv_ID); // Busca la marca seleccionada
    localStorage.setItem('ServicioSeleccionado', JSON.stringify(servicio));
    navigate('/serviciosDetails')
  };

  const columns = [
    { field: 'serv_ID', headerName: 'ID',flex:1 },
    { field: 'serv_Descripcion', headerName: 'Descripción', flex:1 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 300,
      renderCell: (params) => (
<div>
              <CButton color='danger' variant='outline' className='m-3' onClick={() => handleDeleteClick(params.row)}><Delete/></CButton>
              <CButton color='warning' variant='outline' className='m-3' onClick={() => handleEditClick(params.row)}><Edit/></CButton>
              <CButton color='info' variant='outline' className='m-3' onClick={() => handleDetailsClick(params.row)}><Book/></CButton>
</div>
      ),
    },
  ];

  return (
   <>
    <div className='card'>
      <div className='card-body'>
        <h1>Servicios</h1>
        <CButton onClick={() => {setVisible(!visible); setValidated(false); setServDescripcion('')}}>Nuevo</CButton>
        <div className='container' style={{ height: 10 }}></div>
        <div style={{ flex: 1 }}>
          <DataGrid
            rows={servicios}
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
    </div>
     {/*Modal Create*/}
     <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>Nuevo Servicio</CModalTitle>
      </CModalHeader>
      <CModalBody>
      <CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={CreateAction}
  >
    <CCol>
          <h6>Nombre</h6>
    <CFormInput
        type="text"
        id="validationCustom01"
        required
        value={servDescripcion}
        onChange={(e) => setServDescripcion(e.target.value)}
      />
    </CCol>
    <CRow className='mt-3 offset-7'>
      <CCol className='col-2'>
    <CButton color="secondary" onClick={() => setVisible(false)}>
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
        {/*Fin Modal Create*/}

             {/*Modal Edit*/}
     <CModal visible={visible2} onClose={() => setVisible2(false)}>
      <CModalHeader onClose={() => setVisible2(false)}>
        <CModalTitle>Editar Servicio</CModalTitle>
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
        value={servDescripcion}
        onChange={(e) => setServDescripcion(e.target.value)}
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

                    {/*Modal Delete*/}
     <CModal visible={visible3} onClose={() => setVisible3(false)}>
      <CModalHeader onClose={() => setVisible3(false)}>
        <CModalTitle>Eliminar Servicio</CModalTitle>
      </CModalHeader>
      <CModalBody>
      <CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={DeleteAction}
  >
    <CCol>
          <h5>Esta seguro de eliminar este registro?</h5>
    </CCol>
    <CRow className='mt-3 offset-7'>
      <CCol className='col-2'>
    <CButton color="secondary" onClick={() => setVisible3(false)}>
          Cerrar
        </CButton>
        </CCol>
        <CCol>
        <CButton color="primary" type="submit">
        Aceptar
      </CButton>
      </CCol>
    </CRow>
      </CForm>   
      </CModalBody>
    </CModal>
        {/*Fin Modal Delete*/}
   </>
  );
}

export default Servicios;

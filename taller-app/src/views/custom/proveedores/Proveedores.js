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

function Proveedores() {
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

const handleSortModelChange = (model) => {
setSortModel(model);
};

const columns = [
{ field: 'prov_ID', headerName: 'ID', width: 100 },
{ field: 'prov_Nombre', headerName: 'Nombre', width: 200 },
{ field: 'prov_CorreoElectronico', headerName: 'Correo Electrónico', width: 200 },
{ field: 'prov_Telefono', headerName: 'Teléfono', width: 150 },
{ field: 'prov_Dirrecion', headerName: 'Dirección', width: 260 },
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

const CreateAction = (event) => {
  const form = event.currentTarget
  if (form.checkValidity() === false) {
    event.preventDefault()
    event.stopPropagation()
  }
  setValidated(true)
  event.preventDefault()
  if(ProveedoresNombre != '' && ProveedoresRut != '' && ProveedoresCorreoElectronico != '' && ProveedoresTelefono != '' && ProveedoresDireccion != ''){
      let payload = {
          prov_Rut: ProveedoresRut,
          prov_Nombre: ProveedoresNombre,
          prov_CorreoElectronico: ProveedoresCorreoElectronico,
          prov_Telefono: ProveedoresTelefono,
          prov_Dirrecion: ProveedoresDireccion
        }
        axios
          .post('Proveedores/Insert', payload)
          .then((response) => {
            setIsSubmitting(false)
            console.log(response)
            if (response.data.message == '1') {
              toast.success('Registro agregado exitosamente');
              setVisible(false)
              setActualizar(!Actualizar)
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

const DeleteAction = (event) => {
  const form = event.currentTarget
  if (form.checkValidity() === false) {
    event.preventDefault()
    event.stopPropagation()
  }
  setValidated(true)
  event.preventDefault()
  if(ProveedoresID != ''){
      let payload = {
        prov_ID: ProveedoresID
        }
        axios
          .post('Proveedores/Delete', payload)
          .then((response) => {
            setIsSubmitting(false)
            console.log(response)
            if (response.data.message == '1') {
              toast.success('Registro agregado exitosamente');
              setVisible3(false)
              setActualizar(!Actualizar)
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

const handleEditClick = (params) => {
  const proveedor = proveedores.find((proveedor) => proveedor.prov_ID === params.prov_ID); // Busca la marca seleccionada
  setVisible2(true);
  setproveedoresSeleccionado(proveedor); // Establece la marca seleccionada en el estado marcaSeleccionada
  setProveedoresID(proveedor.prov_ID)
  setProveedoresRut(proveedor.prov_Rut)
  setProveedoresNombre(proveedor.prov_Nombre)
  setProveedoresCorreoElectronico(proveedor.prov_CorreoElectronico)
  setProveedoresTelefono(proveedor.prov_Telefono)
  setProveedoresDireccion(proveedor.prov_Dirrecion)
  console.log(proveedor)
};

const handleDeleteClick = (params) => {
  const proveedor = proveedores.find((proveedor) => proveedor.prov_ID === params.prov_ID); // Busca la marca seleccionada
  setVisible3(true);
  setproveedoresSeleccionado(proveedor); // Establece la marca seleccionada en el estado marcaSeleccionada
  setProveedoresID(proveedor.prov_ID)
  console.log(proveedor)
};

const handleDetailsClick = (params) => {
  const proveedor = proveedores.find((proveedor) => proveedor.prov_ID === params.prov_ID); // Busca la marca seleccionada
  setproveedoresSeleccionado(proveedor); // Establece la marca seleccionada en el estado marcaSeleccionada
  localStorage.setItem('ProveedorSeleccionado', JSON.stringify(proveedor));
  navigate('/proveedoresDetails')
};


return (
<>
<div className='card'>
<div className='card-body'>
<h1>Proveedores</h1>
<CButton onClick={() => {setVisible(!visible); setValidated(false); setProveedoresRut(''); setProveedoresNombre(''); setProveedoresCorreoElectronico('');
setProveedoresTelefono(''); setProveedoresDireccion('');}}>Nuevo</CButton>
<div className='container' style={{ height: 10 }}></div>
<div style={{ flex: 1 }}>
<DataGrid
rows={proveedores}
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
        <CModalTitle>Nuevo Proveedor</CModalTitle>
      </CModalHeader>
      <CModalBody>
      <CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={CreateAction}
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
        type="number"
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

                    {/*Modal Delete*/}
     <CModal visible={visible3} onClose={() => setVisible3(false)}>
      <CModalHeader onClose={() => setVisible3(false)}>
        <CModalTitle>Eliminar Proveedor</CModalTitle>
      </CModalHeader>
      <CModalBody>
      <CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={DeleteAction}
  >
    <CCol>
      <h6>Esta seguro que desea eliminar este proveedor?</h6>
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

export default Proveedores;
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
   CRow
 } from '@coreui/react';
import {IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'


function Marcas() {
  const navigate = useNavigate()
  const [MarcaCreate, setMarcaCreate] = useState('')
  const [MarcaEdit, setMarcaEdit] = useState('')
  const [visible, setVisible] = useState(false)
  const [Actualizar, setActualizar] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)
  const [marcas, setMarcas] = useState([]);
  const [sortModel, setSortModel] = useState([{ field: 'marc_ID', sort: 'asc' }]);
  const [validated, setValidated] = useState(false) 
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);

  const CreateAction = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    event.preventDefault()

    let payload = {
      marc_Nombre: MarcaCreate,
    }
    axios
      .post('Marcas/Insert', payload)
      .then((response) => {
        setIsSubmitting(false)
        console.log(response)
        if (response.data.data.message == '1') {
          toast.success('Registro agregado exitosamente');
          setVisible(false)
          setActualizar(!Actualizar)
        }else if(response.data.data.message == '2'){
          setActualizar(!Actualizar)
          setVisible(false)
          toast.success('Registro agregado exitosamente');
        }else{
          setActualizar(!Actualizar)
          toast.warning('El registro ya existe');
        }
      })
      .catch((error) => {
        setActualizar(!Actualizar)
          toast.error('ha ocurrido un error');
      })
  }

  const EditAction = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    event.preventDefault()

    let payload = {
      marc_ID: marcaSeleccionada.marc_ID,
      marc_Nombre: MarcaEdit,
    }
    axios
      .post('Marcas/Update', payload)
      .then((response) => {
        setIsSubmitting(false)
        console.log(response)
        if (response.data.code == '200') {
          toast.success('Registro editado exitosamente');
          setVisible2(false)
          setActualizar(!Actualizar)
        }else if(response.data.code == '409'){
          setActualizar(!Actualizar)
          toast.warning('Ya existe un registro con ese nombre');
        }
      })
      .catch((error) => {
        setActualizar(!Actualizar)
          toast.error('ha ocurrido un error');
      })
  }

  const DeleteAction = (event) => {
    let payload = {
      marc_ID: marcaSeleccionada.marc_ID,
    }
    axios
      .post('Marcas/Delete', payload)
      .then((response) => {
        setIsSubmitting(false)
        console.log(response)
        if (response.data.code == '200') {
          toast.success('Registro Eliminado exitosamente');
          setVisible3(false)
          setActualizar(!Actualizar)
        }else if(response.data.code == '409'){
          toast.warning('El Registro no se puede eliminar');
          setActualizar(!Actualizar)
        }
      })
      .catch((error) => {
          toast.error('ha ocurrido un error');
          setActualizar(!Actualizar)
      })
  }

  const handleEditClick = (params) => {
    const marca = marcas.find((marca) => marca.id === params.marc_ID); // Busca la marca seleccionada
    setVisible2(true);
    setMarcaSeleccionada(marca); // Establece la marca seleccionada en el estado marcaSeleccionada
    localStorage.setItem('MarcaSeleccionada', JSON.stringify(marca));
    setMarcaEdit(marca.marc_Nombre)
  };

  const handleDetailsClick = (params) => {
    const marca = marcas.find((marca) => marca.id === params.marc_ID); // Busca la marca seleccionada
    setVisible2(true);
    setMarcaSeleccionada(marca); // Establece la marca seleccionada en el estado marcaSeleccionada
    localStorage.setItem('MarcaSeleccionada', JSON.stringify(marca));
    navigate('/marcasDetails')
  };

  const handleDeleteClick = (params) => {
    const marca = marcas.find((marca) => marca.id === params.marc_ID); // Busca la marca seleccionada
    setVisible3(true);
    setMarcaSeleccionada(marca); // Establece la marca seleccionada en el estado marcaSeleccionada
  };
  
  useEffect(() => {
    axios
      .get('http://proyectotaller.somee.com/api/Marcas')
      .then((response) => {
        console.log('holaaa')
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


  const columns = [
    { field: 'marc_ID', headerName: 'ID', width: 1,},
    { field: 'marc_Nombre', headerName: 'Marca', width: 200},
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 300,
      renderCell: (params) => (
        <div>
    <IconButton color="secondary">
        <DeleteIcon onClick={() => handleDeleteClick(params.row)}/>
      </IconButton>
      <IconButton color="primary">
      <EditIcon onClick={() => handleEditClick(params.row)} />
      </IconButton>
      <IconButton>
        <VisibilityIcon  onClick={() => handleDetailsClick(params.row)}/>
      </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div className='card'>
        <>
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>Nueva Marca</CModalTitle>
      </CModalHeader>
      <CModalBody>
      <CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={CreateAction}
  >
    <CCol>
      <CFormInput
        type="text"
        id="validationCustom01"
        label="Marca"
        value={MarcaCreate}
        required
        onChange={(e) => setMarcaCreate(e.target.value)}
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
  </>
{/*Aqui termina mi modal de create */}
{/*Modal Editar*/}
<>
    <CModal visible={visible2} onClose={() => setVisible2(false)}>
      <CModalHeader onClose={() => setVisible2(false)}>
        <CModalTitle>Editar</CModalTitle>
      </CModalHeader>
      <CModalBody>
      <CForm
   className="row g-3 needs-validation"
   noValidate
   validated={validated}
   onSubmit={EditAction}
  >
    <CCol>
      <CFormInput
        type="text"
        id="validationCustom01"
        label="Marca"
        required
        value={MarcaEdit}
        onChange={(e) => setMarcaEdit(e.target.value)}
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
  </>
{/*Fin Modal Editar*/}
  {/*Modal Eliminar*/}
  <>
    <CModal visible={visible3} onClose={() => setVisible3(false)}>
      <CModalHeader onClose={() => setVisible3(false)}>
        <CModalTitle>Eliminar</CModalTitle>
      </CModalHeader>
      <CModalBody>
      <CForm
   className="row g-3 needs-validation"
   noValidate
   validated={validated}
   onSubmit={DeleteAction}
  >
    <CCol>
    <div className='h4'>Desea eliminar este registro?</div>
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
  </>
  {/*Fin Modal Eliminar*/}
        <div className='card-body'>
        <h1>Marcas</h1>
        <CButton onClick={() => {setVisible(!visible); setValidated(false); setMarcaCreate('')}}>Nuevo</CButton>
        <div className='container' style={{height: 10}}></div>
        <div style={{ flex: 1}}>
        <DataGrid
  rows={marcas}
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
  );
}

export default Marcas;

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


function Marcas() {
  const [MarcaCreate, setMarcaCreate] = useState('')
  const [MarcaEdit, setMarcaEdit] = useState('')
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
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
        console.log(response.data.data.code)
        if (response.data.data.code == '200') {
          toast.success('Registro agregado exitosamente');
          setVisible(false)
        }else if(response.data.data.code == '409'){
          toast.warning('El Registro ya existe');
        }
      })
      .catch((error) => {
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
      marc_Nombre: MarcaEdit.marc_Nombre,
    }
    axios
      .post('Marcas/Update', payload)
      .then((response) => {
        setIsSubmitting(false)
        console.log(response.data.data.code)
        if (response.data.data.code == '200') {
          toast.success('Registro editado exitosamente');
          setVisible(false)
        }else if(response.data.data.code == '409'){
          toast.warning('Ya existe un registro con ese nombre');
        }
      })
      .catch((error) => {
          toast.error('ha ocurrido un error');
      })
  }

  const handleEditClick = (params) => {
    const marca = marcas.find((marca) => marca.id === params.marc_ID); // Busca la marca seleccionada
    setVisible2(true);
    setMarcaSeleccionada(marca); // Establece la marca seleccionada en el estado marcaSeleccionada
  };
  
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }
  
  
  useEffect(() => {
    axios
      .get('http://proyectotaller.somee.com/api/Marcas')
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
  }, [marcas]);
  

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
        <DeleteIcon />
      </IconButton>
      <IconButton color="primary">
      <EditIcon onClick={() => handleEditClick(params.row)} />
      </IconButton>
      <IconButton>
        <VisibilityIcon />
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
        value={marcaSeleccionada ? marcaSeleccionada.marc_Nombre : ''}
        onChange={(e) => setMarcaSeleccionada(e.target.value)}
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
        <div className='card-body'>
        <h1>Marcas</h1>
        <CButton onClick={() => {setVisible(!visible); setValidated(false)}}>Nuevo</CButton>
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

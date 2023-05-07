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
import {Delete,Edit, Book, Block} from '@material-ui/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { red } from '@material-ui/core/colors';

function Modelos (){
    const navigate = useNavigate()
    const [Actualizar, setActualizar] = useState(false)
    const [ModeID,SetModeID] = useState('')
    const [MarcID,SetMarcID] = useState('')
    const [ModeloNombre,SetModeloNombre] = useState('')
    const [modelos, setModelos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [sortModel, setSortModel] = useState([{ field: 'mode_ID', sort: 'asc' }]);
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [visible3, setVisible3] = useState(false)
    const [validated, setValidated] = useState(false) 
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [modeloSeleccionado, setmodeloSeleccionado] = useState(null);

    const handleSortModelChange = (model) => {
        setSortModel(model);
      };

    useEffect(() => {
        axios
          .get('/Modelos')
          .then((response) => {
            const insertarid = response.data.map((row) => ({
              ...row,
              id: row.mode_ID,
            }));
            setModelos(insertarid);
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
      }, []);

      const handleEditClick = (params) => {
        const modelo = modelos.find((modelo) => modelo.id === params.mode_ID); // Busca la marca seleccionada
        setVisible2(true);
        setmodeloSeleccionado(modelo); // Establece la marca seleccionada en el estado marcaSeleccionada
        SetMarcID(modelo.marc_ID)
        console.log('Marca ID :' + MarcID)
        SetModeID(modelo.mode_ID)
        console.log('Modelo ID :' + ModeID)
        SetModeloNombre(modelo.mode_Nombre)
        console.log('Modelo Nombre :' + ModeloNombre)
      };

      const handleDeleteClick = (params) => {
        const modelo = modelos.find((modelo) => modelo.id === params.mode_ID); // Busca la marca seleccionada
        setVisible3(true);
        setmodeloSeleccionado(modelo); // Establece la marca seleccionada en el estado marcaSeleccionada
        SetMarcID(modelo.marc_ID)
        console.log('Marca ID :' + modelo.marc_ID)
        SetModeID(modelo.mode_ID)
        console.log('Modelo ID :' + modelo.mode_ID)
        SetModeloNombre(modelo.mode_Nombre)
        console.log('Modelo Nombre :' + modelo.mode_Nombre)
      };

      const handleDetailsClick = (params) => {
        const modelo = modelos.find((modelo) => modelo.id === params.mode_ID); // Busca la marca seleccionada
        setmodeloSeleccionado(modelo); // Establece la marca seleccionada en el estado marcaSeleccionada
        console.log(modelo)
        localStorage.setItem('ModeloSeleccionado', JSON.stringify(modelo));
        navigate('/modelosDetails')
      };


      const columns = [
        { field: 'mode_ID', headerName: 'ID'},
        { field: 'marc_Nombre', headerName: 'Marca', width: 200},
        { field: 'mode_Nombre', headerName: 'Modelo', width: 200},
        {
          field: 'acciones',
          headerName: 'Acciones',
          width: 300,
          renderCell: (params) => (
            <>
              <CButton color='danger' variant='outline' className='m-3' onClick={() => handleDeleteClick(params.row)}><Delete/></CButton>
              <CButton color='warning' variant='outline' className='m-3' onClick={() => handleEditClick(params.row)}><Edit/></CButton>
              <CButton color='info' variant='outline' className='m-3' onClick={() => handleDetailsClick(params.row)}><Book/></CButton>
            </>
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
        if(MarcID != '' && ModeloNombre != ''){
            let payload = {
                marc_ID: MarcID,
                mode_Nombre: ModeloNombre
              }
              axios
                .post('Modelos/Insert', payload)
                .then((response) => {
                  setIsSubmitting(false)
                  console.log(response)
                  if (response.data.message == '1') {
                    toast.success('Registro agregado exitosamente');
                    setVisible(false)
                    setActualizar(!Actualizar)
                  }else if(response.data.message == '2'){
                    setActualizar(!Actualizar)
                    toast.warning('El registro ya existe');
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
        
        console.log(MarcID)
        console.log(ModeloNombre)

        if(ModeID != '' && ModeloNombre != '' && MarcID != ''){
            let payload = {
                mode_ID: modeloSeleccionado.mode_ID,
                marc_ID: MarcID,
                mode_Nombre: ModeloNombre,
              }
              axios
                .post('Modelos/Update', payload)
                .then((response) => {
                  setIsSubmitting(false)
                  console.log(response)
                  
                  if (response.data.message == '1') {
                    toast.success('Registro editado exitosamente');
                    setVisible2(false)
                    setActualizar(!Actualizar)
                  }else if(response.data.message == '2'){
                    setActualizar(!Actualizar)
                    toast.warning('Ya existe un registro con ese nombre');
                  }
                })
                .catch((error) => {
                  setActualizar(!Actualizar)
                    toast.error('ha ocurrido un error');
                })
        }else{
            console.log(ModeID)
            console.log(ModeloNombre)
            console.log(MarcID)
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
          mode_ID: modeloSeleccionado.mode_ID,
        }
        axios
          .post('Modelos/Delete', payload)
          .then((response) => {
            setIsSubmitting(false)
            console.log(response)
            
            if (response.data.message == '1') {
              toast.success('Registro Eliminado exitosamente');
              setVisible3(false)
              setActualizar(!Actualizar)
            }
          })
          .catch((error) => {
            setActualizar(!Actualizar)
              toast.error('ha ocurrido un error');
          })
      }

      return (
            <div className='card'>
                        <div className='card-body'>
        <h1>Modelos</h1>
        <CButton onClick={() => {setVisible(!visible); setValidated(false); SetMarcID(''); SetModeloNombre('')}}>Nuevo</CButton>
        <div className='container' style={{height: 10}}></div>
        <div style={{ flex: 1}}>
        <DataGrid
  rows={modelos}
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
        {/*Modal Create*/}
        <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>Nuevo Modelo</CModalTitle>
      </CModalHeader>
      <CModalBody>
      <CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={CreateAction}
  >
    <CCol>
    <h6>Marca</h6>
    <CFormSelect value={MarcID} onChange={(event) => SetMarcID(event.target.value)} className='mb-2'>
    <option value=''>--Seleccione una opcion--</option>
        {marcas.map((marca) => (
          <option key={marca.marc_ID} value={marca.marc_ID}>{marca.marc_Nombre}</option>
        ))}
      </CFormSelect>
    <h6>Modelo</h6>
    <CFormInput
        type="text"
        id="validationCustom01"
        required
        value={ModeloNombre}
        onChange={(e) => SetModeloNombre(e.target.value)}
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
        <CModalTitle>Editar Modelo</CModalTitle>
      </CModalHeader>
      <CModalBody>
      <CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={EditAction}
  >
    <CCol>
    <h6>Marca</h6>
    <CFormSelect value={MarcID} onChange={(event) => SetMarcID(event.target.value)} className='mb-2'>
        {marcas.map((marca) => (
          <option key={marca.marc_ID} value={marca.marc_ID}>{marca.marc_Nombre}</option>
        ))}
      </CFormSelect>
    <h6>Modelo</h6>
    <CFormInput
        type="text"
        id="validationCustom01"
        required
        value={ModeloNombre}
        onChange={(e) => SetModeloNombre(e.target.value)}
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
        <CModalTitle>Eliminar Modelo</CModalTitle>
      </CModalHeader>
      <CModalBody>
      <CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={DeleteAction}
  >
    <CCol>
    <h6>Seguro que quieres eliminar este registro?</h6>

    </CCol>
    <CRow className='mt-3 offset-7'>
      <CCol className='col-2'>
    <CButton color="secondary" onClick={() => setVisible3(false)}>
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
        {/*Fin Modal Delete*/}
            </div>
      );
}

export default Modelos;
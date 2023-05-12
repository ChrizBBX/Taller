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


  function ModelosDetails(){
      const navigate = useNavigate()
      const [Actualizar, setActualizar] = useState(false)
      const [ModeID,SetModeID] = useState('')
      const [MarcID,SetMarcID] = useState('')
      const [ModeloNombre,SetModeloNombre] = useState('')
      const [modelos, setModelos] = useState([]);
      const [marcas, setMarcas] = useState([]);
      const [visible, setVisible] = useState(false)
      const [visible2, setVisible2] = useState(false)
      const [visible3, setVisible3] = useState(false)
      const [validated, setValidated] = useState(false) 
      const [isSubmitting, setIsSubmitting] = useState(false)
      const [modeloSeleccionado, setmodeloSeleccionado] = useState([]);

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

      useEffect(() => {
        const ModeloSeleccionado = JSON.parse(localStorage.getItem('ModeloSeleccionado'));
        if (ModeloSeleccionado) {
          setmodeloSeleccionado(ModeloSeleccionado)
          SetMarcID(ModeloSeleccionado.marc_ID)
          SetModeID(ModeloSeleccionado.mode_ID)
          SetModeloNombre(ModeloSeleccionado.mode_Nombre)
        }
      }, []);

      const miArray = [modeloSeleccionado]

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
                  mode_ID: ModeID,
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
                      navigate('/modelos')
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

      return(
  <div className='card'>
    <div className='card-header'><h1>Detalles</h1></div>
    <div className='card-body'>
    {miArray.map(modelo => (
                <>
                 <div className="row">
                 <div className="form-group col-6">
                   <h4>ID</h4>
                   <label>{modelo.mode_ID}</label>
                 </div>
                 <div className="form-group col-6">
                   <h4>Marca</h4>
                   <label>{modelo.marc_Nombre}</label>
                 </div>
                </div>
                <div className='row'>
              <div className='form-group col-6 mt-3'>
                <h4>Modelo</h4>
                <label>{modelo.mode_Nombre}</label>
              </div>
                </div>
                <div className="row">
     <div style={{height: 20}}></div>
          <div className="col-1">
          <CButton color="warning" onClick={() => setVisible2(!visible2)}>Editar</CButton>

          </div>
          <div className="col-3">
          <CButton color="info" onClick={() => {  navigate('/modelos')}}>Regresar</CButton>
          </div>
          <div style={{height: 20}}></div>
     </div>

     <div className="card">
  <div className="card-header"><h2>Auditoria</h2></div>
  
  <table className="table table-striped">
          <thead>
          <tr>
                        <th>Accion</th>
                        <th>Usuario</th>
                        <th>Fecha</th>
          </tr>
          </thead>
          <tbody>
          <tr>
                            <td><label>Creacion</label></td>
                            <td>{modelo.mode_UserCreacion_Nombre}</td>
                            <td>{modelo.mode_FechaCreacion}</td>
                        </tr>
                        <tr>
                            <td>Modificacion</td>
                            <td>{modelo.mode_UserModificaciones_Nombre}</td>
                            <td>{modelo.mode_FechaModificacion}</td>
                        </tr>
          </tbody>
         </table>
</div>
                </>           
      ))}
    </div>
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
  </div>
      );
  }

  export default ModelosDetails
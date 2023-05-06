import { useState, useEffect } from 'react';
import React from "react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
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
import { Height } from '@material-ui/icons';
function MarcasDetails (){
  const navigate = useNavigate()
  const MarcaSeleccionada = JSON.parse(localStorage.getItem('MarcaSeleccionada'));
  const marcasArray = [MarcaSeleccionada];
  const [visible2, setVisible2] = useState(false)
  const [MarcaEdit_ID, setMarcaEditID] = useState('')
  const [MarcaEdit_Nombre,setMarcaEditNombre] = useState('')
  const [validated, setValidated] = useState(false) 
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const MarcaSeleccionada = JSON.parse(localStorage.getItem('MarcaSeleccionada'));
    if (MarcaSeleccionada) {
      setMarcaEditID(MarcaSeleccionada.marc_ID);
      setMarcaEditNombre(MarcaSeleccionada.marc_Nombre);
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

    let payload = {
      marc_ID: MarcaEdit_ID,
      marc_Nombre: MarcaEdit_Nombre,
    }
    axios
      .post('Marcas/Update', payload)
      .then((response) => {
        setIsSubmitting(false)
        console.log(response)
        if (response.data.code == '200') {
          toast.success('Registro editado exitosamente');
          navigate('/marcas')
        }else if(response.data.code == '409'){
          toast.warning('Ya existe un registro con ese nombre');
        }
      })
      .catch((error) => {
          toast.error('ha ocurrido un error');
      })
  }

  return (
    <div className="card">
      <div className="card-header"><h1>Detalles</h1></div>
      <div className="card-body">
        {marcasArray.map(marca => (
         <>
         <div className="row">
          <div className="form-group col-6">
            <h4>ID</h4>
            <label>{marca.marc_ID}</label>
          </div>
          <div className="form-group col-6">
            <h4>Marca</h4>
            <label>{marca.marc_Nombre}</label>
          </div>
         </div>
     <div className="row">
     <div style={{height: 20}}></div>
          <div className="col-1">
          <CButton color="warning" onClick={() => setVisible2(!visible2)}>Editar</CButton>

          </div>
          <div className="col-3">
          <CButton color="info" onClick={() => {  navigate('/marcas')}}>Regresar</CButton>
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
                            <td>{marca.marc_UserCreacion_Nombre}</td>
                            <td>{marca.marc_FechaCreacion}</td>
                        </tr>
                        <tr>
                            <td>Modificacion</td>
                            <td>{marca.marc_UserModificacion_Nombre}</td>
                            <td>{marca.marc_FechaModificacion}</td>
                        </tr>
          </tbody>
         </table>
</div>
         
         </>
        ))}
      </div>
      {/*Modal Editar*/}

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
        value={MarcaEdit_Nombre}
        onChange={(e) => setMarcaEditNombre(e.target.value)}
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
{/*Fin Modal Editar*/}
    </div>
  );
}

export default MarcasDetails;


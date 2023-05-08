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

function VehiculosDetails (){
    const navigate = useNavigate()
    const [Vehiculos, setVehiculos] = useState([]);
    const [modelos, setModelos] = useState([]);
    const [sortModel, setSortModel] = useState([{ field: 'vehi_ID', sort: 'asc' }]);
    const [validated, setValidated] = useState(false) 
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [visible3, setVisible3] = useState(false)
    const [Actualizar, setActualizar] = useState(false)
    const [vehiID,setVehiID] = useState(null)
    const [modeID,setModeID] = useState(null)
    const [vehiMatricula,setVehiMatricula] = useState(null)
    const [vehiAnio,setVehiAnio] = useState(null)
    const [datos,setDatos] = useState([])


    useEffect(() => {
        const VehiculoSeleccionado = JSON.parse(localStorage.getItem('VehiculoSeleccionado'));
        console.log(VehiculoSeleccionado)
        if (VehiculoSeleccionado) {
            setDatos(VehiculoSeleccionado)
            setVehiID(VehiculoSeleccionado.vehi_ID)
            setModeID(VehiculoSeleccionado.mode_ID)
            setVehiMatricula(VehiculoSeleccionado.vehi_Matricula)
            setVehiAnio(VehiculoSeleccionado.vehi_anio)
        }
      }, [Actualizar]);

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

    const handleSortModelChange = (model) => {
        setSortModel(model);
    };


      const EditAction = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        setValidated(true)
        event.preventDefault()
        if(modeID != "" && vehiMatricula != "" && vehiAnio != ""){
            if(vehiAnio >= 1960 && vehiAnio <= 2023){
                let payload = {
                    vehi_ID: vehiID,
                    mode_ID: modeID,
                    vehi_Matricula: vehiMatricula,
                    vehi_Anio:  vehiAnio
                    }
                    axios
                      .post('Vehiculos/Update', payload)
                      .then((response) => {
                        setIsSubmitting(false)
                        console.log(response)
                        if (response.data.message == '1') {
                          toast.success('Registro editado exitosamente');
                            navigate('/Vehiculos')
                        }else if(response.data.message == '2'){
                          setActualizar(!Actualizar)
                          toast.warning('Ya existe ese vehiculo');
                        }
                      })
                      .catch((error) => {
                        setActualizar(!Actualizar)
                          toast.error('ha ocurrido un error');
                      })
            }else{
                toast.error('Año invalido'); 
            }
        }else{
                toast.error('Rellene los campos'); 
        }
      }

return(
    <div className='card'>
        <div className='card-header'><h1>Detalles</h1></div>
        <div className='card-body'>
            <div className='row'>
                <div className='form-group col-6'>
                    <h5>ID</h5>
                    <label>{vehiID}</label>
                </div>
                <div className='form-group col-6'>
                    <h5>Modelo</h5>
                    <label>{modeID}</label>
                </div>
                <div className='form-group col-6 mt-3'>
                    <h5>Matricula</h5>
                    <label>{vehiMatricula}</label>
                </div>
                <div className='form-group col-6 mt-3'>
                    <h5>Año</h5>
                    <label>{vehiAnio}</label>
                </div>
            </div>
            <div className="row">
     <div style={{height: 20}}></div>
          <div className="col-1">
          <CButton color="warning" onClick={() => setVisible2(!visible2)}>Editar</CButton>

          </div>
          <div className="col-3">
          <CButton color="info" onClick={() => {  navigate('/Vehiculos')}}>Regresar</CButton>
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
                            <td>{datos.vehi_UserCreacion_Nombre}</td>
                            <td>{datos.vehi_FechaCreacion}</td>
                        </tr>
                        <tr>
                            <td>Modificacion</td>
                            <td>{datos.vehi_UserModificacion_Nombre}</td>
                            <td>{datos.vehi_FechaModificacion}</td>
                        </tr>
          </tbody>
         </table>
</div>
        </div>
                       {/*Modal Edit*/}
   <CModal visible={visible2} onClose={() => setVisible2(false)}>
   <CModalHeader onClose={() => setVisible2(false)}>
     <CModalTitle>Editar Vehiculo</CModalTitle>
   </CModalHeader>
   <CModalBody>
   <CForm
 className="row g-3 needs-validation"
 noValidate
 validated={validated}
 onSubmit={EditAction}
>
 <CCol>
   <h6>Modelo</h6>
   <CFormSelect value={modeID} onChange={(event) => setModeID(event.target.value)} required>
   <option value="" hidden>--Seleccione una opcion--</option>
           {modelos.map(modelos => (
             <option key={modelos.mode_ID} value={modelos.mode_ID}>{modelos.mode_Nombre}</option>
           ))}
         </CFormSelect>
         <h6>Año</h6>
 <CFormInput
     type="text"
     id="validationCustom01"
     required
     maxLength={4} // agregado maxLength
     value={vehiAnio}
     onChange={(e) => {
       if (e.target.value.length <= 4) { // validación de longitud máxima de 13 caracteres
         setVehiAnio(e.target.value)
       }
     }}
   />
         <h6>Matricula</h6>
 <CFormInput
     type="text"
     id="validationCustom01"
     required
     maxLength={7} // agregado maxLength
     value={vehiMatricula}
     onChange={(e) => {
       if (e.target.value.length <= 7) { // validación de longitud máxima de 13 caracteres
         setVehiMatricula(e.target.value)
       }
     }}
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
)
}

export default VehiculosDetails
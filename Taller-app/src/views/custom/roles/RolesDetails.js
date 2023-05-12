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
import {Button, IconButton } from '@material-ui/core';
import {Delete,Edit, Book,} from '@material-ui/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import MultiSelect from "react-multiselect-checkboxes";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";


function RolesDetails (){
    const navigate = useNavigate()
    const [roles,setRoles] = useState([])
    const [actualizar,setActualizar] = useState(false)
    const [roleNombre,setRoleNombre] = useState('')
    const [pantallas,setPantallas] = useState([])
    const [pantallaSeleccionada,setPantallaSeleccionada] = useState([])
    const [roleID,setRoleID] = useState('')
    const [rolSeleccionado,setRolSeleccionado] = useState([])
    const [validated, setValidated] = useState(false) 
    const [sortModel, setSortModel] = useState([{ field: 'serv_ID', sort: 'asc' }]);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [visible3, setVisible3] = useState(false)
    

    useEffect(() => {
        const RolSeleccionado = JSON.parse(localStorage.getItem('RolSeleccionado'));
        if (RolSeleccionado) {
          setRolSeleccionado(RolSeleccionado)
          console.log(RolSeleccionado)
          setRoleID(RolSeleccionado.role_ID)
          setRoleNombre(RolSeleccionado.role_Nombre)
        }

        axios
        .get('/Pantallas')
        .then((response) => {
          const insertarid = response.data.map((row) => ({
            ...row,
            id: row.pant_ID,
          }));
          setPantallas(insertarid);
        })
        .catch((error) => {
          console.log(error);
        });
      }, []);

      const handleChange = (selected) => {
        setPantallaSeleccionada(selected);
        console.log(pantallaSeleccionada)
      };

      const options = pantallas.map((pantalla) => ({
        label: pantalla.pant_Nombre,
        value: pantalla.pant_ID,
      }));

      const EditAction = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        setValidated(true)
        event.preventDefault()
        if(roleNombre != ''){
            let payload = {
                role_ID: roleID,
                role_Nombre: roleNombre,
                role_UserCreacion: 1
              }
              axios
                .post('Roles/Update', payload)
                .then((response) => {
                  setIsSubmitting(false)
                  console.log(response)
                  if(response.data.message == "1"){
                    setVisible2(false)
                    toast.success('Registro Editado Exitosamente')
                    navigate('/roles')
                    let payload = {
                      role_ID: roleID
                    }
                    axios
                    .post('RolesPorPantalla/Delete', payload)
                    .then((response) => {
                      setIsSubmitting(false)
                      if (response.data.message == '1') {

                        pantallaSeleccionada.forEach(element => {
                          let data = {
                              role_ID: parseInt(roleID),
                              pant_ID: element,
                              pantrole_UserCreacion: 1
                            }
                            console.log(data)
                          axios
                          .post('RolesPorPantalla/Insert', data)
                          .then((response) => {
                            setIsSubmitting(false)
                            if (response) {
                              setActualizar(!actualizar)
                            }
                          })
                          .catch((error) => {
                            console.log(error)
                            setActualizar(!actualizar)
                              toast.error('ha ocurrido un error');
                          })
                      });


                        setActualizar(!actualizar)
                      }
                    })
                    .catch((error) => {
                      console.log(error)
                      setActualizar(!actualizar)
                        toast.error('ha ocurrido un error');
                    })
            


                  }
                })
                .catch((error) => {
                  setActualizar(!actualizar)
                    toast.error('ha ocurrido un error');
                })
        }else{
            toast.error('Rellene los campos'); 
        }
      }

    return(
        <div className="card">
            <div className="card-header"><h1>Detalles</h1></div>
            <div className="card-body">
                <div className='row'>
                    <div className='form-group col-6'>
                        <h4>ID</h4>
                        <label>{roleID}</label>
                    </div>
                    <div className='form-group col-6'>
                        <h4>Rol</h4>
                        <label>{roleNombre}</label>
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
                            <td>{rolSeleccionado.role_UserCreacion_Nombre}</td>
                            <td>{rolSeleccionado.role_FechaCreacion}</td>
                        </tr>
                        <tr>
                            <td>Modificacion</td>
                            <td>{rolSeleccionado.role_UserModificaciones_Nombre}</td>
                            <td>{rolSeleccionado.role_FechaModificacion}</td>
                        </tr>
          </tbody>
         </table>
</div>
                </div>
            </div>
            {/*Modal Edit*/}
     <CModal visible={visible2} onClose={() => setVisible2(false)}>
      <CModalHeader onClose={() => setVisible2(false)}>
        <CModalTitle>Editar Rol</CModalTitle>
      </CModalHeader>
      <CModalBody>
      <CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={EditAction}
  >
  <CCol>
  <h6>Nombre del rol</h6>
    <CFormInput
        type="text"
        id="validationCustom01"
        required
        value={roleNombre}
        onChange={(e) => setRoleNombre(e.target.value)}
      />
      
<div hidden={false}>
<h6 className='mt-3'>Editar Pantallas Asignadas</h6>
<DualListBox
      options={options}
      selected={pantallaSeleccionada}
      onChange={handleChange}
    />
</div>
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

export default RolesDetails
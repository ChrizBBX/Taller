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

function RolesCreate (){
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

    const CreateAction = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        setValidated(true)
        event.preventDefault()
        if(roleNombre != ''){
            let payload = {
                role_Nombre: roleNombre,
                role_UserCreacion: 1
              }
              axios
                .post('Roles/Insert', payload)
                .then((response) => {
                  setIsSubmitting(false)
                  console.log(response)
                  if (parseInt(response.data.message) > 0  && response.data.message != 2) {
                    console.log("El ID del scope es:" + response.data.message)
                    setRoleID(response.data.message)
                    toast.success('Registro agregado exitosamente')
                    setVisible(!visible)

                    pantallaSeleccionada.forEach(element => {
                        let data = {
                            role_ID: parseInt(response.data.message),
                            pant_ID: element,
                            pantrole_UserCreacion: 1
                          }
                          console.log(data)
                        axios
                        .post('RolesPorPantalla/Insert', data)
                        .then((response) => {
                          setIsSubmitting(false)
                          if (response.data.message == '1') {
                            setActualizar(!actualizar)
                          }
                        })
                        .catch((error) => {
                          console.log(error)
                          setActualizar(!actualizar)
                            toast.error('ha ocurrido un error');
                        })
                    });
                        navigate('/roles')
                      setActualizar(!actualizar)
                  }else{
                    toast.warning('Ese rol ya existe')
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

      useEffect(() => {
        axios
        .get('/RolesPorPantalla/RolesPorPantallaByRoleID/' + roleID)
        .then((response) => {
          const insertarid = response.data.map((row) => ({
            ...row,
            id: row.pant_ID,
          }));
          const pantallas = insertarid.map(item => item.pant_ID);
          setPantallaSeleccionada(pantallas);
          console.log(pantallaSeleccionada)
        })
        .catch((error) => {
          console.log(error);
        });
      }, [roleID]);

      useEffect(() => {
        console.log(pantallaSeleccionada);
      }, [pantallas,pantallaSeleccionada]);


      useEffect(() => {
        axios
          .get('/Roles')
          .then((response) => {
            const insertarid = response.data.map((row) => ({
              ...row,
              id: row.role_ID,
            }));
            setRoles(insertarid);
          })
          .catch((error) => {
            console.log(error);
          });
          
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
      }, [actualizar,roleID,pantallaSeleccionada]);

      const options = pantallas.map((pantalla) => ({
        label: pantalla.pant_Nombre,
        value: pantalla.pant_ID,
      }));

      const handleChange = (selected) => {
        setPantallaSeleccionada(selected);
        console.log(pantallaSeleccionada)
      };

    return(
   <>
        <div className="card">
            <div className="card-body">
      <CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={CreateAction}
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
<h6 className='mt-3'>Asignar Pantallas</h6>
<DualListBox
      options={options}
      selected={pantallaSeleccionada}
      onChange={handleChange}
    />
</div>
  </CCol>
    <CRow className='mt-3'>
      <CCol className='col-2'>
    <CButton color="secondary" onClick={() => navigate('/roles')}>
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
            </div>
        </div>
   </>
    )
}

export default RolesCreate
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

function Roles (){
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
      const handleSortModelChange = (model) => {
        setSortModel(model);
      };

      const handleEditClick = (params) => {
        const rol = roles.find((rol) => rol.role_ID === params.role_ID); // Busca la marca seleccionada
        navigate('/rolesEdit',{ state: { roles: rol } })
      };

      const handleDeleteClick = (params) => {
        const rol = roles.find((rol) => rol.role_ID === params.role_ID); // Busca la marca seleccionada
        setVisible3(true);
        setRoleID(rol.role_ID)
        setValidated(false)
      };

      const handleDetailsClick = (params) => {
        const rol = roles.find((rol) => rol.role_ID === params.role_ID); // Busca la marca seleccionada
        setRolSeleccionado(rol); // Establece la marca seleccionada en el estado marcaSeleccionada
        localStorage.setItem('RolSeleccionado', JSON.stringify(rol));
        navigate('/rolDetails')
      };


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

      const DeleteAction = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        setValidated(true)
        event.preventDefault()

        let payload = {
          role_ID: roleID,
        }
        axios
          .post('Roles/Delete', payload)
          .then((response) => {
            setIsSubmitting(false)
            console.log(response)
            if (response.data.message == '1') {
              toast.success('Registro Eliminado exitosamente');
              setVisible3(false)
              setActualizar(!actualizar)
            }else if(response.data.message == "3"){
              toast.warning('El registro esta siendo utilizado en otra tabla');
            }
          })
          .catch((error) => {
            setActualizar(!actualizar)
              toast.error('ha ocurrido un error');
          })
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

      const columns = [
        { field: 'role_ID', headerName: 'ID',flex:1 },
        { field: 'role_Nombre', headerName: 'Rol', flex:1 },
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
            <div className="card">
            <div className="card-body">
            <h1>Roles</h1>
            <CButton onClick={() => {navigate('/RolesCreate')}}>Nuevo</CButton>
            <div className='container' style={{ height: 10 }}></div>
            <DataGrid
            rows={roles}
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
        <CModalTitle>Nuevo Rol</CModalTitle>
      </CModalHeader>
      <CModalBody>
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
                 {/*Modal Delete*/}
     <CModal visible={visible3} onClose={() => setVisible3(false)}>
      <CModalHeader onClose={() => setVisible3(false)}>
        <CModalTitle>Eliminar Rol</CModalTitle>
      </CModalHeader>
      <CModalBody>
      <CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={DeleteAction}
  >
  <CCol>
  <h5>Seguro que desea eliminar este registro?</h5>
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
    )
}

export default Roles
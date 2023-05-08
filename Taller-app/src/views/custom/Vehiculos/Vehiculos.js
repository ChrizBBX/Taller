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


function Vehiculos() {
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

    useEffect(() => {
        axios
            .get('Vehiculos')
            .then((response) => {
                const insertarid = response.data.map((row) => ({
                    ...row,
                    id: row.vehi_ID,
                }));
                setVehiculos(insertarid);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [Actualizar]);

    const CreateAction = (event) => {
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
                    mode_ID: modeID,
                    vehi_Matricula: vehiMatricula,
                    vehi_Anio:  vehiAnio
                    }
                    axios
                      .post('Vehiculos/Insert', payload)
                      .then((response) => {
                        setIsSubmitting(false)
                        console.log(response)
                        if (response.data.message == '1') {
                          toast.success('Registro agregado exitosamente');
                          setVisible(false)
                          setActualizar(!Actualizar)
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
                          setVisible2(false)
                          setActualizar(!Actualizar)
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

      const DeleteAction = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        setValidated(true)
        event.preventDefault()
                let payload = {
                    vehi_ID: vehiID,
                    }
                    axios
                      .post('Vehiculos/Delete', payload)
                      .then((response) => {
                        setIsSubmitting(false)
                        console.log(response)
                        if (response.data.message == '1') {
                          toast.success('Registro eliminado exitosamente');
                          setVisible3(false)
                          setActualizar(!Actualizar)
                        }else if(response.data.message == '3'){
                          setActualizar(!Actualizar)
                          toast.warning('El registro esta siendo utilizado en otra tabla');
                        }
                      })
                      .catch((error) => {
                        setActualizar(!Actualizar)
                          toast.error('ha ocurrido un error');
                      })
      }

      const handleEditClick = (params) => {
        const vehiculo = Vehiculos.find((vehiculo) => vehiculo.id === params.vehi_ID);
        setVisible2(true);
        setVehiID(vehiculo.vehi_ID);
        setModeID(vehiculo.mode_ID);
        setVehiAnio(vehiculo.vehi_anio);
        setVehiMatricula(vehiculo.vehi_Matricula);
      };

      const handleDeleteClick = (params) => {
        const vehiculo = Vehiculos.find((vehiculo) => vehiculo.id === params.vehi_ID);
        setVisible3(true);
        setVehiID(vehiculo.vehi_ID);
      };

      
      const handleDetailsClick = (params) => {
        const vehiculo = Vehiculos.find((vehiculo) => vehiculo.id === params.vehi_ID);
        localStorage.setItem('VehiculoSeleccionado', JSON.stringify(vehiculo));
        navigate('/VehiculosDetails')
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

    const handleSortModelChange = (model) => {
        setSortModel(model);
    };

    const columns = [
        { field: 'vehi_ID', headerName: 'ID', width: 100 },
        { field: 'mode_Nombre', headerName: 'Modelo', width: 200 },
        { field: 'vehi_Matricula', headerName: 'Matricula', width: 200 },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 300,
            renderCell: (params) => (
                <div>
              <CButton color='danger' variant='outline' className='m-3' onClick={() => handleDeleteClick(params.row)}><Delete/></CButton>
              <CButton color='warning' variant='outline' className='m-3' onClick={() => handleEditClick(params.row)}><Edit/></CButton>
              <CButton color='info' variant='outline' className='m-3'  onClick={() => handleDetailsClick(params.row)}><Book/></CButton>
                </div>
            ),
        },
    ];

    return (
<>
<div className='card'>
            <div className='card-body'>
                <h1>Vehiculos</h1>
                <CButton onClick={() => {setVisible(!visible); setValidated(false); setModeID(null); setVehiAnio(null); setVehiMatricula(null);}}>Nuevo</CButton>
                <div className='container' style={{ height: 10 }}></div>
                <div style={{ flex: 1 }}>
                    <DataGrid
                        rows={Vehiculos}
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
     <CModalTitle>Nuevo Vehiculo</CModalTitle>
   </CModalHeader>
   <CModalBody>
   <CForm
 className="row g-3 needs-validation"
 noValidate
 validated={validated}
 onSubmit={CreateAction}
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

                     {/*Modal Delete*/}
   <CModal visible={visible3} onClose={() => setVisible3(false)}>
   <CModalHeader onClose={() => setVisible3(false)}>
     <CModalTitle>Eliminar Vehiculo</CModalTitle>
   </CModalHeader>
   <CModalBody>
   <CForm
 className="row g-3 needs-validation"
 noValidate
 validated={validated}
 onSubmit={DeleteAction}
>
 <CCol>
<h5>Desea eliminar este registro?</h5>
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

export default Vehiculos;

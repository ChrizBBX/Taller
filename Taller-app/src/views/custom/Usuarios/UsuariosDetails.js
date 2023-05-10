import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid';
import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CForm, CCol,
    CFormInput,
    CFormCheck,
    CFormFeedback,
    CFormSelect,
    CInputGroup,
    CFormLabel,
    CInputGroupText,
    CRow,
} from '@coreui/react';
import { Button, IconButton } from '@material-ui/core';
import { Delete, Edit, Book, } from '@material-ui/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'

function SucursalesDetails() {
    const navigate = useNavigate()
    const [Usuarios, setUsuarios] = useState([]);
    const [sortModel, setSortModel] = useState([{ field: 'user_ID', sort: 'asc' }]);
    const [UsuID, setUsuID] = useState('')
    const [rolID, setRolID] = useState('')
    const [nombreUsuario, setnombreUsuario] = useState('')
    const [EmpID, setEmpeID] = useState('')
    const [ContraUsuario, setContraUsuario] = useState('')
    const [rol, setRol] = useState([]);
    const [selectedRol, setSelectedRol] = useState(null);
    const [selectedempleado, setselectedEmpleado] = useState(null);
    const [empleado, setEmpleado] = useState([]);
    const [validated, setValidated] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [visible3, setVisible3] = useState(false)
    const [Actualizar, setActualizar] = useState(false)

    useEffect(() => {
        axios.get('/Empleados/ListarEmpleados')
            .then(response => {
                setEmpleado(response.data);
            })
            .catch(error => {
                console.error('Error fetching data from API:', error);
            });

        axios.get('/Roles/ListarRoles')
            .then(response => {
                setRol(response.data);
            })
            .catch(error => {
                console.error('Error fetching data from API:', error);
            });
    }, []);

    const EditAction = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true)
        event.preventDefault()
        if (nombreUsuario != '' && selectedRol != '' && selectedempleado != '') {
            let payload = {
                user_ID: UsuID,
                user_NombreUsuario: nombreUsuario,
                role_ID: selectedRol,
                empe_ID: selectedempleado
            }
            axios
                .post('Usuarios/Update', payload)
                .then((response) => {
                    setIsSubmitting(false)
                    console.log(response)
                    if (response.data.message == '1') {
                        toast.success('Registro editado exitosamente');
                        setVisible2(false)
                        setActualizar(!Actualizar)
                    } else if (response.data.message == '2') {
                        setActualizar(!Actualizar)
                        toast.warning('Ya existe ese nombre de usuario con ese nombre');
                    }
                })
                .catch((error) => {
                    setActualizar(!Actualizar)
                    toast.error('ha ocurrido un error');
                })
        } else {
            toast.error('Rellene los campos');
        }
    }


    useEffect(() => {
        const UsuarioSeleccionada = JSON.parse(localStorage.getItem('UsuarioSeleccionada'));
        console.log(UsuarioSeleccionada)
        if (UsuarioSeleccionada) {
            setUsuarios(UsuarioSeleccionada)
            setUsuID(UsuarioSeleccionada.user_ID)
            setnombreUsuario(UsuarioSeleccionada.user_NombreUsuario)
            setSelectedRol(UsuarioSeleccionada.empe_Id)
            setselectedEmpleado(UsuarioSeleccionada.role_ID)
        }
    }, [Actualizar]);

    return (
        <>
            <div className='card'>
                <div className='card-header'><h1>Detalles</h1></div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='form-group col-6'>
                            <h4>ID</h4>
                            <label>{Usuarios.user_ID}</label>
                        </div>
                        <div className='form-group col-6'>
                            <h4>Nombre de Usuario</h4>
                            <label>{Usuarios.user_NombreUsuario}</label>
                        </div>
                        <div className='form-group col-6 mt-3'>
                            <h4>Nombre Empleado</h4>
                            <label>{Usuarios.empe_Nombres}</label>
                        </div>
                        <div className='form-group col-6 mt-3'>
                            <h4>Rol</h4>
                            <label>{Usuarios.role_Nombre}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div style={{ height: 20 }}></div>
                        <div className="col-1">
                            <CButton color="warning" onClick={() => setVisible2(!visible2)}>Editar</CButton>

                        </div>
                        <div className="col-3">
                            <CButton color="info" onClick={() => { navigate('/Usuarios') }}>Regresar</CButton>
                        </div>
                        <div style={{ height: 20 }}></div>
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
                                    <td>{Usuarios.user_UserCreacion_Nombre}</td>
                                    <td>{Usuarios.user_FechaCreacion}</td>
                                </tr>
                                <tr>
                                    <td>Modificacion</td>
                                    <td>{Usuarios.user_UserModificacion_Nombre}</td>
                                    <td>{Usuarios.user_FechaModificacion}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/*Modal Edit*/}
            <CModal visible={visible2} onClose={() => setVisible2(false)}>
                <CModalHeader onClose={() => setVisible2(false)}>
                    <CModalTitle>Editar Sucursal</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm
                        className="row g-3 needs-validation"
                        noValidate
                        validated={validated}
                        onSubmit={EditAction}
                    >
                        <CCol>
                            <h6>Nombre Usuario</h6>
                            <CFormInput
                                type="text"
                                id="validationCustom01"
                                required
                                value={nombreUsuario}
                                onChange={(e) => setnombreUsuario(e.target.value)}
                            />                       
                            <h6>Empleado</h6>
                            <CFormSelect value={selectedempleado} onChange={(event) => setselectedEmpleado(event.target.value)} className='mb-2' required>
                                <option value="" hidden>--Seleccione un Empleado--</option>
                                {empleado.map((empleado) => (
                                    <option key={empleado.empe_Id} value={empleado.empe_Id}>{empleado.empe_Nombres}</option>
                                ))}
                            </CFormSelect>
                            <h6>Rol</h6>
                            <CFormSelect value={selectedRol} onChange={(event) => setSelectedRol(event.target.value)} className='mb-2' required>
                                <option value="" hidden>--Seleccione un rol--</option>
                                {rol.map((rol) => (
                                    <option key={rol.role_ID} value={rol.role_ID}>{rol.role_Nombre}</option>
                                ))}
                            </CFormSelect>
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
        </>
    )
}

export default SucursalesDetails
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid';
import { Checkbox } from '@material-ui/core';
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
import { Delete, Edit, Book, } from '@material-ui/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'


function Usuarios() {
    const navigate = useNavigate()
    const [Usuarios, setUsuarios] = useState([]);
    const [sortModel, setSortModel] = useState([{ field: 'user_ID', sort: 'asc' }]);
    const [UsuID, setUsuID] = useState('')
    const [nombreUsuario, setnombreUsuario] = useState('')
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
        axios
            .get('Usuarios')
            .then((response) => {
                const insertarid = response.data.map((row) => ({
                    ...row,
                    id: row.user_ID,
                }));
                setUsuarios(insertarid);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [Actualizar]);

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

    const handleSortModelChange = (model) => {
        setSortModel(model);
    };

    const CreateAction = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true)
        event.preventDefault()
        if (nombreUsuario != '' && ContraUsuario != '' && selectedRol != '' && selectedempleado != '') {
            let payload = {
                user_NombreUsuario: nombreUsuario,
                user_Contrasena: ContraUsuario,
                role_ID: selectedRol,
                empe_ID: selectedempleado
            }
            axios
                .post('Usuarios/Insert', payload)
                .then((response) => {
                    setIsSubmitting(false)
                    console.log(response)
                    if (response.data.message == '1') {
                        toast.success('Registro agregado exitosamente');
                        setVisible(false)
                        setActualizar(!Actualizar)
                    } else if (response.data.message == '2') {
                        setActualizar(!Actualizar)
                        toast.warning('Ya existe en Usuarios con ese nombre');
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

    const DeleteAction = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true)
        event.preventDefault()
        let payload = {
            user_ID: UsuID
        }
        axios
            .post('Usuarios/Delete', payload)
            .then((response) => {
                setIsSubmitting(false)
                console.log(response)
                if (response.data.message == '1') {
                    toast.success('Registro eliminado exitosamente');
                    setVisible3(false)
                    setActualizar(!Actualizar)
                }
            })
            .catch((error) => {
                setActualizar(!Actualizar)
                toast.error('ha ocurrido un error');
            })
    }

    const handleEditClick = (params) => {
        const usuarios = Usuarios.find((usuarios) => usuarios.user_ID === params.user_ID);
        setVisible2(true);
        setUsuID(usuarios.user_ID)
        setnombreUsuario(usuarios.user_NombreUsuario)
        setSelectedRol(usuarios.role_ID)
        setselectedEmpleado(usuarios.empe_ID)
    };

    const handleDeleteClick = (params) => {
        const usuarios = Usuarios.find((usuarios) => usuarios.user_ID === params.user_ID);
        setVisible3(true);
        setUsuID(usuarios.user_ID)
    };

    const handleDetailsClick = (params) => {
        const usuarios = Usuarios.find((usuarios) => usuarios.user_ID === params.user_ID);
        localStorage.setItem('UsuarioSeleccionada', JSON.stringify(usuarios));
        navigate('/UsuariosDetails')
    };


    const columns = [
        { field: 'user_ID', headerName: 'ID', width: 100 },
        { field: 'user_NombreUsuario', headerName: 'Nombre Usuario', width: 200 },
        {
            field: 'user_EsAdmin',
            headerName: 'EsAdmin',
            width: 200,
            renderCell: (params) => (
                <Checkbox
                    checked={params.value}
                    disabled
                />
            ),
        },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 300,
            renderCell: (params) => (
                <div>
                    <CButton color='danger' variant='outline' className='m-3' onClick={() => handleDeleteClick(params.row)}><Delete /></CButton>
                    <CButton color='warning' variant='outline' className='m-3' onClick={() => handleEditClick(params.row)}><Edit /></CButton>
                    <CButton color='info' variant='outline' className='m-3' onClick={() => handleDetailsClick(params.row)}><Book /></CButton>
                </div>
            ),
        },
    ];

    return (
        <>
            <div className='card'>
                <div className='card-body'>
                    <h1>Usuarios</h1>
                    <CButton onClick={() => { setVisible(!visible); setValidated(false); setnombreUsuario(''); setSelectedRol(''); setSelectedRol(''); setContraUsuario('') }}>Nuevo</CButton>
                    <div className='container' style={{ height: 10 }}></div>
                    <div style={{ flex: 1 }}>
                        <DataGrid
                            rows={Usuarios}
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
                    <CModalTitle>Nuevo Usuario</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm
                        className="row g-3 needs-validation"
                        noValidate
                        validated={validated}
                        onSubmit={CreateAction}
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
                            <h6>Contraseña</h6>
                            <CFormInput
                                type="password"
                                id="validationCustom01"
                                required
                                value={ContraUsuario}
                                onChange={(e) => setContraUsuario(e.target.value)}
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
                    <CModalTitle>Editar Usuario</CModalTitle>
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

            {/*Modal Delete*/}
            <CModal visible={visible3} onClose={() => setVisible3(false)}>
                <CModalHeader onClose={() => setVisible3(false)}>
                    <CModalTitle>Eliminar Sucursal</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm
                        className="row g-3 needs-validation"
                        noValidate
                        validated={validated}
                        onSubmit={DeleteAction}
                    >
                        <CCol>
                            <h6>Seguro que deseas eliminar este registro?</h6>
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

export default Usuarios;
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
import { red } from '@material-ui/core/colors';
import Marcas from '../marcas/Marcas';

function EmpleadosDetails() {
    const navigate = useNavigate()
    const [sortModel, setSortModel] = useState([{ field: 'clie_ID', sort: 'asc' }]);
    const [ClienteSeleccionado, setClientes] = useState([]);
 
    useEffect(() => {
        setClientes(JSON.parse(localStorage.getItem('ClienteSeleccionado')));   
    }, []);

    const handleSortModelChange = (model) => {
        setSortModel(model);
    };

    return (
        <div className='card' style={{ backgroundColor: 'white' }}>
            <div className='card-header'><h1>Detalles</h1></div>
            <div className='card-body'>
                <div className='row'>
                    <div className='form-group col-6'>
                        <h5>ID</h5>
                        <label>{ClienteSeleccionado.clie_ID}</label>
                    </div>
                    <div className='form-group col-6'>
                        <h5>Nombre Cliente</h5>
                        <label>{ClienteSeleccionado.clie_Nombres}</label>
                    </div>
                    <div className='form-group col-6 mt-3'>
                        <h5>Apellido Cliente</h5>
                        <label>{ClienteSeleccionado.clie_Apellidos}</label>
                    </div>        
                    <div className='form-group col-6 mt-3'>
                        <h5>Correo Electronico</h5>
                        <label>{ClienteSeleccionado.clie_CorreoElectronico}</label>
                    </div>
                    <div className='form-group col-6 mt-3'>
                        <h5>Telefono</h5>
                        <label>{ClienteSeleccionado.clie_Telefono}</label>
                    </div> 
                     <div className='form-group col-6 mt-3'>
                        <h5>Sexo</h5>
                        <label>{ClienteSeleccionado.clie_Sexo}</label>
                    </div>
                </div>
                <div className="row">
                    <div style={{ height: 20 }}></div>
                    <div className="col-1">
                        <CButton color="warning" onClick={() => navigate('/ClienteEdit')}>Editar</CButton>

                    </div>
                    <div className="col-3">
                        <CButton color="info" onClick={() => { navigate('/Clientes') }}>Regresar</CButton>
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
                                <td>{ClienteSeleccionado.clie_UserCreacion_Nombre}</td>
                                <td>{ClienteSeleccionado.clie_FechaCreacion}</td>
                            </tr>
                            <tr>
                                <td>Modificacion</td>
                                <td>{ClienteSeleccionado.clie_UserModificacion_Nombre}</td>
                                <td>{ClienteSeleccionado.clie_FechaModificacion}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default EmpleadosDetails
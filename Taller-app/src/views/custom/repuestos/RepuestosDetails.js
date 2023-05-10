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

function RepuestosDetails() {
    const navigate = useNavigate()
    const [proveedores, setProveedores] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [repuestos, setRepuestos] = useState([]);
    const [respID, setrespID] = useState('')
    const [respDescripcion, setrespDescripcion] = useState('')
    const [respPrecio, setrespPrecio] = useState('')
    const [provID, setprovID] = useState(null)
    const [marcID, setmarcID] = useState(null)
    const [respAnio, setrespAnio] = useState('')
    const [respStock, setrespStock] = useState('')
    const [sortModel, setSortModel] = useState([{ field: 'resp_ID', sort: 'asc' }]);
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [visible3, setVisible3] = useState(false)
    const [Actualizar, setActualizar] = useState(false)
    const [validated, setValidated] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        const Repuesto = JSON.parse(localStorage.getItem('RepuestoSeleccionado'));
        console.log(Repuesto)
        if (Repuesto) {
            setRepuestos(Repuesto)
            setrespID(Repuesto.resp_ID);
            setrespDescripcion(Repuesto.resp_Descripcion);
            setrespPrecio(Repuesto.resp_Precio);
            setprovID(Repuesto.prov_ID);
            setmarcID(Repuesto.marc_ID);
            setrespAnio(Repuesto.resp_Anio);
        }
    }, []);

    const handleEditClick = (params) => {
        const repuesto = repuestos.find((proveedor) => proveedor.prov_ID === params.resp_ID); // Busca la marca seleccionada
        localStorage.setItem('RepuestoSeleccionado', JSON.stringify(repuesto));
        navigate('/repuestosEdit')
    };

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
                        <label>{repuestos.resp_ID}</label>
                    </div>
                    <div className='form-group col-6'>
                        <h5>Repuesto</h5>
                        <label>{repuestos.resp_Descripcion}</label>
                    </div>
                    <div className='form-group col-6 mt-3'>
                        <h5>Precio</h5>
                        <label>{repuestos.resp_Precio}</label>
                    </div>
                    <div className='form-group col-6 mt-3'>
                        <h5>Proveedor</h5>
                        <label>{repuestos.prov_Nombre}</label>
                    </div>
                    <div className='form-group col-6 mt-3'>
                        <h5>Marca</h5>
                        <label>{repuestos.marc_Nombre}</label>
                    </div>
                    <div className='form-group col-6 mt-3'>
                        <h5>Año</h5>
                        <label>{repuestos.resp_Anio}</label>
                    </div>
                    <div className='form-group col-6 mt-3'>
                        <h5>Stock</h5>
                        <label>{repuestos.resp_Stock}</label>
                    </div>
                </div>
                <div className="row">
                    <div style={{ height: 20 }}></div>
                    <div className="col-1">
                        <CButton color="warning" onClick={() => navigate('/repuestosEdit')}>Editar</CButton>

                    </div>
                    <div className="col-3">
                        <CButton color="info" onClick={() => { navigate('/repuestos') }}>Regresar</CButton>
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
                                <td>{repuestos.resp_UserCreacion_Nombre}</td>
                                <td>{repuestos.resp_FechaCreacion}</td>
                            </tr>
                            <tr>
                                <td>Modificacion</td>
                                <td>{repuestos.resp_UserModificacion_Nombre}</td>
                                <td>{repuestos.resp_FechaModificacion}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default RepuestosDetails
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Checkbox } from '@material-ui/core';
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
  import {Delete,Edit, Book,} from '@material-ui/icons';
  import { toast, ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
  

function Usuarios() {
    const navigate = useNavigate()
    const [Usuarios, setUsuarios] = useState([]);
    const [sortModel, setSortModel] = useState([{ field: 'user_ID', sort: 'asc' }]);
    const [rolID,setRolID] = useState('')
    const [nombreUsuario,setnombreUsuario] = useState('')
    const [EmpID,setEmpeID] = useState('')
    const [ContraUsuario,setContraUsuario] = useState('')
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
          setDepartamentos(response.data);
        })
        .catch(error => {
          console.error('Error fetching data from API:', error);
        });

        axios.get('/Roles/ListarRoles')
        .then(response => {
          setDepartamentos(response.data);
        })
        .catch(error => {
          console.error('Error fetching data from API:', error);
        });
    }, []);

    const handleSortModelChange = (model) => {
        setSortModel(model);
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
                    <IconButton color='secondary'>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton color='primary'>
                        <EditIcon />
                    </IconButton>
                    <IconButton>
                        <VisibilityIcon />
                    </IconButton>
                </div>
            ),
        },
    ];

    return (
        <div className='card'>
            <div className='card-body'>
                <h1>Usuarios</h1>
                <div className='btn btn-primary'>Nuevo</div>
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
    );
}

export default Usuarios;
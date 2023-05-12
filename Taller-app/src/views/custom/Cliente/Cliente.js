import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid';
import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CForm, CCol,
    CRow,
} from '@coreui/react';
import { Delete, Edit, Book, } from '@material-ui/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'

function Clientes() {
    const navigate = useNavigate()
    const [Clientes, setClientes] = useState([]);
    const [sortModel, setSortModel] = useState([{ field: 'clie_ID', sort: 'asc' }]);
    const [clieID, setclieID] = useState('')
    const [visible3, setVisible3] = useState(false)
    const [Actualizar, setActualizar] = useState(false)
    const [visible, setVisible] = useState(false)
    const [validated, setValidated] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        axios
            .get('/Clientes')
            .then((response) => {
                const insertarid = response.data.map((row) => ({
                    ...row,
                    id: row.clie_ID,
                }));
                setClientes(insertarid);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [Actualizar]);

    const handleSortModelChange = (model) => {
        setSortModel(model);
    };

    const DeleteAction = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true)
        event.preventDefault()
        let payload = {
            clie_ID: clieID,
        }
        axios
            .post('Clientes/Delete', payload)
            .then((response) => {
                setIsSubmitting(false)
                console.log(response)
                if (response.data.message == '1') {
                    toast.success('Registro Eliminado exitosamente');
                    setVisible(false)
                    setActualizar(!Actualizar)
                    navigate('/Empleados')
                } else if (response.data.message == '2') {
                    setActualizar(!Actualizar)
                    toast.warning('Ya existe ese registro');
                }
            })
            .catch((error) => {
                setActualizar(!Actualizar)
                toast.error('ha ocurrido un error');
            })
    }
    
    const handleEditClick = (params) => {
        const clientes = Clientes.find((clientes) => clientes.clie_ID === params.clie_ID); 
        localStorage.setItem('ClienteSeleccionado', JSON.stringify(clientes));
        navigate('/ClienteEdit')
    };

    const handleDetailsClick = (params) => {
        const clientes = Clientes.find((clientes) => clientes.clie_ID === params.clie_ID); 
        localStorage.setItem('ClienteSeleccionado', JSON.stringify(clientes));
        navigate('/ClienteDetails')
    };

    const handleDeleteClick = (params) => {
        const clientes = Clientes.find((clientes) => clientes.clie_ID === clientes.clie_ID); 
        setclieID(clientes.clie_ID)
        setVisible3(!visible3)
    };

    const columns = [
        { field: 'clie_ID', headerName: 'ID', width: 100 },
        { field: 'clie_Nombres', headerName: 'Nombre', width: 150 },
        { field: 'clie_Sexo', headerName: 'Sexo', width: 70 },
        { field: 'clie_Telefono', headerName: 'Identidad', width: 150 },
        { field: 'clie_CorreoElectronico', headerName: 'Correo Electronico', width: 150 },
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
                <h1>Clientes</h1>
                <CButton onClick={() => navigate('/ClienteCreate')}>Nuevo</CButton>
                <div className='container' style={{ height: 10 }}></div>
                <div style={{ flex: 1 }}>
                    <DataGrid
                        rows={Clientes}
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
         {/*Modal Delete*/}
         <CModal visible={visible3} onClose={() => setVisible3(false)}>
            <CModalHeader onClose={() => setVisible3(false)}>
              <CModalTitle>Eliminar Cliente</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={DeleteAction}
              >
                <CCol>
                  <h6>Esta seguro que desea eliminar este cliente?</h6>
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

export default Clientes;
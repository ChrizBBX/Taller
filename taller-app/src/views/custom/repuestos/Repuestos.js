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

function Repuestos() {
  const navigate = useNavigate()
  const [proveedores, setProveedores] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [repuestos, setRepuestos] = useState([]);
  const [respDescripcion, setrespDescripcion] = useState('')
  const [respPrecio, setrespPrecio] = useState('')
  const [provID, setprovID] = useState('')
  const [marcID, setmarcID] = useState('')
  const [respID, setrespID] = useState('')
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
    axios
      .get('/Proveedores')
      .then((response) => {
        const insertarid = response.data.map((row) => ({
          ...row,
          id: row.prov_ID,
        }));
        setProveedores(insertarid);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [Actualizar]);

  useEffect(() => {
    axios
      .get('/Repuestos')
      .then((response) => {
        const insertarid = response.data.map((row) => ({
          ...row,
          id: row.resp_ID,
        }));
        setRepuestos(insertarid);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [Actualizar]);

  useEffect(() => {
    axios
      .get('/Marcas')
      .then((response) => {
        console.log('holaaa')
        const insertarid = response.data.map((row) => ({
          ...row,
          id: row.marc_ID,
        }));
        setMarcas(insertarid);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [Actualizar]);

  const DeleteAction = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    event.preventDefault()
    let payload = {
      resp_ID: respID,
    }
    axios
      .post('Repuestos/Delete', payload)
      .then((response) => {
        setIsSubmitting(false)
        console.log(response)
        if (response.data.message == '1') {
          toast.success('Registro Eliminado exitosamente');
          setVisible(false)
          setActualizar(!Actualizar)
          navigate('/repuestos')
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
    const repuesto = repuestos.find((proveedor) => proveedor.prov_ID === params.resp_ID); // Busca la marca seleccionada
    localStorage.setItem('RepuestoSeleccionado', JSON.stringify(repuesto));
    navigate('/repuestosEdit')
  };

  const handleDetailsClick = (params) => {
    const repuesto = repuestos.find((proveedor) => proveedor.prov_ID === params.resp_ID); // Busca la marca seleccionada
    localStorage.setItem('RepuestoSeleccionado', JSON.stringify(repuesto));
    navigate('/repuestosDetails')
  };

  const handleDeleteClick = (params) => {
    const repuesto = repuestos.find((proveedor) => proveedor.prov_ID === params.resp_ID); // Busca la marca seleccionada
    setrespID(repuesto.resp_ID)
    setVisible3(!visible3)
  };

  const handleSortModelChange = (model) => {
    setSortModel(model);
  };

  const columns = [
    { field: 'resp_ID', headerName: 'ID', width: 1 },
    { field: 'resp_Descripcion', headerName: 'Descripción', width: 400 },
    { field: 'resp_Precio', headerName: 'Precio', width: 120 },
    { field: 'prov_Nombre', headerName: 'Proveedor', width: 200 },
    { field: 'marc_Nombre', headerName: 'Marca', width: 150 },
    { field: 'resp_Anio', headerName: 'Año', width: 100 },
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
      <div className="card">
        <div className="card-body">
          <h1>Repuestos</h1>
          <CButton onClick={() => navigate('/repuestosCreate')}>Nuevo</CButton>
          <div className="container" style={{ height: 10 }}></div>
          <div style={{ flex: 1 }}>
            <DataGrid
              rows={repuestos}
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
          <CModalTitle>Eliminar Repuesto</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={DeleteAction}
          >
            <CCol>
              <h6>Esta seguro que desea eliminar este repuesto?</h6>
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

export default Repuestos;

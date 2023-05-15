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
import {Delete,Edit, Book,} from '@material-ui/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
function Ventas() {
  const navigate = useNavigate()
  const [ventas, setVentas] = useState([]);
  const [sortModel, setSortModel] = useState([{ field: 'vent_Id', sort: 'asc' }]);

  useEffect(() => {
    axios
      .get('/Ventas')
      .then((response) => {
        const insertarid = response.data.map((row) => ({
          ...row,
          id: row.vent_Id,
        }));
        setVentas(insertarid);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEditClick = (params) => {
    const venta = ventas.find((venta) => venta.vent_ID === params.vent_ID); // Busca la marca seleccionada
    navigate('/ventasEdit',{ state: { ventas: venta } })
  };

  const handleDetailsClick = (params) => {
    const venta = ventas.find((venta) => venta.vent_ID === params.vent_ID); // Busca la marca seleccionada
    navigate('/ventasDetails',{ state: { ventas: venta } })
  };


  const handleSortModelChange = (model) => {
    setSortModel(model);
  };

  const columns = [
    { field: 'vent_Id', headerName: 'ID', flex: 1 },
    { field: 'clie_Nombres', headerName: 'Cliente', flex: 1 },
    { field: 'meto_Nombre', headerName: 'Metodo de pago', flex: 1 },
    { field: 'sucu_Descripcion', headerName: 'Sucursal',flex: 1 },
    { field: 'vent_FechaCreacion', headerName: 'Fecha',flex: 1 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 300,
      renderCell: (params) => (
        <div>
              <CButton color='danger' variant='outline' className='m-3' onClick={() => toast.warning('No se puede eliminar una venta')}><Delete/></CButton>
              <CButton color='warning' variant='outline' className='m-3' onClick={() => handleEditClick(params.row)}><Edit/></CButton>
              <CButton color='info' variant='outline' className='m-3' onClick={() => handleDetailsClick(params.row)}><Book/></CButton>
        </div>
      ),
    },
  ];

  return (
    <div className="card">
      <div className="card-body">
        <h1>Ventas</h1>
        <CButton onClick={() => {navigate('/ventasCreate')}}>Nuevo</CButton>
        <div className="container" style={{ height: 10 }}></div>
        <div style={{ flex: 1 }}>
          <DataGrid
            rows={ventas}
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

export default Ventas;

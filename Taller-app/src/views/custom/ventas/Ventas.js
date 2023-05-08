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

  const handleSortModelChange = (model) => {
    setSortModel(model);
  };

  const columns = [
    { field: 'vent_Id', headerName: 'ID', width: 100 },
    { field: 'vent_Fecha', headerName: 'Fecha', width: 200 },
    { field: 'clie_Nombres', headerName: 'Cliente', width: 250 },
    { field: 'vent_Descuento', headerName: 'Descuento', width: 150 },
    { field: 'vent_MontoFinal', headerName: 'Monto Final', width: 200 },
    { field: 'sucu_Descripcion', headerName: 'Sucursal', width: 250 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 300,
      renderCell: (params) => (
        <div>
              <CButton color='danger' variant='outline' className='m-3'><Delete/></CButton>
              <CButton color='warning' variant='outline' className='m-3'><Edit/></CButton>
              <CButton color='info' variant='outline' className='m-3'><Book/></CButton>
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

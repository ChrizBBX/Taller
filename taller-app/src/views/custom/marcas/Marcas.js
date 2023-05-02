import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar,esES } from '@mui/x-data-grid';
import { CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react';
import {IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';


function Marcas() {
  const [visible, setVisible] = useState(false)
  const [marcas, setMarcas] = useState([]);
  const [sortModel, setSortModel] = useState([{ field: 'marc_ID', sort: 'asc' }]);

  
  useEffect(() => {
    axios
      .get('http://proyectotaller.somee.com/api/Marcas')
      .then((response) => {
        const insertarid = response.data.map((row) => ({
          ...row,
          id: row.marc_ID,
        }));
        setMarcas(insertarid);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

  const handleSortModelChange = (model) => {
    setSortModel(model);
  };


  const columns = [
    { field: 'marc_ID', headerName: 'ID', width: 1,},
    { field: 'marc_Nombre', headerName: 'Marca', width: 200},
    { field: 'marc_FechaCreacion', headerName: 'Fecha de creación', width: 150},
    { field: 'marc_UserCreacion_Nombre', headerName: 'Usuario creador', width: 200},
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 300,
      renderCell: (params) => (
        <div>
    <IconButton color="secondary">
        <DeleteIcon />
      </IconButton>
      <IconButton color="primary">
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
        <>
    <CButton onClick={() => setVisible(!visible)}>Launch demo modal</CButton>
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>Modal title</CModalTitle>
      </CModalHeader>
      <CModalBody>Woohoo, you're reading this text in a modal!</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton color="primary">Save changes</CButton>
      </CModalFooter>
    </CModal>
  </>
        <div className='card-body'>
        <h1>Marcas</h1>
        <div className='btn btn-primary'>Nuevo</div>
        <div className='container' style={{height: 10}}></div>
        <div style={{ flex: 1}}>
        <DataGrid
  rows={marcas}
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

export default Marcas;

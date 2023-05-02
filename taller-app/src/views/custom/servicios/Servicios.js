import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

function Servicios() {

  const [servicios, setServicios] = useState([]);
  const [sortModel, setSortModel] = useState([{ field: 'serv_ID', sort: 'asc' }]);

  useEffect(() => {
    axios
      .get('http://proyectotaller.somee.com/api/Servicios')
      .then((response) => {
        const insertarid = response.data.map((row) => ({
          ...row,
          id: row.serv_ID,
        }));
        setServicios(insertarid);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSortModelChange = (model) => {
    setSortModel(model);
  };

  const columns = [
    { field: 'serv_ID', headerName: 'ID', width: 1 },
    { field: 'serv_Descripcion', headerName: 'Descripción', width: 200 },
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
      <div className='card-body'>
        <h1>Servicios</h1>
        <div className='btn btn-primary'>Nuevo</div>
        <div className='container' style={{ height: 10 }}></div>
        <div style={{ flex: 1 }}>
          <DataGrid
            rows={servicios}
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

export default Servicios;

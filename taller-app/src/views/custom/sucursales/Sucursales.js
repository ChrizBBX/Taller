import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from '@material-ui/core';

function Sucursales() {
  const [sucursales, setSucursales] = useState([]);
  const [sortModel, setSortModel] = useState([{ field: 'sucu_ID', sort: 'asc' }]);

  useEffect(() => {
    axios
      .get('http://proyectotaller.somee.com/api/Sucursales')
      .then((response) => {
        const insertarid = response.data.map((row) => ({
          ...row,
          id: row.sucu_ID,
        }));
        setSucursales(insertarid);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

  const handleSortModelChange = (model) => {
    setSortModel(model);
  };

  const columns = [
    { field: 'sucu_ID', headerName: 'ID', width: 100 },
    { field: 'sucu_Descripcion', headerName: 'Sucursal', width: 200 },
    { field: 'muni_Nombre', headerName: 'Municipio', width: 200 },
    { field: 'sucu_DireccionExacta', headerName: 'Direccion', width: 400 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 300,
      renderCell: (params) => (
        <div>
          <Button variant="contained" color="secondary">
            Eliminar
          </Button>
          <Button variant="contained" color="primary">
            Editar
          </Button>
          <Button variant="contained" color="default">
            Detalles
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className='card'>
        <div className='card-body'>
        <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={sucursales}
        columns={columns}
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
        </div>
    </div>
  );
}

export default Sucursales;

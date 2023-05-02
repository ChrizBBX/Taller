import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [sortModel, setSortModel] = useState([{ field: 'vent_Id', sort: 'asc' }]);

  useEffect(() => {
    axios
      .get('http://proyectotaller.somee.com/api/Ventas')
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
    <div className="card">
      <div className="card-body">
        <h1>Ventas</h1>
        <div className="btn btn-primary">Nuevo</div>
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

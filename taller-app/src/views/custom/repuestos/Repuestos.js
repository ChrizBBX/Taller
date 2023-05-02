import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar,esES } from '@mui/x-data-grid';
import {IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

function Repuestos() {

const [repuestos, setRepuestos] = useState([]);
const [sortModel, setSortModel] = useState([{ field: 'resp_ID', sort: 'asc' }]);

useEffect(() => {
axios
.get('http://proyectotaller.somee.com/api/Repuestos')
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
}, []);

const handleSortModelChange = (model) => {
setSortModel(model);
};

const columns = [
{ field: 'resp_ID', headerName: 'ID', width: 1,},
{ field: 'resp_Descripcion', headerName: 'Descripción', width: 300},
{ field: 'resp_Precio', headerName: 'Precio', width: 150},
{ field: 'prov_Nombre', headerName: 'Proveedor', width: 200},
{ field: 'marc_Nombre', headerName: 'Marca', width: 150},
{ field: 'resp_Anio', headerName: 'Año', width: 150},
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
<h1>Repuestos</h1>
<div className='btn btn-primary'>Nuevo</div>
<div className='container' style={{height: 10}}></div>
<div style={{ flex: 1}}>
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
);
}

export default Repuestos;







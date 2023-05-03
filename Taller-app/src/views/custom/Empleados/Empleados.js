import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

function Empleados() {
    const [empleados, setEmpleados] = useState([]);
    const [sortModel, setSortModel] = useState([{ field: 'empe_Id', sort: 'asc' }]);

    useEffect(() => {
        axios
            .get('https://localhost:44387/api/Empleados')
            .then((response) => {
                const insertarid = response.data.map((row) => ({
                    ...row,
                    id: row.empe_Id,
                }));
                setEmpleados(insertarid);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSortModelChange = (model) => {
        setSortModel(model);
    };

    const columns = [
        { field: 'empe_Id', headerName: 'ID', width: 100 },
        { field: 'empe_Nombres', headerName: 'Nombre', width: 200 },
        { field: 'empe_Identidad', headerName: 'Identidad', width: 200 },
        { field: 'empe_Sexo', headerName: 'Sexo', width: 150 },
        { field: 'estacivi_Nombre', headerName: 'Estado Civil', width: 360 },
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
                <h1>Empleados</h1>
                <div className='btn btn-primary' href={'src/views/custom/Empleados/CreateEmpleados'} >Nuevo</div>
                <div className='container' style={{ height: 10 }}></div>
                <div style={{ flex: 1 }}>
                    <DataGrid
                        rows={empleados}
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

export default Empleados;
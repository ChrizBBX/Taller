import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Checkbox } from '@material-ui/core';

function Usuarios() {
    const [Usuarios, setUsuarios] = useState([]);
    const [sortModel, setSortModel] = useState([{ field: 'user_ID', sort: 'asc' }]);

    useEffect(() => {
        axios
            .get('http://proyectotaller.somee.com/api/Usuarios')
            .then((response) => {
                const insertarid = response.data.map((row) => ({
                    ...row,
                    id: row.user_ID,
                }));
                setUsuarios(insertarid);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSortModelChange = (model) => {
        setSortModel(model);
    };

    const columns = [
        { field: 'user_ID', headerName: 'ID', width: 100 },
        { field: 'user_NombreUsuario', headerName: 'Nombre Usuario', width: 200 },
        {
            field: 'user_EsAdmin',
            headerName: 'EsAdmin',
            width: 200,
            renderCell: (params) => (
                <Checkbox
                    checked={params.value}
                    disabled
                />
            ),
        },
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
                <h1>Usuarios</h1>
                <div className='btn btn-primary'>Nuevo</div>
                <div className='container' style={{ height: 10 }}></div>
                <div style={{ flex: 1 }}>
                    <DataGrid
                        rows={Usuarios}
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

export default Usuarios;
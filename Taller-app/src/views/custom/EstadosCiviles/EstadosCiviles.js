import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

function EstadosCiviles() {
    const [EstadosCiviles, setEstadosCiviles] = useState([]);
    const [sortModel, setSortModel] = useState([{ field: 'estacivi_ID', sort: 'asc' }]);

    useEffect(() => {
        axios
            .get('https://localhost:44387/api/EstadosCiviles')
            .then((response) => {
                const insertarid = response.data.map((row) => ({
                    ...row,
                    id: row.estacivi_ID,
                }));
                setEstadosCiviles(insertarid);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSortModelChange = (model) => {
        setSortModel(model);
    };

    const columns = [
        { field: 'estacivi_ID', headerName: 'ID', width: 100 },
        { field: 'estacivi_Nombre', headerName: 'Estado Civil', width: 200 },
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
                <h1>EstadosCiviles</h1>
                <div className='btn btn-primary'>Nuevo</div>
                <div className='container' style={{ height: 10 }}></div>
                <div style={{ flex: 1 }}>
                    <DataGrid
                        rows={EstadosCiviles}
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

export default EstadosCiviles;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

function Vehiculos() {
    const [Vehiculos, setVehiculos] = useState([]);
    const [sortModel, setSortModel] = useState([{ field: 'vehi_ID', sort: 'asc' }]);

    useEffect(() => {
        axios
            .get('http://proyectotaller.somee.com/api/Vehiculos')
            .then((response) => {
                const insertarid = response.data.map((row) => ({
                    ...row,
                    id: row.vehi_ID,
                }));
                setVehiculos(insertarid);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSortModelChange = (model) => {
        setSortModel(model);
    };

    const columns = [
        { field: 'vehi_ID', headerName: 'ID', width: 100 },
        { field: 'mode_Nombre', headerName: 'Modelo', width: 200 },
        { field: 'vehi_Matricula', headerName: 'Matricula', width: 200 },
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
                <h1>Vehiculos</h1>
                <div className='btn btn-primary'>Nuevo</div>
                <div className='container' style={{ height: 10 }}></div>
                <div style={{ flex: 1 }}>
                    <DataGrid
                        rows={Vehiculos}
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

export default Vehiculos;
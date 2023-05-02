import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

function Compras() {
    const [Compras, setCompras] = useState([]);
    const [sortModel, setSortModel] = useState([{ field: 'comp_ID', sort: 'asc' }]);

    useEffect(() => {
        axios
            .get('http://proyectotaller.somee.com/api/Compras')
            .then((response) => {
                const insertarid = response.data.map((row) => ({
                    ...row,
                    id: row.comp_ID,
                }));
                setCompras(insertarid);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSortModelChange = (model) => {
        setSortModel(model);
    };

    const columns = [
        { field: 'comp_ID', headerName: 'ID', width: 100 },
        { field: 'prov_Nombre', headerName: 'Proveedor', width: 200 },
        { field: 'comp_Fecha', headerName: 'Fecha de la Compra', width: 200 },   
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
                <h1>Compras</h1>
                <div className='btn btn-primary'>Nuevo</div>
                <div className='container' style={{ height: 10 }}></div>
                <div style={{ flex: 1 }}>
                    <DataGrid
                        rows={Compras}
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

export default Compras;
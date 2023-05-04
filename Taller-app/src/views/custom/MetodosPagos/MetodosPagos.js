import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react';

function MetodosPagos() {
    const [MetodosPagos, setMetodosPagos] = useState([]);
    const [sortModel, setSortModel] = useState([{ field: 'meto_ID', sort: 'asc' }]);
    const [modalVisible, setModalVisible] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        axios
            .get('https://localhost:44387/api/MetodosPagos')
            .then((response) => {
                const insertarid = response.data.map((row) => ({
                    ...row,
                    id: row.meto_ID,
                }));
                setMetodosPagos(insertarid);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSortModelChange = (model) => {
        setSortModel(model);
    };

    const handleModalVisible = () => {
        setModalVisible(!modalVisible);
    };

    const columns = [
        { field: 'meto_ID', headerName: 'ID', width: 100 },
        { field: 'meto_Nombre', headerName: 'Nombre', width: 200 },
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
                <h1>Metodos de Pagos</h1>
                <div className='btn btn-primary' onClick={() => setVisible(true)}>Nuevo</div>
                <div className='container' style={{ height: 10 }}></div>
                <div style={{ flex: 1 }}>
                    <DataGrid
                        rows={MetodosPagos}
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
            <CModal visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle>Nuevo Metodo de Pago</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {/* Aquí va el contenido del modal */}
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Cancelar
                    </CButton>
                    <CButton color="primary">Guardar</CButton>
                </CModalFooter>
            </CModal>
        </div>
    );
}   
export default MetodosPagos;
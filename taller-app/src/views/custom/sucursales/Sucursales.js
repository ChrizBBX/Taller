import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid';
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm, CCol,
  CFormInput,
  CFormCheck,
  CFormFeedback,
  CFormSelect,
  CInputGroup,
  CFormLabel,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import { Button, IconButton } from '@material-ui/core';
import { Delete, Edit, Book, } from '@material-ui/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'

function Sucursales() {
  const navigate = useNavigate()
  const [sucursales, setSucursales] = useState([]);
  const [sortModel, setSortModel] = useState([{ field: 'sucu_ID', sort: 'asc' }]);
  const [sucuID, setSucuID] = useState('')
  const [sucuDescripcion, setSucuDescripcion] = useState('')
  const [muniID, setMuniID] = useState('')
  const [sucuDireccionExacta, setSucuDireccionExacta] = useState('')
  const [departamentos, setDepartamentos] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState(null);
  const [selectedMunicipio, setselectedMunicipio] = useState(null);
  const [municipios, setMunicipios] = useState([]);
  const [validated, setValidated] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)
  const [Actualizar, setActualizar] = useState(false)

  useEffect(() => {
    axios
      .get('/Sucursales')
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
  }, [Actualizar]);

  useEffect(() => {
    axios.get('/Departamentos/ListarDepartamentos')
      .then(response => {
        setDepartamentos(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedDepartamento) {
      axios.get(`/Municipios/ListarMunicipiosPorDepto/${selectedDepartamento}`)
        .then(response => {
          setMunicipios(response.data);
        })
        .catch(error => {
          console.error('Error fetching data from API:', error);
        });
    }
  }, [selectedDepartamento]);


  const handleSortModelChange = (model) => {
    setSortModel(model);
  };

  const CreateAction = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    event.preventDefault()
    if (sucuDescripcion != '' && selectedMunicipio != '' && sucuDireccionExacta != '') {
      let payload = {
        sucu_Descripcion: sucuDescripcion,
        muni_ID: selectedMunicipio,
        sucu_DireccionExacta: sucuDireccionExacta
      }
      axios
        .post('Sucursales/Insert', payload)
        .then((response) => {
          setIsSubmitting(false)
          console.log(response)
          if (response.data.message == '1') {
            toast.success('Registro agregado exitosamente');
            setVisible(false)
            setActualizar(!Actualizar)
          } else if (response.data.message == '2') {
            setActualizar(!Actualizar)
            toast.warning('Ya existe esa sucursal');
          }
        })
        .catch((error) => {
          setActualizar(!Actualizar)
          toast.error('ha ocurrido un error');
        })
    } else {
      toast.error('Rellene los campos');
    }
  }

  const EditAction = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    event.preventDefault()
    if (sucuDescripcion != '' && selectedMunicipio != '' && sucuDireccionExacta != '') {
      let payload = {
        sucu_ID: sucuID,
        sucu_Descripcion: sucuDescripcion,
        muni_ID: selectedMunicipio,
        sucu_DireccionExacta: sucuDireccionExacta
      }
      axios
        .post('Sucursales/Update', payload)
        .then((response) => {
          setIsSubmitting(false)
          console.log(response)
          if (response.data.message == '1') {
            toast.success('Registro editado exitosamente');
            setVisible2(false)
            setActualizar(!Actualizar)
          } else if (response.data.message == '2') {
            setActualizar(!Actualizar)
            toast.warning('Ya existe esa sucursal');
          }
        })
        .catch((error) => {
          setActualizar(!Actualizar)
          toast.error('ha ocurrido un error');
        })
    } else {
      toast.error('Rellene los campos');
    }
  }

  const DeleteAction = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    event.preventDefault()
    let payload = {
      sucu_ID: sucuID
    }
    axios
      .post('Sucursales/Delete', payload)
      .then((response) => {
        setIsSubmitting(false)
        console.log(response)
        if (response.data.message == '1') {
          toast.success('Registro eliminado exitosamente');
          setVisible3(false)
          setActualizar(!Actualizar)
        }
      })
      .catch((error) => {
        setActualizar(!Actualizar)
        toast.error('ha ocurrido un error');
      })
  }

  const handleEditClick = (params) => {
    const sucursal = sucursales.find((sucursal) => sucursal.sucu_ID === params.sucu_ID); // Busca la marca seleccionada
    setVisible2(true);
    setSucuID(sucursal.sucu_ID)
    setSucuDescripcion(sucursal.sucu_Descripcion)
    setSelectedDepartamento(sucursal.depa_ID)
    setselectedMunicipio(sucursal.muni_ID)
    setSucuDireccionExacta(sucursal.sucu_DireccionExacta)
  };

  const handleDeleteClick = (params) => {
    const sucursal = sucursales.find((sucursal) => sucursal.sucu_ID === params.sucu_ID); // Busca la marca seleccionada
    setVisible3(true);
    setSucuID(sucursal.sucu_ID)
  };

  const handleDetailsClick = (params) => {
    const sucursal = sucursales.find((sucursal) => sucursal.sucu_ID === params.sucu_ID); // Busca la marca seleccionada
    localStorage.setItem('SucursalSeleccionada', JSON.stringify(sucursal));
    navigate('/sucursalesDetails')
  };

  const columns = [
    { field: 'sucu_ID', headerName: 'ID', width: 1, },
    { field: 'sucu_Descripcion', headerName: 'Sucursal', width: 200 },
    { field: 'muni_Nombre', headerName: 'Municipio', width: 150 },
    { field: 'sucu_DireccionExacta', headerName: 'Direccion', width: 360 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 300,
      renderCell: (params) => (
        <div>
          <CButton color='danger' variant='outline' className='m-3' onClick={() => handleDeleteClick(params.row)}><Delete /></CButton>
          <CButton color='warning' variant='outline' className='m-3' onClick={() => handleEditClick(params.row)}><Edit /></CButton>
          <CButton color='info' variant='outline' className='m-3' onClick={() => handleDetailsClick(params.row)}><Book /></CButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className='card'>
        <div className='card-body'>
          <h1>Sucursales</h1>
          <CButton onClick={() => { setVisible(!visible); setValidated(false); setSucuDescripcion(''); setSelectedDepartamento(''); setselectedMunicipio(''); setSucuDireccionExacta('') }}>Nuevo</CButton>
          <div className='container' style={{ height: 10 }}></div>
          <div style={{ flex: 1 }}>
            <DataGrid
              rows={sucursales}
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
      {/*Modal Create*/}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Nueva Sucursal</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={CreateAction}
          >
            <CCol>
              <h6>Nombre</h6>
              <CFormInput
                type="text"
                id="validationCustom01"
                required
                value={sucuDescripcion}
                onChange={(e) => setSucuDescripcion(e.target.value)}
              />
              <h6>Departamento</h6>
              <CFormSelect value={selectedDepartamento} onChange={(event) => setSelectedDepartamento(event.target.value)} className='mb-2' required>
                <option value="" hidden>--Seleccione una opcion--</option>
                {departamentos.map((departamento) => (
                  <option key={departamento.depa_ID} value={departamento.depa_ID}>{departamento.depa_Nombre}</option>
                ))}
              </CFormSelect>
              <h6>Municipio</h6>
              <CFormSelect value={selectedMunicipio} onChange={(event) => setselectedMunicipio(event.target.value)} required>
                <option value="" hidden>{selectedDepartamento != '' ? '--Seleccione un municipio--' : 'Seleccione un departamento'}</option>
                {municipios.map(municipio => (
                  <option key={municipio.muni_ID} value={municipio.muni_ID}>{municipio.muni_Nombre}</option>
                ))}
              </CFormSelect>
              <h6>Direccion Exacta</h6>
              <CFormInput
                type="text"
                id="validationCustom01"
                required
                value={sucuDireccionExacta}
                onChange={(e) => setSucuDireccionExacta(e.target.value)}
              />
            </CCol>
            <CRow className='mt-3 offset-7'>
              <CCol className='col-2'>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  Cerrar
                </CButton>
              </CCol>
              <CCol>
                <CButton color="primary" type="submit">
                  Guardar
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
      </CModal>
      {/*Fin Modal Create*/}

      {/*Modal Edit*/}
      <CModal visible={visible2} onClose={() => setVisible2(false)}>
        <CModalHeader onClose={() => setVisible2(false)}>
          <CModalTitle>Editar Sucursal</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={EditAction}
          >
            <CCol>
              <h6>Nombre</h6>
              <CFormInput
                type="text"
                id="validationCustom01"
                required
                value={sucuDescripcion}
                onChange={(e) => setSucuDescripcion(e.target.value)}
              />
              <h6>Departamento</h6>
              <CFormSelect value={selectedDepartamento} onChange={(event) => setSelectedDepartamento(event.target.value)} className='mb-2' required>
                {departamentos.map((departamento) => (
                  <option key={departamento.depa_ID} value={departamento.depa_ID}>{departamento.depa_Nombre}</option>
                ))}
              </CFormSelect>
              <h6>Municipio</h6>
              <CFormSelect value={selectedMunicipio} onChange={(event) => setselectedMunicipio(event.target.value)} required>
                <option value="" hidden>{selectedDepartamento != '' ? '--Seleccione un municipio--' : 'Seleccione un departamento'}</option>
                {municipios.map(municipio => (
                  <option key={municipio.muni_ID} value={municipio.muni_ID}>{municipio.muni_Nombre}</option>
                ))}
              </CFormSelect>
              <h6>Direccion Exacta</h6>
              <CFormInput
                type="text"
                id="validationCustom01"
                required
                value={sucuDireccionExacta}
                onChange={(e) => setSucuDireccionExacta(e.target.value)}
              />
            </CCol>
            <CRow className='mt-3 offset-7'>
              <CCol className='col-2'>
                <CButton color="secondary" onClick={() => setVisible2(false)}>
                  Cerrar
                </CButton>
              </CCol>
              <CCol>
                <CButton color="primary" type="submit">
                  Guardar
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
      </CModal>
      {/*Fin Modal Edit*/}

      {/*Modal Delete*/}
      <CModal visible={visible3} onClose={() => setVisible3(false)}>
        <CModalHeader onClose={() => setVisible3(false)}>
          <CModalTitle>Editar Sucursal</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={DeleteAction}
          >
            <CCol>
              <h6>Seguro que deseas eliminar este registro?</h6>
            </CCol>
            <CRow className='mt-3 offset-7'>
              <CCol className='col-2'>
                <CButton color="secondary" onClick={() => setVisible3(false)}>
                  Cerrar
                </CButton>
              </CCol>
              <CCol>
                <CButton color="primary" type="submit">
                  Aceptar
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
      </CModal>
      {/*Fin Modal Delete*/}
    </>
  );
}

export default Sucursales;
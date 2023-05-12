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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'

function ClienteEdit() {
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)
    const [sortModel, setSortModel] = useState([{ field: 'clie_ID', sort: 'asc' }]);
    const [visible3, setVisible3] = useState(false)
    const [departamentos, setDepartamentos] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [selectedDepartamento, setSelectedDepartamento] = useState('');
    const [Actualizar, setActualizar] = useState(false)
    const [validated, setValidated] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [radioValue, setRadioValue] = useState(null);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [telefono, setTelefono] = useState('');
    const [FechaNac, setFechaNac] = useState('');
    const [clieID,setClieID] = useState('')

    useEffect(() => {
        const clientes = JSON.parse(localStorage.getItem('ClienteSeleccionado'));
        console.log(clientes)
        if (clientes) {
            setClieID(clientes.clie_ID)
            setNombre(clientes.clie_Nombres);
            setApellido(clientes.clie_Apellidos);
            setCorreoElectronico(clientes.clie_CorreoElectronico);
            setTelefono(clientes.clie_Telefono);
            setMunicipio(clientes.muni_ID);
            setRadioValue(clientes.clie_Sexo);
            const fechaISO = clientes.clie_FechaNacimiento.split("T")[0];
            const fecha = convertirFecha(fechaISO); // Aquí se convierte la fecha al formato "dd/mm/yyyy"
            setFechaNac(fecha);
            setSelectedDepartamento(clientes.depa_ID)
        }
    }, []);

    function convertirFecha(fechaISO, aInput = false) {
        const fecha = new Date(fechaISO);
        const dia = fecha.getDate().toString().padStart(2, "0");
        const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
        const anio = fecha.getFullYear();
        if (aInput) {
            return `${anio}-${mes}-${dia}`; // Para que sea compatible con el elemento <input>
        }
        return `${dia}/${mes}/${anio}`;
    }

    const EditAction = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true)
        event.preventDefault()
        if (nombre != '' && apellido != ''  && FechaNac != '' && radioValue != '' && municipio != '' ) {
            // Convertir fecha al formato requerido
            const fechaISO = new Date(FechaNac).toISOString()
            const fechaNacimiento = fechaISO.substring(0, 10)
    
            let payload = {
                clie_ID: clieID,
                clie_Nombres: nombre,
                clie_Apellidos: apellido,
                clie_FechaNacimiento: fechaNacimiento, // Usar la fecha convertida
                clie_Sexo: radioValue,
                muni_ID: municipio,
                clie_Telefono: telefono,
                clie_CorreoElectronico: correoElectronico,
            }
            axios
                .post('Clientes/Update', payload)
                .then((response) => {
                    setIsSubmitting(false)
                    console.log(response)
                    if (response.data.message == '1') {
                        toast.success('Registro Editado exitosamente');
                        setVisible(false)
                        setActualizar(!Actualizar)
                        navigate('/Clientes')
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
    useEffect(() => {
        axios.get('https://localhost:44387/api/Departamentos/ListarDepartamentos')
            .then(response => {
                setDepartamentos(response.data);
            })
            .catch(error => {
                console.error('Error fetching data from API:', error);
            });
    }, [Actualizar]);

    useEffect(() => {
        if (selectedDepartamento) {
            axios.get(`https://localhost:44387/api/Municipios/ListarMunicipiosPorDepto/${selectedDepartamento}`)
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

    return (
        <div className='card' style={{ backgroundColor: 'white' }}>
            <div className='card-header'><h1>Editar Cliente</h1></div>
            <div className='card-body'>
                <CForm
                    className="row g-3 needs-validation"
                    noValidate
                    validated={validated}
                    onSubmit={EditAction}
                >
                    <CCol>
                        <h6>Nombre Cliente</h6>
                        <CFormInput
                            type="text"
                            id="validationCustom01"
                            required
                            value={nombre}
                            onChange={(e) => { setNombre(e.target.value) }}
                        />
                        <h6>Apellido Cliente</h6>
                        <CFormInput
                            type="text"
                            id="validationCustom01"
                            required
                            value={apellido}
                            onChange={(e) => { setApellido(e.target.value) }}
                        />
                        <h6>Departamento</h6>
                        <CFormSelect value={selectedDepartamento} onChange={(event) => setSelectedDepartamento(event.target.value)} className='mb-2' required>
                            <option value="" hidden>--Seleccione una opcion--</option>
                            {departamentos.map((departamento) => (
                                <option key={departamento.depa_ID} value={departamento.depa_ID}>{departamento.depa_Nombre}</option>
                            ))}
                        </CFormSelect>
                        <h6>Municipio</h6>
                        <CFormSelect value={municipio} onChange={(event) => setMunicipio(event.target.value)} required>
                            <option value="" hidden>{selectedDepartamento != '' ? '--Seleccione un municipio--' : 'Seleccione un departamento'}</option>
                            {municipios.map(municipio => (
                                <option key={municipio.muni_ID} value={municipio.muni_ID}>{municipio.muni_Nombre}</option>
                            ))}
                        </CFormSelect>
                        <label htmlFor="Sexo">Sexo</label>
                        <div className="grid">
                            <div className="col-12 md:col-4">
                                <div className="field-radiobutton">
                                    <CFormCheck
                                        type='radio'
                                        name="sexo"
                                        id="masculino"
                                        value="M"
                                        required
                                        checked={radioValue === "M"}
                                        onChange={(e) => setRadioValue(e.target.value)}
                                    />
                                    <label htmlFor="option1">Masculino</label>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="field-radiobutton">
                                    <CFormCheck
                                        type='radio'
                                        name="sexo"
                                        id="femenino"
                                        value="F"
                                        required
                                        checked={radioValue === "F"}
                                        onChange={(e) => setRadioValue(e.target.value)}
                                    />
                                    <label htmlFor="option2">Femenino</label>
                                </div>
                            </div>
                        </div>
                        <CFormInput
                            type="date"
                            value={convertirFecha(FechaNac, true)} // Aquí se convierte la fecha al formato "yyyy-mm-dd" para que sea compatible con el elemento <input>
                            onChange={(e) => setFechaNac(e.target.value)}
                            id="validationCustom01"
                            format="yyyy-MM-dd"
                            label="Fecha de Nacimiento"
                            required
                        />
                        <h6>Correo</h6>
                        <CFormInput
                            type="email"
                            id="validationCustom01"
                            required
                            value={correoElectronico}
                            onChange={(e) => { setCorreoElectronico(e.target.value) }}
                        />
                        <h6>Telefono</h6>
                        <CFormInput
                            type="text"
                            id="validationCustom01"
                            required
                            value={telefono}
                            onChange={(e) => { setTelefono(e.target.value) }}
                        />
                    </CCol>
                    <CRow className='mt-3 mb-3'>
                        <CCol className='col-2'>
                            <CButton color="secondary" onClick={() => navigate('/Clientes')}>
                                Regresar
                            </CButton>
                        </CCol>
                        <CCol className='col-1'>
                            <CButton color="primary" type="submit">
                                Guardar
                            </CButton>
                        </CCol>
                    </CRow>
                </CForm>
            </div>
        </div>
    )
}

export default ClienteEdit
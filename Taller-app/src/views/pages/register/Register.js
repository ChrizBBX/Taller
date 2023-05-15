import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CToast,
  CToastBody,
  CToastClose
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { red } from '@material-ui/core/colors';


const Register = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [UserName, setUserName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validated, setValidated] = useState(false) 
  const RecoverAction = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    event.preventDefault()

    if(UserName != "" && password != ""){
      let payload = {
        user_NombreUsuario: UserName,
        user_Contrasena: password,
      }
      axios
        .post('Usuarios/Recover', payload)
        .then((response) => {
          setIsSubmitting(false)
          if (response.data.message == "1") {
            toast.success('Contraseña restablecida exitosamente')
          navigate('/')
          }else if(response.data.message == "2"){
          toast.warning("El usuario no existe")
          }
        })
        .catch((error) => {
          toast.error('Ha ocurrido un error')
        })
    }else{
      toast.error("Rellene los campos")
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={RecoverAction} validated={validated} className="row g-3 needs-validation" noValidate>
                  <h1>Cambiar Contraseña</h1>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      id="validationCustom01"
                      required
                      value={UserName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      id="validationCustom01"
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" type='submit'>Cambiar constraseña</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register

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


const Login = () => {
  const navigate = useNavigate()
  const [UserName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validated, setValidated] = useState(false) 
  localStorage.setItem('token', '')

  useEffect(() => {
    localStorage.clear()
  }, [])

  const LoginAction = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    event.preventDefault()

    let payload = {
      user_NombreUsuario: UserName,
      user_Contrasena: password,
    }
    axios
      .post('Usuarios/Login', payload)
      .then((response) => {
        setIsSubmitting(false)
        if (response.data[0] != null) {
          localStorage.setItem('token', JSON.stringify(response.data[0]));
          axios.get(`/RolesPorPantalla/Menu/${response.data[0].role_ID}/${response.data[0].user_EsAdmin}`)
          .then(response => {
            const pantallas = response.data;
            localStorage.setItem('pantallas', JSON.stringify(pantallas));
            console.log(pantallas)
          })
          .catch(error => {
            console.error('Error fetching data from API:', error);
          });
    navigate('/ventas')
        }else{
          console.log("Login faliido")
          if(password == '' || UserName == ''){
            toast.error('Rellene los campos');
          }else{
            toast.error('Usuario o Contraseña incorrectos');
          }
        }
      })
      .catch((error) => {})
  }

  return (
    <div className="min-vh-100 d-flex flex-row align-items-center" style={{ backgroundColor: "#303C54" }}>
    <CContainer style={{height: "120%"}}> 
      <CRow className="justify-content-center">
        <CCol>
          <CCardGroup>
            <CCard className="p-5">
              <CCardBody>
                <CForm onSubmit={LoginAction} validated={validated} className="row g-3 needs-validation" noValidate>
                  <h1>Iniciar Sesion</h1>
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
                  <CInputGroup className="mb-4">
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
                  <CRow>
                    <CCol xs={6}>
                      <CButton color="primary" className="px-4" type="submit">
                        Login
                      </CButton>
                    </CCol>
                    <CCol xs={6} className="text-right">
                      <CButton color="link" className="px-0" type="submit">
                        Olvidaste tu contraseña?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>

              </CCardBody>
            </CCard>
            <CCard style={{ width: '44%' }}>
  <img src="https://i.ibb.co/QvV6chB/bannerlogin.jpg" alt="background" style={{ width: '100%', height: '100%' }} />
</CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
  )
}

export default Login

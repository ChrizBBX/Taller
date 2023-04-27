import React, { Component } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

class prueba extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    const url = 'https://localhost:44387/api/Usuarios'
    fetch(url)
      .then((response) => response.json())
      .then((json) => this.setState({ users: json }))
  }

  render() {
    const { users } = this.state
    return (
      <CCard>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell>Admin</CTableHeaderCell>
              <CTableHeaderCell>ID de empleado</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {users.map((user) => (
              <CTableRow key={user.user_ID}>
                <CTableDataCell>{user.user_ID}</CTableDataCell>
                <CTableDataCell>{user.user_NombreUsuario}</CTableDataCell>
                <CTableDataCell>{user.user_EsAdmin}</CTableDataCell>
                <CTableDataCell>{user.empe_ID}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCard>
    )
  }
}
export default prueba

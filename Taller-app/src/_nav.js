import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilLockLocked,
  cilSettings,
  cilCarAlt
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const token = JSON.parse(localStorage.getItem('token'))
const pantallas = JSON.parse(localStorage.getItem('pantallas'))

const menu = []

if (pantallas) {
  console.log(pantallas)

  const tllr = []
  const acce = []
  const gral = []

  pantallas.forEach(element => {
    if (element.pant_Menu === 'Taller') {
      tllr.push({
        component: CNavItem,
        name: element.pant_Nombre,
        to: element.pant_Url,
      })
    } else if (element.pant_Menu === 'Acceso') {
      acce.push({
        component: CNavItem,
        name: element.pant_Nombre,
        to: element.pant_Url,
      })
    } else if (element.pant_Menu === 'General') {
      gral.push({
        component: CNavItem,
        name: element.pant_Nombre,
        to: element.pant_Url,
      })
    }
  })

  /* Taller */
  if (tllr.length !== 0) {
    menu.push(
      {
        component: CNavTitle,
        name: 'Taller',
      },
      {
        component: CNavGroup,
        name: 'Taller',
        to: '/Taller',
        icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
        items: tllr
      }
    )
  }

  /* Acceso */
  if (acce.length !== 0) {
    menu.push(
      {
        component: CNavTitle,
        name: 'Acceso',
      },
      {
        component: CNavGroup,
        name: 'Acceso',
        to: '/Acceso',
        icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
        items: acce
      }
    )
  }

  /* General */
  if (gral.length !== 0) {
    menu.push(
      {
        component: CNavTitle,
        name: 'General',
      },
      {
        component: CNavGroup,
        name: 'General',
        to: '/General',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        items: gral
      }
    )
  }
} else {
  console.log(pantallas)
}

export default menu

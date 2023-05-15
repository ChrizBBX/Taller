import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle,CNav } from '@coreui/react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'

const token = JSON.parse(localStorage.getItem('token'));
const pantallas = JSON.parse(localStorage.getItem('pantallas'));

const menu = [];

if (pantallas) {

  const categorias = {};

  pantallas.forEach((element) => {
    const { pant_Menu: menu, pant_Nombre: name, pant_Url: to } = element;

    if (!categorias[menu]) {
      categorias[menu] = {
        title: menu,
        items: [],
      };
    }

    categorias[menu].items.push({
      component: CNavItem,
      name,
      to,
    });
  });

  Object.values(categorias).forEach(({ title, items }) => {
    if (items.length > 0) {
      menu.push({
        component: CNavTitle,
        name: title,
      });

      menu.push({
        component: CNavGroup,
        name: title,
        to: `/${title}`,
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        items,
      });
    }
  });
}

export default menu;

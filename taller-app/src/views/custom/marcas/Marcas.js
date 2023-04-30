import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  TablePagination,
} from '@material-ui/core';

function Marcas() {
  const [marcas, setMarcas] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    axios.get('https://localhost:44387/api/Marcas')
      .then(response => {
        setMarcas(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (column) => {
    if (orderBy === column) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(column);
      setOrder('asc');
    }
  };

  const sortedMarcas = marcas.sort((a, b) => {
    if (orderBy !== '') {
      if (orderBy === 'marc_ID') {
        if (order === 'asc') {
          return parseInt(a[orderBy]) - parseInt(b[orderBy]);
        } else {
          return parseInt(b[orderBy]) - parseInt(a[orderBy]);
        }
      } else {
        if (order === 'asc') {
          return a[orderBy] < b[orderBy] ? -1 : 1;
        } else {
          return a[orderBy] > b[orderBy] ? -1 : 1;
        }
      }
    } else {
      return 0;
    }
  });

  const filteredMarcas = sortedMarcas.filter(
    marca =>
      marca.marc_Nombre.toLowerCase().includes(search.toLowerCase())
  );

  const slicedMarcas = filteredMarcas.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer component={Paper} style={{ padding: '16px' }}>
      <h1>Marcas</h1>
      <Button variant="contained" color="primary">Nuevo</Button>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              onClick={() => handleSort('marc_ID')}
              style={{ cursor: 'pointer' }}
            >
              ID
              {orderBy === 'marc_ID' &&
                (order === 'asc' ? ' ▲' : ' ▼')}
            </TableCell>
            <TableCell
              onClick={() => handleSort('marc_Nombre')}
              style={{ cursor: 'pointer' }}
            >
              Nombre
              {orderBy === 'marc_Nombre' &&
                (order === 'asc' ? ' ▲' : ' ▼')}
            </TableCell>
            <TableCell>Acciones</TableCell>
            <TableCell>
              <TextField
                label="Buscar"
                variant="outlined"
                size="small"
                style={{ marginLeft: '8px' }}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {slicedMarcas.map((marca, index) => (
            <TableRow key={index} className={index % 2 === 0 ? 'evenRow' : 'oddRow'}>
              <TableCell>{marca.marc_ID}</TableCell>
              <TableCell>{marca.marc_Nombre}</TableCell>
              <TableCell>
                <Button variant="contained" color="secondary">
                  Eliminar
                </Button>
                |
                <Button variant="contained" color="primary">
                  Editar
                </Button>
                |
                <Button variant="contained" color="default">
                  Detalles
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredMarcas.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

export default Marcas;

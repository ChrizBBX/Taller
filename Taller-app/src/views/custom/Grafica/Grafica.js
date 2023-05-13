import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { CChartPie,
         CChartBar, 
    } 
from '@coreui/react-chartjs';

const Example = () => {
  const [servicios, setServicios] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get('Servicios/ServiciosMasSolicitados');
        setServicios(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServicios();
  }, []);

  useEffect(() => {
    axios
      .get("Vehiculos/ClientesConMasVehiculos")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
 
  const customColors = ["#4DB6AC", "#FF8A65", "#9575CD", "#4DD0E1", "#81C784"];
  return (
  <CRow>
  <CCol xs={6}>
      <CCard className="mb-4">
        <CCardHeader style={{ textAlign: 'center' }}>Servicios más Solicitados</CCardHeader>
        <CCardBody>
          <CChartPie
            data={{
              labels: servicios.map((servicio) => servicio.serv_Descripcion),
              datasets: [
                {
                  data: servicios.map((servicio) => servicio.cantidadServicios),
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#33FF66', '#FF33CC'],
                  hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#33FF66', '#FF33CC'],
                },
              ],
            }}
            options={{
              tooltips: {
                callbacks: {
                  label: function (tooltipItem, data) {
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                      return previousValue + currentValue;
                    });
                    var currentValue = dataset.data[tooltipItem.index];
                    var percentage = parseFloat(((currentValue / total) * 100).toFixed(1));
                    return currentValue + ' (' + percentage + '%)';
                  },
                },
              },
              legend: {
                position: 'bottom',
                labels: {
                  boxWidth: 12,
                },
              },
            }}
          />
        </CCardBody>
      </CCard>  
    </CCol>
    <CCol xs={6}>
      <CCard className="mb-4">
        <CCardHeader style={{ textAlign: 'center' }}>Clientes con mas Vehiculos</CCardHeader>
        <CCardBody>
          {data ? (
            <CChartBar
              data={{
                labels: data.map((d) => d.clie_Nombres),
                datasets: [
                  {
                    label: "Total de vehículos",
                    backgroundColor: customColors,
                    data: data.map((d) => d.total_vehiculos),
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          ) : (
            <p>Cargando datos...</p>
          )}
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>   
  );
};

export default Example;
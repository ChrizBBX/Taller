import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { CChartPie, CChartBar, } from '@coreui/react-chartjs';

const Example = () => {
  const [servicios, setServicios] = useState([]);

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
          <CCardHeader>Bar Chart</CCardHeader>
          <CCardBody>
            <CChartBar
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'GitHub Commits',
                    backgroundColor: '#f87979',
                    data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                  },
                ],
              }}
              labels="months"
            />
          </CCardBody>
        </CCard>
      </CCol>       
  </CRow>   
  );
};

export default Example;
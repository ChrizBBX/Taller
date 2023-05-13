import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

function PDFDocument() {
  const doc = new jsPDF();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get("Ventas")
        .then(response => {
          setData(response.data)
          console.log(data)
        })
        .catch(error => {
          console.log('Error en la solicitud Axios:', error);
        });
    };
   
    fetchData();
  }, []);

  const header = function (data) {
    doc.setFontSize(18);
    const pageWidth = doc.internal.pageSize.width;
    doc.setTextColor(40);
    doc.addImage('https://static.vecteezy.com/system/resources/thumbnails/022/278/688/small/automotive-logo-auto-spare-part-company-workshop-mechanic-service-accessories-design-vector.jpg', 'JPG',  pageWidth-40,5, 24, 24);
    doc.text("Reporte de Ventas", data.settings.margin.left + 0, 22);
  };

  const footer = function (data) {
    const pageCount = doc.internal.getNumberOfPages();
    const currentPage = data.pageNumber;
    const pageWidth = doc.internal.pageSize.width;
    const date = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const text = `Documento generado por Phynomo el ${date}`;
    const textWidth = doc.getTextWidth(text);
    const textX = (pageWidth*1.3) - textWidth;
    doc.setFontSize(10);
    doc.text(`Página ${currentPage}`, data.settings.margin.left, doc.internal.pageSize.height - 10);
    doc.text(text, textX, doc.internal.pageSize.height - 10);
  };
    
  doc.autoTable({
    head: [['Id', 'Cliente','Metodo pago','Sucursal', 'Subtotal','Impuesto','Total']],
    body: data?.map((row) => [
        row.vent_Id,
        row.clie_Nombres,
        row.meto_Nombre,
        row.sucu_Descripcion,
        row.subtotal,
        row.impuesto,
        row.total
      ]),  
    didDrawPage: function (data) {
      header(data);
      // agregamos la paginación
      footer(data);
    },
    margin: { top: 30, bottom:20 } 
  });

  // obtenemos una URL del PDF para mostrarlo en un iframe
  const pdfUrl = doc.output('dataurl');

  // mostramos el documento PDF en un iframe
  return (
    <div style={{ height: '100vh' }}>
      <iframe src={pdfUrl} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

export default PDFDocument
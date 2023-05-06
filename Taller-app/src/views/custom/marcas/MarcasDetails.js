import React from "react";

const MarcaSeleccionada = localStorage.getItem('MarcaSeleccionada');
const MarcaSeleccionadaArray = Array.isArray(MarcaSeleccionada) ? MarcaSeleccionada : [MarcaSeleccionada];
function MarcasDetails (){
  return (
    <div className="card">
      <div className="card-body">
        <h1>{MarcaSeleccionadaArray.marc_ID}</h1>
      </div>
</div>
  );
}
export default MarcasDetails
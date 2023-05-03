import React, { useState, useEffect } from 'react';
import Global from '../../API/Global';

const CreateEmpleado = () => {
    
    const [estadosCiviles, setEstadosCiviles] = useState([]);
    const [estadoCivilSeleccionado, setEstadoCivilSeleccionado] = useState(null);
  
    const [sucursalOptions, setSucursalOptions] = useState([]);
    const [selectedSucursal, setSelectedSucursal] = useState(null);
  
    const [radioValue, setRadioValue] = useState(null);

    useEffect(() => {
      //Sucursal DDL
      fetch(Global.url + "Sucursales")
        .then((response) => response.json())
        .then((data) =>
          setSucursalOptions(
            data.map((s) => ({ value: s.sucu_ID, label: s.sucu_Descripcion }))
          )
        )
        .catch((error) => console.error(error));
  
      //Estado Cuvil DDL
      fetch(Global.url + "EstadosCiviles")
        .then((response) => response.json())
        .then((data) =>
          setEstadosCiviles(
            data.map((e) => ({
              value: e.estacivi_ID,
              label: e.estacivi_Nombre,
            }))
          )
        )
        .catch((error) => console.error(error));

    }, []);
  
    return (
      <div className="card">
        <h5>Nuevo Empleado</h5>
        <form className="mid-form">
          <div className="grid p-fluid">
            <div className="col-12 md:col-6">
              <div className="field">
                <label htmlFor="DNI">DNI</label>
                <InputNumber id="inputnumber" className="p-valid" />
              </div>
  
              <div className="field mt-3">
                <label htmlFor="Apellido">Apellido</label>
                <InputText type="text" id="Apellido" className="p-valid" />
              </div>
  
              <div className="field">
                <label htmlFor="estadoCivil">Estado Civil</label>
                <Select
                  value={estadoCivilSeleccionado}
                  onChange={(e) => setEstadoCivilSeleccionado(e)}
                  options={estadosCiviles}
                  placeholder="Seleccionar"
                />
              </div>
  
              <div className="field">
                <label htmlFor="sucursal">Sucursal</label>
                <Select
                  value={selectedSucursal}
                  onChange={(e) => setSelectedSucursal(e)}
                  options={sucursalOptions}
                  placeholder="Seleccionar"
                />
              </div>
            </div>
  
            <div className="col-12 md:col-6">
              <div className="field">
                <label htmlFor="Nombre">Nombre</label>
                <InputText type="text" id="Nombre" className="p-valid" />
              </div>
              <div className="field mt-3">
                <label htmlFor="Sexo">Sexo</label>
                <div className="grid">
                  <div className="col-12 md:col-4">
                    <div className="field-radiobutton">
                      <RadioButton
                        inputId="option1"
                        name="option"
                        value="M"
                        checked={radioValue === "M"}
                        onChange={(e) => setRadioValue(e.value)}
                      />
                      <label htmlFor="option1">Masculino</label>
                    </div>
                  </div>
                  <div className="col-12 md:col-4">
                    <div className="field-radiobutton">
                      <RadioButton
                        inputId="option2"
                        name="option"
                        value="Los F"
                        checked={radioValue === "F"}
                        onChange={(e) => setRadioValue(e.value)}
                      />
                      <label htmlFor="option2">Femenino</label>
                    </div>
                  </div>
                </div>
  
                <div className="field mt-3">
                <label htmlFor="Correo">Correo Elctronico</label>
                <InputText type="text" id="Correo" className="p-valid" />
              </div>

              <div className="field mt-3">
                <label htmlFor="Telefono">Telefono</label>
                <InputText type="text" id="Telefono" className="p-valid" />
              </div>
  
              </div>
            </div>
          </div>
  
          <Button label="Success" severity="success" />
        </form>
      </div>
    );
  };
  
  export default CreateEmpleado;
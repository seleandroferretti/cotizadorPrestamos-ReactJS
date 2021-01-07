import React, { Fragment, useState } from "react";
import { calcularTotal } from "../helpers";

const Form = (props) => {
  const {
    cantidad,
    guardarCantidad,
    plazo,
    guardarPlazo,
    guardarTotal,
    guardarCargando,
  } = props;

  const [error, guardarError] = useState(false);

  const leerCantidad = (e) => {
    guardarCantidad(parseInt(e.target.value));
  };

  // submit
  const calcularPrestamo = (e) => {
    e.preventDefault();

    // validar
    if (cantidad === 0 || plazo === 0) {
      guardarError(true);
      return; // para que no se ejecute la siguiente linea
    }

    // eliminar error previo
    guardarError(false);

    // habilitar el spinner
    guardarCargando(true);

    setTimeout(() => {
      const total = calcularTotal(cantidad, plazo);

      guardarTotal(total);

      // deshabilitar el spinner
      guardarCargando(false);
    }, 2000);
  };

  return (
    <Fragment>
      <form onSubmit={calcularPrestamo}>
        <div className="row">
          <div>
            <label>Cantidad del Prestamo</label>
            <input
              className="u-full-width"
              type="number"
              placeholder="Ejemplo: 3000"
              onChange={leerCantidad}
            />
          </div>
          <div>
            <label>Plazo a Pagar</label>
            <select
              className="u-full-width"
              onChange={(e) => guardarPlazo(parseInt(e.target.value))}
            >
              <option value="">Seleccionar</option>
              <option value="3">3 meses</option>
              <option value="6">6 meses</option>
              <option value="12">12 meses</option>
              <option value="24">24 meses</option>
            </select>
          </div>
          <div>
            <input
              type="submit"
              value="Calcular"
              className="button-primary u-full-width"
            />
          </div>
        </div>
      </form>
      {error ? (
        <p className="error">Todos los campos son obligatorios</p>
      ) : null}
    </Fragment>
  );
};

export default Form;

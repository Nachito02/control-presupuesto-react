import { useEffect, useState } from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({ presupuesto, gastos,setGastos,setPresupuesto,setIsValidPresupuesto }) => {
  const [porcentaje, setPorcentaje] = useState(0);
  const [disponnible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );

    const totalDisponible = presupuesto - totalGastado;

    // calcular el porcentaje

    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);

    setGastado(totalGastado);

    setDisponible(totalDisponible);

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1000);
  }, [gastos]);

  const formatearCantidad = (cantidad) => {

    


    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };


  const handleResetApp = () => {
      const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?');

      if(resultado) {
        setGastos([]);
        setPresupuesto(0);
        setIsValidPresupuesto(false);
      } 
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div className="">
        <CircularProgressbar value={porcentaje} text={`${porcentaje}% Gastado`} styles={buildStyles({
            pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
            trailColor: '#F5F5F5',
            textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
        })} />  
      </div>

      <div className="contenido-presupuesto">

            <button className="reset-app" type="button" onClick={handleResetApp}>Resetear App</button>

        <p>
          <span>Presupuesto: </span>
          {formatearCantidad(presupuesto)}
        </p>

        <p className={`${disponnible < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span>
          {formatearCantidad(disponnible)}
        </p>

        <p>
          <span>Gastado: </span>
          {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;

import React from 'react';
import NuevoPresupuesto from './NuevoPresupuesto';
import ControlPresupuesto from './ControlPresupuesto';
const Header = ({presupuesto, setPresupuesto, IsValidPresupuesto, setIsValidPresupuesto,gastos,setGastos}) => {
  return (

        <header>
            <h1>Planificador de gastos</h1>

            {IsValidPresupuesto ? (
             <ControlPresupuesto 
              
             gastos={gastos}
             setGastos={setGastos}
              presupuesto = {presupuesto}
              setPresupuesto = {setPresupuesto}
              setIsValidPresupuesto = {setIsValidPresupuesto}
             />
            ) : (<NuevoPresupuesto
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              setIsValidPresupuesto = {setIsValidPresupuesto}
          />) }

           
        </header>

  )
};

export default Header;

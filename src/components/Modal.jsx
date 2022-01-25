import { useState,useEffect } from "react";
import Mensaje from "./Mensaje";
import CerrarBtn from "../img/cerrar.svg";
const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar,setGastoEditar }) => {

    const [mensaje,setMensaje] = useState('');
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState('');

  const[id,setID] = useState('');


  useEffect(() => {
      if(Object.keys(gastoEditar).length > 0 ) {
        
        setNombre(gastoEditar.nombre);
        setCantidad(gastoEditar.cantidad);
        setCategoria(gastoEditar.categoria);
        setID(gastoEditar.id);
        setFecha(gastoEditar.fecha)
      }
  }, [])

  const ocultarModal = () => {
    setAnimarModal(false);
    setGastoEditar('');

    setTimeout(() => {
      setModal(false);
    }, 500);
  };



  const handleSubmit = (e) => {
        e.preventDefault();


        if([nombre, cantidad, categoria].includes('')) {

                setMensaje('Todos los campos son obligatorios');


                setTimeout(() => {
                    setMensaje('');
                }, 2000);

            return;
        }

        guardarGasto({nombre,cantidad,categoria, id, fecha});
  }

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarBtn} alt="cerrar-modal" onClick={ocultarModal} />
      </div>

      <form



        action=""
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
        onSubmit={handleSubmit}
      >
        <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

        {mensaje && <Mensaje tipo="error"> {mensaje} </Mensaje>}

        <div className="campo">
          <label htmlFor="nombre">Nombre gasto</label>
          <input
            id="nombre"
            value={nombre}
            type="text"

            onChange={(e) => setNombre(e.target.value)}
            placeholder="Añade el nombre del gasto"
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
           
            placeholder="Añade la cantidad del gasto ejemplo: $300"
          />
        </div>

        <div className="campo">
          <select value={categoria} name="" id="categoria" onChange={(e) => setCategoria(e.target.value) }>
            <option value="">--Seleccione--</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="subscripciones">Subscripciones</option>
          </select>
        </div>

        <input type="submit" value={gastoEditar.nombre ? 'Editar Gasto' : 'Añadir Gasto'} name="" id="" />
      </form>
    </div>
  );
};

export default Modal;

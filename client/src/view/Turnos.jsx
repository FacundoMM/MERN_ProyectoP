import '../style/Tabla.css'

import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import useTurnos from '../hook/useTurnos'
import Navegador from './Navegador';
import Editor from "./Editor"
import { PrivateRoutes } from "../components/Route";

const Home = () => {
  const turnos = new useTurnos()
  const [datosTurnos, setDatosTurnos] = useState([])

  const Owner = () => {
    const userRole = sessionStorage.getItem('rol');
    const isOwner = userRole === 'Owner'
    return isOwner ?
      <button className="boton-alternativo" type="submit">Eliminar</button>
      : '';
  }


  useEffect(() => {
    turnos.turnos()
      .then((res) => {
        setDatosTurnos(res.data.turnos)
        console.log(res.data.turnos)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <Navegador />
    <div className="cuerpo">
      <PrivateRoutes>
        <Editor />
      </PrivateRoutes>
      <h1 className='text-center py-3'>Especialidades médicas disponibles</h1>
      <table className="mx-auto">
        <thead >
          <tr>
            <th scope="col">Area</th>
            <th scope="col">Profecional</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          {
            datosTurnos.map((turnos, i) => (
              <tr key={i}>
                <td>{turnos.area}</td>
                <td>{turnos.name}</td>
                <td>
                  <button className="boton" type="submit">
                    <NavLink className="nav-link" to={`./${turnos._id}`}>Detalles</NavLink >
                  </button>
                  {Owner()}
                </td>
              </tr>
            ))
          }



        </tbody>
      </table>
    </div>
    </>
  )
}

export default Home

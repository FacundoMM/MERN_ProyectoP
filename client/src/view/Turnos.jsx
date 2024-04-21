import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import useTurnos from '../hook/useTurnos'
import Navegador from './Navegador';

const Home = () => {
  const turnos = new useTurnos()
  const [datosTurnos, setDatosTurnos] = useState([])
  
  const Owner = () => {
    const userRole = sessionStorage.getItem('rol');
    const isOwner = userRole === 'Owner'
    return isOwner ?
      <button className="btn btn-outline-danger" type="submit">Eliminar</button> 
      : '';
  }


  useEffect(() => {
    turnos.turnos()
      .then((res) => {
        setDatosTurnos(res.data.turnos)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <Navegador />
      <h1 className='text-center my-3'>Turnos disponibles</h1>
      <table className="table">
        <thead className="thead-dark">
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
                  <button className="btn btn-outline-success mx-3" type="submit">
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
  )
}

export default Home

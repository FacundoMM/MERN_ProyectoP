import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import useTurnos from '../hook/useTurnos'
import Navegador from './Navegador';

const Home = () => {
    const turnos = new useTurnos()
    const [datosDetalles, setDatosDetalles] = useState([])
    const { id } = useParams();

    useEffect(() => {
        turnos.detalles(id)
            .then((res) => {
                setDatosDetalles(res.data.detalles)
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
                        <th scope="col">Fecha</th>
                        <th scope="col">Hora</th>
                        <th scope="col">Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        datosDetalles.map((detalles, i) => (
                            detalles.user === '' ?

                                <tr key={i}>
                                    <td>{detalles.date.split('T')[0]}</td>
                                    <td>{detalles.hour}</td>
                                    <td>
                                        <button
                                            className="btn btn-outline-success mx-3"
                                            type="submit"
                                            onClick={() => {
                                                const gmail = sessionStorage.getItem('login')
                                                console.log(gmail)
                                                turnos.adquirir(id, detalles._id, gmail)
                                                    .then((res) => {
                                                        console.log(res)
                                                        window.location.reload()
                                                    })
                                                    .catch((err) => {
                                                        console.log(err)
                                                    })
                                            }}
                                        >
                                            Agregar
                                        </button>

                                    </td>
                                </tr>
                                : ''
                        ))
                    }



                </tbody>
            </table>
        </div>
    )
}

export default Home

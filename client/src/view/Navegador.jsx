import '../style/Navegador.css'
import '../style/boton.css'


import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useClient from '../hook/useClient';

const Navegador = () => {
    let client = new useClient();
    const navigate = useNavigate()

    const logout = () => {
        client.logout()
            .then((response) => {
                sessionStorage.clear()
                window.location.reload();
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.message)
                }
            })
    }

    const isLogin = () => {
        const userRole = sessionStorage.length;
        const isLogin = userRole === 0
        return isLogin ?
                        <button className="boton" type="submit">
                <NavLink className="link" to="/login">Log in</NavLink >
            </button>
            :
            <button className="boton" type="button" onClick={logout}>Logout</button>

    }

    return (
        <div className='Cuerpo_nav'>
            <nav className="navegador">
                <div className="navegador_titulo">
                    <h1>
                        <NavLink className="link" to="/">Hospiturno</NavLink >
                    </h1>
                </div>
                <ul className="Contenido_listado">
                    <li>
                        <NavLink className="link" to="/">Inicio</NavLink >
                    </li>
                    <li>
                        <NavLink className="link" to="/turnos">Buscar citas</NavLink >
                    </li>
                    <li>
                        <NavLink className="link" to="/misturnos">Mis citas</NavLink >
                    </li>
                    <li>
                        {isLogin()}
                    </li>
                </ul>

            </nav>
        </div>
    )
}

export default Navegador

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
            navigate("/login")
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.message)
            }
          })
      }

    const isLogin = () => {
        const userRole = sessionStorage;
        const isLogin = userRole === ''
        return isLogin ?
            <button className="btn btn-outline-success" type="submit">
                <NavLink className="nav-link" to="/login">Log in</NavLink >
            </button>
            : <button className="btn btn-outline-success" type="button" onClick={logout}>Logout</button>;
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary bg-gradient bg-opacity-25 ">
                <div className="container-fluid">
                    <h1 className="navbar-brand" >
                        <NavLink className="nav-link active" to="/">Hospiturno</NavLink >
                    </h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" to="/">Home</NavLink >
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/turnos">Buscar citas</NavLink >
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/misturnos">Mis citas</NavLink >
                            </li>
                        </ul>
                        <div className="d-flex">
                            {isLogin()}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navegador

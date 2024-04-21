import React, { useEffect, useState } from 'react';
import Navegador from './Navegador';
import useTurnos from '../hook/useTurnos';

const User = () => {
    const gmail = sessionStorage.getItem('login');
    const [datosDetalles, setDatosDetalles] = useState([]);
    const [hasCitas, setHasCitas] = useState(false);

    useEffect(() => {
        const detalles = new useTurnos();
        detalles.allDetalle()
            .then((res) => {
                setDatosDetalles(res.data.detalles);
                
                const userCitas = res.data.detalles.filter(detalles => detalles.user === gmail);
                setHasCitas(userCitas.length > 0);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <Navegador />
            <h1 className='text-center my-3'>Turnos pendientes</h1>
            {hasCitas ? (
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Area</th>
                            <th scope="col">Profecional</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datosDetalles.map((detalles, i) => (
                            detalles.user === gmail && (
                                <tr key={i}>
                                    <td>{detalles.date.split('T')[0]}</td>
                                    <td>{detalles.hour}</td>
                                </tr>
                            )
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center">Usted no tiene citas pendientes.</p>
            )}
        </div>
    );
};

export default User;

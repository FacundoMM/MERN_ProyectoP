import React, { useEffect, useState } from 'react';
import Navegador from './Navegador';
import useTurnos from '../hook/useTurnos';

const User = () => {
    const gmail = sessionStorage.getItem('login');
    const [datosDetalles, setDatosDetalles] = useState([]);
    const [hasCitas, setHasCitas] = useState(false);

    useEffect(() => {
        const detalles = new useTurnos();
        detalles.turnos()
            .then((res) => {

                const userTurnos = res.data.turnos.filter(turno => turno.detalles.some(detalle => detalle.user === gmail));

                setDatosDetalles(userTurnos);
                setHasCitas(userTurnos.length > 0);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [gmail]);

    return (
        <>
            <Navegador />
            <div className="cuerpo">
                <h1 className='text-center py-3'>Turnos pendientes</h1>
                {hasCitas ? (
                    <table>
                        <thead >
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Área</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Hora</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datosDetalles.map((turno, i) => (
                                turno.detalles.map((detalle, j) => (
                                    detalle.user === gmail && (
                                        <tr key={`${i}-${j}`}>
                                            <td>{turno.name}</td>
                                            <td>{turno.area}</td>
                                            <td>{detalle.date.split('T')[0]}</td>
                                            <td>{detalle.hour}</td>
                                        </tr>
                                    )
                                ))
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center">Usted no tiene citas pendientes.</p>
                )}
            </div>
        </>
    );
};

export default User;

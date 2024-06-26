import '../style/Tabla.css'


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useTurnos from '../hook/useTurnos';
import Navegador from './Navegador';
import Editor from './Editor';
import { PrivateRoutes } from '../components/Route';

const Detalles = () => {
    const turnos = new useTurnos();
    const [datosDetalles, setDatosDetalles] = useState([]);
    const { id } = useParams();
    const gmail = sessionStorage.getItem('login');
    const [hasCitas, setHasCitas] = useState(false);

    useEffect(() => {
        turnos.detalles(id)
            .then((res) => {
                setDatosDetalles(res.data.detalles);

                const userCitas = res.data.detalles.filter(detalles => detalles.user === '');
                setHasCitas(userCitas.length > 0);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>  
            <Navegador />
        <div className='cuerpo'>
            <PrivateRoutes>
                <Editor />
            </PrivateRoutes>

            <h1 className='text-center py-3'>Turnos disponibles</h1>
            {hasCitas ? (
                <table className="mx-auto">
                    <thead>
                        <tr>
                            <th scope="col">Fecha</th>
                            <th scope="col">Hora</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datosDetalles.map((detalles, i) => (
                            detalles.user === '' && (
                                <tr key={i}>
                                    <td>{detalles.date.split('T')[0]}</td>
                                    <td>{detalles.hour}</td>
                                    <td>
                                        <button
                                            className="boton"
                                            type="submit"
                                            onClick={() => {
                                                console.log(gmail);
                                                turnos.adquirir(id, detalles._id, gmail)
                                                    .then((res) => {
                                                        console.log(res);
                                                        window.location.reload();
                                                    })
                                                    .catch((err) => {
                                                        console.log(err);
                                                    });
                                            }}
                                        >
                                            Agregar
                                        </button>
                                    </td>
                                </tr>
                            )
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center">No hay turnos disponibles en este momento.</p>
            )}
        </div>
        </>
    );
};

export default Detalles;

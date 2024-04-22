import '../style/Home.css'
import doctores from '../public/doctores.jpg';
import atencion from '../public/atencion.jpg';
import programacion from '../public/programacion.jpg';


import React from 'react'
import useClient from '../hook/useClient'
import { NavLink, useNavigate } from 'react-router-dom';
import Navegador from "./Navegador";


const Home = () => {

  const navigate = useNavigate()


  return (
    <>
      <Navegador />
      <div className="cuerpo">

        <section className="portada">
          <div className="portadaText">
            <h1>¡Bienvenido a Hospiturnos!</h1>
            <p>Desde la comodidad de tu hogar o desde cualquier lugar,
              puedes acceder a nuestro sistema intuitivo para encontrar el médico adecuado,
              reservar tu cita y mantener un seguimiento de tus compromisos médicos.</p>
            <p>Únete a nosotros en este viaje hacia una salud más cuidadosa y preparada</p>
            <button type='button'><NavLink to='/Login' className='links'>Iniciar sesion</NavLink></button>
          </div>
        </section>

        <section className="nosotros">
          <h4>UN POCO SOBRE NOSOTROS</h4>
          <div className="descripcion">
            <p>En Hospiturnos, entendemos la importancia de cuidar tu salud y la de tus seres queridos. Por eso,
              hemos creado una plataforma fácil de usar que te permite reservar citas médicas de manera rápida y conveniente</p>
            <p>Con nuestra amplia gama de especialidades médicas y una interfaz intuitiva,
              encontrar y agendar tus turnos nunca ha sido tan sencillo.</p>
          </div>
        </section>

        <section className="especialidades">
          <div>
            <h2>Nuestras Especialidades</h2>
            <p>Un equipo de expertos especialistas para ti</p>
          </div>
          <div className="especialidades_cuerpo">
            <div className="especialidades_cartas">
              <img src={doctores} alt="Doctores calificados" />
              <h4>Doctores calificados</h4>
              <p>Conozca a nuestros médicos especialistas calificados.</p>
            </div>

            <div className="especialidades_cartas">
              <img src={programacion} alt="Doctores calificados" />
              <div>
                <h4>Programación sencilla</h4>
                <p>Reserve citas con facilidad en línea.</p>
              </div>
            </div>

            <div className="especialidades_cartas">
              <img src={atencion} alt="Doctores calificados" />
              <h4>Soporte 24/7</h4>
              <p>Estamos aquí para usted las 24 horas del día.</p>
            </div>
          </div>

        </section>

      </div>
    </>
  )
}

export default Home

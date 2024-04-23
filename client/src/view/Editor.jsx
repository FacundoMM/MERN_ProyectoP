import '../style/Editor.css'

import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useParams } from "react-router-dom"
import useTurnos from '../hook/useTurnos';
// import Swal from 'sweetalert2'



const validationSchemaTurno = Yup.object({
  area: Yup.string()
    .required('Debe agregarle un area')
    .min(3, 'Debe tener al menos 3 caracteres'),
  name: Yup.string()
    .required('Debe agregarle el nombre')
    .min(3, 'Debe tener al menos 3 caracteres'),
})


const validationSchemaDetalles = Yup.object({
  date: Yup.string()
    .required('Debe agregar una fecha al turno'),
  hour: Yup.string()
    .required('Debe agregarle una hora al turno')
})

const Agregar = () => {
  const { id } = useParams();
  let Accion = new useTurnos()

  if (id === undefined) {
    const initialValuesTurnos = {
      area: "",
      name: "",
    }
    const handleSubmitTurnos = (values) => {
      console.log(values)
      Accion.newTurnos(values)
      .then((res) => {
        console.log(res);
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
      })
    }

    return <Formik
      initialValues={initialValuesTurnos}
      validationSchema={validationSchemaTurno}
      onSubmit={handleSubmitTurnos}
    >
      {({ isSubmitting }) => (
        <>
          <h3 className='text-center'>Agregar un especialidades médicas</h3>
          <Form className='especialidades_cuerpo'>
            <div>
              <Field type="text" name="area" placeholder="Area:" className='inputs' />
              <ErrorMessage name="area" component="div" className="text-danger"  />

            </div>
            <div>
              <Field type="text" name="name" placeholder="Nombre del profecional:" className='inputs' />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>
            <div>
              <button type="submit" className="boton">Agregar</button>
            </div>
          </Form>
        </>
      )}
    </Formik>

  } else {
    const initialValuesDetalles = {
      date: "",
      hour: "",
    }
    const handleSubmitDetalles = (values) => {
      console.log(values)
      Accion.newDetalle(id, values)
      .then((res) => {
        console.log(res);
        window.location.reload()

      })
      .catch((err) => {
        console.log(err);
      })
    }

    return <Formik
      initialValues={initialValuesDetalles}
      validationSchema={validationSchemaDetalles}
      onSubmit={handleSubmitDetalles}
    >
      {({ isSubmitting }) => (
        <>
          <h3 className='text-center'>Agregar un aturno</h3>

          <Form className='especialidades_cuerpo'>

            <div>
              <Field type="date" name="date" placeholder="Fecha:" className='inputs'/>
              <ErrorMessage name="date" component="div" className="text-danger" />
            </div>

            <div >
              <Field type="hour" name="hour" placeholder="Hora: 24h" className='inputs'/>
              <ErrorMessage name="hour" component="div" className="text-danger" />
            </div>

            <div>
              <button type="submit" className="boton">Agregar turno</button>
            </div>
          </Form>
        </>
      )}
    </Formik>
  }

}

export default Agregar

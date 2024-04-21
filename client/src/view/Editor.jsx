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
    .required('Debe agregarle el nombre del profecional')
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
          <h1 className='text-center'>Agregar un especialidades médicas</h1>
          <Form className='text-center row'>
            <div className="my-3 col">
              <Field type="text" name="area" placeholder="Area:" />
              <ErrorMessage name="area" component="div" className="text-danger" />

            </div>
            <div className="my-3 col">
              <Field type="text" name="name" placeholder="Nombre del profecional:" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>
            <div className="my-3 col">
              <button type="submit" className="btn btn-primary">Agregar</button>
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
          <h1 className='text-center'>Agregar un aturno</h1>
          <Form className='text-center row'>

            <div className="my-3 col">
              <Field type="date" name="date" placeholder="Fecha:" />
              <ErrorMessage name="date" component="div" className="text-danger" />
            </div>

            <div className="my-3 col">
              <Field type="hour" name="hour" placeholder="Hora: 24h" />
              <ErrorMessage name="hour" component="div" className="text-danger" />
            </div>

            <div className="my-3 col">
              <button type="submit" className="btn btn-primary">Agregar turno</button>
            </div>
          </Form>
        </>
      )}
    </Formik>
  }

}

export default Agregar

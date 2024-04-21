import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./view/Login"
import Register from "./view/Register"
import Home from "./view/Home";
import Owner from "./view/HomeOwner"
import Turnos from "./view/Turnos"
import Detalles from "./view/Detalles"
import { PrivateRoutes, PublicRoutes } from "./components/Route";


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/owner" element={
            <PrivateRoutes>
              <Owner />
            </PrivateRoutes>
          } />
            <Route path="/turnos" element={<PublicRoutes><Turnos /></PublicRoutes>} />
            <Route path="/turnos/:id" element={<PublicRoutes><Detalles />  </PublicRoutes>} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

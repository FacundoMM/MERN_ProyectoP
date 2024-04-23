import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./view/Login"
import Register from "./view/Register"
import Home from "./view/Home";
import Turnos from "./view/Turnos"
import Detalles from "./view/Detalles"
import User from "./view/User";

import { PublicRoutes } from "./components/Route";

function App() {
    

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/misturnos" element={<PublicRoutes><User /></PublicRoutes>} />
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

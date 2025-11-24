import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Catalogo from "./paginas/Catalogo";
import DetalleProducto from "./paginas/DetalleProducto";
import Login from "./paginas/Login";
import Registro from "./paginas/Registro";
import Carrito from "./paginas/Carrito";
import PrivateRoute from "./componentes/PrivateRoute";
import Inicio from "./paginas/Inicio";
import Blog from "./paginas/Blog";
import AdminProductos from "./componentes/AdminProductos";
import { CarritoProvider } from "./context/CarritoContext";
import Header from "./componentes/Header";
import { UserProvider } from "./context/UserContext";
import Historial from "./paginas/Historial";

function App() {
  return (
    <CarritoProvider>
      <UserProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/producto/:codigo" element={<DetalleProducto />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/historial" element={<Historial />} />

            <Route
              path="/admin/productos"
              element={
                <PrivateRoute requiredRole="ADMIN">
                  <AdminProductos />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </UserProvider>
    </CarritoProvider>
  );
}

export default App;

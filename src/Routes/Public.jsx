import {Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Detalle from "../Pages/Detalle";
import Registro from "../Pages/Registro";
import Login from "../Pages/Login";
import ProductosAlta from "../Pages/ProductosAlta";
import ProductosModificar from "../Pages/ProductosModificar";
import Checkout from "../Pages/Checkout";


function Public(){
    return(
        <div>
        <Routes>
          <Route path="/" element={<Home/>}/>          
          <Route path="/alta" element={<Registro/>}/>
          <Route path="/ingresar" element={<Login />}/>
          <Route path="/producto/:id" element ={<Detalle/>}/>
          <Route path="/productos/alta" element ={<ProductosAlta/>}/>
          <Route path="/producto/editar/:id" element ={<ProductosModificar/>}/>
          <Route path='/checkout/:id' element={<Checkout/>}/>
        </Routes>
        </div>
    )
}
export default Public;
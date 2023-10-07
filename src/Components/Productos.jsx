import React, { useState, useEffect } from "react";
import Producto from "./Producto";
import { getAllProductos } from "../Services/ProductosServices";
import Loading from "../Loading/Laoding";
import { Row } from "react-bootstrap";

function Productos() {
  const titulo = "Nuestros Productos Más Elegidos";
  const [productos, setProductos] = useState([]);
  const [Isloading, setIsloading] = useState(true);

  useEffect(() => {
    const result = async () => {
      try {
        const Productos = await getAllProductos();
        console.log(Productos);
        setProductos(Productos);
        setIsloading(false);
      } catch (e) {
        console.log(e);
      }
    };
    result();
  }, []);

  return (
    <Loading loading={Isloading}>
      <div>
        <h1>{titulo}</h1>
        <Row>
          {productos.map((producto) => (
            <Producto key={producto.id} {...producto.data()} id={producto.id} />
          ))}
        </Row>
      </div>
    </Loading>
  );
}

export default Productos;

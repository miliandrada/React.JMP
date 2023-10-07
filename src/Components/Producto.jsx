import React,{useContext, useEffect} from "react"
import { Link } from "react-router-dom";
import {Button, Card, Col} from "react-bootstrap";
import estilo from "../Css/Inicio.module.css"
import { AuthContext } from "../Context/AuthContext";

function Producto({
  id,
  name,
  description,
  price,
  image,
}){
  useEffect(
    ()=>{
  
    },
    []
  )
 const context = useContext(AuthContext)
  return (
  <>
    <Col xs={12} sm={6} lg={4} xxl={3}>
        <Card>
          <Card.Img variant="top" src={image} alt={`Imagen del Producto ${name}`} />
          <Card.Body>
          <Card.Title className={estilo.name_inicio}>{name}</Card.Title>
          <Card.Text className={estilo.price_inicio}>
            ${price}
          </Card.Text>
          <Card.Text>
            {description}
          </Card.Text>
          <Button className={estilo.button_inicio} as={Link} to={ `/producto/${id}`} variant="primary">Ver Detalle</Button> 
          { 
            context.login &&
              <Button className={estilo.button_inicio} as={Link} to={ `/producto/editar/${id}`} variant="primary">Editar</Button>
         }
          
          </Card.Body>
      </Card>
    </Col>
  </>
    
  )

}


export default Producto;

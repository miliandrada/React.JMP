import { useParams } from "react-router-dom";
import React, {useState,useEffect} from "react"; 
import { getByIdProductos } from "../Services/ProductosServices";
import esti from "../Css/Detalle.module.css"
import Loading from "../Loading/Laoding";
import {Link} from "react-router-dom";
import {Button} from 'react-bootstrap';


function Detalle (){
   const {id} = useParams()
   
   const [producto,setProducto] = useState({})
   const [Isloading,setIsloading] = useState(true)
   
   useEffect(
    ()=>{
        const result= async ()=>{
            try{
                const productoData = await getByIdProductos(id)
                if(productoData){
                    setProducto(productoData.data())
                }
                setIsloading(false)
             }catch (e){
                 console.log(e)
             }
                
        }
        result ()   
        },
    [id]
)
    
        return(
                
             <Loading loading={Isloading}>
                <div>
                    <p className={esti.name_comprar}>{producto.name}</p>
                    <img src={producto.image} alt={`Imagen del Producto ${producto.name}`}></img>
                    <p className={esti.description_comprar}>{producto.description}</p>
                    <p className={esti.price_comprar}>{producto.price}</p>
                    <Button className={esti.button_comprar} as={Link} to={`/checkout/${id}`} >Comprar ahora</Button>
                </div>
            </Loading>
           
        )
    }

   
export default Detalle; 
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getByIdProductos } from "../Services/ProductosServices";
import { Button} from "react-bootstrap";
import Loading from "../Loading/Laoding";
import AlertCustom from "../Components/AlertCustom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import estiloss from "../Css/Checkout.module.css";
import {useNavigate} from "react-router-dom"; 

function Checkout() {
    const {id}= useParams()
    const [producto,setProducto] = useState({})
    const [Isloading,setIsloading] = useState(true)
    const [comprar,setComprar]=useState(false)
    const context=useContext(AuthContext)
    const [alert,setAlert] = useState({variant:'',text:''})
    const navigate = useNavigate()

    useEffect(
        ()=>{
            const result = async ()=>{
                try{
                    const productoData = await getByIdProductos(id)
                 if(productoData){
                    setProducto(productoData.data())
                 }
                    setIsloading(false)
                }catch(e){
                    console.log(e)
                }
            }
            result()
        },
        [id]
    )

    const handleCompra= ()=>{
        setComprar(true)
        if(context.login){
            setAlert({variant:'success',text:`¡Gracias por su compra ${context.user?.name}!`})
            setTimeout(()=>{
                navigate("/")
            },2000)
        }else{
            setAlert({variant:'danger',text:`Para realizar la compra debe iniciar sesión`})
        }
    }

    return(
        <div className={estiloss.caja_final}>
            <Loading loading={Isloading}>
                <h1 className={estiloss.name_final}>FINALIZAR COMPRA</h1>
                <h2 className={estiloss.title_final}>{producto.name}</h2>
                
                <h3 className={estiloss.price_final}>Precio Final: ${producto.price}</h3>    
                <h4 className={estiloss.envio_final}>Envío GRATIS a cualquier parte del país</h4>
                <p className={estiloss.medios_pago}> Medios de pago: Efectivo/Mercado Pago/Tarjeta de crédito y débito/Pago Fácil.</p>
                <Button className={estiloss.button_final} onClick={()=>{handleCompra()}}>Confirmar Compra</Button>
                     <AlertCustom {...alert}/>
       
            </Loading>

            
        </div>
    )
}

export default Checkout;
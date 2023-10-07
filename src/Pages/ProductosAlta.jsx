import { useForm } from "react-hook-form";
import {Button,Form} from "react-bootstrap";
import firebase from "../Config/firebase";
import est from "../Css/Alta.module.css"
import {useNavigate} from "react-router-dom"; 

function ProductosAlta(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
   
   
    const onSubmit = async data => {
        console.log(data)
        try{
           const document = await firebase.firestore().collection("Productos")
           .add(data)
           console.log (document)
           setTimeout(()=>{
            navigate("/")
            },1000)
        }catch(e){
            console.log(e)
        }
    }
    return(
    <div>
        <Form className={est.form_alta} onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={est.label_alta}>Nombre</Form.Label>
                <Form.Control type="text" {...register("name" , { required: true })}/>
                <Form.Text className="text-muted">
                {errors.name && <span>This field is required</span>}
                 </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={est.label_alta} >Precio</Form.Label>
                <Form.Control type="text"  {...register("price" , { required: true })}/>
                <Form.Text className="text-muted">
                {errors.price && <span>This field is required</span>}
                 </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={est.label_alta} >Descripción</Form.Label>
                <Form.Control type="text"  {...register("description" , { required: true })}/>
                <Form.Text className="text-muted">
                {errors.description && <span>This field is required</span>}
                 </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={est.label_alta} >Imagen</Form.Label>
                <Form.Control type="text"   {...register("image" , { required: true })}/>
                <Form.Text className="text-muted">
                {errors.image && <span>This field is required</span>}
                 </Form.Text>
            </Form.Group>


        
            <Button className={est.button_alta} type="submit"variant="primary">Guardar</Button>
         </Form>
    </div>
    )
}
export default ProductosAlta;
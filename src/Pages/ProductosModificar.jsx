import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {Button,Form} from "react-bootstrap";
import { useEffect } from "react";
import { deleteProducto, getByIdProductos, update } from "../Services/ProductosServices";
import estilos from "../Css/Modificar.module.css"

function ProductosModificar(){
    const {id} = useParams()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    
    useEffect(
        ()=>{
            const result= async ()=>{
                try{
                    const productoData = await getByIdProductos(id)
                    if(productoData){
                    setValue("name",productoData.data().name)
                    setValue("price",productoData.data().price)
                    setValue("description",productoData.data().description)
                    setValue("image",productoData.data().image)
                    }
                 } catch (e){
                     console.log(e)
                 }
                    
            }
            result ()   
            },
        // eslint-disable-next-line react-hooks/exhaustive-deps
            [id]
    )
    
    
    const onSubmit = async data => {
        console.log(data)
        try{
           const document = await update(id,data)
           console.log (document)
        }catch(e){
            console.log(e)
        }
    }
    const handleDelete = async ()=>{
        try{
            const document = await deleteProducto(id) 
              console.log(document)
        }catch(e){
            console.log(e)
        }
     
    }
    return(
    <div>
        <Form className={estilos.form_edit} onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={estilos.label_edit}>Nombre</Form.Label>
                <Form.Control type="text" {...register("name" , { required: true })}/>
                <Form.Text>
                {errors.name && <span>This field is required</span>}
                 </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={estilos.label_edit}>Precio</Form.Label>
                <Form.Control type="text"  {...register("price" , { required: true })}/>
                <Form.Text className="text-muted">
                {errors.price && <span>This field is required</span>}
                 </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={estilos.label_edit} >Descripción</Form.Label>
                <Form.Control type="text"  {...register("description" , { required: true })}/>
                <Form.Text className="text-muted">
                {errors.description && <span>This field is required</span>}
                 </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={estilos.label_edit} >Imagen</Form.Label>
                <Form.Control type="text"   {...register("image" , { required: true })}/>
                <Form.Text className="text-muted">
                {errors.image && <span>This field is required</span>}
                 </Form.Text>
            </Form.Group>
            <Button className={estilos.button_guardar} type="submit"variant="primary">Guardar</Button>
            <Button className={estilos.button_eliminar} variant="danger" onClick={handleDelete}>Eliminar</Button>
         </Form>
    </div>
    )
}
export default ProductosModificar;
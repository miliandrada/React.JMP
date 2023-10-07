import { useForm } from "react-hook-form";
import {Button,Form} from "react-bootstrap";
import firebase from "../Config/firebase";
import { useState } from "react";
import AlertCustom from "../Components/AlertCustom";
import { registroMessage } from "../Utils/errorMessage";
import {useNavigate} from "react-router-dom"; 
import style from "../Css/Registro.module.css"


function Registro(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [alert,setAlert] = useState ({variant:"", text:""})
    const navigate = useNavigate()
   
    const onSubmit = async data => {
        console.log(data)
        try{
            const responseUser= await firebase.auth().createUserWithEmailAndPassword(data.email,data.password)
            console.log("responseUser", responseUser.user.uid)
            if(responseUser.user.uid){
              const document= await firebase.firestore().collection("Usuario")
               .add({
                name:data.name,
                lastname:data.lastname,
                userId:responseUser.user.uid
               })
               
               console.log(document)
               if(document){
                setAlert({variant:"success", text:"¡Registro Exitoso!"})
                setTimeout(()=>{
                navigate("/ingresar")
                },1000)
            }
            }
        }catch(e){
            console.log(e.code)
        setAlert({variant:"danger", text: registroMessage [e.code] || "Ha ocurrido un error"})
        }
        
    }
    return(
    <div>
        <Form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={style.label_text}>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Ingresar nombre" {...register("name" , { required: true })}/>
                <Form.Text className={style.input_text}>
                {errors.name && <span>This field is required</span>}
                 </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className={style.label_text} >Apellido</Form.Label>
                <Form.Control type="text" placeholder="Ingresar apellido" {...register("lastname" , { required: true })}/>
                <Form.Text className={style.input_text}>
                {errors.lastname && <span>This field is required</span>}
                 </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className={style.label_text} >Email</Form.Label>
                <Form.Control type="email" placeholder="Ingresar email" {...register("email" , { required: true })}/>
                <Form.Text className={style.input_text}>
                {errors.email && <span>This field is required</span>}
                 </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className={style.label_text} >Password</Form.Label>
                <Form.Control type="password" placeholder="Ingresar contraseña" {...register("password",{ required: true, minLength:8,maxLength:12 })}/>
                <Form.Text className={style.input_text}>
                    {errors.password?.type==="required" && <span>This field is required</span>}
                    {errors.password?.type==="minLength" && <span>Debe contener al menos 8 carácteres</span>}
                    {errors.password?.type==="maxLength" && <span>No se permite más de 12 carácteres</span>}
                </Form.Text>
            </Form.Group>   
            <Button className={style.button_producto_registro} type="submit"variant="primary">Registrarse</Button>
         <AlertCustom{...alert}/>
         </Form>
    </div>
    )
}
export default Registro;
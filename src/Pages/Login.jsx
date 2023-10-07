import { useForm } from "react-hook-form";
import {Button,Form} from "react-bootstrap";
import firebase from "../Config/firebase";
import AlertCustom from "../Components/AlertCustom";
import {useNavigate} from "react-router-dom"; 
import { LoginMessage } from "../Utils/errorMessage";
import { useContext, useState } from "react";
import styl from "../Css/Login.module.css"
import { AuthContext } from "../Context/AuthContext";



function Login(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const context = useContext(AuthContext)
    const [alert,setAlert] = useState ({variant:"", text:""})
    
    
    const onSubmit = async data => {
        console.log(data)
        try{
             const responseUser= await firebase.auth().signInWithEmailAndPassword(data.email,data.password)
            console.log("responseUser",responseUser.user.uid)
            if(responseUser.user.uid){
              const userDocument = await firebase.firestore().collection("Usuario")
             .where("userId","==",responseUser.user.uid)
             .get()
            
           const user = userDocument.docs[0].data()
            console.log (userDocument)
            context.handlerLogin(user)
            setAlert({variant:"success", text:`Bienvenido/a ${user?.name}`})
            setTimeout(()=>{
                navigate("/")
            },2000)
        }   
        }catch(e){
            console.log(e)
        setAlert({variant:"danger", text: LoginMessage [e.code] || "Ha ocurrido un error"})
        }
    }
  
    return(
        <div>
            <Form className={styl.form_login} onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={styl.label_login}>Email</Form.Label>
                <Form.Control type="email" placeholder="Ingresar Email"  {...register("email" , { required: true })}/>
                <Form.Text className={styl.input_login}>
                {errors.email && <span>This field is required</span>}
                 </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className={styl.label_login} >Password</Form.Label>
                <Form.Control type="password" placeholder="Ingresar contraseña" {...register("password",{ required: true, minLength:8,maxLength:12 })}/>
                <Form.Text className={styl.input_login}>
                    {errors.password?.type==="required" && <span>This field is required</span>}
                    {errors.password?.type==="minLength" && <span>Debe contener al menos 8 carácteres</span>}
                    {errors.password?.type==="maxLength" && <span>No se permite más de 12 carácteres</span>}
                </Form.Text>
            </Form.Group>   
            <Button className={styl.button_login} type="submit"variant="primary">Ingresar</Button>
                <AlertCustom {...alert}/>
         </Form>
        </div>
    )
}
export default Login;

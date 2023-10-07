import firebase from "../Config/firebase";
export async function getAllProductos(){
    //return instance.get("sites/MLA/search?q=ipod")
    const querySnapshot = await  firebase.firestore().collection("Productos")
    .get()
    return querySnapshot.docs
}
export async function getByIdProductos(id){
    //return instance.get(`items/${id}`)
    const querySnapshot = await firebase.firestore().doc(`Productos/${id}`).get()
    return querySnapshot
}
    export async function update(id,payload){
       return await firebase.firestore().doc(`Productos/${id}`).set(payload)
    }
    export async function deleteProducto(id){
        return await firebase.firestore().doc(`Productos/${id}`).delete()
     }
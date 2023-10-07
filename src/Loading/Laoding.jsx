import React from "react";
import Spinner from "react-bootstrap/Spinner";


function Loading ({children,loading}){
    if(loading){
         return(
                <>
                    <Spinner animation="border" size="sm" />
                    <Spinner animation="border" />
            
                </> 
        )
        }else{
            return(
                <>
                    {children}
                </>
            )
        }

}
export default Loading;
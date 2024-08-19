import React from "react";

const Contactpage=(props)=>{
    return(
       
            <ul>
                <li>Name: {props.contactName}</li>
                <li>Email: {props.contactEmail}</li>
                <li>Phone: {props.contactPhone}</li>
            </ul>
          
    
    );
    
};
export default Contactpage;
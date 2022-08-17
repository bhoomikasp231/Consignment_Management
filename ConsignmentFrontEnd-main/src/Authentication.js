import {React, useState, useEffect} from 'react';
import Modal from "react-modal";
import UserLoginDialog from "../src/components/Authentication/UserLoginDialog";
import UserSignUpDialog from '../src/components/Authentication/UserSignupDialog';
import App from './App';
import Footer from '../src/components/footer/Footer';

const Authentication = () => {
    const [modalIsOpen, setmodalIsOpen] = useState(true);
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [loginOpen, setLoginOpen] = useState(true);
    const [customStyles, setCustomStyles] = useState({
      content:{
         width:'40%',
         backgroundColor:'white',
         height:'auto',
         top:'50%',
         left:'50%',
         right:'auto',
         bottom:'auto',
         border:'none',
         transform:'translate(-50%, -50%)',
         boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px'
       },
     });

     useEffect(()=>{
        if(localStorage.getItem('userToken') !== null){
            setisLoggedIn(true);
        }
     },[]);

     const afterOpenModal = () =>{
   
    }
    
    const closeModal = () =>{
    //    setmodalIsOpen(false);
    }
    return(
    <div >
   
           <div>
                 <App />
                 <Footer/>
           </div> 
    </div>
    );
}

export default Authentication;
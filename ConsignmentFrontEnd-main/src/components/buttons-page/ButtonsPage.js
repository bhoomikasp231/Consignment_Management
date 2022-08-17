
import {React, useState, useEffect} from 'react';
import './ButtonsPage.css';
import UserLoginDialog from "../Authentication/UserLoginDialog";
import UserSignUpDialog from '../Authentication/UserSignupDialog';
import ViewConsignment from '../view-edit-consignment/ViewConsignmentDetails';

const ButtonPage = (props) => {
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [loginOpen, setLoginOpen] = useState(true);
    const [modalIsOpen, setmodalIsOpen] = useState(true);
    useEffect(()=>{ 
        if(localStorage.getItem('userToken') !== null){
          setisLoggedIn(true);
      }
    },[]);
    const handleAddConsignmentBtnClick = () => {

        props.history.push({
            pathname:'/add-consignment'
        })
    }

    const handleConsigmentEditBtnClick = () => {
        props.history.push({
            pathname:'/view-edit-consignment'
        })
    }
    const handleConsigmentViewBtnClick = () => {
        props.history.push({
            pathname:'/view-consignment'
        })
    }

    return(
        <div>
               {   isLoggedIn ? 
                 <div className='bacg-imge' >

                 <button className='btn-view' onClick={handleAddConsignmentBtnClick}>Add Consignment</button>
                 <button className='btn-view' onClick={handleConsigmentViewBtnClick}>View Consignment</button>
                 <button className='btn-view' onClick={handleConsigmentEditBtnClick}>Edit Consignment</button>
                 <p style={{fontSize:'1.2em', padding:'1em', color:'black'}}>Consignment involves selling one's personal goods (clothing, furniture, etc.) through a third-party vendor such as a consignment store or online thrift store. The owner of the goods pays the third-party a portion of the sale for facilitating the sale. Consignors maintain the rights to their property until the item is sold or abandoned. Many consignment shops and online consignment platforms have a set day limit before an item expires for sale (usually 60–90 days).
    
    The consignment stock is stock legally owned by one party, but held by another, meaning that the risk and 
    rewards regarding to the said stock remains with the first party while the second party is responsible for 
    distribution or retail operations.
    The verb "consign" means "to send" and therefore the noun "consignment" means "sending goods to another 
    person". In the case of "retail consignment" or "sales consignment" (often just referred to as
     a "consignment"), goods are sent to the agent for the purpose of sale. The ownership of these goods
      remains with the sender. The agent sells the goods on behalf of the sender according to instructions.
       The sender of goods is known as the
     "consignor" and the agent entrusted with the custody and care of the goods is known as the "consignee".</p>
         </div>    
  :
      
 <div className='login-container'>
        {loginOpen ?<UserLoginDialog setmodalIsOpen={setmodalIsOpen} setLoginOpen={setLoginOpen}></UserLoginDialog>:
                <UserSignUpDialog setmodalIsOpen={setmodalIsOpen} setLoginOpen={setLoginOpen}></UserSignUpDialog>}  </div>
        
  
}
        </div>
    );
}

export default ButtonPage;
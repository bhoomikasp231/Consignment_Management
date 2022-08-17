import { React, useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import AlertMessage from "../../utils/AlertMessage";
import AuthenticationService from './AuthenticationService';


let metaDataValues = {
    newPassword:'',
        confirmPassword:''
  };
const PasswordEditPage = ({setIsLogin, setIsNewPass, setisForgotPas, email}) =>{
    
    const [isButtonDisable, setIsButtonDisabled] = useState(false);
    const [alertMessageData, setAlertMessageData] = useState({visible:false});
    const [metaDataInput, setMetaDataInput] = useState({
        newPassword:'',
        confirmPassword:''
      });

      const [sendBtnText, setSendBtnText] = useState('Send');


    const  handleInputChange =(event) =>{
      setMetaDataInput((metaDataInput) => ({
        ...metaDataInput,
        [event.target.name]: event.target.value,
      }));
      metaDataValues = {
        ...metaDataValues,
        [event.target.name]: event.target.value,
      };
    }



    const handleLogin = () => {
        setIsLogin(true);
        setIsNewPass(false);
     //   setLoginOpen(false);
    }
    const handleNewPass = () =>{
        setIsButtonDisabled(true);
        setSendBtnText('Wait...');
        if(metaDataInput?.newPassword === metaDataInput?.confirmPassword){
        AuthenticationService.newPassword( email,metaDataInput.confirmPassword).then((response)=>{
            setSendBtnText('Submit')
       setIsButtonDisabled(false);
       setIsNewPass(false);
       setIsLogin(true);
          setAlertMessageData({
            visible:true,
            sevearityIs:'success',
            message:'Password Updated successfully Please login with new password'
          });
         
        }).catch((error)=>{
            setSendBtnText('Submit')
            setIsButtonDisabled(false);
          setAlertMessageData({
            visible:true,
            sevearityIs:'error',
            message:'Password failed, Please retry'
          });
        })
    }else{
        setIsButtonDisabled(false);
        setSendBtnText('Submit')
        setAlertMessageData({
            visible:true,
            sevearityIs:'error',
            message:'password mismatching'
          });
    }
    }
    return(
        <div>

        <h6 style={{textAlign:'center',fontFamily:'serif', fontWeight:'lighter', marginBottom:'0px', fontSize:'1.6em',color:'#005b72', marginTop:'0px'}}>Enter New Password</h6>
        <hr></hr>
      <form style={{paddingLeft:'10%', paddingRight:'10%', marginTop:'10%'}} action="/form/submit" method="post" onSubmit={handleInputChange}>
     <div className="textOnInput">
         <span>Your mail ID {<span style={{fontWeight:'bold', colour:'#005b72'}}>{email}</span>}</span>
     </div>
      <div className="textOnInput">
        <label  title="Enter New password">
         New Password <BsFillInfoCircleFill />
        </label>
        <input
         className="form-control"
          type="password"
          name="newPassword"
          placeholder="password"
          value={metaDataInput.newPassword}
          autoComplete="off"
          onChange={handleInputChange}
        />
      </div>
      
      <div className="textOnInput">
        <label  title="Enter Same password">Confirm Pass<BsFillInfoCircleFill />
        </label>
        <input
         className="form-control"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={metaDataInput.confirmPassword}
          autoComplete="off"
          onChange={handleInputChange}
          list= 'columnAutoLabelling'
        />
      </div>  
      <div style={{textAlign:'end', marginTop:'-1.5em'}}>
       </div> 
 
    </form>
    <div style={{ width:'100%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
        <p  style={{cursor:'pointer', marginTop:'0px', marginRight:'10%', color:'#005b72'}} onClick={handleLogin}>Want to ?<br/><strong>Login</strong></p>
    <button style={{width:'25%', height:'40px', marginTop:'15px' }} className="custom-button" onClick={handleNewPass} disabled={isButtonDisable}>{sendBtnText}</button>
    </div>
    <AlertMessage alertMessageData={alertMessageData} setAlertMessageData={setAlertMessageData}></AlertMessage>  
   
        </div>
    );
}

export default PasswordEditPage;
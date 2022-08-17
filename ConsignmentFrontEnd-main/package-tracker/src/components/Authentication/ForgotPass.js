import {React, useState} from 'react';
import { BsFillInfoCircleFill } from "react-icons/bs";
import AuthenticateService from './AuthenticationService';


let metaDataValues = {
    email:''
  };
const ForgotPass = ({setisForgotPas, setEmail, setIsNewPass, setIsLogin, setIsOTPVerify}) => {
    const [metaDataInput, setMetaDataInput] = useState({
        email:''
      });
      const [errorMessage, setErrorMessage] = useState('');
      const [isButtonDisable, setIsButtonDisabled] = useState(false);
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

    const handleLogin = () =>{
        setisForgotPas(false);
        setIsLogin(true);
    }

    const handleSendEmail = () => {
      setIsButtonDisabled(true);
      setSendBtnText('wait...')
     if(metaDataValues?.email !== '') {
         AuthenticateService.forgotPassword(metaDataValues?.email).then((response)=>{
            setSendBtnText('Verificaion Code sent');
            metaDataValues ={
              email:''
            }           
             setMetaDataInput({
              email:''
            })
            setIsButtonDisabled(false);
            if(response?.isSuccessful){
              setisForgotPas(false);
              setIsOTPVerify(true);
              setEmail(response?.email);
            }
        }).catch((error)=>{
          setIsButtonDisabled(false);
          setSendBtnText('Send')
          setErrorMessage('Please enter proper mail address, It should be same email ID given while signUp..!!');
            console.log('error', error);
        })}else{
          setIsButtonDisabled(false);
          setSendBtnText('Send')
          setErrorMessage('Plese Enter your mail Address..');
        
        }
    }

 
    return(
        <div>
      <h6 style={{textAlign:'center', fontWeight:'lighter', marginBottom:'0px', fontSize:'1.2em',color:'#005b72', marginTop:'0px'}}>Enter email ID, We will send Verification code to your mail ID</h6>
        <hr></hr>
      <form style={{paddingLeft:'10%', paddingRight:'10%', marginTop:'10%'}} action="/form/submit" method="post" onSubmit={handleInputChange}>
      <div style={{marginBottom:'1em'}}><span style={{color:'tomato'}}>{errorMessage}</span></div>
     
      <div className="textOnInput">
        <label  title="Enter Valid email ID which you have given at signup">
          Email Addrs<BsFillInfoCircleFill />
        </label>
        <input
         className="form-control"
          type="email"
          name="email"
          placeholder="email"
          value={metaDataInput.email}
          autoComplete="off"
          onChange={handleInputChange}
          list= 'columnAutoLabelling'
        />
      </div>  
 
    </form>
    <div style={{ width:'100%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
        <p  style={{cursor:'pointer', marginTop:'0px', marginRight:'10%', color:'#005b72'}} onClick={handleLogin}>Want to Login?<br/><strong>Login</strong></p>
    <button style={{width:'25%', height:'40px', marginTop:'15px' }} className="custom-button" onClick={handleSendEmail} disabled={isButtonDisable}>{sendBtnText}</button>
    </div>
    </div>
    );
}

export default ForgotPass;
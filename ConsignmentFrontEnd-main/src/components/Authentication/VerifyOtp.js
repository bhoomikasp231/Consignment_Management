import { React, useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import AlertMessage from "../../utils/AlertMessage";
import AuthenticationService from './AuthenticationService';
import BackBtn from '../../assests/BackBtn.svg';


let metaDataValues = {
    otp:''
  };
const VerifyOtp = ({email, setIsLogin, setIsNewPass, setisForgotPas,setIsOTPVerify,setEmail}) =>{
    const [alertMessageData, setAlertMessageData] = useState({visible:false});
    const [metaDataInput, setMetaDataInput] = useState({
        otp:''
      });
      const [sendBtnText, setSendBtnText] = useState('Submit');
      const [isButtonDisable, setIsButtonDisabled] = useState(false);


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

    const handleBackBtn = () => {
        setIsOTPVerify(false);
        setisForgotPas(true);
    }

    const handleLogin = () => {
        setIsOTPVerify(false);
        setIsLogin(true);
    }
    const handleNewPass = () =>{
      setIsButtonDisabled(true);
      setSendBtnText('Wait...');
      if(metaDataInput.otp !== ""){
        AuthenticationService.verifyPassword(metaDataInput.otp, email).then((response)=>{
            setSendBtnText('Submit');
            setIsButtonDisabled(false);
            setEmail(response?.email);
          setAlertMessageData({
            visible:true,
            sevearityIs:'success',
            message:'OTP verified succesfully'
          });
          setIsNewPass(true);
          setIsOTPVerify(false);
        }).catch((error)=>{
            setSendBtnText('Submit');
            setIsButtonDisabled(false);
          setAlertMessageData({
            visible:true,
            sevearityIs:'error',
            message:'otp Not matching'
          });
        });
    }else{
        setSendBtnText('Submit');
        setIsButtonDisabled(false);
        setAlertMessageData({
            visible:true,
            sevearityIs:'error',
            message:'Please enter OTP'
          });
    }
    }
    return(
        <div>
            <div style={{display:'flex', flexDirection:'row'}}>
            <button style={{width:'3em', height:'3em',  borderRadius:'4em' }} className="custom-button" onClick={handleBackBtn}><img width={'21em'} src={BackBtn} alt='back button'></img></button>
    
     <h6 style={{textAlign:'center',fontFamily:'serif', fontWeight:'lighter', marginBottom:'0px', fontSize:'1.2em',color:'#005b72', marginTop:'1em', marginLeft:'2em'}}>OTP Sent to your mail, Please check!</h6>
        </div>
        <hr></hr>
      <form style={{paddingLeft:'10%', paddingRight:'10%', marginTop:'10%'}} action="/form/submit" method="post" onSubmit={handleInputChange}>
     <div style={{display:'flex', flexDirection:'column', fontSize:'0.8em', marginTop:'-2em'}} className="textOnInput">
            <span>Please check you mail box, If you not find in primary mail box please check in Spam</span>
         <span>Your mail ID {<span style={{fontWeight:'bold', colour:'#005b72'}}>{email}</span>}</span>
     </div>
      
      <div className="textOnInput">
        <label  title="Please enter OTP ">
          Verify OTP   <BsFillInfoCircleFill />
        </label>
        <input
         className="form-control"
          type="number"
          name="otp"
          placeholder="Enter OTP"
          value={metaDataInput.otp}
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
        <button style={{width:'25%', height:'40px', marginTop:'1em' }} className="custom-button" onClick={handleNewPass} disabled={isButtonDisable}>{sendBtnText}</button>
   
    </div>
    <AlertMessage alertMessageData={alertMessageData} setAlertMessageData={setAlertMessageData}></AlertMessage>  
   
        </div>
    );
}

export default VerifyOtp;
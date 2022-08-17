import { React, useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import AlertMessage from "../../utils/AlertMessage";
import AuthenticationService from './AuthenticationService';
import history from '../../history';

let metaDataValues = {
    email:'',
    password:''
  };
const LoginPage = ({setmodalIsOpen, setLoginOpen, setisForgotPas, setIsLogin}) =>{

   
    const [alertMessageData, setAlertMessageData] = useState({visible:false});
    const [metaDataInput, setMetaDataInput] = useState({
        email:'',
        password:''
      });
      const [isButtonDisable, setIsButtonDisabled] = useState(false);
      const [loginBtnText, setLoginBtnText] = useState('Login');


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

    const handleForgotPass = () => {
        setisForgotPas(true);
        setIsLogin(false);
    }

    const handleSignUp = () => {
   
        setLoginOpen(false);
    }
    const handleSignIn = () =>{
      setLoginBtnText('Wait...');
      setIsButtonDisabled(true);
        AuthenticationService.userLogin({email: metaDataInput.email,password: metaDataInput.password}).then((response)=>{
          window.location.reload(false);
          setLoginBtnText('Login');
          setIsButtonDisabled(false);
          localStorage.setItem('userToken', response.token);
          localStorage.setItem('userID', response.user._id);
          setmodalIsOpen(false);
          setAlertMessageData({
            visible:true,
            sevearityIs:'success',
            message:response.message
          });
        }).catch((error)=>{
          setIsButtonDisabled(false);
          setLoginBtnText('Login');
          setAlertMessageData({
            visible:true,
            sevearityIs:'error',
            message:error.response.data.message
          });
        })
    }

    return(

        <div>

        <h6 style={{textAlign:'center',fontFamily:'serif', fontWeight:'lighter', marginBottom:'0px', fontSize:'1.6em',color:'#005b72', marginTop:'0px'}}>Login is Required</h6>
        <hr></hr>
      <form style={{paddingLeft:'10%', paddingRight:'10%', marginTop:'10%'}} action="/form/submit" method="post" onSubmit={handleInputChange}>
      <div className="textOnInput">
        <label  title="Write your email here">
          Email Addrs <BsFillInfoCircleFill />
        </label>
        <input
         className="form-control"
          type="text"
          name="email"
          placeholder="example@gmail.com"
          value={metaDataInput.email}
          autoComplete="off"
          onChange={handleInputChange}
        />
      </div>
      
      <div className="textOnInput">
        <label  title="Write New pasword">
          Password <BsFillInfoCircleFill />
        </label>
        <input
         className="form-control"
          type="password"
          name="password"
          placeholder="Password"
          value={metaDataInput.password}
          autoComplete="off"
          onChange={handleInputChange}
          list= 'columnAutoLabelling'
        />
      </div>  
      <div style={{textAlign:'end', marginTop:'-1.5em'}}>
      <span onClick={handleForgotPass} style={{textAlign:'end', fontSize:'0.8em', fontWeight:'bold', cursor:'pointer', color:'sandybrown'}}>Forgot password?</span>
      </div> 
 
    </form>
    <div style={{ width:'100%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
        <p  style={{cursor:'pointer', marginTop:'0px', marginRight:'10%', color:'#005b72'}} onClick={handleSignUp}>Dont have Account?<br/><strong>Sign Up</strong></p>
    <button style={{width:'25%', height:'40px', marginTop:'15px' }} className="custom-button" onClick={handleSignIn} disabled={isButtonDisable}>{loginBtnText}</button>
    </div>
    <AlertMessage alertMessageData={alertMessageData} setAlertMessageData={setAlertMessageData}></AlertMessage>  
   
        </div>
    );
}

export default LoginPage;
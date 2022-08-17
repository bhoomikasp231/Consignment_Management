import { React, useState } from "react";
import ForgotPass from './ForgotPass';
import LoginPage from './LoginPage';
import PasswordEditPage from './PasswordEditPage';
import VerifyOtp from './VerifyOtp';
import './Auth.css';

const UserLoginDialog = ({setmodalIsOpen, setLoginOpen}) => {

    const [email, setEmail] = useState('');
    const [isForgotPass, setisForgotPas] = useState(false);
    const [isNewPass, setIsNewPass] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [isOTPVerify, setIsOTPVerify] = useState(false);


    return(
        <div style={{zIndex:'8', position:'relative'}} className="modal-div"> 
      {isLogin &&  <LoginPage setmodalIsOpen={setmodalIsOpen}  setLoginOpen={setLoginOpen} setisForgotPas={setisForgotPas} setIsLogin={setIsLogin} ></LoginPage>}
       {isForgotPass&& <ForgotPass setisForgotPas={setisForgotPas} setEmail={setEmail} setIsNewPass={setIsNewPass} setIsLogin={setIsLogin} setIsOTPVerify={setIsOTPVerify}></ForgotPass>}
       {isNewPass && <PasswordEditPage setIsLogin={setIsLogin} setIsNewPass={setIsNewPass} setisForgotPas={setisForgotPas} email={email}></PasswordEditPage>}
         {isOTPVerify && <VerifyOtp email={email} setIsLogin={setIsLogin} setIsNewPass={setIsNewPass} setisForgotPas={setisForgotPas} setIsOTPVerify={setIsOTPVerify} setEmail={setEmail}></VerifyOtp>}
          </div>
    );
}
 
export default UserLoginDialog;
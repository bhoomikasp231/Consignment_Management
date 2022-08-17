import { React, useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import AlertMessage from "../../utils/AlertMessage";
import AuthenticationService from './AuthenticationService';


let metaDataValues = {
    name:'',
    email:'',
    password:'',
    confirmpass:''
  };
const UserSignUpDialog = ({setmodalIsOpen, setLoginOpen}) => {
  const [alertMessageData, setAlertMessageData] = useState({visible:false});
    const [metaDataInput, setMetaDataInput] = useState({
        name:'',
        email:'',
        password:'',
        confirmpass:''
      });





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



    const handleSignUp = () => {
      AuthenticationService.userSinUp({
       name: metaDataInput.name,
       email: metaDataInput.email,
       password: metaDataInput.password,
       phone: metaDataInput.phone
      }).then((response)=>{
        setAlertMessageData({
          visible:true,
          sevearityIs:'success',
          message:response.message
        });
        localStorage.setItem('userToken', response.token);
        localStorage.setItem('userID', response.user._id);
        setmodalIsOpen(false);
       
      }).catch((error)=>{
        setAlertMessageData({
          visible:true,
          sevearityIs:'error',
          message:error.response.data.message

        })
      })

    }
    const handleSignIn = () =>{
      setLoginOpen(true);
    }

    return(
        <div style={{zIndex:'8', position:'relative'}} className="modal-div">   
     
        <h6 style={{textAlign:'center', fontWeight:'lighter', marginBottom:'0px',  fontSize:'1.6em',color:'#005b72', marginTop:'0px'}}>Sign Up Required to Upload your Project</h6>
        <hr></hr>
      <form style={{paddingLeft:'10%', paddingRight:'10%', marginTop:'10%'}} action="/form/submit" method="post" onSubmit={handleInputChange}>
      <div className="textOnInput">
        <label title="Write your name here">
          User Name <BsFillInfoCircleFill />
        </label>
        <input
         className="form-control"
          id="name"
          name="name"
          type="text"
          placeholder="User name"
          value={metaDataInput.name}
          autoFocus
          onChange={handleInputChange}
          contentEditable={false}
        />
      </div>
     
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
      <div className="textOnInput">
        <label  title="Confirm Password, It should be same as above ">
         confirm Pass<BsFillInfoCircleFill />
        </label>
        <input
         className="form-control"
          type="password"
          name="confirmpass"
          placeholder="Password"
          value={metaDataInput.confirmpass}
          autoComplete="off"
          onChange={handleInputChange}
          list= 'columnAutoLabelling'
        />

      </div>       
{/*      
      <div className="textOnInput">
        <label  title="Enter your mobile number here" className="lable-description">
          Phn Num <BsFillInfoCircleFill />
        </label>
        <input
        className="form-control"
          type="text"
          name="phone"
          placeholder=" Mobile Number"
          value={metaDataInput.phone}
          autoComplete="off"
          onChange={handleInputChange}
        />
      </div> */}
    </form>
    <div style={{ width:'100%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
        <p  style={{cursor:'pointer', marginTop:'0px', marginRight:'10%', color:'coral'}} onClick={handleSignIn}>Already Reistered?<br/><strong>Login</strong></p>
    <button style={{width:'25%', height:'40px', marginTop:'15px' }} className="custom-button" onClick={handleSignUp}>Sign Up</button>
    </div>
    <AlertMessage alertMessageData={alertMessageData} setAlertMessageData={setAlertMessageData}></AlertMessage>  
    </div>
    );
}
 
export default UserSignUpDialog;
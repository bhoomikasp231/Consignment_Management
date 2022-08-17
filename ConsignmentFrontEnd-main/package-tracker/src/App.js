import './App.css';
import logo from './logo.svg';
import { BrowserRouter, NavLink, Switch, Route, useLocation } from 'react-router-dom';
import  {React, useRef, useEffect, useState } from 'react';
import UserLoginDialog from "../src/components/Authentication/UserLoginDialog";
import UserSignUpDialog from '../src/components/Authentication/UserSignupDialog';
import Modal from "react-modal";
import AddConsignmentData from '../src/components/add-consignment-data/AddConsignmentData';
import HomePage from './components/home-page/HomePage';
import ViewEditConsignmentData from './components/view-edit-consignment/ViewEditConsignmentData';


function App() {

  const navbarLinks = useRef(null);  
  const handleNavbarButton = (e) => {
    navbarLinks.current.classList.toggle('menu-collapse');
  };

  const hideNavMenu = () => {
    if (!navbarLinks.current.classList.contains('menu-collapse')) {
      navbarLinks.current.classList.add('menu-collapse');
    }
  }

  const handleSignOut = () =>{
    localStorage.removeItem('userToken');
    localStorage.removeItem('userID');
    window.location.reload(false);
  }

  return (
    <div className="App">
      <BrowserRouter>
      <nav className='navbar'>
          <div className='navbar-container'>
           <div className='brand-title'>
         
          <div className="logo-layout" >
          <img className = 'logo' src={logo}  alt="lg_logo"/>
          <span className='brand-name'>Packag Tracker</span>
          </div>
          </div>
            <button onClick={(e) => { handleNavbarButton(e); }} className='navbar-toggler'>
              <span className='navbar-toggler-icon'></span>
            </button>
           
            <div ref={navbarLinks} className='navbar-links menu-collapse'>
            <div >
             </div>
            
              <ul className='links-list'>
                <li className='nav-item'>
                  <NavLink activeClassName='is-active' exact={true} className='nav-link' to='/'>Home</NavLink>
                </li>
                
                <li className='nav-item'>
                  <NavLink activeClassName='is-active' exact={true} className='nav-link tour-upload-project' to='/about'>About</NavLink>
                </li>

                <li className='nav-item'>
                  <NavLink activeClassName='is-active' exact={true} className='nav-link tour-upload-project' to='/add-consignment'>Add Consignment</NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink activeClassName='is-active' exact={true} className='nav-link tour-upload-project' to='/view-edit-consignment'>View/Edit Consignment</NavLink>
                </li>
                <div style={{width:'10em', marginLeft:'2em'}}>
              <button onClick={handleSignOut}>Logout </button>
             </div>
              </ul>
             
            </div>
           
            </div>
           
        </nav>
        <div className='container'>
          <AllRoutes hideMenu={() => { hideNavMenu(); }}></AllRoutes>
        </div>
        <br></br>
      </BrowserRouter>
      
    </div>
  );
}
function AllRoutes({ hideMenu }) {

  let location = useLocation();
  useEffect(() => {
    hideMenu();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Switch>
        <Route path="/view-edit-consignment" component={ViewEditConsignmentData}>
      </Route>
      <Route path="/add-consignment" component={AddConsignmentData}>
      </Route>
         <Route path="/about" component={About}>
      </Route>
        <Route path="/" component={HomePage}>
      </Route>
      <Route path="/service" component={Service}>
      </Route>
    </Switch>
  );
}

function About(){
  const [modalIsOpen, setmodalIsOpen] = useState(true);
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
   })
   const afterOpenModal = () =>{
   
  }
  
  const closeModal = () =>{
    setmodalIsOpen(false);
  }
  return(
    <div style={{height:'100em'}}>
    <h1>About Page</h1>
    {/* <Modal
    animation={false}
    isOpen={modalIsOpen}
    onAfterOpen={afterOpenModal}
    onRequestClose={closeModal}
    style={customStyles} 
    ariaHideApp={false}> {loginOpen ?<UserLoginDialog setmodalIsOpen={setmodalIsOpen} setLoginOpen={setLoginOpen}></UserLoginDialog>:
    <UserSignUpDialog setmodalIsOpen={setmodalIsOpen} setLoginOpen={setLoginOpen}></UserSignUpDialog>}</Modal>
    */}
    </div>
  );
}

function Home(){
  return(
    <h1>Home</h1>
  );
}

function Service(){
  return(
    <h1>Service Page</h1>
  );
}



export default App;

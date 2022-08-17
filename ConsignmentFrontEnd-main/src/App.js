import './App.css';
import logo from './logo.svg';
import logoNew from '../src/assests/logo.png';
import { BrowserRouter, NavLink, Switch, Route, useLocation } from 'react-router-dom';
import  {React, useRef, useEffect, useState } from 'react';
import UserLoginDialog from "../src/components/Authentication/UserLoginDialog";
import UserSignUpDialog from '../src/components/Authentication/UserSignupDialog';
import Modal from "react-modal";
import AddConsignmentData from '../src/components/add-consignment-data/AddConsignmentData';
import HomePage from './components/home-page/HomePage';
import ViewEditConsignmentData from './components/view-edit-consignment/ViewEditConsignmentData';
import ButtonPage from './components/buttons-page/ButtonsPage';
import logout from '../src/assests/turn-off.png';
import AboutPage from './components/about-page/AboutPage';
import ViewConsignment from './components/view-edit-consignment/ViewConsignmentDetails';






function App() {
  const [modalIsOpen, setmodalIsOpen] = useState(true);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [loginOpen, setLoginOpen] = useState(true);
  const [customStyles, setCustomStyles] = useState({
    content:{
       width:'40%',
       zIndex:'-1',
       backgroundColor:'white',
       height:'auto',
       top:'60%',
       left:'50%',
       right:'auto',
       bottom:'auto',
       border:'none',
       transform:'translate(-50%, -50%)',
       boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px'
     },
   });


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
    localStorage.removeItem('userName');
    window.location.reload(false);
  }

  return (
    <div className="App">
      <BrowserRouter>
      <nav className='navbar'>
          <div className='navbar-container'>
           <div className='brand-title'>
         
          <div className="logo-layout" >
          <img className = 'logo' src={logoNew}  alt="lg_logo"/>
          <span className='brand-name'>Path4U</span>
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
                  <NavLink activeClassName='is-active' exact={true} className='nav-link tour-upload-project' to='/button-page'>Login </NavLink>
                  <br/>
                  <span style={{color:'white'}}>{localStorage.getItem('userName')?localStorage.getItem('userName'):''}</span>
                </li>
                <div style={{width:'10em', marginLeft:'2em'}}>
              <span  height='30em' src={logout} style={{cursor:'pointer', color:'white',fontSize:'1.1em',fontWeight:'normal', fontFamily:'Georgia, Times New Roman, Times, serif'}} onClick={handleSignOut}>Logout</span>
             </div>
              </ul>
             
            </div>
           
            </div>
           
        </nav>
        <div className='container'>
       
           <AllRoutes hideMenu={() => { hideNavMenu(); }}></AllRoutes> : 
           
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
        <Route path="/view-consignment" component={ViewConsignment}>
      </Route>
        <Route path="/button-page" component={ButtonPage}>
      </Route>
        <Route path="/view-edit-consignment" component={ViewEditConsignmentData}>
      </Route>
      <Route path="/add-consignment" component={AddConsignmentData}>
      </Route>
         <Route path="/about" component={AboutPage}>
      </Route>
        <Route path="/" component={HomePage}>
      </Route>
      <Route path="/service" component={Service}>
      </Route>
    </Switch>
  );
}


function Service(){
  return(
    <h1>Service Page new</h1>
  );
}



export default App;

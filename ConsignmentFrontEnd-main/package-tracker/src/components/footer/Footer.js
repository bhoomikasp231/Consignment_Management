import React from 'react';
import './Footer.css';


const Footer  = () => {
    return(
        <div>
    <div className="footer-container">
            <div >
                <ul style={{listStyleType:'none'}}>Get to Know Us
                <li  style={{cursor:'pointer'}}>About Us</li>
                </ul>
            </div>
            <div>
                <ul style={{listStyleType:'none'}}>Contact with Us
                <li style={{cursor:'pointer'}}>Facebook</li>
                <li  style={{cursor:'pointer'}}>Youtube</li>
                <li  style={{cursor:'pointer'}}>Instagram</li>
                </ul>
            </div>
            <div>
                <ul style={{listStyleType:'none'}}>Let Us Help You
               <li  style={{cursor:'pointer'}}>Privacy</li>
                </ul>
            </div>
           
                </div>
                <div className='copyrights-layout'>© Bhoomika SP Bindu S N Gunakeerthi H U</div>
            
        </div>
    );
}

export default Footer;
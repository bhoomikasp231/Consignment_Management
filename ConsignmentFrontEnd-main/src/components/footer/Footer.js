import React from 'react';
import './Footer.css';


const Footer  = () => {
    return(
        <div>
    <div className="footer-container">
            <div >
                <ul style={{listStyleType:'none'}}>Know Us
                {/* <li  style={{cursor:'pointer'}}>About Us</li> */}
                </ul>
            </div>
            <div>
                <ul style={{listStyleType:'none'}}>Contact with Us
                {/* <li style={{cursor:'pointer'}}>Facebook</li>
                <li  style={{cursor:'pointer'}}>Youtube</li>
                <li  style={{cursor:'pointer'}}>Instagram</li> */}
                </ul>
            </div>
            <div>
                <ul style={{listStyleType:'none'}}> Help
               {/* <li  style={{cursor:'pointer'}}>Privacy</li> */}
                </ul>
            </div>
           
                </div>
                <div className='copyrights-layout'>© 2022. CONSIGNMENT. All Rights Reserved. | Design By : Bhoomika, Bindu, Gunakeerthi</div>
            
        </div>
    );
}

export default Footer;
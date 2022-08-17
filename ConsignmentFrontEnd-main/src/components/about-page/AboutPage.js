import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
    return(
        <div style={{margin:'2em', color:'gray'}}>
            <h1 style={{color:'black'}}>About Us</h1>
            <div className='card-view'>
            <h2 style={{color:'black'}}>Vision</h2>
            <p>Path4U is a global solutions provider of Radio Frequency Identification (RFID),
                 IoT and mobility solutions. The main aim is to provide the tracking of consignment
                  in a more cost effective way.</p>
         </div>
         <div className='card-view'>
            <h3 style={{color:'black'}}>Benifits</h3>
            <ul>
                <li>Quickly conduct accurate counts</li>
                <li>Increased visibility to operations</li>
                <li>Improved Consignment turn Rates</li>
                <li>Reduced variances in Consignment </li>
                <li>Optimized supply chain management for consignment.</li>
            </ul>
            </div>
            <div className='card-view'>
            <h3 style={{color:'black'}}>Content Creators</h3>
            <dl>
                <dt>Bhoomika SP</dt>
                <dd>1SI19CS026</dd>
                <dd>SIT</dd>
                <dt>Bindu S N</dt>
                <dd>1SI19CS028</dd>
                <dd>SIT</dd>
                <dt>Gunakeerthi H U</dt>
                <dd>1SI19CS045</dd>
                <dd>SIT</dd>
</dl>
</div>
        </div>
    )
}

export default AboutPage;
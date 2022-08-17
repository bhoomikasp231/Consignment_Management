import React from 'react';
import SlideShow from './SlideShow';
import ItemImg from '../../assests/tag-item.svg';
import rfidReader from '../../assests/rfid-reader.PNG';
import dataCollection from '../../assests/data-collection.PNG';

const HomePage = (props) => {
 
    console.log('props', props);
    return(
        <div>
            {/* <SlideShow/> */}
            <div className='hm-second-main'>
                <h1 className='font-style' style={{marginTop:'2em', marginLeft:'0.5em'}}>Consignment Management</h1>
                {/* <h2 style={{ marginLeft:'0.5em'}}>Simplify Consignment Management</h2> */}
                <hr className='solid'></hr>
                <p className='font-style' style={{ margin:'1em', fontSize:'1.5em'}}>Consignment Manaement and distribution of it have a tremendous amount of issues when is is done manually.
                     RFID provides the ability to scan this consignment in bulk rather than 
                     having to individually scan each item one by one. It also allows for
                      collection of data throughout traditional path.</p>

                {/* <h1 style={{textAlign:'center'}}> How it Works</h1> */}
                <div className='flex-row'>
                <div>
                    <h2 className='font-style'>TAG ITEMS</h2>
                <img height='400em' src={ItemImg}></img>
                </div>
                <p className='detail-text' style={{background:'#BDF2D5', fontSize:'1.5em', paddingTop:'3em'}}>Consignment are tagged with RFID labels. 
                     Each RFID label is serialized.
                      Often times an RFID printer may be used to automate the printing and encoding
                       of the RFID labels.</p>
                      
               
                </div>
                <h2 className='font-style'>RFID Reader</h2>
                <div className='flex-row'>
     
                    
                <p className='detail-text' style={{marginTop:'1em' , background:'#BDF2D5', fontSize:'1.5em', paddingTop:'3em'}}>As consignment move from source to destination, the strategic RFID read points collect the movement
                  of the consignment. The key benefit is the speed of data
                    collection as opposed to a barcode or manual count.</p>
              
                       <img height='400em' src={rfidReader}></img>
                {/* <img src={rfidReader}></img> */}
                {/* <img src={dataCollection}></img> */}
                </div>
                <div className='flex-row'>
                <div>
                    <h2 className='font-style'>DATA COLLECTION</h2>
                <img height='400em' src={dataCollection}></img>
                </div>
                <p className='detail-text' style={{marginTop:'1em' , background:'#BDF2D5', fontSize:'1.5em', paddingTop:'3em'}}>The data that is collected can assist with business 
                discussions such as tracking of inventory throughout a facility or management of
                 inventory levels. In addition, the ability to conduct cycle counts and physical
                  inventory counts in a more cost effective and efficient way produces intelligence 
                  on variances right away.</p>
                      
               
                </div>
                <div className='value-card' >
                    <h2 className='font-style'>Valuable Workflows</h2>
                    <h3>Consignment Tracking</h3>
                    <p  className='detail-text-val' >As consignment moves throughout your facility, take advantage of strategic 
                        read points to collect the movement of consignment.</p>
                </div>
            </div>
           
        </div>
    );
}

export default HomePage;
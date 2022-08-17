import {React, useState, useEffect} from 'react';
import { Steps } from 'rsuite';
import './TrackConsignment.css';

const TrackConsignment = ({consignment}) => {
    const [currentPosition, setCurrentPosition] = useState(0);
    useEffect(()=>{
        if(consignment){
            if(consignment?.trackStatus.includes('1')){
                setCurrentPosition(1);
            }else if(consignment?.trackStatus.includes('2')){
                setCurrentPosition(3);
            }else if(consignment?.trackStatus.includes('3')){
                setCurrentPosition(5);
            //}else if(consignment?.trackStatus.includes('4')){
                //setCurrentPosition(7);
            }
        }
      
        console.log('trackStatus',consignment?.trackStatus);
    },[consignment?.trackStatus])
  
    return(
        <div >
    {consignment ?   <Steps className='track-main' current={currentPosition}>
    <Steps.Item title={consignment?.consignmentDetails?.source}  />
    <hr className='hr-border' ></hr>
    <Steps.Item title={consignment?.consignmentDetails?.intermediateLocation}  />
    <hr className='hr-border' ></hr>
    <Steps.Item title={consignment?.consignmentDetails?.destination}  />
   
  </Steps>:<p>No Track Data Available</p>}
        </div>
    );
}

export default TrackConsignment;
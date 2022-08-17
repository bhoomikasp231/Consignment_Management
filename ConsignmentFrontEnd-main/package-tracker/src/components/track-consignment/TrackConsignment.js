import {React, useState, useEffect} from 'react';
import { Steps } from 'rsuite';

const TrackConsignment = ({trackStatus}) => {
    const [currentPosition, setCurrentPosition] = useState(0);
    useEffect(()=>{
        if(trackStatus.includes('order')){
            setCurrentPosition(1);
        }else if(trackStatus.includes('packed')){
            setCurrentPosition(2);
        }else if(trackStatus.includes('shipped')){
            setCurrentPosition(3);
        }else if(trackStatus.includes('delivered')){
            setCurrentPosition(5);
        }
        console.log('trackStatus',trackStatus);
    },[trackStatus])
  
    return(
        <div>
       <Steps current={currentPosition} style={{color:'darkGreen', display:'flex', flexDirection:'row', width:'20em', fontWeight:'bold', textAlign:'center'}}>
    <Steps.Item title="Ordered"  />
    <Steps.Item title="Packed" />
    <Steps.Item title="Shipped" />
    <Steps.Item title="Delivered" />
  </Steps>
        </div>
    );
}

export default TrackConsignment;
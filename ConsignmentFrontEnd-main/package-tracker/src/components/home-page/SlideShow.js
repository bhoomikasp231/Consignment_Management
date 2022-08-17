import {React, useState, useEffect} from 'react';
import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import './Dashboard.css';
import DashboardService from './DashboardService';
import { baseUrl } from '../../utils/Utils';
import SliderDefaultImg from '../../assests/propage.jpg';

const SlideShow = () =>{
  const [sliderImage, setSliderImage] = useState([  <div key={0} className="each-slide">
  <div style={{'backgroundImage': `url(${SliderDefaultImg})`}}> 
  </div>
  </div>]);
      const zoomOutProperties = {
        indicators: true,
        scale: 0.5,
        duration: 2000,
        transitionDuration: 500,
        infinite: true,
        autoplay:true
      }

     useEffect(()=>{
      callDashboardSliderApi();
     },[]);

    function callDashboardSliderApi (){
   //   setSliderImage([]);
     DashboardService.dashBoardSliderImage().then((response)=>{        
        setSliderImage(  response.dashboardSlider.map((props)=>
           <div key={props._id} className="each-slide">
           
           <div style={{'backgroundImage': `url(${`${baseUrl}/tracker/dashboard/sliderimage/${props._id}`})`}}> 
           </div>
         </div> 
        ))
      }).catch((error)=>{
        console.log(error);
      })
    }
    return(
        <Slide {...zoomOutProperties} className="slide-container">
      {sliderImage}        
      </Slide>
    );
}

export default SlideShow;
import Pdf from "react-to-pdf";
import {React, useState, useEffect, useRef} from 'react';
import { FcInfo } from "react-icons/fc";
import './ViewEditConsignmentData.css';
import axios from "axios";
import {baseUrl} from "../../utils/Utils"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchBtn from '../../assests/search-flat.png';
import TrackConsignment from '../track-consignment/TrackConsignment';
import downloadIcon from '../../assests/download.jpg';


let metaDataValues = ({ 
  searchContent:'',
consignmentName:'',
rfidData:'',
consignmentID:'',
companyName:'',
typeOfCompany:'',
source:'',
destination:'',
weightsInKg:'',
initLocation: '',
sentOn:'',
exptdDelivery:'',
srcPersonName:'',
srcPersonMail:'',
srcPhnNum:'',
srcPersonState:'',
srcPersonCity:'',
srcPersonPincode:'',
desPersonName:'',
desPersonMail:'',
desPersonPhnNum:'',
desPersonState:'',
desPersonCity:'',
desPersonPincode:'',
vehName:'',
vehNum:'',
vehNumPlate:'',
vehConditions:''

});
let consignmentObjID= '';
const ViewConsignment = () => {
  // const alertmsg = useAlert();
 const [readonly, setReadOnly] = useState("false");
 const [metaDataInput, setMetaDataInput] = useState({
   consignmentName:'',
   rfidData:'',
   consignmentID:'',
   companyName:'',
   typeOfCompany:'',
   source:'',
   destination:'',
   weightsInKg:'',
   initLocation: '',
   sentOn:'',
   exptdDelivery:'',
   srcPersonName:'',
   srcPersonMail:'',
   srcPhnNum:'',
   srcPersonState:'',
   srcPersonCity:'',
   srcPersonPincode:'',
   desPersonName:'',
   desPersonMail:'',
   desPersonPhnNum:'',
   desPersonState:'',
   desPersonCity:'',
   desPersonPincode:'',
   vehName:'',
   vehNum:'',
   vehNumPlate:'',
   vehConditions:''
   
});
const [uomData, setUomResponse] = useState([]);
const [startDate, setStartDate] = useState(new Date());
const [conversionRateVisible, setConversionRateVisible] = useState(false);
const [loadingVisible, setLoadingVisible] = useState('spanner Notshow');
const [categoryArray, setCategoryArray] = useState([]);
const [companyArray, setCompanyArray] = useState([]);
const [consignment, setTrackStatus] = useState("");
const [isLoggedIn, setisLoggedIn] = useState(false);
const [loginOpen, setLoginOpen] = useState(true);

const [modalIsOpen, setmodalIsOpen] = useState(true);
  const ref = useRef(null);

  useEffect(()=>{ 
    if(localStorage.getItem('userToken') !== null){
      setisLoggedIn(true);
  }
    setCategoryArray([]);
    setCompanyArray([]);
    setUomResponse([]);
  },[]);
  const handleClodePDFGenerator = () =>{
  //  setSecondPageOpen(false);
}

function formattingJsonObject(){
  let jsonObj= {
    // rfidData:metaDataInput.rfidData,
    consignmentName:metaDataInput.consignmentName,
     sourcePerson:{
     personName: metaDataInput.srcPersonName,
     emailID:metaDataInput.srcPersonMail,
     phnNo: parseInt(metaDataInput.srcPhnNum),
     state: metaDataInput.srcPersonState,
     city: metaDataInput.srcPersonCity,
     pincode:parseInt(metaDataInput.srcPersonPincode)
 },
 destinationPerson:{
      personName: metaDataInput.desPersonName,
     emailID :metaDataInput.desPersonMail,
     phnNo: metaDataInput.desPersonPhnNum,
     state:metaDataInput.desPersonState,
     city: metaDataInput.desPersonCity,
     pincode:parseInt(metaDataInput.desPersonPincode)
 },
 consignmentDetails:{
   consignmentID: metaDataInput.consignmentID,
     companyName:metaDataInput.companyName,
     companyType: metaDataInput.typeOfCompany,
     source: metaDataInput.source,
     destination: metaDataInput.destination,
     weights: metaDataInput.weightsInKg,
     intermediateLocation:metaDataInput.intermediateLocation,
     sentTime:metaDataInput.sentOn,
     expectedDelivery: metaDataInput.exptdDelivery
 },
 vehicleDetails:{
     vehicleName:metaDataInput.vehName,
     vehicleNum:metaDataInput.vehNum,
     vehicleNumPlate: metaDataInput.vehNumPlate,
     conditions:metaDataInput.vehConditions
 }
 }
 return jsonObj;
 }

 const handleInputChange = (event) =>{
  setMetaDataInput((metaDataInput)=>({...metaDataInput, [event.target.name]: event.target.value}))
  metaDataValues = ({...metaDataValues, [event.target.name]: event.target.value});
 }

 const handleBtnSearch = () =>{
  // client.send(JSON.stringify({ 
  //   type: "contentchange",
  //   username: 'pree',
  //   content: 'new code'
  // }));
     console.log("searc", metaDataInput.searchContent);
    axios.get(`${baseUrl}/tracker/consignment/${metaDataInput.searchContent}`).then((response)=>{
        console.log('res', response?.data);
        consignmentObjID = response?.data?.consignment?._id;
        if(response?.data?.consignment?.trackStatus){
          setTrackStatus(response?.data?.consignment);
        } else{
          setTrackStatus("");
        }
        addDataToFields(response.data)
    }).catch((e)=>{
        console.log('e', e);
        alert( e.message);
    });  
  }



  function addDataToFields(data){
    setMetaDataInput((metaDataInput)=>({...metaDataInput, rfidData : data.consignment.rfidData,
   consignmentName : data.consignment.consignmentName,
   srcPersonName : data.consignment.sourcePerson.personName,
   srcPersonMail :data.consignment.sourcePerson.emailID,
    srcPhnNum : data.consignment.sourcePerson.phnNo,
    srcPersonState : data.consignment.sourcePerson.state,
    srcPersonCity : data.consignment.sourcePerson.city,
    srcPersonPincode : data.consignment.sourcePerson.pincode,
    desPersonName :  data.consignment.destinationPerson.personName,
    desPersonMail : data.consignment.destinationPerson.emailID,
    desPersonPhnNum : data.consignment.destinationPerson.phnNo,
    desPersonState : data.consignment.destinationPerson.state,
    desPersonCity : data.consignment.destinationPerson.city,
    desPersonPincode : data.consignment.destinationPerson.pincode,
    consignmentID: data.consignment.consignmentDetails.consignmentID,
    companyName : data.consignment.consignmentDetails.companyName,
    typeOfCompany : data.consignment.consignmentDetails.companyType,
    source : data.consignment.consignmentDetails.source,
    destination : data.consignment.consignmentDetails.destination,
    weightsInKg : data.consignment.consignmentDetails.weights,
    intermediateLocation : data.consignment.consignmentDetails.intermediateLocation,
    sentOn : data.consignment.consignmentDetails.sentTime,
    exptdDelivery : data.consignment.consignmentDetails.expectedDelivery,
    vehName : data.consignment.vehicleDetails.vehicleName,
    vehNum : data.consignment.vehicleDetails.vehicleNum,
    vehNumPlate: data.consignment.vehicleDetails.vehicleNumPlate,
    vehConditions : data.consignment.vehicleDetails.conditions})
)
  } 
    return (
  <div className="view-consignment">
  
    <div style={{display:'flex', flexDirection:'row',  position:'fixed', width:'100%'}} >
              <Pdf  targetRef={ref} filename="consignment-details.pdf">
        {({ toPdf }) => <button className="custom-btn-invoice" onClick={toPdf}>Download report</button>}
      </Pdf>
      <span onClick={handleClodePDFGenerator} className="close-window">&times;</span>
      </div>
      <div ref={ref} className="meta-view-data-container">
            <div className='view-search-container'>
            <h3 style={{fontSize:'1.5em',textAlign:'left', width:'100%', paddingLeft:'10px', paddingTop:'8px', color:'#007259'}}>Consignment details</h3>
            <div className="search-bar-layout tour-search">
            <input style={{width:'80%', borderRadius:'10em', height:'2.1em'}} type='text' placeholder='Search... By Consignment number' name='searchContent' onChange={handleInputChange} ></input>
            <img className="search-btn" width="27em" height="27em" alt='search-btn' src={SearchBtn} onClick={handleBtnSearch}></img>
            </div>
            </div>
            <div className="add-stock-container">
            
        <form >
         <div className="view-main-container">
           <div>
           <div  >
           <p style={{fontSize:'1.2em', fontWeight:'bold'}}>Consignment Details</p>
          <label for="consignmentName" title="Consignment name">Consignment Name</label>
          <span>{metaDataInput.consignmentName}</span>
        </div>
        <div>
          <label>RFID Number</label>
          <span >{metaDataInput.rfidData}</span>
        </div>
        <div>
          <label>Consignment ID </label>
          <span>{metaDataInput.consignmentID}</span>
        </div>
        <div>
          <label >Company Name</label>
          <span>{metaDataInput.companyName}</span>
        </div>
        <div>
          <label>Company Type</label>
          <span>{metaDataInput.typeOfCompany}</span>
         
        </div>
       
        <div>
        <label>Source </label>
        <span >{metaDataInput.source} </span>
  
        </div>
        <div>
          <label >Destination</label>
          <span>{metaDataInput.destination}</span>
        </div>
        <div>
      <label>Intermediate Location</label>
      <span >{metaDataInput.intermediateLocation}</span>
    </div>

      <div>
      <label >Weights In Kg</label>
      <span >{metaDataInput.weightsInKg}</span>
    </div>
    <div>
      <label>Sent On</label>
      <span >{metaDataInput.sentOn}</span>
    </div>
    <div>
      <label>Expected Delivery</label>
      <span >{metaDataInput.exptdDelivery} </span>
    </div>
    <div >
      <p style={{fontSize:'1.2em', fontWeight:'bold'}}>Vehicle Details</p>
      <div>
      <label>vehicle Name</label>
      <span >{metaDataInput.vehName}</span>
    </div>
    <div>
      <label>Vehicle Number</label>
      <span >{metaDataInput.vehNum}</span>
    </div>
    <div>
      <label >Vehicle Number Plate</label>
      <span >{metaDataInput.vehNumPlate}</span>
    </div>
    <div>
      <label >Vehicle Condition</label>
      <span>{metaDataInput.vehConditions}</span>
    </div>
      </div>
   </div>
   
   <div className="view-stock-second-container">
     <div >
     <form>
       <div >
       <p style={{fontSize:'1.2em', fontWeight:'bold'}}>Person Details</p>
       <div>
      <label >Source Person Name</label>
      <span >{metaDataInput.srcPersonName}</span>
    </div>
    <div>
      <label >Source Person Mail</label>
      <span >{metaDataInput.srcPersonMail}</span>
    </div>
    <div>
      <label>Src Phn Number</label>
      <span >{metaDataInput.srcPhnNum}</span>
    </div>
    <div>
      <label >Src Person State</label>
      <span >{metaDataInput.srcPersonState} </span>
    </div>
    <div>
      <label>Src Person City</label>
      <span>{metaDataInput.srcPersonCity}</span>
    </div>
    <div>
      <label>Src Person Pincode</label>
      <span >{metaDataInput.srcPersonPincode}</span>
    </div>
    <div>
      <label >Destination Person Name</label>
      <span>{metaDataInput.desPersonName}</span>
    </div>
    <div>
      <label>Destination Person Mail</label>
      <span >{metaDataInput.desPersonMail} </span>
    </div>
    <div>
      <label>Destination Person Phone Number</label>
      <span >{metaDataInput.desPersonPhnNum}</span>
    </div>
    <div>
      <label >Destination Person State</label>
      <span >{metaDataInput.desPersonState} </span>
    </div>
    <div>
      <label>Destination Person City</label>
      <span >{metaDataInput.desPersonCity}</span>
    </div>
    <div>
      <label >Destination Person Pincode</label>
      <span >{metaDataInput.desPersonPincode}</span>
    </div>
       </div>

     </form>
      </div>
   </div>
   </div> 
   </form>
      
      </div>

      <h2 style={{fontSize:'1.5em',textAlign:'left', width:'100%', paddingLeft:'10px', paddingTop:'0px', color:'#007259'}}>Track Consignment</h2>
      <hr className="hr-track"></hr>
      
      <TrackConsignment consignment={consignment}/>
 
      </div>
   
  </div>
    )
};

export default ViewConsignment;


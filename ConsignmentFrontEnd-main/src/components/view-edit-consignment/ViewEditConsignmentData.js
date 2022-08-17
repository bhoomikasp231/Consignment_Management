import {React, useState, useEffect} from 'react';
import { FcInfo } from "react-icons/fc";
import './ViewEditConsignmentData.css';
import axios from "axios";
import {baseUrl} from "../../utils/Utils";
import "react-datepicker/dist/react-datepicker.css";
import SearchBtn from '../../assests/search-flat.png';
import TrackConsignment from '../track-consignment/TrackConsignment';
import UserLoginDialog from "../Authentication/UserLoginDialog";
import UserSignUpDialog from '../Authentication/UserSignupDialog';



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
const ViewEditConsignmentData = () => {
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


useEffect(()=>{ 
  if(localStorage.getItem('userToken') !== null){
    setisLoggedIn(true);
}
  setCategoryArray([]);
  setCompanyArray([]);
  setUomResponse([]);
  // client.onopen = () => {
  //   console.log('WebSocket new Client Connected');
  // };
  // client.onmessage = (message) => {
  //   console.log('checking');
  //   console.log('message new',JSON.parse(message.data));
  //   makeChangeInTrackStatus(JSON.parse(message.data));
  // };
  //setReadOnly(true)
   // setLoadingVisible("spanner show");
   // featchData(`${baseUrl}/balajienterprises/unitOfMesure`);
  //  featchCategoryAndCompany(`${baseUrl}/balajienterprises/stock/category/companyfilter`);
},[]);

// function makeChangeInTrackStatus(obj){
//   console.log('obj rfid', obj?.consigmentTrackID); 
//   if(consignmentObjID === obj?.consigmentTrackID){
//     console.log('obj trackStatus', obj?.trackStatus); 
//     setTrackStatus(obj?.trackStatus);
//   }
// }


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

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
};

const handleSubmitStock = () => {
  setReadOnly("readonly")
  const responseBody=  formattingJsonObject();
  setLoadingVisible("spanner show");
//   const responseBody = {...metaDataInput, expiryDate:startDate.getMonth()+'/'+startDate.getFullYear()}
   console.log('form Data', responseBody);

   axios.patch(`${baseUrl}/tracker/consignment/${consignmentObjID}`, responseBody, config).then((response)=>{
      alert( response.data.message);
  //   alertmsg.show(response.data.message);
  console.log('response', response);
       metaDataValues = ({ 
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
       setLoadingVisible("spanner Notshow");
   }).catch((error)=>{
    alert( error.message);
    setTimeout(()=>{
  //    alertmsg.show(error.message, { type: types.ERROR })
    }, 500);
    setLoadingVisible("spanner Notshow");
    
});

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

    return(
      <div>
     {   isLoggedIn ? 
      <div className="meta-data-container">
            <div className='search-container'>
            <h3 style={{fontSize:'1.5em',textAlign:'left', width:'100%', paddingLeft:'10px', paddingTop:'10px', color:'#007259'}}>Edit the Consignment details</h3>
            <div className="search-bar-layout tour-search">
            <input style={{width:'80%', borderRadius:'10em', height:'2.1em'}} type='text' placeholder='Search... By Consignment number' name='searchContent' onChange={handleInputChange} ></input>
           <img className="search-btn" width="27em" height="27em" alt='search-btn' src={SearchBtn} onClick={handleBtnSearch}></img>
            </div>
            </div>
            <div className="add-stock-container">
            
        <form >
         <div className="addstock-main-container">
           <div style={{border:'1px solid gray', padding:'20px', marginBottom:'20px', boxShadow:'1px 1px 2px'}}>
           <div  class="user-input-wrp">
           <p style={{fontSize:'1.2em', fontWeight:'bold'}}>Consignment Details</p>
          <label for="consignmentName" title="Consignment name">Consignment Name <FcInfo/></label>
          <input  value={metaDataInput.consignmentName} id="consignmentName" name="consignmentName" type="text" placeholder="Consignment name" autofocus onChange={handleInputChange} />
        </div>
        <div  class="user-input-wrp">
          <label for="rfidData" title="RFID Number">RFID Number <FcInfo/></label>
          <input readOnly value={metaDataInput.rfidData} id="rfidData" name="rfidData" type="text" placeholder="RFID Number"  onChange={handleInputChange} />
        </div>
        <div  class="user-input-wrp">
          <label for="consignmentID" title="Consignment ID">Consignment ID <FcInfo/></label>
          <input value={metaDataInput.consignmentID} id="consignmentID" name="consignmentID" type="text" placeholder="Consignment ID" autofocus onChange={handleInputChange} />
        </div>
        <div>
          <label for="companyname" title="company name">Company Name <FcInfo/></label>
          <input value={metaDataInput.companyName} name="companyName" type="text" placeholder="Company name" autofocus onChange={handleInputChange} />
        </div>
        <div>
          <label for="typeOfCompany" title="Company Type">Company Type<FcInfo/></label>
          <input value={metaDataInput.typeOfCompany}  name="typeOfCompany" type="text"  placeholder="Company Type" autofocus onChange={handleInputChange} />
         
        </div>
       
        <div>
        <label for="source" title="New Source">Source <FcInfo/></label>
        <input value={metaDataInput.source}  id="source" name="source" type="text" placeholder="Source"  onChange={handleInputChange} />
  
        </div>
        <div>
          <label for="destination" title="Destination">Destination<FcInfo/></label>
 
          <input value={metaDataInput.destination} type="text"  name="destination" placeholder="Destination" onChange={handleInputChange}/>
          
        </div>
        <div>
      <label for="intermediateLocation" title="Intermediate Location">Intermediate Location<FcInfo/></label>
      <input value={metaDataInput.intermediateLocation} id="intermediateLocation" name="intermediateLocation" type="text" placeholder="Intermediate Location"  onChange={handleInputChange} />
    </div>

      <div>
      <label for="weightsInKg" title="Weights In Kg">Weights In Kg<FcInfo/></label>
      <input value={metaDataInput.weightsInKg} id="weightsInKg" name="weightsInKg" type="text" placeholder="Weights In Kg"  onChange={handleInputChange} />
    </div>
    <div>
      <label for="sentOn" title="sent on">Sent On<FcInfo/></label>
      <input value={metaDataInput.sentOn} id="sentOn" name="sentOn" type="text" placeholder="sent on"  onChange={handleInputChange} />
    </div>
    <div>
      <label for="exptdDelivery" title="expected Delivery">Expected Delivery<FcInfo/></label>
      <input value={metaDataInput.exptdDelivery} id="exptdDelivery" name="exptdDelivery" type="text" placeholder="expected Delivery"  onChange={handleInputChange} />
    </div>
   </div>
   
   <div className="addstock-second-container">
     <div className='add-stock-container-child'>
     <form>
       <div className="unit-container">
       <p style={{fontSize:'1.2em', fontWeight:'bold'}}>Person Details</p>
       <div>
      <label for="srcPersonName" title="Source Person Name">Source Person Name<FcInfo/></label>
      <input value={metaDataInput.srcPersonName} id="srcPersonName" name="srcPersonName" type="text" placeholder="Source Person Name"  onChange={handleInputChange} />
    </div>
    <div>
      <label for="srcPersonMail" title="Source Person Mail">Source Person Mail<FcInfo/></label>
      <input value={metaDataInput.srcPersonMail} id="srcPersonMail" name="srcPersonMail" type="text" placeholder="Source Person Mail"  onChange={handleInputChange} />
    </div>
    <div>
      <label for="srcPhnNum" title="Source Phone Number">Src Phn Number<FcInfo/></label>
      <input value={metaDataInput.srcPhnNum} id="srcPhnNum" name="srcPhnNum" type="number" placeholder="Src Phn Number"  onChange={handleInputChange} />
    </div>
    <div>
      <label for="srcPersonState" title="Src Person State">Src Person State<FcInfo/></label>
      <input value={metaDataInput.srcPersonState} id="srcPersonState" name="srcPersonState" type="text" placeholder="Src Person State"  onChange={handleInputChange} />
    </div>
    <div>
      <label for="srcPersonCity" title="Src Person City">Src Person City<FcInfo/></label>
      <input value={metaDataInput.srcPersonCity} id="srcPersonCity" name="srcPersonCity" type="text" placeholder="Src Person City"  onChange={handleInputChange} />
    </div>
    <div>
      <label for="srcPersonPincode" title="Src Person Pincode">Src Person Pincode<FcInfo/></label>
      <input value={metaDataInput.srcPersonPincode} id="srcPersonPincode" name="srcPersonPincode" type="number" placeholder="Src Person Pincode"  onChange={handleInputChange} />
    </div>
    <div>
      <label for="desPersonName" title="Destination Person Name">Destination Person Name<FcInfo/></label>
      <input value={metaDataInput.desPersonName} id="desPersonName" name="desPersonName" type="text" placeholder="Destination Person Name"  onChange={handleInputChange} />
    </div>
    <div>
      <label for="desPersonMail" title="Destination Person Mail">Destination Person Mail<FcInfo/></label>
      <input value={metaDataInput.desPersonMail} id="desPersonMail" name="desPersonMail" type="text" placeholder="Destination Person Mail"  onChange={handleInputChange} />
    </div>
    <div>
      <label for="desPersonPhnNum" title="Destination Person Phone Number">Destination Person Phone Number<FcInfo/></label>
      <input value={metaDataInput.desPersonPhnNum} id="desPersonPhnNum" name="desPersonPhnNum" type="numberop" placeholder="Destination Person Phone Number"  onChange={handleInputChange} />
    </div>
    <div>
      <label for="desPersonState" title="Destination Person State">Destination Person State<FcInfo/></label>
      <input value={metaDataInput.desPersonState} id="desPersonState" name="desPersonState" type="text" placeholder="Destination Person State"  onChange={handleInputChange} />
    </div>
    <div>
      <label for="desPersonCity" title="Destination Person City">Destination Person City<FcInfo/></label>
      <input value={metaDataInput.desPersonCity} id="desPersonCity" name="desPersonCity" type="text" placeholder="Destination Person City"  onChange={handleInputChange} />
    </div>
    <div>
      <label for="desPersonPincode" title="Destination Person Pincode">Destination Person Pincode<FcInfo/></label>
      <input value={metaDataInput.desPersonPincode} id="desPersonPincode" name="desPersonPincode" type="number" placeholder="Destination Person Pincode"  onChange={handleInputChange} />
    </div>
       </div>

     </form>
      </div>
      <div className='add-stock-container-child'>
      <p style={{fontSize:'1.2em', fontWeight:'bold'}}>Vehicle Details</p>
      <div>
      <label for="vehName" title="vehicle Name">vehicle Name<FcInfo/></label>
      <input value={metaDataInput.vehName} id="vehName" name="vehName" type="text" placeholder="vehicle Name"  onChange={handleInputChange} />
    </div>
    <div>
      <label for="vehNum" title="Vehicle Number">Vehicle Number<FcInfo/></label>
      <input value={metaDataInput.vehNum} id="vehNum" name="vehNum" type="text" placeholder="Vehicle Number"  onChange={handleInputChange} />
    </div>
    <div>
      <label for="vehNumPlate" title="Vehicle Number Plate">Vehicle Number Plate<FcInfo/></label>
      <input value={metaDataInput.vehNumPlate} id="vehNumPlate" name="vehNumPlate" type="text" placeholder="Vehicle Number Plate"  onChange={handleInputChange} />
    </div>
    <div>
      <label for="vehConditions" title="Vehicle Condition">Vehicle Condition<FcInfo/></label>
      <input value={metaDataInput.vehConditions} id="vehConditions" name="vehConditions" type="text" placeholder="Vehicle Condition"  onChange={handleInputChange} />
    </div>
      </div>
   </div>
   </div> 
   </form>
   <div className={loadingVisible}>
  <div className="loader"></div>
  <p>Uploading Data, please be patient.</p>
      </div>
      </div>
      <h2 style={{fontSize:'1.5em',textAlign:'left', width:'100%', paddingLeft:'10px', paddingTop:'10px', color:'#007259'}}>Track Consignment</h2>
      <hr className="hr-track"></hr>
      <TrackConsignment consignment={consignment}/>
      
      <button style={{marginBottom:'20px'}} className="custom-btn-addstock" onClick={handleSubmitStock}>Update Data</button>
   </div> : 
           <div className='login-container'>
        {loginOpen ?<UserLoginDialog setmodalIsOpen={setmodalIsOpen} setLoginOpen={setLoginOpen}></UserLoginDialog>:
                <UserSignUpDialog setmodalIsOpen={setmodalIsOpen} setLoginOpen={setLoginOpen}></UserSignUpDialog>}  </div>
        
  
}
   </div>
    );
}

export default ViewEditConsignmentData;
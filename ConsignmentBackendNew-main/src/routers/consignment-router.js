const express = require('express')
const Consignment = require('../models/consignment')
const auth = require('../middelware/auth')
const webSocketServer = require('websocket').server;
const webSocketsServerPort = 8000;

const router = new express.Router()

const http = require('http');
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});
 
// I'm maintaining all active connections in this object
const clients = {};

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};




// I'm maintaining all active users in this object
const users = {};
// The current editor content is maintained here.
let editorContent = null;
// User activity history.
let userActivity = [];



const sendMessage = (json) => {
    console.log('client', json);
  // We are sending the current data to all connected clients
  Object.keys(clients).map((client) => {
    clients[client].sendUTF(json);
  });
}

const typesDef = {
  USER_EVENT: "userevent",
  CONTENT_CHANGE: "contentchange"
}

wsServer.on('request', function(request) {
    var userID = getUniqueID();
    console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
    // You can rewrite this part of the code to accept only the requests from allowed origin
   
    const connection = request.accept(null, request.origin);
    clients[userID] = connection;
    console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));
    connection.on('message', function(message) {

    }); 


  connection.on('close', function(connection) {
    console.log((new Date()) + " Peer " + userID + " disconnected.");
    const json = { type: typesDef.USER_EVENT };
    userActivity.push(`${users[userID]?.username} left the document`);
    json.data = { users, userActivity };
    delete clients[userID];
    delete users[userID];
    sendMessage(JSON.stringify(json));
  });
});
router.post('/tracker/add/consignment', auth, async(req, res)=>{
   // const buffer = await sharp(req.files.file.buffer.toBuffer).resize({width:250, height:250}).png().toBuffer()
    const consignment = new Consignment({
        ...req.body,
        owner: req.user._id
    })
    try{
        await consignment.save()
        res.status(200).send({isSuccessful:true, message:'Uploaded Successfully!',consignment})
    }catch(e){
        res.status(400).send({isSuccessful:false, message:'Uploaded Failed!',e})
    }
})


router.get('/tracker/consignment', async(req, res)=>{
    try{
      //  const totalLength = await Consignment.find({}).sort({createdAt:1})
        const consignment = await Consignment.find({}).sort({createdAt:1}).limit(20)
        res.send({isSuccessful:true, message:'Data List!',consignment})
    }catch(e){
        res.status(500).send({isSuccessful:false, message:'Error!',e})

    }
})




router.get('/tracker/consignment/:id', async (req, res)=>{
    const rfidData = req.params.id
    try{
      
        const consignment = await Consignment.findOne({rfidData})
        if(!consignment){
            return res.status(400).send({isSuccessful:false, message:'Data not found!!'})
        }
        res.send({isSuccessful:true, message:'Data Found!',consignment})
    }catch(e){
        res.status(500).send({isSuccessful:false, message:'Data Not Found!',e})
    }
})



router.patch('/tracker/consignment/:id', auth, async(req, res)=>{
    const updates = Object.keys(req.body)
   const allowedUpdates = ['consignmentName', 'sourcePerson', 'destinationPerson', 'consignmentDetails', 'vehicleDetails']
    const isValideOperation = updates.every((updates)=>
        allowedUpdates.includes(updates))
        if(!isValideOperation)
        return res.status(404).send({error:'Invalide Operation!'}) 
        
        try{
            const consignment = await Consignment.findOne({_id:req.params.id, owner:req.user._id})
            if(!consignment){
             return   res.status(404).send({isSuccessful:false, message:'Data not found!!'})
            }
            updates.forEach((updates)=> consignment[updates]=req.body[updates])
            await consignment.save()
            res.send({isSuccessful:true, message:'Changes made successfully!!',consignment})
        }catch(e){
            res.status(500).send({isSuccessful:false, message:'Changes Couldnt possible!',e})
        }
})

router.get('/tracker/consignment/track/ststus/:id/:trackStatus',  async(req, res)=>{
    const updates = req.params.trackStatus
        
        try{
            const consignment = await Consignment.findOne({rfidData:req.params.id})
            if(!consignment){
             return   res.status(404).send({isSuccessful:false, message:'Data not found!!'})
            }
          consignment.trackStatus=req.params.trackStatus
            await consignment.save()
            sendMessage(JSON.stringify({consigmentTrackID:consignment._id, trackStatus:consignment.trackStatus}));
            res.send({isSuccessful:true, message:'Changes made successfully!!',consignment})
        }catch(e){
            res.status(500).send({isSuccessful:false, message:'Changes Couldnt possible!',e})
        }
})



module.exports = router 
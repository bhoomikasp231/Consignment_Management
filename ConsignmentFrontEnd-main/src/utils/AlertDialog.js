import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const  AlertDialog = ({alertDialogData, setAlertDialogData, handleAlertDialogYesButton}) =>{

    function Alert(props) {
        return <MuiAlert elevation={8} variant="filled" {...props} />;
      }
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        
        setAlertDialogData({visible:false});
      };
    return (
        <Snackbar open={alertDialogData.visible} >
        <Alert  severity={alertDialogData.sevearityIs}>
            <div style={{display:'flex', flexDirection:'column', width:'100%    '}}>
            {alertDialogData.message}
            <div style={{marginTop:'2em'}}>
            <button style={{color:'white', cursor:'pointer', border:'none', background:'#007259', padding:'0.8em', marginRight:'2em',borderRadius:'0.2em' }} onClick={handleAlertDialogYesButton}>Yes</button>
            <button style={{color:'white', cursor:'pointer', border:'none', background:'#007259', padding:'0.8em', borderRadius:'0.2em'}} onClick={handleClose}>No</button>
            </div>
            </div>
         
        </Alert>
       
      </Snackbar>
    );
}
export default AlertDialog;

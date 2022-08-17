import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const  AlertMessage = ({alertMessageData, setAlertMessageData}) =>{

    function Alert(props) {
        return <MuiAlert elevation={8} variant="filled" {...props} />;
      }
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        
        setAlertMessageData({visible:false});
      };
    return (
        <Snackbar open={alertMessageData.visible} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertMessageData.sevearityIs}>
          {alertMessageData.message}
        </Alert>
       
      </Snackbar>
    );
}
export default AlertMessage;

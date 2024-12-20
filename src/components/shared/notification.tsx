import { Alert, Snackbar } from '@mui/material'
import React from 'react'

interface FormNotificationProps {
    visible: boolean;
    setVisible: (value: boolean) => void;
  }

const SuccessAlert: React.FC<FormNotificationProps> = ({visible, setVisible}) => {
  return (
    
       <Snackbar open={visible} 
                autoHideDuration={3000}
                anchorOrigin={{vertical:'top', horizontal:'right'}}
                sx={{bottom: '600px'}}
                onClose={() => setVisible(false)}
        >
        <Alert
            onClose={() => setVisible(false)}
            severity='success'
            variant="filled"
            sx={{ width: '100%' }}
        >
            Opération éffectuée avec succès 
        </Alert>
        </Snackbar>
   
  )
}

export default SuccessAlert

interface FormVarningProps {
    colorAlert: boolean;
    setColorAlert: (value: boolean) => void;
    messageError: string;
  }

export const WarningAlert: React.FC<FormVarningProps> = ({colorAlert, setColorAlert, messageError}) => {
    return (
      
        <Snackbar open={colorAlert} 
        autoHideDuration={3000}
        anchorOrigin={{vertical:'top', horizontal:'right'}}
        sx={{bottom: '600px'}}
        onClose={() => setColorAlert(false)}
        >
        <Alert
        onClose={() => setColorAlert(false)}
        severity='warning'
        variant="filled"
        sx={{ width: '100%' }}
        >
        {messageError}
        </Alert>
        </Snackbar>
     
    )
  }
  
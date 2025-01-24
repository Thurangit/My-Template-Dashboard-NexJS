import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { ThreeDots } from 'react-loader-spinner';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useOrganizationStore } from './storeoftheme';

const Loading: React.FC = () => {



  return (
    <>
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
    <Box sx={{ width: "100%" }}>
        {
             Array.from({length: 10}).map((_, index) => (<Skeleton  key={index} sx={{ height: 56 }}/>))
        }
    </Box>
    
  </>
  );
}

export default Loading

export const LoadingPage: React.FC = () => {


  return (
    <>
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
      open={true}
    >
     <Box sx={{ width: "100%" }}>
       
       <ThreeDots
       visible={true}
       height="80"
       width="80"
       color="#1b365f"
       radius="9"
       ariaLabel="three-dots-loading"
       wrapperStyle={{ position: 'absolute', 
                       bottom: '350px', 
                       right: '10px',  
                       left: '10px', 
                       justifyContent: 'center'
                   }}
       wrapperClass=""
       />
   </Box>
    </Backdrop>
    
    
  </>
  );
}

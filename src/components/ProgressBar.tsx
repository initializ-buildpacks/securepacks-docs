import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel({status}) {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    
    let timer = setInterval(() => {
        setProgress((prevProgress) => (status === "Completed"? 100 :status === "In Progress" ? (prevProgress >= 90 ? 90 : prevProgress + 2) :0));
        if(status==='Completed'){
            setProgress(100)
          }
          console.log(progress);
          console.log(status);
          
      }, 900);
     
      
      return () => {
        clearInterval(timer);
      };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}

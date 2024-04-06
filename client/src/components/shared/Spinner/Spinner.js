import * as React from 'react';
import Box from '@mui/material/Box';
import classes from './Spinner.module.css';
import { Oval } from 'react-loader-spinner';

const Spinner = ({ center, transparentCenter, className }) => {
  return (
    <Box
      sx={{ display: 'flex' }}
      className={`${center && classes.center} ${
        transparentCenter && classes.transparentCenter
      } ${className}`}>
      <Oval
        height={65}
        width={65}
        color="#222831"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#161A30"
        strokeWidth={5}
        strokeWidthSecondary={5}
      />
    </Box>
  );
};

export default Spinner;

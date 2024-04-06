import React from 'react';
import Spinner from '../Spinner/Spinner';

const FallbackLoader = ({ isTransparent }) => {
  return (
    <div className={`relative w-full ${isTransparent ? 'bg-transparent' : ''}`}>
      <div className="absolute z-20 w-full h-screen">
        <Spinner center />
      </div>
    </div>
  );
};

export default FallbackLoader;

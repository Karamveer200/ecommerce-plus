import React from 'react';
import Spinner from '../Spinner/Spinner';

const FallbackLoader = () => {
  return (
    <div className="h-screen w-full">
      <div className="h-[calc(100%-300px)] w-full">
        <Spinner center />
      </div>
    </div>
  );
};

export default FallbackLoader;

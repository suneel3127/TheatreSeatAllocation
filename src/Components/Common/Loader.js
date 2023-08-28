import React from 'react';
import "./Loader.scss";
import ClipLoader from 'react-spinners/ClipLoader';



const Loader = ({ isLoading }) => {
  return (
    <div className={`masked-spinner ${isLoading ? 'loading' : ''}`}>
      <ClipLoader color={'#36D7B7'} loading={isLoading} size={150} />
    </div>
  );
};

export default Loader;
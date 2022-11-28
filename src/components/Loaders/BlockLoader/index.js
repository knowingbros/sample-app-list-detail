import React from 'react';
import {ScaleLoader} from 'react-spinners';

import './styles.css';

const BlockLoader = () => (
  <div className="block-loader-container">
    <ScaleLoader color={'#BFEFFF'} />
  </div>
)

export default BlockLoader;

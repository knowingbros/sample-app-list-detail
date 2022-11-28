import React from 'react';
import {ScaleLoader} from 'react-spinners';

import './styles.css'

const SideBarLoader = () => (
  <div className="sidebar-loader-container">
    <ScaleLoader color={'#BFEFFF'}/>
  </div>
)

export default SideBarLoader;

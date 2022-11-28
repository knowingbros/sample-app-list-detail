import React from "react";
import {ScaleLoader} from "react-spinners";

import "./styles.css";

const PanelLoader = () => (
  <div className="panel-loader-container">
    <ScaleLoader className="panel-clip-loader" color={"#BFEFFF"} />
  </div>
);

export default PanelLoader;

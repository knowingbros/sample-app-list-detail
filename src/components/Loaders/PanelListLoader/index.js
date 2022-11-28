import React from "react";
import PropTypes from "prop-types";

import PanelLoader from "../PanelLoader";

const PanelListLoader = ({ panelNumber }) => {
  const panelList = [...Array(panelNumber).keys()].map(id => (
    <PanelLoader key={id} />
  ));
  return <ul>{panelList}</ul>;
};

PanelListLoader.propTypes = {
  panelNumber: PropTypes.number
};

PanelListLoader.defaultProps = {
  panelNumber: 10
};

export default PanelListLoader;

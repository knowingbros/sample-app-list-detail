import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

const NavSelectorButton = props => {
  const { active, children, onClick, color = "white" } = props;

  const activeStyle = active
    ? {
        opacity: "100",
        borderBottom: `3px solid ${color}`,
        color
      }
    : {
        color
      };

  return (
    <div
      className="nav-selector-button-container"
      style={activeStyle}
      onClick={onClick}
    >
      <p>{children}</p>
    </div>
  );
};

NavSelectorButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func
};

export default NavSelectorButton;

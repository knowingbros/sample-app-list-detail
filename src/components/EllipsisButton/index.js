import React from "react";
import {FaEllipsisH} from "react-icons/fa";
import {Dropdown} from "react-bootstrap";

import "./styles.css";

const EllipsisButton = ({ children }) => (
  <Dropdown id="ellipsis-dropdown">
    <Dropdown.Toggle   className="toggle-button">
      <FaEllipsisH />
    </Dropdown.Toggle>
    <Dropdown.Menu className="ellipsis-dropdown-menu">{children}</Dropdown.Menu>
  </Dropdown>
);

export default EllipsisButton;

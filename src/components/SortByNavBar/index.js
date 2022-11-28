import React from "react";
import {Dropdown, DropdownButton} from "react-bootstrap";

import "./styles.css";

const SortByNavBar = props => {
  const { currentSortOption, handleSortUpdate } = props;

  const updateSort = option => handleSortUpdate(option);

  const dropDownButtonLabel = (
    <div className="sb-dd-button-label">
      <span id="sort-button-title">Sort: &nbsp;</span>
      <span id="sb-title-option">{currentSortOption.toUpperCase()}</span>
    </div>
  );

  return (
    <div className="sort-by-nav-bar-content">
      <DropdownButton
        title={dropDownButtonLabel}
        id="basic-nav-dropdown"
      >
        <Dropdown.Item className="dropdown-item-nav-bar-z" eventKey={4.1} onClick={() => updateSort("best")}>
          Best
        </Dropdown.Item>
        <Dropdown.Item className="dropdown-item-nav-bar-z" eventKey={4.2} onClick={() => updateSort("new")}>
          New
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default SortByNavBar;

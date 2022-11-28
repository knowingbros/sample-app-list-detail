import React from "react";
import {Dropdown, DropdownButton} from "react-bootstrap";
import {IoMdSearch} from "react-icons/io";

import "./styles.css";

const SubredditDropdown = props => {
  const {
    dropdownTitle,
    handleSubredditSelection,
    authUserSubredditTitles
  } = props;

  const menuItems = authUserSubredditTitles.map((title, idx) => (
    <Dropdown.Item key={idx} onClick={() => handleSubredditSelection(title)}>
      r/{title}
    </Dropdown.Item>
  ));

  const titleText =
    dropdownTitle === "Choose a subreddit"
      ? dropdownTitle
      : `r/${dropdownTitle}`;

  const dropDownTitleContent = (
    <div id="cp-dropdown-title-content">
      <IoMdSearch /> {titleText}
    </div>
  );

  return (
    <div id="cp-subreddit-dropdown-container">
      <DropdownButton
        className="cp-subreddit-dropdown"
        title={dropDownTitleContent}
        id="cp-subreddit-dropdown"
      >
        {menuItems}
      </DropdownButton>
    </div>
  );
};

export default SubredditDropdown;

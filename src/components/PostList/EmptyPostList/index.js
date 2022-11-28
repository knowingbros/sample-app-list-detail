import React from "react";

import programmingdictionaryIcon from "../../../assets/img/programmingdictionary_banner.svg";
import "./styles.css";

const defaultMessage =
  "There are no posts here. Try creating a post!";
const EmptyPostList = ({ message = defaultMessage }) => (
  <div className="empty-list-content">
    <h2>
      <img id="programmingdictionary-icon" src={programmingdictionaryIcon} alt="programmingdictionary" />
      {message}
    </h2>
  </div>
);

export default EmptyPostList;

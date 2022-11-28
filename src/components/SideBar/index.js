import React from "react";
import PropTypes from "prop-types";

import "./styles.css";
import SubscriptionButtonContainer from "../../containers/SubscriptionButtonContainer";
import {useNavigate} from "react-router-dom";
import {GenericBtn} from "../UserButton/UserButton.styles";
import alert from "../../redux/alert/actions";
import {useDispatch} from "react-redux";

const SideBar = props => {

  let navigate = useNavigate();
  const dispatch = useDispatch()

  const {
    subredditTitle,
    description,
    authenticatedUsername,
    pseudo
  } = props;

  const handleCreatePostClick = () => {
    if (authenticatedUsername) {
      return navigate(`/r/${subredditTitle}/create-post`);
    } else {
      dispatch(alert("You must be logged in to create a post.", "danger"));
    }
  };

  return (
    <div className="sidebar-content">
      <p className="sidebar-header">TOPIC DETAILS</p>
      <div className="title">
        <h2>r/{subredditTitle}</h2>
      </div>

      <div className="description">{description}</div>

      {!pseudo && (
        <div className="sidebar-button-container">
          <SubscriptionButtonContainer subredditTitle={subredditTitle} />
          <GenericBtn
            id="create-post-button"
            className="sidebar-button"
            onClick={handleCreatePostClick}
          >
            Create Post
          </GenericBtn>
        </div>
      )}
    </div>
  );
};

SideBar.propTypes = {
  subredditTitle: PropTypes.string,
  description: PropTypes.string,
  authenticatedUsername: PropTypes.string,
  pseudo: PropTypes.bool
};

export default SideBar;

import React from "react";

import UserButton from "../../UserButton";
import "./styles.css";
import {useNavigate} from "react-router-dom";

const UnauthenticatedTextEditor = props => {
    let navigate = useNavigate();


    return (
    <div className="unauth-text-editor-content">
      <div className="unauth-te-text">To comment, please login or sign up!</div>

      <div className="unauth-te-buttons">
        <UserButton onClick={() => {
            return navigate(`/login`);
        }} inverted>
          login
        </UserButton>
        <UserButton onClick={() => {
            return navigate(`/signup`);
        }}>
          sign up
        </UserButton>
      </div>
    </div>
  );
};

export default UnauthenticatedTextEditor;
